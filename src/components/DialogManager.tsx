
import { useState } from "react";
import NewsletterDialog from "@/components/NewsletterDialog";
import ContactDialog from "@/components/ContactDialog";
import SettingsDialog from "@/components/settings/SettingsDialog";

interface DialogManagerProps {
  children: (props: {
    openNewsletter: () => void;
    openContact: () => void;
    openSettings: () => void;
  }) => React.ReactNode;
}

const DialogManager = ({ children }: DialogManagerProps) => {
  const [newsletterOpen, setNewsletterOpen] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [licenseKey, setLicenseKey] = useState<string>("");
  
  const openNewsletter = () => setNewsletterOpen(true);
  const openContact = () => setContactOpen(true);
  const openSettings = () => setSettingsOpen(true);

  return (
    <>
      {children({
        openNewsletter,
        openContact,
        openSettings
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
    </>
  );
};

export default DialogManager;
