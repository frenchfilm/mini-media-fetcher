
import { useState } from 'react';
import DownloadItem, { VideoDownload } from './DownloadItem';
import { toast } from 'sonner';

interface DownloadsListProps {
  videos: VideoDownload[];
  setVideos: React.Dispatch<React.SetStateAction<VideoDownload[]>>;
}

const DownloadsList = ({ videos, setVideos }: DownloadsListProps) => {
  const handleRetry = (videoId: string) => {
    toast.success("Retrying download...");
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId ? { ...video, status: 'in_progress', progress: 0, timeLeft: 500 } : video
      )
    );
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("URL copied to clipboard");
    }).catch(() => {
      toast.error("Failed to copy URL");
    });
  };

  const handleDelete = (videoId: string) => {
    if (confirm("Are you sure you want to delete this download?")) {
      setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
      toast.success("Download removed");
    }
  };

  const handlePause = (videoId: string) => {
    toast.info("Download paused");
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId ? { ...video, status: 'paused', timeLeft: video.timeLeft } : video
      )
    );
  };

  const handleResume = (videoId: string) => {
    toast.info("Download resumed");
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId ? { ...video, status: 'in_progress', timeLeft: video.timeLeft } : video
      )
    );
  };

  const handleStop = (videoId: string) => {
    toast.info("Download stopped");
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId ? { 
          ...video, 
          status: 'aborted', 
          error: 'Download stopped by user',
          timeLeft: 0 
        } : video
      )
    );
  };

  return (
    <div className="space-y-3">
      {videos.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">No videos available</p>
        </div>
      ) : (
        videos.map((video) => (
          <DownloadItem
            key={video.id}
            video={video}
            onRetry={handleRetry}
            onCopyUrl={handleCopyUrl}
            onDelete={handleDelete}
            onPause={handlePause}
            onResume={handleResume}
            onStop={handleStop}
          />
        ))
      )}
    </div>
  );
};

export default DownloadsList;
