
import { Button } from "@/components/ui/button";
import { Download, Pause, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <div className="flex gap-2">
      <Button 
        onClick={onTogglePause} 
        size="sm"
        disabled={status === 'preparing' || status === 'complete'}
        className="flex-1 px-3 py-1 h-8 text-xs font-semibold app-wide-button-high-contrast"
      >
        {status === 'paused' ? (
          <>
            <Download className="h-3.5 w-3.5 mr-1.5" />
            {isMobile ? "Resume" : "Resume"}
          </>
        ) : (
          <>
            <Pause className="h-3.5 w-3.5 mr-1.5" />
            {isMobile ? "Pause" : "Pause"}
          </>
        )}
      </Button>
      
      <Button 
        size="sm"
        onClick={onCancel}
        className="flex-1 px-3 py-1 h-8 text-xs font-semibold app-wide-button-high-contrast"
      >
        <X className="h-3.5 w-3.5 mr-1.5" />
        Cancel
      </Button>
    </div>
  );
};

export default DownloadActionButtons;
