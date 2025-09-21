import { Lock, Clock, UserX } from "lucide-react";

export default function PrivacyFeatures() {
  const features = [
    {
      icon: Lock,
      title: "End-to-end encryption",
      color: "text-warning"
    },
    {
      icon: Clock,
      title: "Auto-delete after 24hrs",
      color: "text-primary"
    },
    {
      icon: UserX,
      title: "No human access",
      color: "text-warning"
    }
  ];

  return (
    <div className="py-16 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">Your Privacy Matters</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <feature.icon className={`w-5 h-5 ${feature.color}`} />
              <span className="text-sm">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}