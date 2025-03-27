
import { Button } from "@/components/ui/button";
import { VideoFormat } from "@/components/VideoFormatSelector";
import { History } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface FormatPresetPopoverProps {
  children: React.ReactNode;
  onPresetChange: (preset: { format: VideoFormat | null, quality: string | null }) => void;
}

export const VIDEO_FORMATS: VideoFormat[] = [
  { id: 'mp4-1080p', quality: 'High', resolution: '1080p', fileSize: '~120 MB' },
  { id: 'mp4-720p', quality: 'Medium', resolution: '720p', fileSize: '~80 MB' },
  { id: 'mp4-480p', quality: 'Low', resolution: '480p', fileSize: '~45 MB' },
  { id: 'mp4-360p', quality: 'Very Low', resolution: '360p', fileSize: '~25 MB' },
];

export const QUALITY_OPTIONS = [
  { value: "highest", label: "Highest" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const FormatPresetPopover = ({ children, onPresetChange }: FormatPresetPopoverProps) => {
  const navigate = useNavigate();
  
  const handleOpenFormatPresetDialog = (e: React.MouseEvent) => {
    // Prevent default behavior to avoid form submission
    e.preventDefault();
    e.stopPropagation();
    
    // Create and dispatch a custom event to open the format preset dialog
    const event = new Event('openFormatPreset');
    document.dispatchEvent(event);
  };

  const handleOpenHistory = (e: React.MouseEvent) => {
    // Prevent default behavior to avoid form submission
    e.preventDefault();
    e.stopPropagation();
    
    // Navigate to history page
    navigate('/history-page');
  };

  return (
    <div className="flex items-center space-x-2">
      <Button 
        onClick={handleOpenFormatPresetDialog}
        className="p-0 m-0 h-auto bg-transparent hover:bg-transparent"
        type="button" // Explicitly set as button type to prevent form submission
      >
        {children}
      </Button>
      
      <Button
        onClick={handleOpenHistory}
        className="app-wide-button-high-contrast p-0 m-0 h-10 w-10 rounded-md"
        type="button"
        aria-label="View download history"
      >
        <History className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default FormatPresetPopover;
