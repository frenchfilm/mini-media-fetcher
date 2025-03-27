
import { useTheme } from "@/components/ThemeProvider";
import DownloadHistory from "@/components/DownloadHistory";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";
import AppLayout from "@/components/AppLayout";
import DialogManager from "@/components/DialogManager";
import { Helmet } from "react-helmet";

const HistoryPage = () => {
  const { theme } = useTheme();
  const { downloads, clearHistory } = useDownloadHistory();

  const handleOpenFile = (item: any) => {
    console.log("Open file:", item);
    // In a real app, this would open the file
  };

  return (
    <>
      <Helmet>
        <title>Download History | SoftBare Video Downloader</title>
      </Helmet>
      <DialogManager>
        {({ openNewsletter, openContact, openSettings }) => (
          <AppLayout 
            onOpenNewsletter={openNewsletter}
            onOpenContact={openContact}
            downloadsCount={downloads.length}
          >
            <DownloadHistory 
              downloads={downloads} 
              onClearHistory={clearHistory} 
              onOpenFile={handleOpenFile} 
            />
          </AppLayout>
        )}
      </DialogManager>
    </>
  );
};

export default HistoryPage;
