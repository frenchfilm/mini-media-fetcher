
import VideoItem, { VideoItemProps } from './VideoItem';
import { toast } from "sonner";

export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  size: string;
  format: string;
  date: string;
  status: 'completed' | 'in_progress' | 'paused' | 'aborted';
  progress: number;
  downloadedSize: number;
  totalSize: number;
  timeLeft: number;
  url: string;
  error?: string;
}

interface VideoListProps {
  videos: VideoData[];
  onVideosChange: (videos: VideoData[]) => void;
}

const VideoList = ({ videos, onVideosChange }: VideoListProps) => {
  const handleRetry = (videoId: string) => {
    toast.success("Retrying download...");
    onVideosChange(
      videos.map(video =>
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
      onVideosChange(videos.filter(video => video.id !== videoId));
      toast.success("Download removed");
    }
  };

  const handlePause = (videoId: string) => {
    toast.info("Download paused");
    onVideosChange(
      videos.map(video =>
        video.id === videoId ? { ...video, status: 'paused', timeLeft: video.timeLeft } : video
      )
    );
  };

  const handleResume = (videoId: string) => {
    toast.info("Download resumed");
    onVideosChange(
      videos.map(video =>
        video.id === videoId ? { ...video, status: 'in_progress', timeLeft: video.timeLeft } : video
      )
    );
  };

  const handleStop = (videoId: string) => {
    toast.info("Download stopped");
    onVideosChange(
      videos.map(video =>
        video.id === videoId ? { 
          ...video, 
          status: 'aborted', 
          error: 'Download stopped by user',
          timeLeft: 0 
        } : video
      )
    );
  };

  const handlePlay = (title: string) => {
    toast.info(`Playing ${title}`);
  };

  const handleOpenFolder = (title: string) => {
    toast.info(`Opening folder for ${title}`);
  };

  if (videos.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">No videos available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {videos.map((video) => (
        <VideoItem 
          key={video.id}
          {...video}
          onRetry={handleRetry}
          onCopyUrl={handleCopyUrl}
          onDelete={handleDelete}
          onPause={handlePause}
          onResume={handleResume}
          onStop={handleStop}
          onPlay={handlePlay}
          onOpenFolder={handleOpenFolder}
        />
      ))}
    </div>
  );
};

export default VideoList;
