
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from 'lucide-react';
import { VideoFormat } from '../components/VideoFormatSelector';
import { toast } from 'sonner';
import VideoDetailsCard from '../components/download/VideoDetailsCard';
import ProgressIndicator from '../components/download/ProgressIndicator';
import DownloadActionButtons from '../components/download/DownloadActionButtons';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const MyVideos = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'preparing' | 'downloading' | 'paused' | 'complete'>('preparing');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState<number | null>(null);
  const [downloadSpeed, setDownloadSpeed] = useState<string | null>(null);
  const [downloadedSize, setDownloadedSize] = useState(0);
  const totalSize = 128.5; // Mock total size in MB
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Mock video details
  const videoTitle = "My Video Collection";
  const videoDuration = "10:42";
  const selectedFormat: VideoFormat = {
    id: 'mp4-1080p',
    quality: 'High',
    resolution: '1080p',
    fileSize: '~120 MB'
  };
  
  // Simulate download progress
  useEffect(() => {
    if (status === 'paused' || status === 'complete') return;
    
    let interval: number;
    
    if (status === 'preparing') {
      // Simulate preparation time (3 seconds)
      interval = window.setTimeout(() => {
        setStatus('downloading');
        toast.info("Loading your videos");
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
            toast.success("All videos loaded!");
          }
          
          return newProgress;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [status, elapsedTime]);
  
  const togglePause = () => {
    if (status === 'downloading') {
      setStatus('paused');
      toast.info("Loading paused");
    } else if (status === 'paused') {
      setStatus('downloading');
      toast.info("Loading resumed");
    }
  };
  
  const handleCancel = () => {
    toast.info("Loading canceled");
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col w-full max-w-xl mx-auto px-1 sm:px-0 bg-background min-h-[600px]">
      <div className="flex justify-between items-center mb-3">
        <Button 
          size="sm"
          className="px-3 py-1 h-8 text-xs font-semibold app-wide-button-high-contrast"
          onClick={() => navigate('/')}
        >
          {isMobile ? "←" : "← Back"}
        </Button>
        <h2 className="text-base font-fraunces text-center">My Videos</h2>
        <div className="w-[60px]"></div> {/* Empty div for flex spacing */}
      </div>
      
      {/* Video details card */}
      <VideoDetailsCard 
        title={videoTitle}
        duration={videoDuration}
        totalSize={totalSize}
        selectedFormat={selectedFormat}
      />
      
      {/* Progress section */}
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
      
      {/* Action buttons */}
      <DownloadActionButtons
        status={status}
        onTogglePause={togglePause}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default MyVideos;
