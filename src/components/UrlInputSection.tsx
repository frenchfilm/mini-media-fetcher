
import { useState } from "react";
import { toast } from "sonner";
import VideoUrlInput from "@/components/VideoUrlInput";
import DownloadHistory, { DownloadItem } from "@/components/DownloadHistory";
import { getVideoDetails } from "@/utils/videoDetails";

interface UrlInputSectionProps {
  onUrlSubmit: (url: string, videoInfo: any) => void;
  downloads: DownloadItem[];
  onClearHistory: () => void;
  onOpenFile: (item: DownloadItem) => void;
}

const UrlInputSection = ({ 
  onUrlSubmit, 
  downloads, 
  onClearHistory, 
  onOpenFile 
}: UrlInputSectionProps) => {
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

  return (
    <>
      <div className="text-center mt-10 mb-12 animate-slide-down">
        <h1 className="text-3xl font-medium mb-4">
          Download Videos with Ease
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Simply paste a video URL from any platform to get started. Enhanced with yt-dlp for maximum compatibility.
        </p>
      </div>
      
      <VideoUrlInput onSubmit={handleUrlSubmit} isLoading={isLoading} />
      
      {downloads.length > 0 && (
        <div className="mt-16">
          <DownloadHistory 
            downloads={downloads} 
            onClearHistory={onClearHistory}
            onOpenFile={onOpenFile}
          />
        </div>
      )}
    </>
  );
};

export default UrlInputSection;
