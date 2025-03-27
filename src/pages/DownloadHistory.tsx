
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import AppLayout from '@/components/AppLayout';
import DialogManager from '@/components/DialogManager';
import DownloadHistory, { DownloadItem } from '@/components/DownloadHistory';

// Sample downloads for demonstration
const sampleDownloads: DownloadItem[] = [
  {
    id: '1',
    title: 'React Router DOM Tutorial for Beginners',
    thumbnailUrl: 'https://i.ytimg.com/vi/aZGzwEjZrXc/default.jpg',
    url: 'https://www.youtube.com/watch?v=aZGzwEjZrXc',
    format: {
      id: '22',
      quality: '720p',
      container: 'mp4',
      hasVideo: true,
      hasAudio: true,
      isHD: true,
      size: '120MB'
    },
    downloadDate: new Date('2023-06-10'),
    filePath: '/downloads/react-router-tutorial.mp4',
    fileSize: '120MB',
    duration: '15:32'
  },
  {
    id: '2',
    title: 'Advanced CSS Animation Techniques',
    thumbnailUrl: 'https://i.ytimg.com/vi/8kK-cA99SA0/default.jpg',
    url: 'https://www.youtube.com/watch?v=8kK-cA99SA0',
    format: {
      id: '18',
      quality: '360p',
      container: 'mp4',
      hasVideo: true,
      hasAudio: true,
      isHD: false,
      size: '50MB'
    },
    downloadDate: new Date('2023-06-15'),
    filePath: '/downloads/css-animation.mp4',
    fileSize: '50MB',
    duration: '10:05'
  },
  {
    id: '3',
    title: 'TypeScript Crash Course 2023',
    thumbnailUrl: 'https://i.ytimg.com/vi/BCg4U1FzODs/default.jpg',
    url: 'https://www.youtube.com/watch?v=BCg4U1FzODs',
    format: {
      id: '22',
      quality: '1080p',
      container: 'mp4',
      hasVideo: true,
      hasAudio: true,
      isHD: true,
      size: '450MB'
    },
    downloadDate: new Date('2023-06-20'),
    filePath: '/downloads/typescript-crash-course.mp4',
    fileSize: '450MB',
    duration: '45:13'
  }
];

const DownloadHistoryPage = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>(sampleDownloads);

  const handleClearHistory = () => {
    setDownloads([]);
  };

  const handleOpenFile = (item: DownloadItem) => {
    toast.info(`Opening file: ${item.title}`);
    // In a real app, this would open the file using the operating system
  };

  // Prevent focus on back button after navigation
  useEffect(() => {
    setTimeout(() => {
      const el = document.activeElement;
      if (el instanceof HTMLElement && el.tagName === 'BUTTON') {
        el.blur();
      }
    }, 30);
  }, []);

  return (
    <DialogManager>
      {({ openNewsletter, openContact }) => (
        <AppLayout
          onOpenNewsletter={openNewsletter}
          onOpenContact={openContact}
        >
          <DownloadHistory 
            downloads={downloads} 
            onClearHistory={handleClearHistory} 
            onOpenFile={handleOpenFile} 
          />
        </AppLayout>
      )}
    </DialogManager>
  );
};

export default DownloadHistoryPage;
