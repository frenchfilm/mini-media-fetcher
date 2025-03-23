
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Settings, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { getDefaultDownloadPath } from "@/utils/videoUtils";
import { toast } from "sonner";

interface AppHeaderProps {
  downloadsCount: number;
}

const AppHeader = ({ downloadsCount }: AppHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [licenseKey, setLicenseKey] = useState<string>("");
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const defaultDownloadPath = getDefaultDownloadPath();
  const version = "v1.0.0";

  // Track scroll position to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <h1 className="text-lg font-medium">SoftBare Video Downloader</h1>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{version}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={checkForUpdates}
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
      
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-lg glass-panel">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Configure your download preferences and application settings.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="general" className="mt-4">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="download">Download</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="download-folder">Download Location</Label>
                <div className="flex gap-2">
                  <Input 
                    id="download-folder" 
                    readOnly 
                    value={defaultDownloadPath}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is where your downloaded videos will be saved
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="license-key">License Key</Label>
                <Input 
                  id="license-key" 
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="Enter your license key"
                  className="flex-1"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your license key to unlock all features
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="startup">Launch on startup</Label>
                <Switch id="startup" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="updates">Check for updates automatically</Label>
                <Switch id="updates" defaultChecked />
              </div>
            </TabsContent>
            
            <TabsContent value="download" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autostart">Start download automatically</Label>
                <Switch id="autostart" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="thumbnail">Download thumbnail with video</Label>
                <Switch id="thumbnail" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Show notifications</Label>
                <Switch id="notifications" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="simultaneous">Maximum simultaneous downloads</Label>
                <Input id="simultaneous" type="number" defaultValue="3" className="w-full" />
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="pt-4">
              <div className="flex items-center flex-col text-center p-4">
                <div className="flex flex-col items-center mb-3">
                  <img 
                    src="/lovable-uploads/ee37b3bc-4867-4363-924f-9090d70c081a.png" 
                    alt="SoftBare Logo" 
                    className="h-16 w-auto mb-3" 
                  />
                  <h3 className="text-lg font-medium">SoftBare Video Downloader</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{version}</p>
                <p className="text-sm max-w-xs mb-4">
                  Plain functionality, bare code, lightweight, portable, cross-platform, hosted locally, no bloat-, ad- or spyware. Apps as nature intended them.
                </p>
                
                <div className="flex justify-center mt-2 pt-2 border-t border-border w-full gap-3">
                  <Button variant="outline" size="sm" className="text-xs" onClick={checkForUpdates}>
                    Check for Updates
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => window.open("https://softbare.com", "_blank")}
                  >
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    Visit Website
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
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
            <Button onClick={() => window.open("https://softbare.com", "_blank")}>
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

export default AppHeader;
