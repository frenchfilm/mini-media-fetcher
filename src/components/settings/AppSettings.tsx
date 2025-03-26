
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
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

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Type assertion to ensure the value is treated as a valid theme
    const newTheme = e.target.value as "light" | "dark" | "system";
    setTheme(newTheme);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="license-key" className="text-foreground">License Key</Label>
        <Input 
          id="license-key" 
          value={licenseKey}
          onChange={(e) => onLicenseKeyChange(e.target.value)}
          placeholder="Enter your license key"
          className="bg-white border-secondary dark:bg-secondary dark:border-border dark:text-foreground dark:placeholder:text-muted-foreground"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="startup" 
          checked={launchOnStartup}
          onCheckedChange={(checked) => setLaunchOnStartup(checked === true)}
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
        <Label htmlFor="startup" className="text-foreground">Launch on startup</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="updates" 
          checked={autoUpdate}
          onCheckedChange={(checked) => setAutoUpdate(checked === true)}
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
        <Label htmlFor="updates" className="text-foreground">Check for updates automatically</Label>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="theme" className="text-foreground">Theme</Label>
        <select 
          id="theme"
          value={theme}
          onChange={handleThemeChange}
          className="flex h-10 w-full rounded-md border border-secondary bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-secondary dark:border-border dark:text-foreground"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
      
      <div className="pt-4 border-t border-border">
        <h4 className="font-medium mb-2 text-foreground">Newsletter Preferences</h4>
        {isSubscribed ? (
          <Button 
            variant="highContrast" 
            onClick={handleUnsubscribe}
            className="w-full dark:bg-primary dark:text-secondary dark:border-primary/70"
          >
            Unsubscribe from Newsletter
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            You are not subscribed to our newsletter.
          </p>
        )}
      </div>
    </div>
  );
};

export default AppSettings;
