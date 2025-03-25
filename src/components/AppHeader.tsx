
import { useState, useEffect } from 'react';
import SettingsDialog from "./settings/SettingsDialog";

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
    <>
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
