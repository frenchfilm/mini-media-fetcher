import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type VideoFormat = {
  id: string;
  quality: string;
  resolution: string;
  fileSize: string;
};

// Enhanced formats list with more options
const FORMATS: VideoFormat[] = [
  { id: 'mp4-1080p', quality: 'High', resolution: '1080p', fileSize: '~120 MB' },
  { id: 'mp4-720p', quality: 'Medium', resolution: '720p', fileSize: '~80 MB' },
  { id: 'mp4-480p', quality: 'Low', resolution: '480p', fileSize: '~45 MB' },
  { id: 'mp4-360p', quality: 'Very Low', resolution: '360p', fileSize: '~25 MB' },
  { id: 'mkv-original', quality: 'Original Quality', resolution: 'Source', fileSize: 'Varies' },
  { id: 'mp3-audio', quality: 'Audio Only (MP3)', resolution: 'N/A', fileSize: '~8 MB' },
  { id: 'm4a-audio', quality: 'Audio Only (M4A)', resolution: 'N/A', fileSize: '~10 MB' },
];

interface VideoFormatSelectorProps {
  onSelect: (format: VideoFormat) => void;
}

const VideoFormatSelector = ({ onSelect }: VideoFormatSelectorProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string>(FORMATS[0].id);
  const isMobile = useIsMobile();

  // Select high quality format by default
  useEffect(() => {
    const highQualityFormat = FORMATS.find(f => f.id === 'mp4-1080p');
    if (highQualityFormat) {
      onSelect(highQualityFormat);
    }
  }, [onSelect]);

  const handleFormatChange = (value: string) => {
    setSelectedFormat(value);
    const format = FORMATS.find(f => f.id === value);
    if (format) {
      onSelect(format);
    }
  };

  // Mobile version with dropdown
  if (isMobile) {
    return (
      <Card className="glass-panel p-3 rounded-xl w-full flex flex-col animate-slide-up shadow-sm">
        <h3 className="text-sm font-medium text-foreground mb-3">Select Format & Quality</h3>
        
        <Select value={selectedFormat} onValueChange={handleFormatChange}>
          <SelectTrigger className="mb-2">
            <SelectValue placeholder="Select quality" />
          </SelectTrigger>
          <SelectContent>
            {FORMATS.map((format) => (
              <SelectItem key={format.id} value={format.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{format.quality}</span>
                  <span className="text-xs opacity-80">{format.resolution} • {format.fileSize}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Display currently selected format for better UX */}
        {selectedFormat && (
          <div className="mt-2 p-2 bg-secondary/50 rounded-md text-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{FORMATS.find(f => f.id === selectedFormat)?.quality}</p>
                <p className="text-xs opacity-80">
                  {FORMATS.find(f => f.id === selectedFormat)?.resolution} • 
                  {FORMATS.find(f => f.id === selectedFormat)?.fileSize}
                </p>
              </div>
              <Check className="h-4 w-4 text-primary" />
            </div>
          </div>
        )}
      </Card>
    );
  }

  // Desktop version with grid layout (unchanged)
  return (
    <Card className="glass-panel p-3 rounded-xl w-full h-full flex flex-col animate-slide-up shadow-sm">
      <h3 className="text-sm font-medium text-foreground mb-3">Select Format & Quality</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
        {FORMATS.map((format) => (
          <Button
            key={format.id}
            variant={selectedFormat === format.id ? "highContrast" : "secondaryHighContrast"}
            size="sm"
            className={`h-auto py-3 px-3 text-xs justify-start ${
              selectedFormat === format.id 
                ? 'bg-primary text-white border-primary/50 dark:bg-primary dark:text-secondary dark:border-primary/50' 
                : 'bg-secondary text-primary border-primary/30 dark:bg-secondary dark:text-primary'
            }`}
            onClick={() => handleFormatChange(format.id)}
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium">{format.quality}</span>
              <span className="text-xs opacity-80">{format.resolution} • {format.fileSize}</span>
            </div>
            {selectedFormat === format.id && (
              <Check className="h-3 w-3 ml-1 shrink-0" />
            )}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default VideoFormatSelector;
