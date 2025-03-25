
import { Card } from "@/components/ui/card";
import { VideoFormat } from '@/components/VideoFormatSelector';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <Card className="p-2 mb-2 bg-card/80">
      <div className="flex gap-2">
        {/* Thumbnail placeholder */}
        <div className={`bg-muted rounded-md flex items-center justify-center ${isMobile ? 'w-14 h-14' : 'w-20 h-20'} flex-shrink-0`}>
          <div className="text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.84 6.72 2.28"/>
              <path d="M21 3v9h-9"/>
            </svg>
          </div>
        </div>
        
        {/* Video details in a compact layout */}
        <div className="space-y-1 flex-1 overflow-hidden">
          <h3 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium truncate`}>{title}</h3>
          
          <div className="grid grid-cols-2 gap-x-2 gap-y-0 mt-1 text-[10px]">
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
