import { useState, useEffect } from "react";
import { Play, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface VideoGeneratorProps {
  prompt: string;
  quality: string;
  duration: number;
  category: string;
}

export default function VideoGenerator({ prompt, quality, duration, category }: VideoGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            setGeneratedVideo(`/api/videos/generated-${Date.now()}.mp4`);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    setGeneratedVideo(null);
  };

  return (
    <div className="space-y-6" data-testid="video-generator">
      <div className="video-preview bg-dark-card p-4 rounded-2xl">
        {/* Video Preview Area */}
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
          {!isGenerating && !generatedVideo && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                <Play className="text-2xl ml-1" />
              </div>
              <div>
                <p className="text-lg font-semibold" data-testid="text-ready-state">Ready to Generate</p>
                <p className="text-sm text-gray-400" data-testid="text-ready-description">Enter your prompt and click generate</p>
              </div>
            </div>
          )}
          
          {isGenerating && (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20"></div>
              <div className="relative z-10 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center animate-spin">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <p className="text-lg font-semibold" data-testid="text-processing">AI Processing...</p>
                  <p className="text-sm text-gray-400" data-testid="text-processing-description">Generating 4K video from text</p>
                </div>
                <div className="w-48 mx-auto">
                  <Progress value={progress} className="h-2" data-testid="progress-generation" />
                  <p className="text-xs text-gray-400 mt-2" data-testid="text-progress">{Math.round(progress)}% Complete</p>
                </div>
              </div>
            </>
          )}
          
          {generatedVideo && (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <Button size="sm" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur p-0">
                  <Play className="text-sm ml-0.5" />
                </Button>
              </div>
              <div className="absolute top-4 right-4 bg-neon-blue px-2 py-1 rounded text-xs font-semibold">
                {quality.toUpperCase()}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white font-semibold" data-testid="text-generated-video">Generated Video</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Video Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <Button 
              size="sm" 
              className="w-10 h-10 bg-neon-blue rounded-full flex items-center justify-center btn-3d p-0"
              disabled={!generatedVideo}
              data-testid="button-play"
            >
              <Play className="ml-0.5" />
            </Button>
            <span className="text-sm text-gray-400" data-testid="text-duration">
              00:00 / {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              disabled={!generatedVideo}
              data-testid="button-download"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              disabled={!generatedVideo}
              data-testid="button-share"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-effect p-4 rounded-xl text-center" data-testid="stat-quality">
          <div className="text-2xl font-bold gradient-text">{quality.toUpperCase()}</div>
          <div className="text-xs text-gray-400">Quality</div>
        </div>
        <div className="glass-effect p-4 rounded-xl text-center" data-testid="stat-duration">
          <div className="text-2xl font-bold gradient-text">{duration > 60 ? `${Math.floor(duration/60)}m` : `${duration}s`}</div>
          <div className="text-xs text-gray-400">Duration</div>
        </div>
        <div className="glass-effect p-4 rounded-xl text-center" data-testid="stat-unlimited">
          <div className="text-2xl font-bold gradient-text">∞</div>
          <div className="text-xs text-gray-400">Videos</div>
        </div>
      </div>
    </div>
  );
}
