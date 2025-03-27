import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AppLayout from '@/components/AppLayout';
import DialogManager from '@/components/DialogManager';
import { Trash2, FolderOpen, RotateCcw, Copy, Play, Pause, Square } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useState } from 'react';
import { toast } from "sonner";

const sampleVideos = [
  {
    id: '1',
    title: 'React Hooks Tutorial for Beginners',
    thumbnail: 'https://i.ytimg.com/vi/dpw9EHDh2bM/default.jpg',
    duration: '15:32',
    size: '128 MB',
    format: 'MP4 720p',
    date: '2023-06-12',
    status: 'completed',
    progress: 100,
    downloadedSize: 128,
    totalSize: 128,
    timeLeft: 0,
    url: 'https://www.youtube.com/watch?v=dpw9EHDh2bM'
  },
  {
    id: '2',
    title: 'How to Build a Modern Website with Next.js',
    thumbnail: 'https://i.ytimg.com/vi/mTz0GXj8NN0/default.jpg',
    duration: '28:44',
    size: '256 MB',
    format: 'MP4 1080p',
    date: '2023-06-15',
    status: 'in_progress',
    progress: 65,
    downloadedSize: 166.4,
    totalSize: 256,
    timeLeft: 120,
    url: 'https://www.youtube.com/watch?v=mTz0GXj8NN0'
  },
  {
    id: '3',
    title: 'TypeScript for JavaScript Developers',
    thumbnail: 'https://i.ytimg.com/vi/BwuLxPH8IDs/default.jpg',
    duration: '42:18',
    size: '320 MB',
    format: 'MP4 1080p',
    date: '2023-06-18',
    status: 'in_progress',
    progress: 25,
    downloadedSize: 80,
    totalSize: 320,
    timeLeft: 450,
    url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs'
  },
  {
    id: '4',
    title: 'Failed Download: React State Management',
    thumbnail: 'https://i.ytimg.com/vi/4pO-HcG2igk/default.jpg',
    duration: '33:21',
    size: '280 MB',
    format: 'MP4 1080p',
    date: '2023-06-20',
    status: 'aborted',
    progress: 45,
    downloadedSize: 126,
    totalSize: 280,
    timeLeft: 0,
    error: 'Network connection lost',
    url: 'https://www.youtube.com/watch?v=4pO-HcG2igk'
  }
];

const MyVideos = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [videos, setVideos] = useState(sampleVideos);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleRetry = (videoId: string) => {
    toast.success("Retrying download...");
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId ? { ...video, status: 'in_progress', progress: 0, timeLeft: 500 } : video
      )
    );
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("URL copied to clipboard");
    }).catch(() => {
      toast.error("Failed to copy URL");
    });
  };

  const handleDelete = (videoId: string) => {
    if (confirm("Are you sure you want to delete this download?")) {
      setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
      toast.success("Download removed");
    }
  };

  const handlePause = (videoId: string) => {
    toast.info("Download paused");
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId ? { ...video, status: 'paused', timeLeft: video.timeLeft } : video
      )
    );
  };

  const handleStop = (videoId: string) => {
    toast.info("Download stopped");
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId ? { 
          ...video, 
          status: 'aborted', 
          error: 'Download stopped by user',
          timeLeft: 0 
        } : video
      )
    );
  };

  return (
    <DialogManager>
      {({ openNewsletter, openContact, openSettings }) => (
        <AppLayout
          onOpenNewsletter={openNewsletter}
          onOpenContact={openContact}
        >
          <div className="flex-1 flex flex-col w-full max-w-xl mx-auto px-1 sm:px-0">
            <div className="flex justify-between items-center mb-3">
              <Button 
                size="sm"
                className="px-3 py-1 h-8 text-xs font-semibold app-wide-button-high-contrast"
                onClick={() => navigate('/')}
              >
                {isMobile ? "←" : "← Back"}
              </Button>
              <h2 className="text-base font-fraunces text-center">Download History</h2>
              <div className="w-[60px]"></div>
            </div>
            
            {videos.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">No videos available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {videos.map((video) => (
                  <div 
                    key={video.id} 
                    className={`rounded-lg border bg-card shadow-sm overflow-hidden 
                      ${video.status === 'aborted' ? 'opacity-75 border-destructive/50' : ''}`}
                  >
                    <div className="p-3 flex items-center justify-between">
                      <div className="flex-shrink-0 mr-3">
                        <div 
                          className="w-[54px] h-[36px] bg-muted rounded overflow-hidden"
                          style={{ backgroundImage: `url(${video.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        ></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{video.title}</h4>
                        <div className="flex text-xs text-muted-foreground space-x-2">
                          <span>{video.duration}</span>
                          <span>•</span>
                          <span>{video.size}</span>
                          <span>•</span>
                          <span>{video.format}</span>
                          <span>•</span>
                          <span>{video.date}</span>
                        </div>
                        {video.status === 'aborted' && (
                          <div className="mt-0.5 text-xs text-destructive">
                            {video.error || 'Download failed'}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 ml-2">
                        {video.status === 'aborted' ? (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-primary hover:text-primary/80"
                              onClick={() => handleRetry(video.id)}
                            >
                              <RotateCcw className="h-4 w-4" />
                              <span className="sr-only">Retry</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-primary hover:text-primary/80"
                              onClick={() => handleCopyUrl(video.url)}
                            >
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Copy URL</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive hover:text-destructive/80"
                              onClick={() => handleDelete(video.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </>
                        ) : video.status === 'completed' ? (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => toast.info(`Playing ${video.title}`)}
                            >
                              <Play className="h-4 w-4" />
                              <span className="sr-only">Play</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => handleDelete(video.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => toast.info(`Opening folder for ${video.title}`)}
                            >
                              <FolderOpen className="h-4 w-4" />
                              <span className="sr-only">Open Folder</span>
                            </Button>
                          </>
                        ) : video.status === 'in_progress' ? (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => handlePause(video.id)}
                            >
                              <Pause className="h-4 w-4" />
                              <span className="sr-only">Pause</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => handleStop(video.id)}
                            >
                              <Square className="h-4 w-4" />
                              <span className="sr-only">Stop</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive hover:text-destructive/80"
                              onClick={() => handleDelete(video.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </>
                        ) : null}
                      </div>
                    </div>
                    
                    {video.status === 'in_progress' && (
                      <div className="p-3 pt-0 border-t">
                        <div className="mb-1">
                          <Progress value={video.progress} className="h-1" />
                        </div>
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {video.downloadedSize} MB / {video.totalSize} MB
                          </span>
                          <span>
                            Time left: {formatTime(video.timeLeft)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </AppLayout>
      )}
    </DialogManager>
  );
};

export default MyVideos;
