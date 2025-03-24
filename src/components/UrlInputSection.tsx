
import { useState } from "react";
import { toast } from "sonner";
import VideoUrlInput from "@/components/VideoUrlInput";
import { getVideoDetails } from "@/utils/videoDetails";
import { isDesktopEnvironment } from "@/utils/fileSystem";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail } from "lucide-react";

interface UrlInputSectionProps {
  onUrlSubmit: (url: string, videoInfo: any) => void;
}

const UrlInputSection = ({ onUrlSubmit }: UrlInputSectionProps) => {
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
      
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button 
          variant="contrast" 
          onClick={() => toast.info("Request feature or report bugs")}
          className="w-full sm:w-auto bg-secondary border border-secondary/70 text-primary dark:bg-primary dark:text-secondary dark:border-primary/70"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Request Feature / Report Bugs
        </Button>
        
        <Button 
          variant="contrast" 
          onClick={() => toast.info("Subscribe to newsletter")}
          className="w-full sm:w-auto bg-secondary border border-secondary/70 text-primary dark:bg-primary dark:text-secondary dark:border-primary/70"
        >
          <Mail className="h-4 w-4 mr-2" />
          Subscribe to Newsletter
        </Button>
      </div>
      
      <footer className="py-6 px-6 text-center text-sm text-muted-foreground mt-auto">
        <p className="italic">
          Our Apps are bare - quiet, private, ad-free and lightweight.<br />
          Just plain functions, as Nature intended them.
        </p>
      </footer>
    </>
  );
};

export default UrlInputSection;
