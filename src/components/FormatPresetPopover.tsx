
import { useState } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { VideoFormat } from "@/components/VideoFormatSelector";
import { toast } from 'sonner';

interface FormatPresetPopoverProps {
  children: React.ReactNode;
  onPresetChange: (preset: { format: VideoFormat | null, quality: string | null }) => void;
}

export const VIDEO_FORMATS: VideoFormat[] = [
  { id: "mp4-video", label: "MP4 Video", ext: ".mp4", type: "video" },
  { id: "webm-video", label: "WebM Video", ext: ".webm", type: "video" },
  { id: "mp3-audio", label: "MP3 Audio", ext: ".mp3", type: "audio" },
  { id: "wav-audio", label: "WAV Audio", ext: ".wav", type: "audio" },
];

export const QUALITY_OPTIONS = [
  { value: "highest", label: "Highest" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const FormatPresetPopover = ({ children, onPresetChange }: FormatPresetPopoverProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

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
    
    setOpen(false);
    toast.success("Format preferences saved for this session");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h3 className="font-medium text-sm">Format & Quality Presets</h3>
          <p className="text-xs text-muted-foreground">
            Set your preferred format and quality for all downloads in this session
          </p>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium" htmlFor="format-select">
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
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium" htmlFor="quality-select">
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
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="contrast" 
              size="sm" 
              onClick={handleSave}
              className="app-wide-button-high-contrast"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FormatPresetPopover;
