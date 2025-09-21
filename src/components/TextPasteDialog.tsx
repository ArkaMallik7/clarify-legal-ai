import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface TextPasteDialogProps {
  open: boolean;
  onClose: () => void;
  onTextSubmit: (text: string) => void;
}

export default function TextPasteDialog({ open, onClose, onTextSubmit }: TextPasteDialogProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) {
      toast({
        title: "No text entered",
        description: "Please paste or type your legal document text",
        variant: "destructive",
      });
      return;
    }

    if (text.length < 100) {
      toast({
        title: "Text too short",
        description: "Please provide more substantial legal text for analysis",
        variant: "destructive",
      });
      return;
    }

    onTextSubmit(text);
    setText("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Paste Legal Document Text</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Paste your legal document text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {text.length} characters
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Analyze Text
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}