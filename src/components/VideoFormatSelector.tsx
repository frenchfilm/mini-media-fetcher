
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

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

  return (
    <Card className="glass-panel p-6 rounded-xl w-full shadow-sm h-full flex-1">
      <h3 className="text-sm font-medium text-foreground mb-5 text-center">Select Format & Quality</h3>
      
      {/* Top row for video formats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {FORMATS.slice(0, 4).map((format) => (
          <Button
            key={format.id}
            variant={selectedFormat === format.id ? "highContrast" : "secondaryHighContrast"}
            size="sm"
            className={`h-auto py-3 justify-start w-full ${
              selectedFormat === format.id 
                ? 'bg-primary text-white border-primary/50 dark:bg-primary dark:text-secondary dark:border-primary/50' 
                : 'bg-secondary text-primary border-primary/30 dark:bg-secondary dark:text-primary'
            }`}
            onClick={() => handleFormatChange(format.id)}
          >
            <div className="flex flex-col items-start text-left w-full">
              <span className="text-xs font-medium truncate w-full">{format.quality}</span>
              <span className="text-[10px] opacity-80 truncate w-full">{format.resolution} • {format.fileSize}</span>
            </div>
            {selectedFormat === format.id && (
              <Check className="h-3 w-3 ml-1 shrink-0" />
            )}
          </Button>
        ))}
      </div>
      
      {/* Bottom row for special formats */}
      <div className="grid grid-cols-3 gap-3">
        {FORMATS.slice(4).map((format) => (
          <Button
            key={format.id}
            variant={selectedFormat === format.id ? "highContrast" : "secondaryHighContrast"}
            size="sm"
            className={`h-auto py-3 justify-start w-full ${
              selectedFormat === format.id 
                ? 'bg-primary text-white border-primary/50 dark:bg-primary dark:text-secondary dark:border-primary/50' 
                : 'bg-secondary text-primary border-primary/30 dark:bg-secondary dark:text-primary'
            }`}
            onClick={() => handleFormatChange(format.id)}
          >
            <div className="flex flex-col items-start text-left w-full">
              <span className="text-xs font-medium truncate w-full">{format.quality}</span>
              <span className="text-[10px] opacity-80 truncate w-full">{format.resolution} • {format.fileSize}</span>
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
