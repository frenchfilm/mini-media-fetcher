
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
    <Card className="glass-panel rounded-2xl p-6 w-full max-w-xl mx-auto shadow-sm animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium flex items-center">
          {status === 'preparing' && 'Preparing download...'}
          {status === 'downloading' && 'Downloading...'}
          {status === 'paused' && 'Download paused'}
          {status === 'complete' && (
            <>
              <CheckCircle2 className="h-4 w-4 mr-1.5 text-green-500" />
              <span>Download complete</span>
            </>
          )}
        </h3>
        
        {status !== 'complete' && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cancel</span>
          </Button>
        )}
      </div>
      
      <Progress 
        value={progress} 
        className={`h-2 ${status === 'complete' ? 'bg-green-100' : 'bg-muted'}`}
        indicatorClassName={status === 'complete' ? 'bg-green-500' : undefined}
      />
      
      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{progress.toFixed(0)}% complete</span>
          {downloadSpeed && status === 'downloading' && (
            <span>{downloadSpeed}</span>
          )}
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {elapsedTime > 0 && `Elapsed: ${formatTime(elapsedTime)}`}
          </span>
          <span>
            {estimatedTimeLeft && status === 'downloading' && 
              `Remaining: ${formatTime(estimatedTimeLeft)}`}
          </span>
        </div>
        
        <div className="bg-muted/40 rounded-lg p-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Format:</span>
            <span>{selectedFormat.quality} ({selectedFormat.resolution})</span>
          </div>
        </div>
      </div>
      
      {status !== 'complete' && status !== 'preparing' && (
        <div className="mt-5 flex gap-3">
          <Button 
            onClick={togglePause} 
            variant={status === 'paused' ? 'default' : 'outline'}
            className="flex-1"
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
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      )}
    </Card>
  );
};

export default DownloadProgress;
