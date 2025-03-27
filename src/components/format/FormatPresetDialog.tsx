
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VIDEO_FORMATS, QUALITY_OPTIONS } from "@/components/FormatPresetPopover";
import { VideoFormat } from "@/components/VideoFormatSelector";
import { toast } from "sonner";

interface FormatPresetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPresetChange: (preset: { format: VideoFormat | null, quality: string | null }) => void;
}

const FormatPresetDialog = ({ 
  open, 
  onOpenChange,
  onPresetChange
}: FormatPresetDialogProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const handleSave = () => {
    if (!selectedFormat && !selectedQuality) {
      toast.error("Please select at least one preference");
      return;
    }

    const format = selectedFormat 
      ? VIDEO_FORMATS.find(f => f.id === selectedFormat) || null 
      : null;
    
    onPresetChange({ 
      format, 
      quality: selectedQuality 
    });
    
    onOpenChange(false);
    toast.success("Format preferences saved for this session");
  };

  // Fixed dialog content height
  const dialogHeight = isMobile ? "400px" : "450px";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md p-0 overflow-hidden border-none bg-background"
        style={{ height: dialogHeight }}
        aria-describedby="format-preset-description"
      >
        {/* Fixed header section - absolute positioning */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 border-b w-full bg-background">
          <Button 
            className="app-wide-button-high-contrast"
            onClick={() => onOpenChange(false)}
          >
            ← Back
          </Button>
          <DialogTitle className="text-xl font-fraunces">Format Presets</DialogTitle>
          <Button 
            className="app-wide-button-high-contrast"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
        
        {/* Hidden description for accessibility */}
        <DialogDescription id="format-preset-description" className="sr-only">
          Set your preferred format and quality for all downloads in this session
        </DialogDescription>
        
        {/* Content area with padding to account for fixed header */}
        <div className="pt-16 px-4 pb-4 h-full overflow-hidden">
          <div className="h-full flex flex-col">
            <h3 className="text-lg font-fraunces mb-3">Default Format &amp; Quality</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Set your preferred format and quality for all downloads in this session
            </p>
            
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="format-select">
                        Format
                      </label>
                      <Select 
                        value={selectedFormat || ""} 
                        onValueChange={setSelectedFormat}
                      >
                        <SelectTrigger id="format-select">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          {VIDEO_FORMATS.map((format) => (
                            <SelectItem key={format.id} value={format.id}>
                              {format.quality} ({format.resolution})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="quality-select">
                        Quality
                      </label>
                      <Select 
                        value={selectedQuality || ""} 
                        onValueChange={setSelectedQuality}
                      >
                        <SelectTrigger id="quality-select">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          {QUALITY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground">
                        These preferences will be applied to all new downloads during this session.
                        For permanent format preferences, go to Settings &gt; Download.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormatPresetDialog;
