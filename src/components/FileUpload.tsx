import { useState, useCallback } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onTextPaste: () => void;
}

export default function FileUpload({ onFileUpload, onTextPaste }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      onFileUpload(droppedFile);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      onFileUpload(selectedFile);
    }
  }, [onFileUpload]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`upload-area ${isDragging ? 'border-accent bg-accent/10' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
          <Upload className="w-8 h-8 text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Upload Your Legal Document</h3>
        <p className="text-muted-foreground mb-6">
          Upload contracts, agreements, terms of service, or any legal<br />
          document you need help understanding
        </p>

        <div className="flex items-center justify-center gap-4">
          <label htmlFor="file-upload">
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
            />
            <Button variant="default" className="cursor-pointer" asChild>
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Choose File
              </span>
            </Button>
          </label>
          
          <Button variant="outline" onClick={onTextPaste}>
            Paste Text
          </Button>
        </div>

        {file && (
          <div className="mt-4 p-3 bg-secondary rounded-lg flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            <span className="text-sm">{file.name}</span>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <AlertCircle className="w-3 h-3" />
          <span>Your documents are processed securely and privately</span>
        </div>
        
        <p className="mt-2 text-xs text-muted-foreground">
          Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
        </p>
      </div>
    </div>
  );
}