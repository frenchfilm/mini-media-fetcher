
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AppLayout from '@/components/AppLayout';
import DialogManager from '@/components/DialogManager';

const MyVideos = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <DialogManager>
      {({ openNewsletter, openContact, openSettings }) => (
        <AppLayout
          onOpenNewsletter={openNewsletter}
          onOpenContact={openContact}
        >
          <div className="flex-1 flex flex-col w-full max-w-xl mx-auto px-1 sm:px-0">
            <div className="flex justify-between items-center mb-3">
              <Button 
                size="sm"
                className="px-3 py-1 h-8 text-xs font-semibold app-wide-button-high-contrast"
                onClick={() => navigate('/')}
              >
                {isMobile ? "←" : "← Back"}
              </Button>
              <h2 className="text-base font-fraunces text-center">My Videos</h2>
              <div className="w-[60px]"></div> {/* Empty div for flex spacing */}
            </div>
            
            {/* Empty content area */}
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">No videos available</p>
            </div>
          </div>
        </AppLayout>
      )}
    </DialogManager>
  );
};

export default MyVideos;
