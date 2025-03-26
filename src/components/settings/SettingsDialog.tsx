
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DownloadSettings from "./DownloadSettings";
import AppSettings from "./AppSettings";
import AboutSettings from "./AboutSettings";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  licenseKey: string;
  onLicenseKeyChange: (key: string) => void;
}

const SettingsDialog = ({ 
  open, 
  onOpenChange,
  licenseKey,
  onLicenseKeyChange
}: SettingsDialogProps) => {
  const [activeTab, setActiveTab] = useState("download");
  const isMobile = useIsMobile();
  
  const handleSave = () => {
    onOpenChange(false);
  };

  // Fixed dialog content height for all tabs
  const dialogHeight = isMobile ? "540px" : "570px";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-xl p-0 overflow-hidden border-none bg-background"
        style={{ height: dialogHeight }}
      >
        {/* Fixed header section - absolute positioning */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 border-b w-full bg-background">
          <Button 
            className="app-wide-button-high-contrast"
            onClick={() => onOpenChange(false)}
          >
            ← Back
          </Button>
          <DialogTitle className="text-xl font-fraunces">Settings</DialogTitle>
          <Button 
            className="app-wide-button-high-contrast"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
        
        {/* Fixed tabs section - absolute positioning */}
        <div className="absolute top-16 left-0 right-0 z-10 px-4 py-3 bg-background">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-3 bg-muted p-1 rounded-md">
              <TabsTrigger 
                value="download" 
                className={`font-medium ${activeTab === 'download' 
                  ? 'settings-tab-active' 
                  : 'settings-tab-inactive'}`}
              >
                Download
              </TabsTrigger>
              <TabsTrigger 
                value="app" 
                className={`font-medium ${activeTab === 'app' 
                  ? 'settings-tab-active' 
                  : 'settings-tab-inactive'}`}
              >
                App
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className={`font-medium ${activeTab === 'about' 
                  ? 'settings-tab-active' 
                  : 'settings-tab-inactive'}`}
              >
                About
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Content area with padding to account for fixed header and tabs */}
        <div className="pt-32 px-4 pb-4 h-full overflow-hidden">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full h-full"
          >
            <TabsContent value="download" className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col">
              <h3 className="text-lg font-fraunces mb-3">Download Settings</h3>
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                  <DownloadSettings />
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="app" className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col">
              <h3 className="text-lg font-fraunces mb-3">Application Settings</h3>
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                  <AppSettings 
                    licenseKey={licenseKey}
                    onLicenseKeyChange={onLicenseKeyChange}
                  />
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col">
              <h3 className="text-lg font-fraunces mb-3">About</h3>
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                  <AboutSettings 
                    licenseKey={licenseKey}
                  />
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
