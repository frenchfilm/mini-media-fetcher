
import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Pause, X, CheckCircle2 } from 'lucide-react';
import { VideoFormat } from './VideoFormatSelector';
import { toast } from 'sonner';

interface DownloadProgressProps {
  videoUrl: string;
  selectedFormat: VideoFormat;
  onComplete: () => void;
  onCancel: () => void;
}

const DownloadProgress = ({ videoUrl, selectedFormat, onComplete, onCancel }: DownloadProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'preparing' | 'downloading' | 'paused' | 'complete'>('preparing');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState<number | null>(null);
  const [downloadSpeed, setDownloadSpeed] = useState<string | null>(null);
  const [downloadedSize, setDownloadedSize] = useState(0);
  const totalSize = 128.5; // Mock total size in MB
  
  // Mock video details
  const videoTitle = "Sample Video Title - Amazing Content";
  const videoDuration = "10:42";
  
  // Simulate download progress
  useEffect(() => {
    if (status === 'paused' || status === 'complete') return;
    
    let interval: number;
    
    if (status === 'preparing') {
      // Simulate preparation time (3 seconds)
      interval = window.setTimeout(() => {
        setStatus('downloading');
        toast.info("Download started");
      }, 3000);
    } else {
      // Simulate download progress
      interval = window.setInterval(() => {
        setProgress(prevProgress => {
          const increment = Math.random() * 5 + 1;
          const newProgress = Math.min(prevProgress + increment, 100);
          
          // Update downloaded size
          setDownloadedSize((newProgress / 100) * totalSize);
          
          // Update download speed (simulate between 1-10 MB/s)
          const speed = (Math.random() * 9 + 1).toFixed(1);
          setDownloadSpeed(`${speed} MB/s`);
          
          // Update elapsed time (in seconds)
          setElapsedTime(prev => prev + 1);
          
          // Calculate estimated time left
          const remainingPercentage = 100 - newProgress;
          const timePerPercentage = elapsedTime / newProgress;
          const estimatedSeconds = remainingPercentage * timePerPercentage;
          setEstimatedTimeLeft(Math.round(estimatedSeconds));
          
          // Complete the download when progress reaches 100%
          if (newProgress >= 100) {
            setStatus('complete');
            clearInterval(interval);
            toast.success("Download complete!");
            setTimeout(() => onComplete(), 1500);
          }
          
          return newProgress;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [status, elapsedTime, onComplete]);
  
  const togglePause = () => {
    if (status === 'downloading') {
      setStatus('paused');
      toast.info("Download paused");
    } else if (status === 'paused') {
      setStatus('downloading');
      toast.info("Download resumed");
    }
  };
  
  const handleCancel = () => {
    toast.info("Download canceled");
    onCancel();
  };
  
  // Format time display (convert seconds to mm:ss format)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-primary text-white dark:bg-primary dark:text-secondary-foreground dark:hover:bg-primary/90 dark:border-primary/70"
          onClick={onCancel}
        >
          ← Back
        </Button>
        <h2 className="text-lg font-fraunces text-center">Download Progress</h2>
        <div className="w-[60px]"></div> {/* Empty div for flex spacing */}
      </div>
      
      {/* Compact video details & thumbnail */}
      <Card className="p-4 mb-4 bg-card/80">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="bg-muted rounded-md flex items-center justify-center w-24 h-24 flex-shrink-0">
            <div className="text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.84 6.72 2.28"/>
                <path d="M21 3v9h-9"/>
              </svg>
            </div>
          </div>
          
          {/* Video details in a compact layout */}
          <div className="space-y-2 flex-1 overflow-hidden">
            <h3 className="text-base font-medium truncate">{videoTitle}</h3>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><span className="font-medium">Duration:</span> {videoDuration}</p>
              <p><span className="font-medium">Size:</span> {totalSize.toFixed(1)} MB</p>
              <p><span className="font-medium">Format:</span> {selectedFormat.quality} MP4</p>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Progress section */}
      <Card className="p-4 mb-4 bg-card/80">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Download Progress</span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between text-sm text-muted-foreground">
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
      </Card>
      
      {/* Action buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={togglePause} 
          size="sm"
          className="bg-primary text-white flex-1 dark:bg-primary dark:text-secondary-foreground dark:hover:bg-primary/90 dark:border-primary/70"
        >
          {status === 'paused' ? (
            <>
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Resume
            </>
          ) : (
            <>
              <Pause className="h-3.5 w-3.5 mr-1.5" />
              Pause
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleCancel}
          className="bg-primary text-white flex-1 dark:bg-secondary dark:border-secondary dark:text-primary"
        >
          <X className="h-3.5 w-3.5 mr-1.5" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DownloadProgress;
