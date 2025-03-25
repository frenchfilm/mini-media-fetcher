
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Settings } from "lucide-react";

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

  const handleCheckUpdates = () => {
    console.log("Checking for updates...");
    // Add update check functionality here
  };

  return (
    <footer className="h-[72px] w-full flex items-center px-6 bg-secondary/10">
      {/* Left Column - Logo, App Name, Version, Update Link */}
      <div className="w-1/2 flex items-start">
        <div className="flex items-start">
          <img 
            src="/lovable-uploads/ee37b3bc-4867-4363-924f-9090d70c081a.png" 
            alt="SoftBare Logo" 
            className="h-12 w-auto mr-2" 
          />
          <div className="flex flex-col items-start">
            <h1 className="text-base font-worksans font-semibold leading-tight">SoftBare</h1>
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
      <div className="w-1/2 flex items-center justify-end gap-2">
        <Button 
          variant="contrast" 
          onClick={onContactClick}
          className="action-button-dark dark:bg-primary dark:text-secondary dark:border-primary/70"
          size="sm"
        >
          <MessageSquare className="h-3 w-3 mr-1" />
          <span className="text-xs">Requests / Bugs</span>
        </Button>
        
        <Button 
          variant="contrast" 
          onClick={onOpenNewsletter}
          className="action-button-dark dark:bg-primary dark:text-secondary dark:border-primary/70"
          size="sm"
        >
          <Mail className="h-3 w-3 mr-1" />
          <span className="text-xs">Subscriptions</span>
        </Button>
      </div>
    </footer>
  );
};

export default AppFooter;
