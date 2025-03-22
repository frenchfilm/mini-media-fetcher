
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { VideoFormat } from "@/components/VideoFormatSelector";
import DownloadProgress from "@/components/DownloadProgress";
import { DownloadItem } from "@/components/DownloadHistory";
import AppHeader from "@/components/AppHeader";
import UrlInputSection from "@/components/UrlInputSection";
import FormatSelectionSection from "@/components/FormatSelectionSection";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";
import { getVideoFilePath, ensureDownloadDirectoryExists } from "@/utils/videoUtils";

enum AppState {
  INPUT_URL = "input_url",
  SELECT_FORMAT = "select_format",
  DOWNLOADING = "downloading",
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT_URL);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);
  const { downloads, addDownload, clearHistory } = useDownloadHistory();
  
  // Check if download directory exists on component mount
  useEffect(() => {
    const directoryExists = ensureDownloadDirectoryExists();
    if (!directoryExists) {
      toast.error("Could not create download directory. Please check permissions.");
    }
  }, []);
  
  const handleUrlSubmit = (url: string, videoDetails: any) => {
    setVideoUrl(url);
    setVideoInfo(videoDetails);
    setAppState(AppState.SELECT_FORMAT);
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
    
    // Add to download history with proper file path
    const filePath = getVideoFilePath(
      videoInfo.title, 
      selectedFormat.id.split('-')[0]
    );
    
    const newDownloadItem: DownloadItem = {
      id: Date.now().toString(),
      title: videoInfo.title,
      thumbnailUrl: videoInfo.thumbnailUrl,
      url: videoUrl,
      format: selectedFormat,
      downloadDate: new Date(),
      filePath: filePath
    };
    
    addDownload(newDownloadItem);
    
    // Reset app state
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

  const handleOpenFile = (item: DownloadItem) => {
    // In a real app, this would open the file
    toast.info(`Opening: ${item.filePath}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <AppHeader downloadsCount={downloads.length} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 pb-10 pt-4">
        <div className="space-y-6">
          {appState === AppState.INPUT_URL && (
            <UrlInputSection
              onUrlSubmit={handleUrlSubmit}
              downloads={downloads}
              onClearHistory={clearHistory}
              onOpenFile={handleOpenFile}
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
    </div>
  );
};

export default Index;
