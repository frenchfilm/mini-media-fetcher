
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
  return (
    <>
      <div className="text-center mb-8 animate-slide-down">
        <h2 className="text-xl font-medium mb-2">{videoInfo.title}</h2>
        <p className="text-sm text-muted-foreground">{videoUrl}</p>
      </div>
      
      {videoInfo.thumbnailUrl && (
        <div className="relative w-full max-w-md mx-auto mb-8 animate-slide-up rounded-2xl overflow-hidden shadow-sm">
          <img 
            src={videoInfo.thumbnailUrl} 
            alt={videoInfo.title}
            className="w-full h-auto object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      )}
      
      <VideoFormatSelector onSelect={onFormatSelect} />
      
      <div className="flex justify-center mt-8 animate-slide-up">
        <Button
          onClick={onStartDownload}
          disabled={!selectedFormat}
          className="w-full max-w-xl"
        >
          <Download className="h-4 w-4 mr-2" />
          Start Download
        </Button>
      </div>
      
      <div className="flex justify-center mt-3">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default FormatSelectionSection;
