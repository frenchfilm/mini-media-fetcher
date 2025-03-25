
import { Card } from "@/components/ui/card";
import { VideoFormat } from '@/components/VideoFormatSelector';

interface VideoDetailsCardProps {
  title: string;
  duration: string;
  totalSize: number;
  selectedFormat: VideoFormat;
}

const VideoDetailsCard = ({ 
  title, 
  duration, 
  totalSize, 
  selectedFormat 
}: VideoDetailsCardProps) => {
  return (
    <Card className="p-3 mb-3 bg-card/80">
      <div className="flex gap-3">
        {/* Thumbnail placeholder */}
        <div className="bg-muted rounded-md flex items-center justify-center w-20 h-20 flex-shrink-0">
          <div className="text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.84 6.72 2.28"/>
              <path d="M21 3v9h-9"/>
            </svg>
          </div>
        </div>
        
        {/* Video details in a compact layout */}
        <div className="space-y-1 flex-1 overflow-hidden">
          <h3 className="text-sm font-medium truncate">{title}</h3>
          
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
            <p><span className="font-medium">Duration:</span> {duration}</p>
            <p><span className="font-medium">Size:</span> {totalSize.toFixed(1)} MB</p>
            <p><span className="font-medium">Format:</span> {selectedFormat.quality} MP4</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoDetailsCard;
