import { FileText, AlertTriangle, MessageSquare } from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      icon: FileText,
      title: "Smart Summaries",
      description: "Get concise, plain-English summaries of complex legal documents",
      color: "text-primary"
    },
    {
      icon: AlertTriangle,
      title: "Risk Analysis",
      description: "Identify potentially problematic clauses and understand their implications",
      color: "text-warning"
    },
    {
      icon: MessageSquare,
      title: "Interactive Q&A",
      description: "Ask specific questions about any part of your document",
      color: "text-accent"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <div key={index} className="feature-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 ${feature.color}`}>
            <feature.icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}