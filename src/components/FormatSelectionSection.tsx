
import { useEffect, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import VideoFormatSelector, { VideoFormat } from "@/components/VideoFormatSelector";

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
      <div className="text-center mb-4 animate-slide-down">
        <h2 className="text-xl font-medium mb-2">{videoInfo.title}</h2>
        <p className="text-sm text-muted-foreground">{videoUrl}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
        {/* Left Column: Preview image */}
        <div className="flex flex-col items-center">
          {displayImage && (
            <div className="relative w-full max-w-xs mx-auto mb-4 rounded-xl overflow-hidden shadow-sm">
              <img 
                src={displayImage} 
                alt={videoInfo.title}
                className="w-full h-auto object-cover" 
                onError={(e) => {
                  // If the preview image fails, fall back to thumbnail
                  if (e.currentTarget.src !== videoInfo.thumbnailUrl && videoInfo.thumbnailUrl) {
                    e.currentTarget.src = videoInfo.thumbnailUrl;
                  } else {
                    // If both fail, use a placeholder
                    e.currentTarget.src = "https://placeholder.pics/svg/300x200/DEDEDE/555555/Video";
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          )}
        </div>
        
        {/* Right Column: Format selector */}
        <div className="flex items-start justify-center">
          <VideoFormatSelector onSelect={onFormatSelect} />
        </div>
      </div>
      
      {/* Action buttons below both columns */}
      <div className="flex gap-3 justify-center mt-6">
        <Button
          onClick={onStartDownload}
          className="px-6"
          size="lg"
          variant="highContrast"
        >
          <Download className="h-4 w-4 mr-2" />
          Start Download
        </Button>
        
        <Button
          variant="outline"
          onClick={onCancel}
          size="lg"
          className="bg-secondary text-primary font-medium border-primary/30 hover:bg-secondary/80 hover:text-primary/90"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default FormatSelectionSection;
