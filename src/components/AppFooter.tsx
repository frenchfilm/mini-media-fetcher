
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings, RectangleVertical, RectangleHorizontal, MessageSquare } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/components/ThemeProvider';

interface AppFooterProps {
  onOpenNewsletter?: () => void;
  onOpenContact?: () => void;
}

const AppFooter: React.FC<AppFooterProps> = ({ 
  onOpenNewsletter, 
  onOpenContact
}) => {
  const version = "v1.0.0";
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  const handleCheckUpdates = () => {
    console.log("Checking for updates...");
    // Add update check functionality here
  };

  const handleOpenSettings = () => {
    // Create and dispatch the custom event to open settings
    const event = new Event('openSettings');
    document.dispatchEvent(event);
  };

  const toggleViewMode = () => {
    if (isMobile) {
      // Switch to desktop view
      document.documentElement.classList.remove('mobile-view');
      console.log("Switching to desktop view");
    } else {
      // Switch to mobile view
      document.documentElement.classList.add('mobile-view');
      console.log("Switching to mobile view");
    }
    
    // Fire a custom event to ensure all listeners know about the change
    document.documentElement.dispatchEvent(new CustomEvent('classChange'));
    
    // Also trigger resize to update UI components
    window.dispatchEvent(new Event('resize'));
  };

  // Determine which logo to use based on current theme
  const logoSrc = theme === 'dark' 
    ? "/lovable-uploads/33093e4b-79d8-4352-af38-2ba842f18a32.png" 
    : "/lovable-uploads/7029e891-526b-4b46-a124-2069241819d7.png";

  return (
    <footer className="w-full p-6">
      <div className={`w-full flex ${isMobile ? 'flex-col-reverse gap-4' : 'flex-row'}`}>
        <div className={`${isMobile ? 'w-full items-start justify-start' : 'w-1/2'} flex items-start sm:justify-start`}>
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
        
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} flex items-center ${isMobile ? 'justify-center' : 'justify-end'} gap-2`}>
          <Button 
            size="icon"
            onClick={toggleViewMode}
            className="h-9 w-9 rounded-full app-wide-button-high-contrast"
            title={isMobile ? "Switch to Desktop View" : "Switch to Mobile View"}
          >
            {isMobile ? (
              <RectangleHorizontal className="h-5 w-5" />
            ) : (
              <RectangleVertical className="h-5 w-5" />
            )}
            <span className="sr-only">{isMobile ? "Desktop View" : "Mobile View"}</span>
          </Button>
          
          <Button 
            size="icon"
            onClick={onOpenContact}
            className="h-9 w-9 rounded-full app-wide-button-high-contrast"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Requests / Bugs</span>
          </Button>

          <Button
            size="icon"
            onClick={handleOpenSettings}
            className="h-9 w-9 rounded-full app-wide-button-high-contrast"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
