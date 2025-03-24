
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import SettingsDialog from "./settings/SettingsDialog";
import { Link } from "react-router-dom";

interface AppHeaderProps {
  downloadsCount: number;
}

const AppHeader = ({ downloadsCount }: AppHeaderProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [licenseKey, setLicenseKey] = useState<string>("");
  const version = "v1.0.0";

  const handleCheckUpdates = () => {
    if (!licenseKey.trim()) {
      setSettingsOpen(true);
    } else {
      // Simulate checking for updates with a valid license
      alert("You're using the latest version of SoftBare Video Downloader!");
    }
  };

  return (
    <>
      <header className="w-full p-4 flex items-center justify-between z-10 bg-background">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/ee37b3bc-4867-4363-924f-9090d70c081a.png" 
            alt="SoftBare Logo" 
            className="h-20 w-auto mr-4" 
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-worksans font-semibold leading-tight">SoftBare Video Downloader</h1>
            <div className="flex items-center space-x-2 text-xs">
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
        
        <Button
          variant="contrast"
          size="icon"
          onClick={() => setSettingsOpen(true)}
          className="h-10 w-10 rounded-full bg-secondary border border-secondary/70 text-primary dark:bg-primary dark:text-secondary dark:border-primary"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </header>
      
      {/* Settings Dialog */}
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        licenseKey={licenseKey}
        onLicenseKeyChange={setLicenseKey}
      />
    </>
  );
};

export default AppHeader;
