
import { useState, useEffect } from 'react';
import { DownloadItem } from '@/components/DownloadHistory';

export const useDownloadHistory = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  
  // Load downloads from localStorage on initial render
  useEffect(() => {
    const savedDownloads = localStorage.getItem("downloadHistory");
    if (savedDownloads) {
      try {
        const parsedDownloads = JSON.parse(savedDownloads);
        // Convert date strings back to Date objects
        const downloadsWithDates = parsedDownloads.map((item: any) => ({
          ...item,
          downloadDate: new Date(item.downloadDate)
        }));
        setDownloads(downloadsWithDates);
      } catch (error) {
        console.error("Error parsing downloads:", error);
      }
    }
  }, []);
  
  // Save downloads to localStorage when they change
  useEffect(() => {
    localStorage.setItem("downloadHistory", JSON.stringify(downloads));
  }, [downloads]);

  const addDownload = (newDownload: DownloadItem) => {
    setDownloads(prev => [newDownload, ...prev]);
  };

  const clearHistory = () => {
    setDownloads([]);
  };

  return {
    downloads,
    addDownload,
    clearHistory
  };
};
