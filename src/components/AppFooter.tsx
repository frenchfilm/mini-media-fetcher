
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Settings } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface AppFooterProps {
  onOpenNewsletter?: () => void;
  onContactClick?: () => void;
  downloadsCount?: number;
}

const AppFooter: React.FC<AppFooterProps> = ({ 
  onOpenNewsletter, 
  onContactClick,
  downloadsCount = 0
}) => {
  const version = "v1.0.0";
  const isMobile = useIsMobile();

  const handleCheckUpdates = () => {
    console.log("Checking for updates...");
  };

  const handleOpenSettings = () => {
    document.dispatchEvent(new Event('openSettings'));
  };

  return (
    <footer className="h-auto min-h-[60px] w-full absolute bottom-0 left-0 right-0">
      <div className="w-full flex flex-col-reverse px-0 sm:px-4">
        {/* Left Column - Logo, App Name, Version, Update Link */}
        <div className="w-full flex items-start justify-center sm:justify-start mt-2 sm:mt-0">
          <div className="flex items-start">
            <div className="h-[50px] sm:h-[72px] flex items-center">
              <img 
                src="/lovable-uploads/ee37b3bc-4867-4363-924f-9090d70c081a.png" 
                alt="SoftBare Logo" 
                className="h-[50px] sm:h-[72px] w-auto mr-2" 
                style={{ marginTop: "-12px" }} 
              />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-sm sm:text-base font-worksans font-semibold leading-tight">SoftBare Video Downloader</h1>
              <div className="flex flex-col items-start text-[10px]">
                <span>{version}</span>
                <button 
                  className="text-[10px] underline text-primary/80 hover:text-primary"
                  onClick={handleCheckUpdates}
                >
                  Check for updates
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Buttons */}
        <div className="w-full flex items-center justify-center sm:justify-end gap-1 mb-2 sm:mb-0">
          <Button 
            variant="contrast" 
            onClick={onContactClick}
            className="action-button-dark dark:bg-primary dark:text-secondary dark:border-primary/70 font-semibold h-7 px-2"
            size="sm"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            <span className="text-[10px]">Requests</span>
          </Button>
          
          <Button 
            variant="contrast" 
            onClick={onOpenNewsletter}
            className="action-button-dark dark:bg-primary dark:text-secondary dark:border-primary/70 font-semibold h-7 px-2"
            size="sm"
          >
            <Mail className="h-3 w-3 mr-1" />
            <span className="text-[10px]">Subscribe</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleOpenSettings}
            className="h-7 w-7 rounded-full bg-primary hover:bg-primary/90"
          >
            <Settings className="h-4 w-4 text-white dark:text-secondary" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
