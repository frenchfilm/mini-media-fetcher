
import { toast } from "sonner";
import VideoUrlInput from "@/components/VideoUrlInput";
import DownloadHistory, { DownloadItem } from "@/components/DownloadHistory";
import { getVideoDetails } from "@/utils/videoUtils";

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
  
  const handleUrlSubmit = (url: string) => {
    // Get actual video details from the URL
    const videoDetails = getVideoDetails(url);
    
    if (videoDetails) {
      onUrlSubmit(url, videoDetails);
    } else {
      toast.error("Could not retrieve video details. Please check the URL.");
    }
  };

  return (
    <>
      <div className="text-center mt-10 mb-12 animate-slide-down">
        <h1 className="text-3xl font-medium mb-4">
          Download Videos with Ease
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Simply paste a video URL from YouTube, Vimeo, or other platforms to get started.
        </p>
      </div>
      
      <VideoUrlInput onSubmit={handleUrlSubmit} />
      
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
