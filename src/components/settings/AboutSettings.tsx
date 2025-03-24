
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface AboutSettingsProps {
  licenseKey: string;
}

const AboutSettings = ({ licenseKey }: AboutSettingsProps) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const version = "v1.0.0";
  const currentYear = new Date().getFullYear();

  const checkForUpdates = () => {
    if (!licenseKey.trim()) {
      setUpdateDialogOpen(true);
    } else {
      // Simulate checking for updates with a valid license
      toast.success("You're using the latest version of SoftBare Video Downloader!");
    }
  };

  return (
    <>
      <div className="flex items-center flex-col text-center p-4">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/lovable-uploads/ee37b3bc-4867-4363-924f-9090d70c081a.png" 
            alt="SoftBare Logo" 
            className="h-32 w-auto mb-3" 
          />
          <h3 className="text-lg font-fraunces text-foreground">SoftBare Video Downloader</h3>
          <p className="text-sm text-muted-foreground mb-2">{version}</p>
        </div>
        
        <p className="text-xs text-muted-foreground mb-8">
          Copyright © {currentYear} SoftBare. All rights reserved.
        </p>
        
        <div className="flex justify-center mt-4 gap-3">
          <Button 
            variant="outline" 
            className="softbare-button dark:bg-primary dark:text-secondary-foreground dark:hover:bg-primary/90 dark:border-primary/70" 
            onClick={checkForUpdates}
          >
            Check for Updates
          </Button>
          <Button 
            variant="outline" 
            className="softbare-button dark:bg-primary dark:text-secondary-foreground dark:hover:bg-primary/90 dark:border-primary/70"
            onClick={() => window.open("https://softbare.com", "_blank")}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            Visit Website
          </Button>
        </div>
      </div>

      {/* License key required dialog */}
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>License Required</DialogTitle>
            <DialogDescription>
              To check for updates, you need a valid license key.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-3">
            <p className="text-sm">
              Please purchase a license key from our website to access software updates and premium features.
            </p>
            <Button 
              onClick={() => window.open("https://softbare.com", "_blank")} 
              className="softbare-button dark:bg-primary dark:text-secondary-foreground dark:hover:bg-primary/90 dark:border-primary/70"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit SoftBare.com
            </Button>
            <p className="text-xs text-muted-foreground">
              Already have a license? Enter it in the Settings panel.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutSettings;
