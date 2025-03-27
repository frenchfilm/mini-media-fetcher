
import { useTheme } from "@/components/ThemeProvider";
import DownloadHistory from "@/components/DownloadHistory";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";

const History = () => {
  const { theme } = useTheme();
  const { downloads, clearHistory } = useDownloadHistory();

  const handleOpenFile = (item: any) => {
    console.log("Open file:", item);
    // In a real app, this would open the file
  };

  return (
    <div className={theme === "dark" ? "bg-[#111827]" : "bg-[#e9e2d0]"} style={{ minHeight: "100vh" }}>
      <DownloadHistory 
        downloads={downloads} 
        onClearHistory={clearHistory} 
        onOpenFile={handleOpenFile} 
      />
    </div>
  );
};

export default History;
