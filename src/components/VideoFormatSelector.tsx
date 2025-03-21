
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from 'lucide-react';

export type VideoFormat = {
  id: string;
  quality: string;
  resolution: string;
  fileSize: string;
};

const FORMATS: VideoFormat[] = [
  { id: 'mp4-1080p', quality: 'High', resolution: '1080p', fileSize: '~120 MB' },
  { id: 'mp4-720p', quality: 'Medium', resolution: '720p', fileSize: '~80 MB' },
  { id: 'mp4-480p', quality: 'Low', resolution: '480p', fileSize: '~45 MB' },
  { id: 'mp3-audio', quality: 'Audio Only', resolution: 'N/A', fileSize: '~8 MB' },
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
    <Card className="glass-panel p-5 rounded-2xl w-full max-w-xl mx-auto animate-slide-up shadow-sm">
      <h3 className="text-base font-medium text-foreground mb-4">Select Format & Quality</h3>
      
      <RadioGroup 
        value={selectedFormat} 
        onValueChange={handleFormatChange}
        className="grid gap-3"
      >
        {FORMATS.map((format) => (
          <div
            key={format.id}
            className={`flex items-center rounded-xl border p-3 cursor-pointer transition-all-200 ${
              selectedFormat === format.id
                ? 'border-primary/50 bg-primary/5'
                : 'border-border bg-white hover:bg-muted/50'
            }`}
            onClick={() => handleFormatChange(format.id)}
          >
            <RadioGroupItem 
              value={format.id} 
              id={format.id} 
              className="sr-only" 
            />
            <div className="flex-1 space-y-1">
              <Label
                htmlFor={format.id}
                className="text-sm font-medium cursor-pointer flex items-center"
              >
                {format.quality}
                <span className="ml-2 text-xs font-normal text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                  {format.resolution}
                </span>
              </Label>
              <p className="text-xs text-muted-foreground">
                Estimated file size: {format.fileSize}
              </p>
            </div>
            <div className={`flex-shrink-0 ml-3 w-5 h-5 rounded-full flex items-center justify-center ${
              selectedFormat === format.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
            }`}>
              {selectedFormat === format.id && <Check className="h-3 w-3" />}
            </div>
          </div>
        ))}
      </RadioGroup>
    </Card>
  );
};

export default VideoFormatSelector;
