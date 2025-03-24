
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <AppHeader downloadsCount={downloads.length} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 pb-10 pt-4 flex flex-col">
        <div className="space-y-6 flex-1">
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
      
      <NewsletterDialog
        open={newsletterOpen}
        onOpenChange={setNewsletterOpen}
      />
      
      <footer className="py-6 px-6 text-center text-sm text-muted-foreground mt-auto">
        <p className="italic">
          Our Apps are bare - quiet, private, ad-free and lightweight.<br />
          Just plain functions, as Nature intended them.
        </p>
      </footer>
    </div>
  );
};

export default Index;
