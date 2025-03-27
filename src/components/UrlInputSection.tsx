import { useState } from 'react';
import { toast } from 'sonner';
import { getVideoDetails, isDesktopEnvironment } from '@/utils/videoUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import VideoUrlInput from "@/components/VideoUrlInput";
import { VideoFormat } from '@/components/VideoFormatSelector';
import { useNavigate } from 'react-router-dom';
import FocusableInput from './FocusableInput';

interface UrlInputSectionProps {
  onUrlSubmit: (url: string, videoInfo: any) => void;
  onOpenNewsletter: () => void;
  onPresetChange?: (preset: { format: VideoFormat | null, quality: string | null }) => void;
}

const UrlInputSection = ({ onUrlSubmit, onOpenNewsletter, onPresetChange }: UrlInputSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    
    try {
      const videoDetails = await getVideoDetails(url);
      
      if (videoDetails) {
        onUrlSubmit(url, videoDetails);
      } else {
        toast.error("Could not retrieve video details. Please check the URL.");
      }
    } catch (error) {
      console.error("Error processing video URL:", error);
      toast.error("Failed to process the video URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFolderSelect = () => {
    if (!isDesktopEnvironment()) {
      toast.info("Folder selection is only available in desktop environments.");
      return;
    }
    
    toast.info("This would open a folder selection dialog in a desktop environment");
    console.log("Opening folder selection dialog (simulation)");
  };

  const handleCameraSelect = () => {
    navigate('/my-videos');
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-1 sm:px-0 pt-[15%]">
      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-2xl font-fraunces mb-2">
          Download Videos with Ease
        </h1>
        <p className="text-xs sm:text-sm mb-1">
          Simply paste a video URL from any platform to get started.
        </p>
        <p className="text-[10px] text-muted-foreground max-w-[280px] sm:max-w-md mx-auto italic">
          This tool is for personal use only. Downloading copyrighted content may violate platform rules and local laws. Use responsibly.
        </p>
      </div>
      
      <VideoUrlInput 
        onSubmit={handleUrlSubmit} 
        isLoading={isLoading} 
        onFolderSelect={handleFolderSelect}
        onPresetChange={onPresetChange}
        onCameraSelect={handleCameraSelect}
      />
    </div>
  );
};

export default UrlInputSection;
