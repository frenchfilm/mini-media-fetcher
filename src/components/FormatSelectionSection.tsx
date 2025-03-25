
import { useEffect, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import VideoFormatSelector, { VideoFormat } from "@/components/VideoFormatSelector";
import VideoThumbnailPreview from "@/components/VideoThumbnailPreview";

interface FormatSelectionSectionProps {
  videoInfo: any;
  videoUrl: string;
  onFormatSelect: (format: VideoFormat) => void;
  selectedFormat: VideoFormat | null;
  onStartDownload: () => void;
  onCancel: () => void;
}

const FormatSelectionSection = ({
  videoInfo,
  videoUrl,
  onFormatSelect,
  selectedFormat,
  onStartDownload,
  onCancel
}: FormatSelectionSectionProps) => {
  // Use the best available image for display
  const displayImage = videoInfo.previewImage || videoInfo.thumbnailUrl;
  
  // Handle keyboard events for Enter key
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter' && selectedFormat) {
        onStartDownload();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFormat, onStartDownload]);
  
  return (
    <>
      <div className="text-center mb-3 animate-slide-down">
        <h2 className="text-xl font-medium mb-1">{videoInfo.title}</h2>
        <p className="text-sm text-muted-foreground truncate">{videoUrl}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column - Video Preview */}
        <div className="flex flex-col h-[250px]">
          {displayImage && (
            <VideoThumbnailPreview 
              src={displayImage} 
              alt={videoInfo.title} 
            />
          )}
        </div>
        
        {/* Right Column */}
        <div className="flex flex-col h-full">
          {/* Right Column Section 1: Format Selector */}
          <div className="mb-4">
            <VideoFormatSelector onSelect={onFormatSelect} />
          </div>
          
          {/* Right Column Section 2: Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={onStartDownload}
              className="px-4"
              size="default"
              variant="highContrast"
            >
              <Download className="h-4 w-4 mr-2" />
              Start Download
            </Button>
            
            <Button
              variant="outline"
              onClick={onCancel}
              size="default"
              className="bg-secondary text-primary font-medium border-primary/30 hover:bg-secondary/80 hover:text-primary/90"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormatSelectionSection;
