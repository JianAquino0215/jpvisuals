import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditableSectionProps {
  title: string;
  description: string;
  onSave: (title: string, description: string) => void;
  isAdmin?: boolean;
}

const EditableSection = ({ title, description, onSave, isAdmin = false }: EditableSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleSave = () => {
    onSave(editTitle, editDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditDescription(description);
    setIsEditing(false);
  };

  if (!isAdmin) {
    return (
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title}</h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>
    );
  }

  return (
    <div className="text-center mb-16">
      {isEditing ? (
        <div className="space-y-4 max-w-2xl mx-auto">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="text-center text-2xl font-bold"
          />
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="text-center"
          />
          <div className="flex gap-2 justify-center">
            <Button onClick={handleSave} size="sm">Save</Button>
            <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">{title}</h2>
            <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm">✏️</Button>
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>
      )}
    </div>
  );
};

export default EditableSection;