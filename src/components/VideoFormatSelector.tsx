
import { useState } from 'react';
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

  const handleFormatChange = (value: string) => {
    setSelectedFormat(value);
    const format = FORMATS.find(f => f.id === value);
    if (format) {
      onSelect(format);
    }
  };

  return (
    <Card className="glass-panel p-4 rounded-xl w-full max-w-xl mx-auto animate-slide-up shadow-sm">
      <h3 className="text-sm font-medium text-foreground mb-3">Select Format & Quality</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {FORMATS.map((format) => (
          <Button
            key={format.id}
            variant={selectedFormat === format.id ? "contrast" : "outline"}
            size="sm"
            className={`h-auto py-2 justify-start ${
              selectedFormat === format.id ? 'border-primary/50 dark:bg-primary dark:text-secondary' : 'border-border dark:text-secondary-foreground'
            }`}
            onClick={() => handleFormatChange(format.id)}
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-medium">{format.quality}</span>
              <span className="text-[10px] text-muted-foreground dark:text-secondary-foreground/70">{format.resolution} • {format.fileSize}</span>
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
