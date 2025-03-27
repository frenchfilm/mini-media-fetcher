
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
