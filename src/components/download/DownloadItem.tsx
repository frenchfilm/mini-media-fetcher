
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Trash2, FolderOpen, RotateCcw, Copy, Play, Pause, Square } from 'lucide-react';

export interface VideoDownload {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  size: string;
  format: string;
  date: string;
  status: 'completed' | 'in_progress' | 'paused' | 'aborted';
  progress: number;
  downloadedSize: number;
  totalSize: number;
  timeLeft: number;
  url: string;
  error?: string;
}

interface DownloadItemProps {
  video: VideoDownload;
  onRetry: (id: string) => void;
  onCopyUrl: (url: string) => void;
  onDelete: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onStop: (id: string) => void;
}

const DownloadItem = ({
  video,
  onRetry,
  onCopyUrl,
  onDelete,
  onPause,
  onResume,
  onStop
}: DownloadItemProps) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
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
                onClick={() => onRetry(video.id)}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">Retry</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-primary hover:text-primary/80"
                onClick={() => onCopyUrl(video.url)}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy URL</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive hover:text-destructive/80"
                onClick={() => onDelete(video.id)}
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
                onClick={() => onDelete(video.id)}
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
          ) : video.status === 'in_progress' || video.status === 'paused' ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => video.status === 'paused' ? onResume(video.id) : onPause(video.id)}
              >
                {video.status === 'paused' ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
                <span className="sr-only">{video.status === 'paused' ? 'Resume' : 'Pause'}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => onStop(video.id)}
              >
                <Square className="h-4 w-4" />
                <span className="sr-only">Stop</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive hover:text-destructive/80"
                onClick={() => onDelete(video.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </>
          ) : null}
        </div>
      </div>
      
      {(video.status === 'in_progress' || video.status === 'paused') && (
        <div className="p-3 pt-0 border-t">
          <div className="mb-1">
            <Progress value={video.progress} className="h-1" />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {video.downloadedSize} MB / {video.totalSize} MB
            </span>
            <span>
              {video.status === 'paused' ? 'Paused' : `Time left: ${formatTime(video.timeLeft)}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadItem;
