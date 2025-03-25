
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { ArrowRight, X, Loader2, FolderOpen } from 'lucide-react';
import { validateUrl } from '@/utils/urlValidation';

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
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex items-stretch gap-1">
        {onFolderSelect && (
          <Button
            type="button"
            variant="contrast"
            size="icon"
            onClick={onFolderSelect}
            className="h-10 w-10 rounded-md folder-button dark:bg-primary dark:text-secondary dark:border-primary/70"
            disabled={showLoading}
          >
            <FolderOpen className="h-4 w-4" />
            <span className="sr-only">Select folder</span>
          </Button>
        )}
        
        <div className="rounded-md bg-white border border-secondary/70 flex items-center overflow-hidden flex-1 dark:bg-secondary dark:border-border">
          <Input
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
          className="h-10 w-10 rounded-md action-button-dark dark:bg-primary dark:text-secondary dark:border-primary/70"
        >
          {showLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
          <span className="sr-only">Get Video</span>
        </Button>
      </div>
    </form>
  );
};

export default VideoUrlInput;
