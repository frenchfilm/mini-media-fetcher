
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DownloadSettings from "./DownloadSettings";
import AppSettings from "./AppSettings";
import AboutSettings from "./AboutSettings";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
  
  const handleSave = () => {
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-none bg-background">
        <div className="flex justify-between items-center p-4 border-b">
          <Button 
            variant="outline" 
            className="softbare-button"
            onClick={() => onOpenChange(false)}
          >
            ← Back
          </Button>
          <DialogTitle className="text-xl font-fraunces">Settings</DialogTitle>
          <Button 
            variant="outline" 
            className="softbare-button-dark"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
        
        <div className="p-6">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger 
                value="download" 
                className={`font-medium ${activeTab === 'download' ? 'bg-primary text-secondary' : 'bg-secondary/50 text-primary'}`}
              >
                Download
              </TabsTrigger>
              <TabsTrigger 
                value="app" 
                className={`font-medium ${activeTab === 'app' ? 'bg-primary text-secondary' : 'bg-secondary/50 text-primary'}`}
              >
                App
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className={`font-medium ${activeTab === 'about' ? 'bg-primary text-secondary' : 'bg-secondary/50 text-primary'}`}
              >
                About
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="download" className="space-y-4 mt-2">
              <h3 className="text-lg font-fraunces mb-4">Download Settings</h3>
              <DownloadSettings />
            </TabsContent>
            
            <TabsContent value="app" className="space-y-4 mt-2">
              <h3 className="text-lg font-fraunces mb-4">Application Settings</h3>
              <AppSettings 
                licenseKey={licenseKey}
                onLicenseKeyChange={onLicenseKeyChange}
              />
            </TabsContent>
            
            <TabsContent value="about" className="mt-2">
              <AboutSettings 
                licenseKey={licenseKey}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="softbare-footer">
          <p className="font-medium">Our Apps are bare - as Nature intended them.</p>
          <p>Quiet by design, lightweight, no ads, no tracking, just plain function.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
