
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

interface AppSettingsProps {
  licenseKey: string;
  onLicenseKeyChange: (key: string) => void;
}

const AppSettings = ({ licenseKey, onLicenseKeyChange }: AppSettingsProps) => {
  const { theme, setTheme } = useTheme();
  const [launchOnStartup, setLaunchOnStartup] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(true);

  const handleUnsubscribe = () => {
    toast.success("You have been unsubscribed from the newsletter");
    setIsSubscribed(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="license-key">License Key</Label>
        <Input 
          id="license-key" 
          value={licenseKey}
          onChange={(e) => onLicenseKeyChange(e.target.value)}
          placeholder="Enter your license key"
        />
        <p className="text-xs text-muted-foreground">
          Enter your license key to unlock all features
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="startup">Launch on startup</Label>
        <Switch 
          id="startup" 
          checked={launchOnStartup}
          onCheckedChange={setLaunchOnStartup}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="updates">Check for updates automatically</Label>
        <Switch 
          id="updates" 
          checked={autoUpdate}
          onCheckedChange={setAutoUpdate}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label>Theme</Label>
        <div className="flex items-center space-x-2">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            size="icon"
            onClick={() => setTheme("light")}
            className="h-8 w-8"
          >
            <Sun className="h-4 w-4" />
            <span className="sr-only">Light</span>
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            size="icon"
            onClick={() => setTheme("dark")}
            className="h-8 w-8"
          >
            <Moon className="h-4 w-4" />
            <span className="sr-only">Dark</span>
          </Button>
        </div>
      </div>
      
      <div className="pt-2">
        <p className="text-sm font-medium mb-2">Newsletter Preferences</p>
        {isSubscribed ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleUnsubscribe}
            className="w-full"
          >
            Unsubscribe from Newsletter
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">
            You are not subscribed to our newsletter.
          </p>
        )}
      </div>
    </div>
  );
};

export default AppSettings;
