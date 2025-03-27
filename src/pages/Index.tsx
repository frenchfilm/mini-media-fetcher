
import { useEffect } from "react";
import { toast } from "sonner";
import { ensureDownloadDirectoryExists, isDesktopEnvironment } from "@/utils/videoUtils";
import AppLayout from "@/components/AppLayout";
import DialogManager from "@/components/DialogManager";
import MainContent from "@/components/MainContent";
import { useAppState } from "@/hooks/useAppState";

const Index = () => {
  const {
    appState,
    videoUrl,
    videoInfo,
    selectedFormat,
    downloads,
    handleUrlSubmit,
    handleFormatSelect,
    handleStartDownload,
    handleDownloadComplete,
    handleCancelDownload,
    handlePresetChange
  } = useAppState();
  
  useEffect(() => {
    // Set the document title for the home page
    document.title = "Video Downloader App";
    
    const directoryExists = ensureDownloadDirectoryExists();
    if (!directoryExists) {
      toast.error("Could not create download directory. Please check permissions.");
    }
    
    if (!isDesktopEnvironment()) {
      console.log("Running in simulation mode - file system operations are simulated");
    }
    
    // Handle settings dialog
    const handleOpenSettings = () => {
      document.dispatchEvent(new CustomEvent('openSettings'));
    };
    
    document.addEventListener('openSettings', handleOpenSettings);
    
    // Handle format preset changes
    const handleFormatPresetChanged = (event: any) => {
      if (event.detail) {
        handlePresetChange(event.detail);
      }
    };
    
    document.addEventListener('formatPresetChanged', handleFormatPresetChanged);
    
    return () => {
      document.removeEventListener('openSettings', handleOpenSettings);
      document.removeEventListener('formatPresetChanged', handleFormatPresetChanged);
    };
  }, [handlePresetChange]);

  return (
    <DialogManager>
      {({ openNewsletter, openContact, openSettings }) => (
        <AppLayout 
          onOpenNewsletter={openNewsletter}
          onOpenContact={openContact}
          downloadsCount={downloads.length}
        >
          <MainContent
            appState={appState}
            videoUrl={videoUrl}
            videoInfo={videoInfo}
            selectedFormat={selectedFormat}
            onUrlSubmit={handleUrlSubmit}
            onFormatSelect={handleFormatSelect}
            onStartDownload={handleStartDownload}
            onDownloadComplete={handleDownloadComplete}
            onCancelDownload={handleCancelDownload}
            onOpenNewsletter={openNewsletter}
            onPresetChange={handlePresetChange}
          />
        </AppLayout>
      )}
    </DialogManager>
  );
};

export default Index;
