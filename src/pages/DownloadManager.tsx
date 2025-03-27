
import { useEffect, useRef, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import DialogManager from '@/components/DialogManager';
import DownloadPageHeader from '@/components/download/DownloadPageHeader';
import DownloadsList from '@/components/download/DownloadsList';
import { VideoDownload } from '@/components/download/DownloadItem';
import { sampleVideos } from '@/data/sampleDownloads';

const DownloadManager = () => {
  const [videos, setVideos] = useState<VideoDownload[]>(sampleVideos);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus management - ensures no element is focused when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.focus();
      }
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DialogManager>
      {({ openNewsletter, openContact, openSettings }) => (
        <AppLayout
          onOpenNewsletter={openNewsletter}
          onOpenContact={openContact}
        >
          <div 
            className="flex-1 flex flex-col w-full max-w-xl mx-auto px-1 sm:px-0"
            ref={containerRef}
            tabIndex={-1}
          >
            <DownloadPageHeader title="Download Manager" />
            <DownloadsList videos={videos} setVideos={setVideos} />
          </div>
        </AppLayout>
      )}
    </DialogManager>
  );
};

export default DownloadManager;
