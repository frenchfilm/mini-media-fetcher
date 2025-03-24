
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
    <div className="p-6 w-full max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          className="bg-primary text-white dark:bg-primary dark:text-secondary-foreground dark:hover:bg-primary/90 dark:border-primary/70"
          onClick={onCancel}
        >
          ← Back
        </Button>
        <h2 className="text-xl font-fraunces text-center">Download Progress</h2>
        <div className="w-[80px]"></div> {/* Empty div for flex spacing */}
      </div>
      
      <div className="mb-6 flex">
        <div className="bg-muted w-96 h-48 flex items-center justify-center rounded-md mr-4">
          <div className="text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.84 6.72 2.28"/>
              <path d="M21 3v9h-9"/>
            </svg>
          </div>
        </div>
        
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-medium">{videoTitle}</h3>
          <div className="text-sm">
            <p>Duration: {videoDuration}</p>
            <p>Size: {totalSize.toFixed(1)} MB</p>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">Format:</p>
            <select className="w-full rounded-md bg-secondary/50 border border-secondary px-3 py-2 text-sm">
              <option>{selectedFormat.quality} MP4 ({totalSize.toFixed(1)} MB)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span>Download Progress</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Downloading...</span>
          <span>{downloadedSize.toFixed(1)} MB / {totalSize.toFixed(1)} MB</span>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={togglePause} 
          className="bg-primary text-white flex-1 dark:bg-primary dark:text-secondary-foreground dark:hover:bg-primary/90 dark:border-primary/70"
        >
          {status === 'paused' ? (
            <>
              <Download className="h-4 w-4 mr-2" />
              Resume
            </>
          ) : (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleCancel}
          className="bg-primary text-white flex-1 dark:bg-secondary dark:border-secondary dark:text-primary"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
      
      <div className="softbare-footer">
        <p className="font-medium">Our Apps are bare - as Nature intended them.</p>
        <p>Quiet by design, lightweight, no ads, no tracking, just plain function.</p>
      </div>
    </div>
  );
};

export default DownloadProgress;
