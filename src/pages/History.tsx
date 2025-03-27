
import DownloadHistory from "@/components/DownloadHistory";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";

const History = () => {
  const { downloads, clearHistory } = useDownloadHistory();

  const handleOpenFile = (item: any) => {
    console.log("Open file:", item);
    // In a real app, this would open the file
  };

  return (
    <DownloadHistory 
      downloads={downloads} 
      onClearHistory={clearHistory} 
      onOpenFile={handleOpenFile} 
    />
  );
};

export default History;
