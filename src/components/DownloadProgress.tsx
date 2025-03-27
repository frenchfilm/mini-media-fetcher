import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from 'lucide-react';
import { VideoFormat } from './VideoFormatSelector';
import { toast } from 'sonner';
import VideoDetailsCard from './download/VideoDetailsCard';
import ProgressIndicator from './download/ProgressIndicator';
import DownloadActionButtons from './download/DownloadActionButtons';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.focus();
      }
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock video details
  const videoTitle = "Sample Video Title - Amazing Content";
  const videoDuration = "10:42";
  
  useEffect(() => {
    if (status === 'paused' || status === 'complete') return;
    
    let interval: number;
    
    if (status === 'preparing') {
      interval = window.setTimeout(() => {
        setStatus('downloading');
        toast.info("Download started");
      }, 3000);
    } else {
      interval = window.setInterval(() => {
        setProgress(prevProgress => {
          const increment = Math.random() * 5 + 1;
          const newProgress = Math.min(prevProgress + increment, 100);
          
          setDownloadedSize((newProgress / 100) * totalSize);
          
          const speed = (Math.random() * 9 + 1).toFixed(1);
          setDownloadSpeed(`${speed} MB/s`);
          
          setElapsedTime(prev => prev + 1);
          
          const remainingPercentage = 100 - newProgress;
          const timePerPercentage = elapsedTime / newProgress;
          const estimatedSeconds = remainingPercentage * timePerPercentage;
          setEstimatedTimeLeft(Math.round(estimatedSeconds));
          
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

  return (
    <div 
      className="w-full max-w-xl mx-auto px-1 sm:px-0"
      ref={containerRef}
      tabIndex={-1}
    >
      <div className="flex justify-between items-center mb-3">
        <Button 
          size="sm"
          className="px-3 py-1 h-8 text-xs font-semibold app-wide-button-high-contrast"
          onClick={onCancel}
          autoFocus={false}
        >
          {isMobile ? "←" : "← Back"}
        </Button>
        <h2 className="text-base font-fraunces text-center">Download Progress</h2>
        <div className="w-[60px]"></div>
      </div>
      
      <VideoDetailsCard 
        title={videoTitle}
        duration={videoDuration}
        totalSize={totalSize}
        selectedFormat={selectedFormat}
      />
      
      <Card className="p-3 mb-3 bg-card/80">
        <ProgressIndicator 
          progress={progress}
          status={status}
          downloadSpeed={downloadSpeed}
          downloadedSize={downloadedSize}
          totalSize={totalSize}
          estimatedTimeLeft={estimatedTimeLeft}
        />
      </Card>
      
      <DownloadActionButtons
        status={status}
        onTogglePause={togglePause}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default DownloadProgress;
