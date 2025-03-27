
import { useState, useEffect } from "react";
import NewsletterDialog from "@/components/NewsletterDialog";
import ContactDialog from "@/components/ContactDialog";
import SettingsDialog from "@/components/settings/SettingsDialog";
import FormatPresetDialog from "@/components/format/FormatPresetDialog";
import { VideoFormat } from "@/components/VideoFormatSelector";

interface DialogManagerProps {
  children: (props: {
    openNewsletter: () => void;
    openContact: () => void;
    openSettings: () => void;
    openFormatPreset: () => void;
  }) => React.ReactNode;
}

const DialogManager = ({ children }: DialogManagerProps) => {
  const [newsletterOpen, setNewsletterOpen] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [formatPresetOpen, setFormatPresetOpen] = useState<boolean>(false);
  const [licenseKey, setLicenseKey] = useState<string>("");
  
  const openNewsletter = () => setNewsletterOpen(true);
  const openContact = () => setContactOpen(true);
  const openSettings = () => setSettingsOpen(true);
  const openFormatPreset = () => setFormatPresetOpen(true);

  // Add event listener for the openSettings event
  useEffect(() => {
    const handleOpenSettingsEvent = () => {
      openSettings();
    };
    
    document.addEventListener('openSettings', handleOpenSettingsEvent);
    
    return () => {
      document.removeEventListener('openSettings', handleOpenSettingsEvent);
    };
  }, []);

  // Add event listener for the openFormatPreset event
  useEffect(() => {
    const handleOpenFormatPresetEvent = () => {
      openFormatPreset();
    };
    
    document.addEventListener('openFormatPreset', handleOpenFormatPresetEvent);
    
    return () => {
      document.removeEventListener('openFormatPreset', handleOpenFormatPresetEvent);
    };
  }, []);

  // Get the handlePresetChange function from the parent component via props
  const handlePresetChange = (preset: { format: VideoFormat | null, quality: string | null }) => {
    // Find the onPresetChange prop in the app state
    // This will be passed to the relevant components from Index
    const event = new CustomEvent('formatPresetChanged', { detail: preset });
    document.dispatchEvent(event);
  };

  return (
    <>
      {children({
        openNewsletter,
        openContact,
        openSettings,
        openFormatPreset
      })}
      
      <NewsletterDialog
        open={newsletterOpen}
        onOpenChange={setNewsletterOpen}
      />
      
      <ContactDialog
        open={contactOpen}
        onOpenChange={setContactOpen}
      />
      
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        licenseKey={licenseKey}
        onLicenseKeyChange={setLicenseKey}
      />

      <FormatPresetDialog
        open={formatPresetOpen}
        onOpenChange={setFormatPresetOpen}
        onPresetChange={handlePresetChange}
      />
    </>
  );
};

export default DialogManager;
