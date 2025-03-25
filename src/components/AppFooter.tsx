
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
    // Add update check functionality here
  };

  const handleOpenSettings = () => {
    // Dispatch the event to open settings
    document.dispatchEvent(new Event('openSettings'));
  };

  return (
    <footer className="h-auto min-h-[60px] w-full flex flex-col items-center">
      {/* Use flex-col-reverse to put right column on top and left column on bottom */}
      <div className={`w-full flex ${isMobile ? 'flex-col-reverse gap-2' : 'flex-row'}`}>
        {/* Left Column - Logo, App Name, Version, Update Link */}
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} flex items-start justify-center sm:justify-start mt-2 sm:mt-0`}>
          <div className="flex items-start">
            <div className={`${isMobile ? 'h-[50px]' : 'h-[72px]'} flex items-center`}>
              <img 
                src="/lovable-uploads/ee37b3bc-4867-4363-924f-9090d70c081a.png" 
                alt="SoftBare Logo" 
                className={`${isMobile ? 'h-[50px]' : 'h-[72px]'} w-auto mr-2`} 
                style={{ marginTop: "-12px" }} 
              />
            </div>
            <div className="flex flex-col items-start">
              <h1 className={`${isMobile ? 'text-sm' : 'text-base'} font-worksans font-semibold leading-tight`}>SoftBare Video Downloader</h1>
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
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} flex items-center ${isMobile ? 'justify-center' : 'justify-end'} gap-1`}>
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
