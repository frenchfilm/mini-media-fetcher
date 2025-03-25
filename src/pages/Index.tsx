import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { VideoFormat } from "@/components/VideoFormatSelector";
import DownloadProgress from "@/components/DownloadProgress";
import AppHeader from "@/components/AppHeader";
import UrlInputSection from "@/components/UrlInputSection";
import FormatSelectionSection from "@/components/FormatSelectionSection";
import NewsletterDialog from "@/components/NewsletterDialog";
import { Button } from "@/components/ui/button";
import { 
  getVideoFilePath, 
  ensureDownloadDirectoryExists, 
  isDesktopEnvironment,
  openFileLocation
} from "@/utils/videoUtils";
import { MessageSquare, Mail } from "lucide-react";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";

enum AppState {
  INPUT_URL = "input_url",
  SELECT_FORMAT = "select_format",
  DOWNLOADING = "downloading",
}

const Index = () => {
  const navigate = useNavigate();
  const [appState, setAppState] = useState<AppState>(AppState.INPUT_URL);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);
  const [newsletterOpen, setNewsletterOpen] = useState<boolean>(false);
  const { downloads, addDownload, clearHistory } = useDownloadHistory();
  
  useEffect(() => {
    const directoryExists = ensureDownloadDirectoryExists();
    if (!directoryExists) {
      toast.error("Could not create download directory. Please check permissions.");
    }
    
    if (!isDesktopEnvironment()) {
      console.log("Running in simulation mode - file system operations are simulated");
    }
  }, []);
  
  const handleUrlSubmit = (url: string, videoDetails: any) => {
    setVideoUrl(url);
    setVideoInfo(videoDetails);
    setAppState(AppState.SELECT_FORMAT);
    toast.success("Video information retrieved successfully");
  };

  const handleFormatSelect = (format: VideoFormat) => {
    setSelectedFormat(format);
  };

  const handleStartDownload = () => {
    if (!selectedFormat) return;
    setAppState(AppState.DOWNLOADING);
  };

  const handleDownloadComplete = () => {
    if (!videoInfo || !selectedFormat) return;
    
    const filePath = getVideoFilePath(
      videoInfo.title, 
      selectedFormat.id.split('-')[0]
    );
    
    const newDownloadItem = {
      id: Date.now().toString(),
      title: videoInfo.title,
      thumbnailUrl: videoInfo.thumbnailUrl,
      url: videoUrl,
      format: selectedFormat,
      downloadDate: new Date(),
      filePath: filePath
    };
    
    addDownload(newDownloadItem);
    
    if (!isDesktopEnvironment()) {
      toast.info("Download completed (simulation mode). In a desktop app, the file would be saved to your Downloads folder.");
    } else {
      toast.success("Download completed successfully!");
    }
    
    setAppState(AppState.INPUT_URL);
    setVideoUrl("");
    setVideoInfo(null);
    setSelectedFormat(null);
  };

  const handleCancelDownload = () => {
    toast.info("Download canceled");
    setAppState(AppState.INPUT_URL);
    setVideoUrl("");
    setVideoInfo(null);
    setSelectedFormat(null);
  };

  const handleOpenNewsletter = () => {
    setNewsletterOpen(true);
  };

  return (
    <div className="h-[600px] flex flex-col bg-gradient-to-b from-background to-secondary/30 max-w-[800px] mx-auto overflow-hidden">
      <AppHeader downloadsCount={downloads.length} />
      
      <main className="flex-1 px-4 pt-1 flex flex-col overflow-y-hidden overflow-x-hidden">
        <div className="space-y-2 flex-1">
          {appState === AppState.INPUT_URL && (
            <UrlInputSection 
              onUrlSubmit={handleUrlSubmit} 
              onOpenNewsletter={handleOpenNewsletter}
            />
          )}
          
          {appState === AppState.SELECT_FORMAT && videoInfo && (
            <FormatSelectionSection
              videoInfo={videoInfo}
              videoUrl={videoUrl}
              onFormatSelect={handleFormatSelect}
              selectedFormat={selectedFormat}
              onStartDownload={handleStartDownload}
              onCancel={handleCancelDownload}
            />
          )}
          
          {appState === AppState.DOWNLOADING && videoUrl && selectedFormat && (
            <DownloadProgress
              videoUrl={videoUrl}
              selectedFormat={selectedFormat}
              onComplete={handleDownloadComplete}
              onCancel={handleCancelDownload}
            />
          )}
        </div>
      </main>
      
      <div className="px-4 py-0.5 mt-auto">
        <div className="flex flex-row items-center justify-center gap-2 mb-0.5">
          <Button 
            variant="contrast" 
            onClick={() => navigate("/contact")}
            className="action-button-dark dark:bg-primary dark:text-secondary dark:border-primary/70"
            size="sm"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            <span className="text-xs">Request Feature</span>
          </Button>
          
          <Button 
            variant="contrast" 
            onClick={handleOpenNewsletter}
            className="action-button-dark dark:bg-primary dark:text-secondary dark:border-primary/70"
            size="sm"
          >
            <Mail className="h-3 w-3 mr-1" />
            <span className="text-xs">Newsletter</span>
          </Button>
        </div>
      </div>
      
      <NewsletterDialog
        open={newsletterOpen}
        onOpenChange={setNewsletterOpen}
      />
      
      <footer className="py-0.5 px-4 text-center text-[10px] text-muted-foreground flex-shrink-0">
        <p className="italic">
          Apps as nature intended them - quiet, private, ad-free.
        </p>
      </footer>
    </div>
  );
};

export default Index;
