
import { useEffect } from "react";
import { toast } from "sonner";
import { ensureDownloadDirectoryExists, isDesktopEnvironment } from "@/utils/videoUtils";
import AppLayout from "@/components/AppLayout";
import DialogManager from "@/components/DialogManager";
import MainContent from "@/components/MainContent";
import { useAppState } from "@/hooks/useAppState";
import { Button } from "@/components/ui/button";
import { History, Star, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const {
    appState,
    videoUrl,
    videoInfo,
    selectedFormat,
    handleUrlSubmit,
    handleFormatSelect,
    handleStartDownload,
    handleDownloadComplete,
    handleCancelDownload,
    handlePresetChange
  } = useAppState();
  
  useEffect(() => {
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
        >
          {/* Navigation buttons at the top */}
          <div className="flex justify-center space-x-4 mb-4">
            <Link to="/my-videos">
              <Button variant="outline" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History
              </Button>
            </Link>
            <Link to="/download-manager">
              <Button variant="outline" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Download Manager
              </Button>
            </Link>
            <Link to="/download-history">
              <Button variant="outline" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Download History
              </Button>
            </Link>
          </div>
          
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
