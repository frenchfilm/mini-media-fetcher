
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import AppLayout from '@/components/AppLayout';
import DialogManager from '@/components/DialogManager';
import VideoList, { VideoData } from '@/components/video/VideoList';
import PageHeader from '@/components/video/PageHeader';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  },
  // Additional videos to test scrolling
  {
    id: '5',
    title: 'Advanced GraphQL Techniques',
    thumbnail: 'https://i.ytimg.com/vi/ogVrm6_rNWE/default.jpg',
    duration: '55:42',
    size: '512 MB',
    format: 'MP4 1080p',
    date: '2023-06-25',
    status: 'completed' as const,
    progress: 100,
    downloadedSize: 512,
    totalSize: 512,
    timeLeft: 0,
    url: 'https://www.youtube.com/watch?v=ogVrm6_rNWE'
  },
  {
    id: '6',
    title: 'Docker and Kubernetes Workshop',
    thumbnail: 'https://i.ytimg.com/vi/8h4FoWK7tIA/default.jpg',
    duration: '1:22:15',
    size: '768 MB',
    format: 'MP4 4K',
    date: '2023-06-28',
    status: 'paused' as const,
    progress: 40,
    downloadedSize: 307.2,
    totalSize: 768,
    timeLeft: 300,
    url: 'https://www.youtube.com/watch?v=8h4FoWK7tIA'
  },
  {
    id: '7',
    title: 'Machine Learning Fundamentals',
    thumbnail: 'https://i.ytimg.com/vi/JcI5Vnb0I_k/default.jpg',
    duration: '47:33',
    size: '425 MB',
    format: 'MP4 1080p',
    date: '2023-07-02',
    status: 'in_progress' as const,
    progress: 75,
    downloadedSize: 318.75,
    totalSize: 425,
    timeLeft: 60,
    url: 'https://www.youtube.com/watch?v=JcI5Vnb0I_k'
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
          <div className="flex flex-col w-full max-w-xl mx-auto h-full">
            <PageHeader title="Download Manager" />
            
            <ScrollArea className="flex-1 w-full pr-4">
              <VideoList videos={videos} onVideosChange={setVideos} />
            </ScrollArea>
          </div>
        </AppLayout>
      )}
    </DialogManager>
  );
};

export default DownloadManager;
