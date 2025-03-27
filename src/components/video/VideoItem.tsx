
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trash2, FolderOpen, RotateCcw, Copy, Play, Pause, Square } from 'lucide-react';
import { formatTime } from "@/utils/videoUtils";

export type VideoStatus = 'completed' | 'in_progress' | 'paused' | 'aborted';

export interface VideoItemProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  size: string;
  format: string;
  date: string;
  status: VideoStatus;
  progress: number;
  downloadedSize: number;
  totalSize: number;
  timeLeft: number;
  url: string;
  error?: string;
  onRetry: (id: string) => void;
  onCopyUrl: (url: string) => void;
  onDelete: (id: string) => void;
  onPause: (id: string) => void;
  onResume?: (id: string) => void;
  onStop: (id: string) => void;
  onPlay?: (title: string) => void;
  onOpenFolder?: (title: string) => void;
}

const VideoItem = ({
  id,
  title,
  thumbnail,
  duration,
  size,
  format,
  date,
  status,
  progress,
  downloadedSize,
  totalSize,
  timeLeft,
  url,
  error,
  onRetry,
  onCopyUrl,
  onDelete,
  onPause,
  onResume,
  onStop,
  onPlay,
  onOpenFolder
}: VideoItemProps) => {
  return (
    <div 
      className={`rounded-lg border bg-card shadow-sm overflow-hidden 
        ${status === 'aborted' ? 'opacity-75 border-destructive/50' : ''}`}
    >
      <div className="p-3 flex items-center justify-between">
        <div className="flex-shrink-0 mr-3">
          <div 
            className="w-[54px] h-[36px] bg-muted rounded overflow-hidden"
            style={{ backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium truncate">{title}</h4>
          <div className="flex text-xs text-muted-foreground space-x-2">
            <span>{duration}</span>
            <span>•</span>
            <span>{size}</span>
            <span>•</span>
            <span>{format}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
          {status === 'aborted' && (
            <div className="mt-0.5 text-xs text-destructive">
              {error || 'Download failed'}
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 ml-2">
          {status === 'aborted' ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-primary hover:text-primary/80"
                onClick={() => onRetry(id)}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">Retry</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-primary hover:text-primary/80"
                onClick={() => onCopyUrl(url)}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy URL</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive hover:text-destructive/80"
                onClick={() => onDelete(id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </>
          ) : status === 'completed' ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => onPlay && onPlay(title)}
              >
                <Play className="h-4 w-4" />
                <span className="sr-only">Play</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => onDelete(id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => onOpenFolder && onOpenFolder(title)}
              >
                <FolderOpen className="h-4 w-4" />
                <span className="sr-only">Open Folder</span>
              </Button>
            </>
          ) : status === 'in_progress' || status === 'paused' ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => status === 'paused' ? (onResume && onResume(id)) : onPause(id)}
              >
                {status === 'paused' ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
                <span className="sr-only">{status === 'paused' ? 'Resume' : 'Pause'}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => onStop(id)}
              >
                <Square className="h-4 w-4" />
                <span className="sr-only">Stop</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive hover:text-destructive/80"
                onClick={() => onDelete(id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </>
          ) : null}
        </div>
      </div>
      
      {(status === 'in_progress' || status === 'paused') && (
        <div className="p-3 pt-0 border-t">
          <div className="mb-1">
            <Progress value={progress} className="h-1" />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {downloadedSize} MB / {totalSize} MB
            </span>
            <span>
              {status === 'paused' ? 'Paused' : `Time left: ${formatTime(timeLeft)}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoItem;
