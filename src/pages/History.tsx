
import { useTheme } from "@/components/ThemeProvider";
import DownloadHistory from "@/components/DownloadHistory";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";
import AppLayout from "@/components/AppLayout";

const History = () => {
  const { theme } = useTheme();
  const { downloads, clearHistory } = useDownloadHistory();

  const handleOpenFile = (item: any) => {
    console.log("Open file:", item);
    // In a real app, this would open the file
  };

  return (
    <AppLayout downloadsCount={downloads.length}>
      <div 
        className={`
          ${theme === "dark" ? "bg-[#111827]" : "bg-[#e4d2af]"} 
          min-h-screen
        `}
      >
        <DownloadHistory 
          downloads={downloads} 
          onClearHistory={clearHistory} 
          onOpenFile={handleOpenFile} 
        />
      </div>
    </AppLayout>
  );
};

export default History;

