import { Shield, Lock, Database, UserX, Clock, Key } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function Privacy() {
  const privacyFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All documents are encrypted during upload, processing, and storage using industry-standard AES-256 encryption."
    },
    {
      icon: Clock,
      title: "Automatic Data Deletion",
      description: "Your documents and analysis results are automatically deleted from our servers after 24 hours."
    },
    {
      icon: UserX,
      title: "No Human Access",
      description: "Your documents are processed entirely by AI. No human ever sees or has access to your sensitive information."
    },
    {
      icon: Database,
      title: "Secure Cloud Infrastructure",
      description: "Hosted on Google Cloud Platform with enterprise-grade security, compliance certifications, and regular security audits."
    },
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "We comply with GDPR and other data protection regulations, ensuring your rights are protected."
    },
    {
      icon: Key,
      title: "Zero-Knowledge Architecture",
      description: "We cannot access your documents even if we wanted to - they're encrypted with keys only you control."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Your Privacy is Our Priority</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the sensitive nature of legal documents. That's why we've built 
              LegalClarify AI with privacy and security at its core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {privacyFeatures.map((feature, index) => (
              <Card key={index} className="p-6">
                <feature.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Privacy Policy Highlights</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Data Collection</h3>
                <p className="text-sm text-muted-foreground">
                  We only collect the documents you explicitly upload for analysis. We do not collect 
                  personal information beyond what's necessary for the service to function. No tracking 
                  cookies, no advertising, no data selling.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Data Usage</h3>
                <p className="text-sm text-muted-foreground">
                  Your documents are used solely for the purpose of providing you with legal document 
                  analysis. We do not use your data to train our AI models or for any other purpose.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Data Retention</h3>
                <p className="text-sm text-muted-foreground">
                  All uploaded documents and generated analyses are automatically deleted from our 
                  servers after 24 hours. You can also manually delete your data at any time.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Third-Party Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  We never share, sell, or provide access to your documents or analysis results to any 
                  third parties. Your data stays between you and our AI.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Your Rights</h3>
                <p className="text-sm text-muted-foreground">
                  You have the right to access, correct, delete, and export your data at any time. 
                  Contact our privacy team at privacy@legalclarify.ai for any requests or concerns.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}