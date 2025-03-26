
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Settings } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/components/ThemeProvider';

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
  const { theme } = useTheme();

  const handleCheckUpdates = () => {
    console.log("Checking for updates...");
    // Add update check functionality here
  };

  const handleOpenSettings = () => {
    // Dispatch the event to open settings
    document.dispatchEvent(new Event('openSettings'));
  };

  // Determine which logo to use based on current theme
  const logoSrc = theme === 'dark' 
    ? "/lovable-uploads/33093e4b-79d8-4352-af38-2ba842f18a32.png" 
    : "/lovable-uploads/7029e891-526b-4b46-a124-2069241819d7.png";

  return (
    <footer className="h-auto min-h-[72px] w-full flex flex-col items-center mt-2">
      {/* Use flex-col-reverse to put right column on top and left column on bottom */}
      <div className={`w-full flex ${isMobile ? 'flex-col-reverse gap-4' : 'flex-row'}`}>
        {/* Left Column - Logo, App Name, Version, Update Link */}
        <div className={`${isMobile ? 'w-full items-start justify-start' : 'w-1/2'} flex items-start sm:justify-start mt-2 sm:mt-0`}>
          <div className="flex items-start">
            <div className="h-[72px] flex items-center">
              <img 
                src={logoSrc}
                alt="SoftBare Logo" 
                className="h-[72px] w-auto mr-2" 
                style={{ marginTop: "-12px" }} 
              />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-base font-worksans font-semibold leading-tight">SoftBare Video Downloader</h1>
              <div className="flex flex-col items-start text-xs">
                <span>{version}</span>
                <button 
                  className="text-xs underline text-primary/80 hover:text-primary"
                  onClick={handleCheckUpdates}
                >
                  Check for updates
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Buttons */}
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} flex items-center ${isMobile ? 'justify-center' : 'justify-end'} gap-2`}>
          <Button 
            variant="contrast" 
            onClick={onContactClick}
            className="action-button-dark dark:bg-primary dark:text-secondary dark:border-primary/70 font-semibold"
            size="sm"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            <span className="text-xs">Requests / Bugs</span>
          </Button>
          
          <Button 
            variant="contrast" 
            onClick={onOpenNewsletter}
            className="action-button-dark dark:bg-primary dark:text-secondary dark:border-primary/70 font-semibold"
            size="sm"
          >
            <Mail className="h-3 w-3 mr-1" />
            <span className="text-xs">Subscriptions</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleOpenSettings}
            className="h-9 w-9 rounded-full bg-primary hover:bg-primary/90"
          >
            <Settings className="h-5 w-5 text-white dark:text-secondary" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
