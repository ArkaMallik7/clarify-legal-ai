import { useState } from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import FeatureCards from "@/components/FeatureCards";
import PrivacyFeatures from "@/components/PrivacyFeatures";
import Footer from "@/components/Footer";
import DocumentAnalysis from "@/components/DocumentAnalysis";
import TextPasteDialog from "@/components/TextPasteDialog";

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState<string>("");
  const [showPasteDialog, setShowPasteDialog] = useState(false);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setPastedText("");
  };

  const handleTextSubmit = (text: string) => {
    setPastedText(text);
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Understand Legal Documents with AI
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform complex legal jargon into clear, actionable insights. Upload any contract, agreement, or legal document and get instant explanations, risk assessments, and personalized guidance.
            </p>
          </div>

          {!uploadedFile && !pastedText ? (
            <>
              <FileUpload 
                onFileUpload={handleFileUpload}
                onTextPaste={() => setShowPasteDialog(true)}
              />
              
              <div className="mt-24">
                <FeatureCards />
              </div>
            </>
          ) : (
            <DocumentAnalysis 
              file={uploadedFile}
              text={pastedText}
            />
          )}
        </div>
      </main>

      {!uploadedFile && !pastedText && <PrivacyFeatures />}
      
      <Footer />
      
      <TextPasteDialog
        open={showPasteDialog}
        onClose={() => setShowPasteDialog(false)}
        onTextSubmit={handleTextSubmit}
      />
    </div>
  );
};

export default Index;
