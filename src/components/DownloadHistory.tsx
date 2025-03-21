
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoFormat } from "./VideoFormatSelector";
import { Download, Trash2, FolderOpen, Clock } from "lucide-react";
import { toast } from "sonner";

export interface DownloadItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
  format: VideoFormat;
  downloadDate: Date;
  filePath?: string;
}

interface DownloadHistoryProps {
  downloads: DownloadItem[];
  onClearHistory: () => void;
  onOpenFile: (item: DownloadItem) => void;
}

const DownloadHistory = ({ downloads, onClearHistory, onOpenFile }: DownloadHistoryProps) => {
  // Format date to readable format
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your download history?')) {
      onClearHistory();
      toast.success('Download history cleared');
    }
  };

  return (
    <Card className="glass-panel rounded-2xl p-5 w-full max-w-xl mx-auto shadow-sm animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          Download History
        </h3>
        
        {downloads.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearHistory}
            className="h-8 text-xs text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        )}
      </div>
      
      {downloads.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Download className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">Your download history will appear here</p>
        </div>
      ) : (
        <ScrollArea className="h-[280px] pr-3 -mr-3">
          <div className="space-y-3">
            {downloads.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-3 p-3 rounded-xl bg-white border border-border/50 hover:border-border transition-all-200"
              >
                <div 
                  className="w-20 h-12 rounded bg-muted flex-shrink-0 overflow-hidden bg-cover bg-center"
                  style={{ 
                    backgroundImage: item.thumbnailUrl ? `url(${item.thumbnailUrl})` : undefined,
                    backgroundColor: !item.thumbnailUrl ? '#f1f5f9' : undefined
                  }}
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{item.title}</h4>
                  
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5 bg-muted/50">
                      {item.format.quality}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5 bg-muted/50">
                      {item.format.resolution}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-0.5" />
                      {formatDate(item.downloadDate)}
                    </span>
                  </div>
                </div>
                
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onOpenFile(item)}
                  className="h-8 w-8 rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary"
                >
                  <FolderOpen className="h-4 w-4" />
                  <span className="sr-only">Open file</span>
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </Card>
  );
};

export default DownloadHistory;
