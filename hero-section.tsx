import { useState } from "react";
import { Infinity, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VideoGenerator from "@/components/video-generator";
import ThreeDElements from "@/components/3d-elements";

export default function HeroSection() {
  const [videoPrompt, setVideoPrompt] = useState("");
  const [quality, setQuality] = useState("4k");
  const [duration, setDuration] = useState("30");
  const [category, setCategory] = useState("3d-animation");

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20" data-testid="hero-section">
      <ThreeDElements />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-slideUp">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight" data-testid="text-hero-title">
            Create <span className="gradient-text">4K Videos</span> from Text with AI
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed" data-testid="text-hero-description">
            Transform your ideas into stunning 4K videos with our advanced AI. From 3D animations to realistic scenes, create unlimited videos with voice synthesis and background music.
          </p>
          
          {/* Text Input Demo */}
          <div className="glass-effect p-6 rounded-2xl space-y-4">
            <label className="block text-sm font-medium text-gray-300" data-testid="label-video-description">
              Enter your video description:
            </label>
            <Textarea
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
              className="w-full bg-dark-card border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none resize-none"
              rows={3}
              placeholder="A majestic dragon flying over a futuristic cityscape at sunset, with realistic fire breathing and detailed scales..."
              data-testid="input-video-prompt"
            />
            
            <div className="flex flex-wrap gap-4">
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="bg-dark-card border border-gray-600 text-white focus:border-neon-blue" data-testid="select-quality">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-card border border-gray-600">
                  <SelectItem value="4k">4K Quality</SelectItem>
                  <SelectItem value="hd">HD Quality</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="bg-dark-card border border-gray-600 text-white focus:border-neon-blue" data-testid="select-duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-card border border-gray-600">
                  <SelectItem value="5">5 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                  <SelectItem value="600">10 minutes</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-dark-card border border-gray-600 text-white focus:border-neon-blue" data-testid="select-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-card border border-gray-600">
                  <SelectItem value="3d-animation">3D Animation</SelectItem>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                  <SelectItem value="motion-graphics">Motion Graphics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="btn-3d w-full bg-gradient-to-r from-neon-blue to-neon-purple py-4 rounded-lg font-semibold text-lg animate-glow"
              data-testid="button-generate-video"
            >
              <Sparkles className="mr-2" />
              Generate 4K Video
            </Button>
          </div>
          
          {/* Pricing Highlight */}
          <div className="flex items-center space-x-4 text-neon-green" data-testid="pricing-highlight">
            <Infinity className="text-2xl" />
            <span className="text-lg font-semibold">Unlimited Videos • ₹149/month</span>
          </div>
        </div>
        
        <VideoGenerator 
          prompt={videoPrompt}
          quality={quality}
          duration={parseInt(duration)}
          category={category}
        />
      </div>
    </section>
  );
}
