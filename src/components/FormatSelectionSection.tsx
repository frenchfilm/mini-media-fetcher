
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import VideoFormatSelector, { VideoFormat } from "@/components/VideoFormatSelector";
import VideoThumbnailPreview from "@/components/VideoThumbnailPreview";
import { useIsMobile } from "@/hooks/use-mobile";

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
  // Make sure we have the correct image property, log it for debugging
  const displayImage = videoInfo.thumbnailUrl || videoInfo.previewImage;
  console.log("Display image URL:", displayImage);
  console.log("Video info:", videoInfo);
  
  const isMobile = useIsMobile();
  
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
    <div className="w-full max-w-full px-1 sm:px-0">
      <div className="flex justify-between items-center mb-3">
        <Button 
          variant="highContrast"
          size="sm"
          className="px-3 py-1 h-8 text-xs font-semibold"
          onClick={onCancel}
        >
          {isMobile ? "←" : "← Back"}
        </Button>
        <h2 className="text-base font-fraunces text-center">Download</h2>
        <div className="w-[60px]"></div> {/* Empty div for flex spacing */}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Video Preview Column */}
        <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl">
          <div className="text-center w-full mb-3 animate-slide-down">
            <h2 className="text-lg font-medium mb-1 mx-auto">{videoInfo.title}</h2>
            <p className="text-xs text-muted-foreground break-words w-full text-center">{videoUrl}</p>
          </div>
          
          <div className="w-full flex justify-center mb-3">
            {displayImage && (
              <VideoThumbnailPreview 
                src={displayImage} 
                alt={videoInfo.title} 
              />
            )}
          </div>
          
          <div className="flex gap-2 justify-center mt-auto">
            <Button
              onClick={onStartDownload}
              variant="highContrast"
              className="px-3 py-1 h-8 text-xs font-semibold"
            >
              <Download className="h-3 w-3 mr-1" />
              Start Download
            </Button>
            
            <Button
              variant="highContrast"
              onClick={onCancel}
              className="px-3 py-1 h-8 text-xs font-semibold"
            >
              Cancel
            </Button>
          </div>
        </div>
        
        {/* Format Selection Column */}
        <div className="flex">
          <VideoFormatSelector onSelect={onFormatSelect} />
        </div>
      </div>
    </div>
  );
}

export default FormatSelectionSection;

