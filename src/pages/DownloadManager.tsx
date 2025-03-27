
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import AppLayout from '@/components/AppLayout';
import DialogManager from '@/components/DialogManager';
import VideoList, { VideoData } from '@/components/video/VideoList';
import PageHeader from '@/components/video/PageHeader';

const sampleVideos: VideoData[] = [
  {
    id: '1',
    title: 'React Hooks Tutorial for Beginners',
    thumbnail: 'https://i.ytimg.com/vi/dpw9EHDh2bM/default.jpg',
    duration: '15:32',
    size: '128 MB',
    format: 'MP4 720p',
    date: '2023-06-12',
    status: 'completed' as const,
    progress: 100,
    downloadedSize: 128,
    totalSize: 128,
    timeLeft: 0,
    url: 'https://www.youtube.com/watch?v=dpw9EHDh2bM'
  },
  {
    id: '2',
    title: 'How to Build a Modern Website with Next.js',
    thumbnail: 'https://i.ytimg.com/vi/mTz0GXj8NN0/default.jpg',
    duration: '28:44',
    size: '256 MB',
    format: 'MP4 1080p',
    date: '2023-06-15',
    status: 'in_progress' as const,
    progress: 65,
    downloadedSize: 166.4,
    totalSize: 256,
    timeLeft: 120,
    url: 'https://www.youtube.com/watch?v=mTz0GXj8NN0'
  },
  {
    id: '3',
    title: 'TypeScript for JavaScript Developers',
    thumbnail: 'https://i.ytimg.com/vi/BwuLxPH8IDs/default.jpg',
    duration: '42:18',
    size: '320 MB',
    format: 'MP4 1080p',
    date: '2023-06-18',
    status: 'in_progress' as const,
    progress: 25,
    downloadedSize: 80,
    totalSize: 320,
    timeLeft: 450,
    url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs'
  },
  {
    id: '4',
    title: 'Failed Download: React State Management',
    thumbnail: 'https://i.ytimg.com/vi/4pO-HcG2igk/default.jpg',
    duration: '33:21',
    size: '280 MB',
    format: 'MP4 1080p',
    date: '2023-06-20',
    status: 'aborted' as const,
    progress: 45,
    downloadedSize: 126,
    totalSize: 280,
    timeLeft: 0,
    error: 'Network connection lost',
    url: 'https://www.youtube.com/watch?v=4pO-HcG2igk'
  }
];

const DownloadManager = () => {
  const [videos, setVideos] = useState<VideoData[]>(sampleVideos);

  // Prevent focus on back button after navigation
  useEffect(() => {
    // Prevent the browser from auto-focusing the ← Back button after page navigation
    // This removes the blinking text cursor that appears inside the button on page load
    setTimeout(() => {
      const el = document.activeElement
      if (el instanceof HTMLElement && el.tagName === 'BUTTON') {
        el.blur()
      }
    }, 30)
  }, []);

  return (
    <DialogManager>
      {({ openNewsletter, openContact }) => (
        <AppLayout
          onOpenNewsletter={openNewsletter}
          onOpenContact={openContact}
        >
          <div className="flex-1 flex flex-col w-full max-w-xl mx-auto px-1 sm:px-0">
            <PageHeader title="Download Manager" />
            <div className="overflow-y-auto flex-1">
              <VideoList videos={videos} onVideosChange={setVideos} />
            </div>
          </div>
        </AppLayout>
      )}
    </DialogManager>
  );
};

export default DownloadManager;
