
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
  const contentHeight = isMobile ? "400px" : "430px";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-xl p-0 overflow-hidden border-none bg-background top-0 translate-y-0"
        style={{ height: dialogHeight }}
      >
        {/* Fixed header section */}
        <div className="flex justify-between items-center p-3 border-b">
          <Button 
            variant="highContrast" 
            className="dark:bg-primary dark:text-secondary dark:border-primary/70"
            onClick={() => onOpenChange(false)}
          >
            ← Back
          </Button>
          <DialogTitle className="text-xl font-fraunces">Settings</DialogTitle>
          <Button 
            variant="highContrast"
            className="dark:bg-primary dark:text-secondary dark:border-primary/70"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
        
        {/* Fixed layout with consistent spacing */}
        <div className="flex flex-col h-full">
          {/* Fixed tabs section */}
          <div className="px-4 pt-2 pb-3">
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
          
          {/* Content area with fixed height and consistent padding */}
          <div className="px-4 pb-4 flex-1 overflow-hidden">
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
