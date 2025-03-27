
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { VideoFormat } from "@/components/VideoFormatSelector";
import DownloadProgress from "@/components/DownloadProgress";
import UrlInputSection from "@/components/UrlInputSection";
import FormatSelectionSection from "@/components/FormatSelectionSection";
import NewsletterDialog from "@/components/NewsletterDialog";
import ContactDialog from "@/components/ContactDialog";
import AppLayout from "@/components/AppLayout";
import SettingsDialog from "@/components/settings/SettingsDialog";
import { 
  getVideoFilePath, 
  ensureDownloadDirectoryExists, 
  isDesktopEnvironment,
} from "@/utils/videoUtils";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";

enum AppState {
  INPUT_URL = "input_url",
  SELECT_FORMAT = "select_format",
  DOWNLOADING = "downloading",
}

interface FormatPreset {
  format: VideoFormat | null;
  quality: string | null;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT_URL);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);
  const [newsletterOpen, setNewsletterOpen] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [licenseKey, setLicenseKey] = useState<string>("");
  const [formatPreset, setFormatPreset] = useState<FormatPreset>({ format: null, quality: null });
  const { downloads, addDownload, clearHistory } = useDownloadHistory();
  
  useEffect(() => {
    const directoryExists = ensureDownloadDirectoryExists();
    if (!directoryExists) {
      toast.error("Could not create download directory. Please check permissions.");
    }
    
    if (!isDesktopEnvironment()) {
      console.log("Running in simulation mode - file system operations are simulated");
    }
    
    const handleOpenSettings = () => {
      setSettingsOpen(true);
    };
    
    document.addEventListener('openSettings', handleOpenSettings);
    
    return () => {
      document.removeEventListener('openSettings', handleOpenSettings);
    };
  }, []);
  
  const handleUrlSubmit = (url: string, videoDetails: any) => {
    setVideoUrl(url);
    setVideoInfo(videoDetails);
    
    // If we have a format preset, automatically select it
    if (formatPreset.format) {
      setSelectedFormat(formatPreset.format);
      // If we have both format and quality preset, skip format selection and start download
      if (formatPreset.quality) {
        setAppState(AppState.DOWNLOADING);
        return;
      }
    }
    
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

  const handleOpenContact = () => {
    setContactOpen(true);
  };

  const handlePresetChange = (preset: FormatPreset) => {
    setFormatPreset(preset);
    console.log("Format preset updated:", preset);
  };

  return (
    <>
      <AppLayout 
        onOpenNewsletter={handleOpenNewsletter}
        onOpenContact={handleOpenContact}
        downloadsCount={downloads.length}
      >
        <div className="h-full">
          {appState === AppState.INPUT_URL && (
            <UrlInputSection 
              onUrlSubmit={handleUrlSubmit} 
              onOpenNewsletter={handleOpenNewsletter}
              onPresetChange={handlePresetChange}
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
        
        <NewsletterDialog
          open={newsletterOpen}
          onOpenChange={setNewsletterOpen}
        />
        
        <ContactDialog
          open={contactOpen}
          onOpenChange={setContactOpen}
        />
        
        <SettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          licenseKey={licenseKey}
          onLicenseKeyChange={setLicenseKey}
        />
      </AppLayout>
    </>
  );
};

export default Index;
