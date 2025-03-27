
import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Folder, Camera } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import FormatPresetPopover from "./FormatPresetPopover";
import { VideoFormat } from './VideoFormatSelector';

interface VideoUrlInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
  onFolderSelect?: () => void;
  onPresetChange?: (preset: { format: VideoFormat | null, quality: string | null }) => void;
  onCameraSelect?: () => void;
}

const VideoUrlInput = ({ 
  onSubmit,
  isLoading = false,
  onFolderSelect,
  onPresetChange,
  onCameraSelect
}: VideoUrlInputProps) => {
  const [url, setUrl] = useState('');
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-focus on the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Paste a YouTube URL here..."
          value={url}
          onChange={handleChange}
          className="pr-24"
          disabled={isLoading}
        />
        
        <div className="absolute right-2 flex items-center">
          {!isMobile && onFolderSelect && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 mr-0.5"
              onClick={onFolderSelect}
              disabled={isLoading}
            >
              <Folder className="h-4 w-4" />
              <span className="sr-only">Select Folder</span>
            </Button>
          )}
          
          {onCameraSelect && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 mr-0.5"
              onClick={onCameraSelect}
              disabled={isLoading}
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">My Videos</span>
            </Button>
          )}
          
          {onPresetChange && (
            <FormatPresetPopover onChange={onPresetChange} />
          )}
        </div>
      </div>
      
      <Button
        type="submit"
        className="w-full mt-2"
        disabled={!url.trim() || isLoading}
      >
        {isLoading ? 'Processing...' : 'Get Video'}
      </Button>
    </form>
  );
};

export default VideoUrlInput;
