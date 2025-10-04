import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import AdminSections from "./AdminSections";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  section_name: string;
  order_index: number;
  statistic_text?: string;
  statistic_link?: string;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    tech: "",
    image: "",
    link: "",
    section_name: "",
    statistic_text: "",
    statistic_link: ""
  });
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
    fetchSections();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
  };

  const fetchSections = async () => {
    const { data, error } = await supabase
      .from('portfolio_sections')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Error fetching sections:', error);
      setSections([]);
    } else {
      setSections(data || []);
      if (data && data.length > 0 && !formData.section_name) {
        setFormData(prev => ({ ...prev, section_name: data[0].section_name }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = formData.tech.split(",").map(t => t.trim());
    
    if (isEditing) {
      const { error } = await supabase
        .from('projects')
        .update({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          tech: techArray,
          image: formData.image,
          link: formData.link,
          section_name: formData.section_name,
          statistic_text: formData.statistic_text || null,
          statistic_link: formData.statistic_link || null
        })
        .eq('id', isEditing);
      
      if (error) {
        console.error('Error updating project:', error);
      } else {
        fetchProjects();
      }
    } else {
      // Get the next order index for new projects
      const { count } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });
      
      const { error } = await supabase
        .from('projects')
        .insert({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          tech: techArray,
          image: formData.image,
          link: formData.link,
          section_name: formData.section_name,
          order_index: count || 0,
          statistic_text: formData.statistic_text || null,
          statistic_link: formData.statistic_link || null
        });
      
      if (error) {
        console.error('Error creating project:', error);
      } else {
        fetchProjects();
      }
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      tech: "",
      image: "",
      link: "",
      section_name: sections.length > 0 ? sections[0].section_name : "",
      statistic_text: "",
      statistic_link: ""
    });
    setIsEditing(null);
  };

  const editProject = (project: Project) => {
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      tech: project.tech.join(", "),
      image: project.image,
      link: project.link,
      section_name: project.section_name,
      statistic_text: project.statistic_text || "",
      statistic_link: project.statistic_link || ""
    });
    setIsEditing(project.id);
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting project:', error);
    } else {
      fetchProjects();
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProjects(items);

    // Update order in database
    for (let i = 0; i < items.length; i++) {
      await supabase
        .from('projects')
        .update({ order_index: i })
        .eq('id', items[i].id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-6">
      
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Project" : "Add New Project"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <Input
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          />
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          <Input
            placeholder="Technologies (comma separated)"
            value={formData.tech}
            onChange={(e) => setFormData({...formData, tech: e.target.value})}
            required
          />
          <Input
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            required
          />
          <Input
            placeholder="Project Link"
            value={formData.link}
            onChange={(e) => setFormData({...formData, link: e.target.value})}
            required
          />
          <select
            value={formData.section_name}
            onChange={(e) => setFormData({...formData, section_name: e.target.value})}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            required
          >
            <option value="">Select a section</option>
            {sections.map((section) => (
              <option key={section.id} value={section.section_name}>
                {section.title}
              </option>
            ))}
          </select>
          <Input
            placeholder="Statistic Text (e.g., Generated 19k views)"
            value={formData.statistic_text}
            onChange={(e) => setFormData({...formData, statistic_text: e.target.value})}
          />
          <Input
            placeholder="Statistic Link (optional)"
            value={formData.statistic_link}
            onChange={(e) => setFormData({...formData, statistic_link: e.target.value})}
          />
          <div className="flex gap-2">
            <Button type="submit">
              {isEditing ? "Update" : "Add"} Project
            </Button>
            {isEditing && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Current Projects (Drag to reorder)</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="projects">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {projects.map((project, index) => (
                  <Draggable key={project.id} draggableId={project.id} index={index}>
                    {(provided) => (
                      <Card 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 cursor-move"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">{project.category}</p>
                            <p className="text-sm mt-1">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.tech.map((tech) => (
                                <span key={tech} className="text-xs px-2 py-1 bg-secondary rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            {project.statistic_text && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {project.statistic_text}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="outline" onClick={() => editProject(project)}>
                              Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteProject(project.id)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
        </TabsContent>
        
        <TabsContent value="sections">
          <AdminSections />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProjects;