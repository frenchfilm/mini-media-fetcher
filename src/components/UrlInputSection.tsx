
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import VideoUrlInput from "@/components/VideoUrlInput";
import { getVideoDetails } from "@/utils/videoDetails";
import { isDesktopEnvironment } from "@/utils/fileSystem";

interface UrlInputSectionProps {
  onUrlSubmit: (url: string, videoInfo: any) => void;
  onOpenNewsletter: () => void;
}

const UrlInputSection = ({ onUrlSubmit, onOpenNewsletter }: UrlInputSectionProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
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
    <>
      <div className="text-center mt-10 mb-12">
        <h1 className="text-3xl font-fraunces mb-4">
          Download Videos with Ease
        </h1>
        <p className="text-lg mb-2">
          Simply paste a video URL from any platform to get started.
        </p>
        <p className="text-xs text-muted-foreground max-w-md mx-auto italic">
          This tool is for personal use only. Downloading copyrighted or unauthorized content may violate platform rules and local laws. Use responsibly.
        </p>
      </div>
      
      <VideoUrlInput 
        onSubmit={handleUrlSubmit} 
        isLoading={isLoading} 
        onFolderSelect={handleFolderSelect}
      />
    </>
  );
};

export default UrlInputSection;
