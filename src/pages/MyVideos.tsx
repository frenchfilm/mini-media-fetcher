
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AppLayout from '@/components/AppLayout';
import DialogManager from '@/components/DialogManager';
import { Play, Trash2, FolderOpen } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useState } from 'react';

// Sample data for demonstration
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
    timeLeft: 0
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
    timeLeft: 120
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
    timeLeft: 450
  }
];

const MyVideos = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [videos] = useState(sampleVideos);

  // Format time display (convert seconds to mm:ss format)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
              <div className="w-[60px]"></div> {/* Empty div for flex spacing */}
            </div>
            
            {videos.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">No videos available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {videos.map((video) => (
                  <div key={video.id} className="rounded-lg border bg-card shadow-sm overflow-hidden">
                    {/* 1st section: Video summary */}
                    <div className="p-3 flex items-center justify-between">
                      {/* Left column: Thumbnail */}
                      <div className="flex-shrink-0 mr-3">
                        <div 
                          className="w-[54px] h-[36px] bg-muted rounded overflow-hidden"
                          style={{ backgroundImage: `url(${video.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        ></div>
                      </div>
                      
                      {/* Middle column: Title and details */}
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
                      </div>
                      
                      {/* Right column: Action icons */}
                      <div className="flex space-x-2 ml-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <Play className="h-4 w-4" />
                          <span className="sr-only">Play</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <FolderOpen className="h-4 w-4" />
                          <span className="sr-only">Open Folder</span>
                        </Button>
                      </div>
                    </div>
                    
                    {/* 2nd section: Download progress (only for in-progress downloads) */}
                    {video.status === 'in_progress' && (
                      <div className="p-3 pt-0 border-t">
                        {/* Progress bar */}
                        <div className="mb-1">
                          <Progress value={video.progress} className="h-1" />
                        </div>
                        
                        {/* Download details */}
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
