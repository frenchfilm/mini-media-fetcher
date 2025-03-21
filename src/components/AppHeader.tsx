
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Settings, Download, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface AppHeaderProps {
  downloadsCount: number;
}

const AppHeader = ({ downloadsCount }: AppHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Track scroll position to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`sticky top-0 w-full p-4 flex items-center justify-between z-10 transition-all-300 ${
          isScrolled ? 'backdrop-blur-8 bg-background/80 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center">
          <Download className="h-5 w-5 mr-2 text-primary" />
          <h1 className="text-lg font-medium">Video Downloader</h1>
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
                    value="~/Downloads/VideoDownloader" 
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
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
                <div className="flex items-center mb-3">
                  <Download className="h-6 w-6 mr-2 text-primary" />
                  <h3 className="text-lg font-medium">Video Downloader</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Version 1.0.0</p>
                <p className="text-sm max-w-xs mb-4">
                  A lightweight, elegant video downloader application for easily saving videos from the web.
                </p>
                
                <div className="flex justify-center mt-2 pt-2 border-t border-border w-full">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Info className="h-3.5 w-3.5 mr-1.5" />
                    Check for Updates
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppHeader;
