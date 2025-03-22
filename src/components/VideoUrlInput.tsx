
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { ArrowRight, X, Info } from 'lucide-react';
import { validateUrl } from '@/utils/videoUtils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VideoUrlInputProps {
  onSubmit: (url: string) => void;
}

const VideoUrlInput = ({ onSubmit }: VideoUrlInputProps) => {
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
        toast.success("URL accepted for processing");
      } else {
        toast.error("Please enter a valid URL");
      }
      setIsValidating(false);
    }, 800);
  };

  const clearInput = () => {
    setUrl('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xl mx-auto transition-all-300 animate-slide-up"
    >
      <div className="glass-panel rounded-2xl p-1 flex items-center overflow-hidden">
        <Input
          type="text"
          placeholder="Paste any video URL from YouTube, Vimeo, TikTok, etc..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border-0 h-14 px-4 bg-transparent text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
        />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mx-1 h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
            >
              <Info className="h-4 w-4" />
              <span className="sr-only">Supported platforms</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>Supports videos from YouTube, Vimeo, Dailymotion, Facebook, Twitter, TikTok, Instagram and many more platforms.</p>
          </TooltipContent>
        </Tooltip>
        
        {url && (
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
          disabled={isValidating || !url.trim()}
          className="h-12 w-12 rounded-xl mr-1 shadow-sm transition-all-200"
        >
          <ArrowRight className="h-5 w-5" />
          <span className="sr-only">Get Video</span>
        </Button>
      </div>
      
      <p className="text-xs text-center mt-2 text-muted-foreground">
        Enhanced with yt-dlp for maximum compatibility with video platforms
      </p>
    </form>
  );
};

export default VideoUrlInput;
