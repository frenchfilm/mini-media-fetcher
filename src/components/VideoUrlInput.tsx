
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { ArrowRight, X, Loader2, FolderOpen, Settings2, Camera } from 'lucide-react';
import { validateUrl } from '@/utils/urlValidation';
import { useIsMobile } from '@/hooks/use-mobile';
import FormatPresetPopover from '@/components/FormatPresetPopover';
import { VideoFormat } from '@/components/VideoFormatSelector';

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
  const [isValidating, setIsValidating] = useState(false);
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Please enter a video URL");
      return;
    }
    
    setIsValidating(true);
    
    setTimeout(() => {
      if (validateUrl(url)) {
        onSubmit(url);
      } else {
        toast.error("Please enter a valid URL format");
      }
      setIsValidating(false);
    }, 300);
  };

  const clearInput = () => {
    setUrl('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const showLoading = isValidating || isLoading;

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xs sm:max-w-2xl mx-auto flex flex-col items-center space-y-2"
    >
      <div className="flex items-stretch gap-1 w-full">
        <div className="rounded-md bg-white border border-secondary/70 flex items-center overflow-hidden flex-1 dark:bg-secondary dark:border-border">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Paste URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border-0 h-10 px-3 bg-transparent text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70 dark:placeholder:text-secondary-foreground/70 dark:text-secondary-foreground"
            disabled={showLoading}
          />
          
          {url && !showLoading && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearInput}
              className="mr-1 h-7 w-7 rounded-full text-muted-foreground hover:text-foreground dark:text-secondary-foreground dark:hover:text-secondary-foreground"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
        
        <Button
          type="submit"
          variant="contrast"
          size="icon"
          disabled={showLoading || !url.trim()}
          className="h-10 w-10 rounded-md app-wide-button-high-contrast"
        >
          {showLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
          <span className="sr-only">Get Video</span>
        </Button>
      </div>

      <div className="flex items-center gap-2 w-full max-w-xs sm:max-w-2xl">
        {onPresetChange && (
          <div onClick={(e) => e.stopPropagation()}>
            <FormatPresetPopover onPresetChange={onPresetChange}>
              <div className="h-10 w-10 rounded-md app-wide-button-high-contrast flex items-center justify-center">
                <Settings2 className="h-4 w-4" />
                <span className="sr-only">Format preset settings</span>
              </div>
            </FormatPresetPopover>
          </div>
        )}

        {onFolderSelect && (
          <Button
            type="button"
            variant="contrast"
            onClick={onFolderSelect}
            size="icon"
            className="h-10 w-10 rounded-md app-wide-button-high-contrast"
            disabled={showLoading}
          >
            <FolderOpen className="h-4 w-4" />
            <span className="sr-only">Select folder</span>
          </Button>
        )}
        
        {onCameraSelect && (
          <Button
            type="button"
            onClick={onCameraSelect}
            size="icon"
            className="h-10 w-10 rounded-md app-wide-button-high-contrast"
            disabled={showLoading}
          >
            <Camera className="h-4 w-4" />
            <span className="sr-only">Open camera</span>
          </Button>
        )}
      </div>
    </form>
  );
};

export default VideoUrlInput;
