
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { ArrowRight, X, Info, Loader2, FolderOpen } from 'lucide-react';
import { validateUrl } from '@/utils/urlValidation';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface VideoUrlInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
  onFolderSelect?: () => void;
}

const VideoUrlInput = ({ onSubmit, isLoading = false, onFolderSelect }: VideoUrlInputProps) => {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Please enter a video URL");
      return;
    }
    
    setIsValidating(true);
    
    // Validate URL using the improved validation function
    setTimeout(() => {
      if (validateUrl(url)) {
        onSubmit(url);
        // Toast will be shown after metadata is fetched
      } else {
        toast.error("Please enter a valid URL format");
      }
      setIsValidating(false);
    }, 300);
  };

  const clearInput = () => {
    setUrl('');
  };

  // Show loading state from either local validation or parent metadata loading
  const showLoading = isValidating || isLoading;

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xl mx-auto transition-all-300 animate-slide-up"
    >
      <div className="flex items-center gap-2">
        <div className="glass-panel rounded-2xl p-1 flex items-center overflow-hidden flex-1">
          <Input
            type="text"
            placeholder="Paste any video URL from any website..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border-0 h-14 px-4 bg-transparent text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            disabled={showLoading}
          />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mx-1 h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                disabled={showLoading}
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">Supported platforms</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="center" className="max-w-xs">
              <p>Supports videos from any website.</p>
            </PopoverContent>
          </Popover>
          
          {url && !showLoading && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearInput}
              className="mr-1 h-8 w-8 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
          
          <Button
            type="submit"
            size="icon"
            disabled={showLoading || !url.trim()}
            className="h-12 w-12 rounded-xl mr-1 shadow-sm transition-all-200"
          >
            {showLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
            <span className="sr-only">Get Video</span>
          </Button>
        </div>
        
        {onFolderSelect && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onFolderSelect}
            className="h-14 w-14 rounded-xl shadow-sm"
            disabled={showLoading}
          >
            <FolderOpen className="h-5 w-5" />
            <span className="sr-only">Select folder</span>
          </Button>
        )}
      </div>
    </form>
  );
};

export default VideoUrlInput;
