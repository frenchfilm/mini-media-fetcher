
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { ArrowRight, X } from 'lucide-react';

interface VideoUrlInputProps {
  onSubmit: (url: string) => void;
}

const VideoUrlInput = ({ onSubmit }: VideoUrlInputProps) => {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const validateUrl = (url: string) => {
    // This is a simple validation - in a real app, you'd want more robust validation
    return url.trim().match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com).*$/);
  };

  // Extract video ID from various video platforms
  const extractVideoId = (url: string): string | null => {
    // YouTube
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const ytMatch = url.match(ytRegex);
    if (ytMatch) return ytMatch[1];
    
    // Vimeo
    const vimeoRegex = /(?:vimeo\.com\/(?:video\/)?(\d+))/i;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) return vimeoMatch[1];
    
    // Dailymotion
    const dmRegex = /(?:dailymotion\.com\/(?:video\/)([\w]+))/i;
    const dmMatch = url.match(dmRegex);
    if (dmMatch) return dmMatch[1];
    
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Please enter a video URL");
      return;
    }
    
    setIsValidating(true);
    
    // Validate URL and extract video ID
    setTimeout(() => {
      if (validateUrl(url)) {
        const videoId = extractVideoId(url);
        if (videoId) {
          onSubmit(url);
          toast.success("URL validated successfully");
        } else {
          toast.error("Could not extract video ID from the URL");
        }
      } else {
        toast.error("Please enter a valid video URL");
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
          placeholder="Paste YouTube, Vimeo or other video URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border-0 h-14 px-4 bg-transparent text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
        />
        
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
    </form>
  );
};

export default VideoUrlInput;
