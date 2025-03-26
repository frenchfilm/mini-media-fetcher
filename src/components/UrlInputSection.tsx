import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { ArrowRight, X, Loader2, FolderOpen } from 'lucide-react';
import { validateUrl } from '@/utils/urlValidation';
import { useIsMobile } from '@/hooks/use-mobile';

interface UrlInputSectionProps {
  onUrlSubmit: (url: string, videoInfo: any) => void;
  onOpenNewsletter: () => void;
}

const UrlInputSection = ({ onUrlSubmit, onOpenNewsletter }: UrlInputSectionProps) => {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    
    try {
      // Get actual video details from the URL
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
    
    // In a real desktop app (Electron/Tauri), this would open a folder picker
    toast.info("This would open a folder selection dialog in a desktop environment");
    console.log("Opening folder selection dialog (simulation)");
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
      />
    </div>
  );
};

export default UrlInputSection;
