
import { Button } from "@/components/ui/button";
import { Download, Pause, X } from 'lucide-react';

interface DownloadActionButtonsProps {
  status: 'preparing' | 'downloading' | 'paused' | 'complete';
  onTogglePause: () => void;
  onCancel: () => void;
}

const DownloadActionButtons = ({ 
  status, 
  onTogglePause, 
  onCancel 
}: DownloadActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        onClick={onTogglePause} 
        size="sm"
        disabled={status === 'preparing' || status === 'complete'}
        className="bg-primary text-white flex-1 dark:bg-primary dark:text-secondary-foreground dark:hover:bg-primary/90 dark:border-primary/70"
      >
        {status === 'paused' ? (
          <>
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Resume
          </>
        ) : (
          <>
            <Pause className="h-3.5 w-3.5 mr-1.5" />
            Pause
          </>
        )}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onCancel}
        className="bg-secondary text-primary flex-1 dark:bg-secondary dark:text-primary dark:border-primary/50 dark:hover:bg-secondary/80"
      >
        <X className="h-3.5 w-3.5 mr-1.5" />
        Cancel
      </Button>
    </div>
  );
};

export default DownloadActionButtons;
