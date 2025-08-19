import { Mic, Box, Music, Eye, Layers, Clock } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Mic,
      title: "AI Voice Synthesis",
      description: "Advanced text-to-speech with natural human-like voices in multiple languages and accents.",
      features: ["50+ Voice Options", "Emotion Control", "Speed Adjustment"],
      gradient: "from-neon-blue to-neon-green"
    },
    {
      icon: Box,
      title: "3D Animation Engine",
      description: "Create stunning 3D animations with realistic characters, environments, and physics.",
      features: ["Realistic Physics", "Character Animation", "Environment Design"],
      gradient: "from-neon-purple to-neon-pink"
    },
    {
      icon: Music,
      title: "AI Music Generation",
      description: "Automatically generate perfect background music that matches your video's mood and style.",
      features: ["Genre Selection", "Mood Matching", "Sync to Video"],
      gradient: "from-neon-pink to-neon-blue"
    },
    {
      icon: Eye,
      title: "Ultra HD 4K Output",
      description: "Generate videos in stunning 4K resolution with crystal-clear details and vibrant colors.",
      features: ["4K Resolution", "HDR Support", "60fps Option"],
      gradient: "from-neon-green to-neon-blue"
    },
    {
      icon: Layers,
      title: "Multiple Categories",
      description: "Choose from various video styles including realistic, cartoon, 3D animation, and more.",
      features: ["Realistic Videos", "3D Cartoons", "Motion Graphics"],
      gradient: "from-neon-blue to-neon-purple"
    },
    {
      icon: Clock,
      title: "Flexible Duration",
      description: "Create videos from quick 5-second clips to full 50-minute presentations with ease.",
      features: ["5 sec - 50 min", "Custom Length", "Chapter Support"],
      gradient: "from-neon-pink to-neon-green"
    }
  ];

  return (
    <section id="features" className="py-24 bg-dark-secondary" data-testid="features-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-features-title">
            <span className="gradient-text">AI-Powered</span> Video Creation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-testid="text-features-description">
            Experience the future of video creation with our advanced AI technology that brings your imagination to life
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className="glass-effect p-8 rounded-2xl btn-3d group"
                data-testid={`feature-card-${index}`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid={`text-feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-6" data-testid={`text-feature-description-${index}`}>
                  {feature.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {feature.features.map((item, featureIndex) => (
                    <li key={featureIndex} data-testid={`text-feature-item-${index}-${featureIndex}`}>
                      <span className="text-neon-green mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
