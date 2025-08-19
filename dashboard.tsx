import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowLeft, Plus, Play, Download, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Video, User } from "@shared/schema";

export default function Dashboard() {
  const [userId] = useState("demo-user-123"); // In real app, this would come from auth

  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ["/api/users", userId, "videos"],
  });

  const { data: user } = useQuery<User>({
    queryKey: ["/api/users", userId],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "processing": return "bg-yellow-500";
      case "failed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.replace('-', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white p-6" data-testid="dashboard">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back-home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold gradient-text" data-testid="text-dashboard-title">Dashboard</h1>
        </div>
        <Button className="bg-gradient-to-r from-neon-blue to-neon-purple" data-testid="button-create-video">
          <Plus className="mr-2 h-4 w-4" />
          Create New Video
        </Button>
      </div>

      {/* User Stats */}
      {user && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-dark-card border-gray-700" data-testid="card-subscription">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-green">
                {user.subscriptionStatus === "active" ? "Active" : "Free"}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-card border-gray-700" data-testid="card-videos-created">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Videos Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{videos.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-card border-gray-700" data-testid="card-processing">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {videos.filter(v => v.status === "processing").length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-card border-gray-700" data-testid="card-completed">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {videos.filter(v => v.status === "completed").length}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Video Library */}
      <Card className="bg-dark-card border-gray-700" data-testid="card-video-library">
        <CardHeader>
          <CardTitle className="text-xl">Your Video Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="bg-dark-secondary">
              <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
              <TabsTrigger value="processing" data-testid="tab-processing">Processing</TabsTrigger>
              <TabsTrigger value="completed" data-testid="tab-completed">Completed</TabsTrigger>
              <TabsTrigger value="failed" data-testid="tab-failed">Failed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8 text-gray-400" data-testid="loading-videos">
                  Loading your videos...
                </div>
              ) : videos.length === 0 ? (
                <div className="text-center py-8 text-gray-400" data-testid="empty-state">
                  <p className="mb-4">No videos yet. Create your first AI video!</p>
                  <Button className="bg-gradient-to-r from-neon-blue to-neon-purple" data-testid="button-create-first-video">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Video
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <Card key={video.id} className="bg-dark-secondary border-gray-600" data-testid={`video-card-${video.id}`}>
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 relative overflow-hidden">
                          {video.thumbnailUrl && video.thumbnailUrl !== null ? (
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Play className="text-4xl text-gray-500" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <Badge className={`${getStatusColor(video.status || "processing")} text-white text-xs`}>
                              {video.status || "processing"}
                            </Badge>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold mb-2 truncate" data-testid={`text-video-title-${video.id}`}>
                          {video.title}
                        </h3>
                        
                        <div className="text-sm text-gray-400 mb-3">
                          <p data-testid={`text-video-category-${video.id}`}>
                            {getCategoryLabel(video.category)} • {video.quality?.toUpperCase()}
                          </p>
                          <p data-testid={`text-video-duration-${video.id}`}>
                            {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" disabled={video.status !== "completed"} data-testid={`button-play-${video.id}`}>
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" disabled={video.status !== "completed"} data-testid={`button-download-${video.id}`}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" disabled={video.status !== "completed"} data-testid={`button-share-${video.id}`}>
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" data-testid={`button-delete-${video.id}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Other tab contents would be similar but filtered */}
            <TabsContent value="processing">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.filter(v => v.status === "processing").map((video) => (
                  <Card key={video.id} className="bg-dark-secondary border-gray-600" data-testid={`processing-video-${video.id}`}>
                    {/* Similar content but for processing videos */}
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                          <p className="text-sm text-yellow-500">Processing...</p>
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2 truncate">{video.title}</h3>
                      <p className="text-sm text-gray-400">{getCategoryLabel(video.category)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.filter(v => v.status === "completed").map((video) => (
                  <Card key={video.id} className="bg-dark-secondary border-gray-600" data-testid={`completed-video-${video.id}`}>
                    {/* Similar content but for completed videos */}
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg mb-4 flex items-center justify-center">
                        <Play className="text-4xl text-green-500" />
                      </div>
                      <h3 className="font-semibold mb-2 truncate">{video.title}</h3>
                      <p className="text-sm text-gray-400">{getCategoryLabel(video.category)}</p>
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" className="flex-1 bg-neon-blue">
                          <Play className="h-4 w-4 mr-1" />
                          Play
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="failed">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.filter(v => v.status === "failed").map((video) => (
                  <Card key={video.id} className="bg-dark-secondary border-gray-600" data-testid={`failed-video-${video.id}`}>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-red-500 text-4xl mb-2">⚠</div>
                          <p className="text-sm text-red-500">Failed</p>
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2 truncate">{video.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{getCategoryLabel(video.category)}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Retry Generation
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
