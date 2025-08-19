import { Edit, ServerCog, Music, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Edit,
      title: "Write Your Script",
      description: "Simply describe your video idea in natural language. Our AI understands context and creativity.",
      gradient: "from-neon-blue to-neon-purple"
    },
    {
      icon: ServerCog,
      title: "AI Processing",
      description: "Our advanced AI analyzes your text and generates stunning visuals, characters, and scenes.",
      gradient: "from-neon-purple to-neon-pink"
    },
    {
      icon: Music,
      title: "Add Voice & Music",
      description: "Choose from 50+ AI voices and let our system generate perfect background music automatically.",
      gradient: "from-neon-pink to-neon-green"
    },
    {
      icon: Download,
      title: "Download & Share",
      description: "Get your 4K video ready for download in minutes. Share on social media or use commercially.",
      gradient: "from-neon-green to-neon-blue"
    }
  ];

  return (
    <section className="py-24" data-testid="how-it-works-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-how-it-works-title">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-testid="text-how-it-works-description">
            Create professional-quality videos in just a few simple steps
          </p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center group" data-testid={`step-${index}`}>
                <div className="relative mb-8">
                  <div className={`w-24 h-24 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto btn-3d group-hover:scale-110 transition-transform`}>
                    <IconComponent className="text-3xl" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-neon-green rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid={`text-step-title-${index}`}>
                  {step.title}
                </h3>
                <p className="text-gray-300" data-testid={`text-step-description-${index}`}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Process Animation */}
        <div className="glass-effect p-8 rounded-2xl" data-testid="process-animation">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
              <span className="text-sm" data-testid="text-processing-status">AI is processing your video...</span>
            </div>
            <span className="text-sm text-gray-400" data-testid="text-estimated-time">Estimated time: 3m 24s</span>
          </div>
          <Progress value={65} className="h-2" data-testid="progress-processing" />
        </div>
      </div>
    </section>
  );
}
