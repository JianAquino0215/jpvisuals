import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Section {
  id: string;
  section_name: string;
  title: string;
  description: string;
  order_index: number;
}

const AdminSections = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    section_name: "",
    title: "",
    description: ""
  });

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    const { data, error } = await supabase
      .from('portfolio_sections')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Error fetching sections:', error);
    } else {
      setSections(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      const { error } = await supabase
        .from('portfolio_sections')
        .update({
          section_name: formData.section_name,
          title: formData.title,
          description: formData.description
        })
        .eq('id', isEditing);
      
      if (!error) fetchSections();
    } else {
      // Get the next order index for new sections
      const { count } = await supabase
        .from('portfolio_sections')
        .select('*', { count: 'exact', head: true });
      
      const { error } = await supabase
        .from('portfolio_sections')
        .insert({
          section_name: formData.section_name,
          title: formData.title,
          description: formData.description,
          order_index: count || 0
        });
      
      if (!error) fetchSections();
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({ section_name: "", title: "", description: "" });
    setIsEditing(null);
    setIsAdding(false);
  };

  const editSection = (section: Section) => {
    setFormData({
      section_name: section.section_name,
      title: section.title,
      description: section.description
    });
    setIsEditing(section.id);
    setIsAdding(true);
  };

  const deleteSection = async (id: string) => {
    const { error } = await supabase
      .from('portfolio_sections')
      .delete()
      .eq('id', id);
    
    if (!error) fetchSections();
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);

    // Update order in database
    for (let i = 0; i < items.length; i++) {
      await supabase
        .from('portfolio_sections')
        .update({ order_index: i })
        .eq('id', items[i].id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Sections</h2>
        <Button onClick={() => setIsAdding(true)}>Add Section</Button>
      </div>

      {isAdding && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? "Edit Section" : "Add New Section"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Section Name (e.g., featured_work)"
              value={formData.section_name}
              onChange={(e) => setFormData({...formData, section_name: e.target.value})}
              required
            />
            <Input
              placeholder="Section Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <Textarea
              placeholder="Section Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <div className="flex gap-2">
              <Button type="submit">
                {isEditing ? "Update" : "Add"} Section
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Current Sections (Drag to reorder)</h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided) => (
                      <Card 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 cursor-move"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold">{section.title}</h3>
                            <p className="text-sm text-muted-foreground mb-1">{section.section_name}</p>
                            <p className="text-sm">{section.description}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="outline" onClick={() => editSection(section)}>
                              Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteSection(section.id)}>
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
    </div>
  );
};

export default AdminSections;