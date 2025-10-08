import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollFloat from "./ScrollFloat";
import { supabase } from "@/lib/supabase";

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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;