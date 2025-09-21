import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Bot, Key } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { vertexAI } from "@/services/vertexAI";

interface AIConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onConfigured: () => void;
}

export default function AIConfigDialog({ open, onClose, onConfigured }: AIConfigDialogProps) {
  const [apiKey, setApiKey] = useState("");
  const [projectId, setProjectId] = useState("your-project-id");
  const [location, setLocation] = useState("us-central1");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Google AI API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Configure the Vertex AI service
      vertexAI.configure({
        apiKey,
        projectId,
        location,
        model: 'gemini-1.5-flash'
      });

      // Test the connection
      await vertexAI.generateResponse("Test connection");
      
      toast({
        title: "AI Connected",
        description: "Successfully connected to Google AI services",
      });
      
      // Store in localStorage for persistence (in production, use secure storage)
      localStorage.setItem('ai_config', JSON.stringify({ apiKey, projectId, location }));
      
      onConfigured();
      onClose();
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to AI services. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Configure AI Integration
          </DialogTitle>
          <DialogDescription>
            Connect to Google AI services for real document analysis
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Google AI API Key</Label>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="api-key"
                type="password"
                placeholder="AIza..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from{" "}
              <a 
                href="https://makersuite.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-id">Project ID (Optional)</Label>
            <Input
              id="project-id"
              placeholder="your-project-id"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input
              id="location"
              placeholder="us-central1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="rounded-lg bg-accent/10 border border-accent/20 p-3">
            <div className="flex gap-2">
              <AlertCircle className="w-4 h-4 text-accent mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-accent">Important</p>
                <p className="text-muted-foreground mt-1">
                  For production use, implement proper backend authentication. 
                  This demo stores the API key locally for testing purposes only.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect AI"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}