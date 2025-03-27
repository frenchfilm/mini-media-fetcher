
import { useTheme } from "@/components/ThemeProvider";
import DownloadHistory from "@/components/DownloadHistory";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";
import AppLayout from "@/components/AppLayout";
import DialogManager from "@/components/DialogManager";
import { useEffect } from "react";

const HistoryPage = () => {
  const { theme } = useTheme();
  const { downloads, clearHistory } = useDownloadHistory();

  // Set document title for this page
  useEffect(() => {
    document.title = "Download History - Downloader App";
    
    return () => {
      // Reset title when navigating away
      document.title = "Video Downloader App";
    };
  }, []);

  const handleOpenFile = (item: any) => {
    console.log("Open file:", item);
    // In a real app, this would open the file
  };

  return (
    <DialogManager>
      {({ openNewsletter, openContact, openSettings }) => (
        <AppLayout 
          onOpenNewsletter={openNewsletter}
          onOpenContact={openContact}
          downloadsCount={downloads.length}
        >
          <div className="h-full">
            <DownloadHistory 
              downloads={downloads} 
              onClearHistory={clearHistory} 
              onOpenFile={handleOpenFile} 
            />
          </div>
        </AppLayout>
      )}
    </DialogManager>
  );
};

export default HistoryPage;
