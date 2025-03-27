
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoFormat } from "./VideoFormatSelector";
import { Download, Trash2, FolderOpen, Clock, Play, FilePenLine, ArrowLeft } from 'lucide-react';
import { toast } from "sonner";
import { useTheme } from "@/components/ThemeProvider";

export interface DownloadItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
  format: VideoFormat;
  downloadDate: Date;
  filePath?: string;
  fileSize?: string;
  duration?: string;
}

interface DownloadHistoryProps {
  downloads: DownloadItem[];
  onClearHistory: () => void;
  onOpenFile: (item: DownloadItem) => void;
}

const DownloadHistory = ({ downloads, onClearHistory, onOpenFile }: DownloadHistoryProps) => {
  const { theme } = useTheme();
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your download history?')) {
      onClearHistory();
      toast.success('Download history cleared');
    }
  };

  const itemBgColor = theme === "dark" ? "bg-[#1e2130]" : "bg-[#9c8e6c]/40";
  const headerBgColor = theme === "dark" ? "bg-[#0f1118]" : "bg-transparent";
  const textColor = theme === "dark" ? "text-[#e8d1aa]" : "text-[#0f1118]";
  const mutedTextColor = theme === "dark" ? "text-[#e8d1aa]/70" : "text-[#0f1118]/70";
  const buttonBgColor = theme === "dark" ? "bg-[#e8d1aa] text-[#0f1118]" : "bg-[#0f1118] text-[#e8d1aa]";

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className={`flex justify-between items-center mb-6 py-4 px-4 ${headerBgColor}`}>
        <Button 
          variant="highContrast" 
          className="app-wide-button-high-contrast"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className={`text-xl font-fraunces ${textColor}`}>Downloaded Videos</h2>
        <Button
          variant="highContrast"
          className="app-wide-button-high-contrast"
          onClick={() => {
            toast.info("Open download folder");
            // Add actual open folder functionality if needed
          }}
        >
          <FolderOpen className="h-4 w-4 mr-2" />
          Open Folder
        </Button>
      </div>
      
      {downloads.length === 0 ? (
        <div className={`text-center py-20 ${mutedTextColor}`}>
          <Download className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg">Your download history will appear here</p>
        </div>
      ) : (
        <div className="space-y-2 px-2">
          {downloads.map((item) => (
            <div 
              key={item.id} 
              className={`flex gap-4 p-4 rounded-md ${itemBgColor} border border-[#9c8e6c]/20`}
            >
              <div 
                className="w-36 h-24 rounded bg-muted flex-shrink-0 overflow-hidden bg-cover bg-center flex items-center justify-center"
                style={{ 
                  backgroundImage: item.thumbnailUrl ? `url(${item.thumbnailUrl})` : undefined,
                  backgroundColor: !item.thumbnailUrl ? '#e9e2d0' : undefined
                }}
              >
                {!item.thumbnailUrl && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/30">
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.84 6.72 2.28"/>
                    <path d="M21 3v9h-9"/>
                  </svg>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`text-base font-medium ${textColor}`}>{item.title}</h4>
                
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-sm">
                  <div className="flex">
                    <span className={`${mutedTextColor} mr-2`}>Size:</span>
                    <span className={textColor}>{item.fileSize || '128.5 MB'}</span>
                  </div>
                  <div className="flex">
                    <span className={`${mutedTextColor} mr-2`}>Format:</span>
                    <span className={textColor}>{item.format.quality} MP4</span>
                  </div>
                  <div className="flex">
                    <span className={`${mutedTextColor} mr-2`}>Duration:</span>
                    <span className={textColor}>{item.duration || '10:42'}</span>
                  </div>
                  <div className="flex">
                    <span className={`${mutedTextColor} mr-2`}>Date:</span>
                    <span className={textColor}>{formatDate(item.downloadDate)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button
                  size="icon"
                  className={`h-8 w-8 rounded-md ${theme === "dark" ? "bg-[#e8d1aa] text-[#0f1118]" : "bg-[#e8d1aa] text-[#0f1118]"} hover:opacity-90`}
                  onClick={() => toast.info(`Playing ${item.title}`)}
                >
                  <Play className="h-4 w-4" />
                  <span className="sr-only">Play</span>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className={`h-8 w-8 rounded-md ${theme === "dark" ? "bg-[#e8d1aa] text-[#0f1118]" : "bg-[#e8d1aa] text-[#0f1118]"} border-none hover:opacity-90`}
                  onClick={() => toast.info(`Delete ${item.title}`)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="softbare-footer">
        <p className="font-medium">Our Apps are bare - as Nature intended them.</p>
        <p>Quiet by design, lightweight, no ads, no tracking, just plain function.</p>
      </div>
    </div>
  );
};

export default DownloadHistory;
