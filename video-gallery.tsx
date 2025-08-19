import { useState } from "react";
import { Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VideoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const categories = [
    { id: "all", label: "All Videos" },
    { id: "3d-animation", label: "3D Animation" },
    { id: "realistic", label: "Realistic" },
    { id: "cartoon", label: "Cartoon" },
    { id: "motion-graphics", label: "Motion Graphics" }
  ];

  const videos = [
    {
      id: "1",
      title: "Majestic Dragon Flight",
      category: "3d-animation",
      duration: "45 seconds",
      gradient: "from-orange-600 to-red-600",
      processingTime: "2m 34s"
    },
    {
      id: "2",
      title: "Futuristic Cityscape",
      category: "realistic",
      duration: "1 minute 20 seconds",
      gradient: "from-blue-600 to-purple-600",
      processingTime: "3m 12s"
    },
    {
      id: "3",
      title: "Happy Cartoon Adventure",
      category: "cartoon",
      duration: "30 seconds",
      gradient: "from-pink-500 to-yellow-500",
      processingTime: "1m 45s"
    },
    {
      id: "4",
      title: "Serene Forest Morning",
      category: "realistic",
      duration: "2 minutes",
      gradient: "from-green-600 to-blue-500",
      processingTime: "4m 21s"
    },
    {
      id: "5",
      title: "Cosmic Journey",
      category: "3d-animation",
      duration: "3 minutes",
      gradient: "from-purple-800 to-black",
      processingTime: "5m 43s"
    },
    {
      id: "6",
      title: "Epic Football Match",
      category: "realistic",
      duration: "1 minute 45 seconds",
      gradient: "from-red-600 to-orange-500",
      processingTime: "3m 56s"
    }
  ];

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <section id="gallery" className="py-24" data-testid="video-gallery">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-gallery-title">
            Video <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-testid="text-gallery-description">
            Explore videos created by our AI across different categories and styles
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`btn-3d px-6 py-3 rounded-lg font-semibold ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-neon-blue to-neon-purple"
                  : "bg-dark-card hover:bg-gray-600 border border-gray-600"
              }`}
              data-testid={`button-category-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div key={video.id} className="video-preview glass-effect p-4 rounded-2xl" data-testid={`video-card-${video.id}`}>
              <div className={`aspect-video bg-gradient-to-br ${video.gradient} rounded-xl relative overflow-hidden mb-4`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Button size="sm" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur p-0" data-testid={`button-play-${video.id}`}>
                    <Play className="text-sm ml-0.5" />
                  </Button>
                </div>
                <div className="absolute top-4 right-4 bg-neon-blue px-2 py-1 rounded text-xs font-semibold">
                  4K
                </div>
              </div>
              <h4 className="font-semibold mb-2" data-testid={`text-video-title-${video.id}`}>
                {video.title}
              </h4>
              <p className="text-sm text-gray-400 mb-3" data-testid={`text-video-info-${video.id}`}>
                {video.category.replace('-', ' ').split(' ').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')} • {video.duration}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neon-green" data-testid={`text-processing-time-${video.id}`}>
                  Generated in {video.processingTime}
                </span>
                <Button variant="ghost" size="sm" data-testid={`button-download-${video.id}`}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="btn-3d bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-4 rounded-lg font-semibold" data-testid="button-load-more">
            Load More Videos
          </Button>
        </div>
      </div>
    </section>
  );
}
