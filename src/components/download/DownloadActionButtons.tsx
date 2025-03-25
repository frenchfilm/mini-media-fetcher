
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
        variant="default"
        className="flex-1 dark:bg-secondary-light dark:text-primary-dark dark:hover:bg-secondary-light/90 dark:border-primary-dark/30"
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
        className="flex-1 dark:bg-secondary dark:text-primary-foreground dark:border-border dark:hover:bg-secondary/80"
      >
        <X className="h-3.5 w-3.5 mr-1.5" />
        Cancel
      </Button>
    </div>
  );
};

export default DownloadActionButtons;
