
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DownloadSettings from "./DownloadSettings";
import AppSettings from "./AppSettings";
import AboutSettings from "./AboutSettings";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg glass-panel">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your download preferences and application settings.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="download">Download</TabsTrigger>
            <TabsTrigger value="app">App</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="download" className="space-y-4 pt-4">
            <DownloadSettings />
          </TabsContent>
          
          <TabsContent value="app" className="space-y-4 pt-4">
            <AppSettings 
              licenseKey={licenseKey}
              onLicenseKeyChange={onLicenseKeyChange}
            />
          </TabsContent>
          
          <TabsContent value="about" className="pt-4">
            <AboutSettings 
              licenseKey={licenseKey}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
