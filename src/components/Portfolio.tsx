import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollFloat from "./ScrollFloat";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  section_name: string;
  statistic_text?: string;
  statistic_link?: string;
}

const Portfolio = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [projectsBySection, setProjectsBySection] = useState<{[key: string]: Project[]}>({});
  const carouselRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  const scrollCarousel = (sectionName: string, direction: 'left' | 'right') => {
    const carousel = carouselRefs.current[sectionName];
    if (!carousel) return;
    
    const cardWidth = carousel.children[0]?.clientWidth || 320;
    const scrollAmount = cardWidth + 32; // card width + gap
    
    carousel.style.scrollBehavior = 'smooth';
    carousel.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
  };

  useEffect(() => {
    fetchSectionsAndProjects();
  }, []);

  const fetchSectionsAndProjects = async () => {
    // Fetch sections
    const { data: sectionsData, error: sectionsError } = await supabase
      .from('portfolio_sections')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (sectionsError) {
      console.error('Error fetching sections:', sectionsError);
      return;
    }
    
    setSections(sectionsData || []);
    
    // Fetch all projects
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (projectsError) {
      console.error('Error fetching projects:', projectsError);
      return;
    }
    
    // Group projects by section
    const grouped = (projectsData || []).reduce((acc, project) => {
      if (!acc[project.section_name]) {
        acc[project.section_name] = [];
      }
      acc[project.section_name].push(project);
      return acc;
    }, {} as {[key: string]: Project[]});
    
    // Ensure all sections have an entry, even if empty
    (sectionsData || []).forEach(section => {
      if (!grouped[section.section_name]) {
        grouped[section.section_name] = [];
      }
    });
    
    setProjectsBySection(grouped);
  };





  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-20">
        {sections.map((section) => {
          const sectionProjects = projectsBySection[section.section_name] || [];
          
          return (
            <div key={section.id}>
              <div className="text-center mb-12">
                <h2 className="text-5xl md:text-6xl font-bold mb-4 title-font">{section.title}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{section.description}</p>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectionProjects.length > 0 ? sectionProjects.map((project) => (
                  <Card 
                    key={project.id}
                    className="group overflow-hidden bg-card border-border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105"
                  >
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="text-sm text-primary font-medium">{project.category}</span>
                        <h3 className="text-xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors duration-200">
                          {project.title}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech && project.tech.map((tech) => (
                          <span 
                            key={tech}
                            className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {project.statistic_text && project.statistic_link && (
                        <div className="mb-4">
                          <button
                            onClick={() => window.open(project.statistic_link, '_blank')}
                            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer"
                          >
                            {project.statistic_text}
                          </button>
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        View Project
                      </Button>
                    </div>
                  </Card>
                )) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No projects in this section</p>
                  </div>
                )}
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden relative">
                {sectionProjects.length > 0 ? (
                  <>
                    <div 
                      ref={(el) => carouselRefs.current[section.section_name] = el}
                      className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 pl-128 scroll-smooth"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
                    >
                      {sectionProjects.map((project) => (
                        <Card 
                          key={project.id}
                          className="group flex-none w-96 overflow-hidden bg-card border-border shadow-card hover:shadow-glow transition-all duration-500 snap-start"
                        >
                          <div className="aspect-video bg-muted relative overflow-hidden">
                            <img 
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          
                          <div className="p-6">
                            <div className="mb-3">
                              <span className="text-sm text-primary font-medium">{project.category}</span>
                              <h3 className="text-xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors duration-200">
                                {project.title}
                              </h3>
                            </div>
                            
                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                              {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tech && project.tech.map((tech) => (
                                <span 
                                  key={tech}
                                  className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            
                            {project.statistic_text && project.statistic_link && (
                              <div className="mb-4">
                                <button
                                  onClick={() => window.open(project.statistic_link, '_blank')}
                                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer"
                                >
                                  {project.statistic_text}
                                </button>
                              </div>
                            )}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                              onClick={() => window.open(project.link, '_blank')}
                            >
                              View Project
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                    
                    {/* Carousel Navigation */}
                    <button
                      onClick={() => scrollCarousel(section.section_name, 'left')}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:bg-background transition-all duration-200 shadow-lg"
                      aria-label="Previous projects"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <button
                      onClick={() => scrollCarousel(section.section_name, 'right')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:bg-background transition-all duration-200 shadow-lg"
                      aria-label="Next projects"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No projects in this section</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;

// Add custom CSS for hiding scrollbar
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}