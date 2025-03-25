
import { useState, useEffect } from 'react';
import SettingsDialog from "./settings/SettingsDialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface AppHeaderProps {
  downloadsCount: number;
}

const AppHeader = ({ downloadsCount }: AppHeaderProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [licenseKey, setLicenseKey] = useState<string>("");

  // Listen for settings open event
  useEffect(() => {
    const handleOpenSettings = () => {
      setSettingsOpen(true);
    };
    
    document.addEventListener('openSettings', handleOpenSettings);
    
    return () => {
      document.removeEventListener('openSettings', handleOpenSettings);
    };
  }, []);

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  return (
    <>
      {/* Settings Button */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpenSettings}
          className="h-9 w-9 rounded-full bg-secondary/50 hover:bg-secondary text-foreground"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>

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
