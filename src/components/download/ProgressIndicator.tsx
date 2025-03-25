
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  progress: number;
  status: 'preparing' | 'downloading' | 'paused' | 'complete';
  downloadSpeed: string | null;
  downloadedSize: number;
  totalSize: number;
  estimatedTimeLeft: number | null;
}

const ProgressIndicator = ({ 
  progress, 
  status, 
  downloadSpeed, 
  downloadedSize, 
  totalSize,
  estimatedTimeLeft 
}: ProgressIndicatorProps) => {
  
  // Format time display (convert seconds to mm:ss format)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="font-medium">Download Progress</span>
        <span className="font-medium">{progress.toFixed(0)}%</span>
      </div>
      
      <Progress value={progress} className="h-1.5" />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{status === 'preparing' ? 'Preparing...' : 'Downloading...'}</span>
        <span>{downloadedSize.toFixed(1)} MB / {totalSize.toFixed(1)} MB</span>
      </div>
      
      {downloadSpeed && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Speed: {downloadSpeed}</span>
          {estimatedTimeLeft !== null && (
            <span>Time left: {formatTime(estimatedTimeLeft)}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;
