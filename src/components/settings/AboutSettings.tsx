
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, ExternalLink } from "lucide-react";

interface AboutSettingsProps {
  licenseKey: string;
}

const AboutSettings = ({ licenseKey }: AboutSettingsProps) => {
  const appVersion = "1.0.0";
  const appSlogan = "Download Videos, Anytime, Anywhere";
  const isRegistered = licenseKey && licenseKey.length > 8;

  const handleCheckForUpdates = () => {
    toast.info("Checking for updates...");
    
    // Simulate checking for updates
    setTimeout(() => {
      toast.success("Your app is up to date!");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-8">
        <div className="text-center">
          <h3 className="text-xl font-medium mb-2">SoftBare Video Downloader</h3>
          <p className="text-xs text-muted-foreground">Version {appVersion}</p>
          <p className="text-xs text-muted-foreground italic mt-1">{appSlogan}</p>
          {isRegistered && (
            <div className="flex items-center justify-center text-green-500 mt-2">
              <Check className="h-4 w-4 mr-1" />
              <span className="text-xs">Registered</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          className="w-full app-wide-button-high-contrast"
          onClick={handleCheckForUpdates}
        >
          Check for Updates
        </Button>
        
        <Button 
          className="w-full app-wide-button-high-contrast"
          onClick={() => window.open("https://example.com", "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Visit Website
        </Button>
      </div>
      
      <div className="border-t border-border pt-4 mt-6">
        <p className="text-xs text-center text-muted-foreground">
          © 2024 SoftBare. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AboutSettings;
