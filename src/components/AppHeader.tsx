
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

  return (
    <header className="p-4 flex justify-between items-center border-b">
      <div className="flex items-center">
        <h1 className="text-xl font-fraunces font-bold">VideoFlow</h1>
        <span className="ml-4 text-sm text-muted-foreground">Downloads: {downloadsCount}</span>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSettingsOpen(true)}
        aria-label="Settings"
      >
        <Settings className="h-5 w-5" />
      </Button>

      {/* Settings Dialog - only render when open to prevent multiple instances */}
      {settingsOpen && (
        <SettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          licenseKey={licenseKey}
          onLicenseKeyChange={setLicenseKey}
        />
      )}
    </header>
  );
};

export default AppHeader;
