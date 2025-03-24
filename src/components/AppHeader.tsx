
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import SettingsDialog from "./settings/SettingsDialog";

interface AppHeaderProps {
  downloadsCount: number;
}

const AppHeader = ({ downloadsCount }: AppHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [licenseKey, setLicenseKey] = useState<string>("");
  const version = "v1.0.0";

  // Track scroll position to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`sticky top-0 w-full p-4 flex items-center justify-between z-10 transition-all-300 ${
          isScrolled ? 'backdrop-blur-8 bg-background/80 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/ee37b3bc-4867-4363-924f-9090d70c081a.png" 
            alt="SoftBare Logo" 
            className="h-8 w-auto mr-3" 
          />
          <div>
            <h1 className="text-lg font-fraunces">SoftBare Video Downloader</h1>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{version}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={() => {
                  if (!licenseKey.trim()) {
                    setSettingsOpen(true);
                  } else {
                    // Simulate checking for updates with a valid license
                    alert("You're using the latest version of SoftBare Video Downloader!");
                  }
                }}
              >
                Check for updates
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-x-2">
          {downloadsCount > 0 && (
            <div className="text-sm text-muted-foreground mr-2">
              {downloadsCount} download{downloadsCount !== 1 ? 's' : ''}
            </div>
          )}
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSettingsOpen(true)}
            className="h-9 w-9 rounded-full"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
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
