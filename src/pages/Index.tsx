import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import VideoUrlInput from "@/components/VideoUrlInput";
import VideoFormatSelector, { VideoFormat } from "@/components/VideoFormatSelector";
import DownloadProgress from "@/components/DownloadProgress";
import DownloadHistory, { DownloadItem } from "@/components/DownloadHistory";
import AppHeader from "@/components/AppHeader";

// Function to get video details from the URL
const getVideoDetails = (url: string) => {
  // Extract video ID based on the platform
  const extractVideoId = (url: string): { id: string; platform: string } | null => {
    // YouTube
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const ytMatch = url.match(ytRegex);
    if (ytMatch) return { id: ytMatch[1], platform: 'youtube' };
    
    // Vimeo
    const vimeoRegex = /(?:vimeo\.com\/(?:video\/)?(\d+))/i;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) return { id: vimeoMatch[1], platform: 'vimeo' };
    
    // Dailymotion
    const dmRegex = /(?:dailymotion\.com\/(?:video\/)([\w]+))/i;
    const dmMatch = url.match(dmRegex);
    if (dmMatch) return { id: dmMatch[1], platform: 'dailymotion' };
    
    return null;
  };

  const videoSource = extractVideoId(url);
  if (!videoSource) {
    return null;
  }

  // Get thumbnail URL based on platform
  let thumbnailUrl = '';
  let title = 'Video from ' + videoSource.platform;
  
  if (videoSource.platform === 'youtube') {
    thumbnailUrl = `https://img.youtube.com/vi/${videoSource.id}/mqdefault.jpg`;
    title = `YouTube Video (ID: ${videoSource.id})`;
  } else if (videoSource.platform === 'vimeo') {
    // In a real app, you'd fetch the thumbnail from Vimeo API
    thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Vimeo%20Video%20${videoSource.id}`;
    title = `Vimeo Video (ID: ${videoSource.id})`;
  } else if (videoSource.platform === 'dailymotion') {
    thumbnailUrl = `https://www.dailymotion.com/thumbnail/video/${videoSource.id}`;
    title = `Dailymotion Video (ID: ${videoSource.id})`;
  }

  return {
    id: videoSource.id,
    title,
    thumbnailUrl,
    url,
    platform: videoSource.platform
  };
};

enum AppState {
  INPUT_URL = "input_url",
  SELECT_FORMAT = "select_format",
  DOWNLOADING = "downloading",
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT_URL);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  
  // Load downloads from localStorage on initial render
  useEffect(() => {
    const savedDownloads = localStorage.getItem("downloadHistory");
    if (savedDownloads) {
      try {
        const parsedDownloads = JSON.parse(savedDownloads);
        // Convert date strings back to Date objects
        const downloadsWithDates = parsedDownloads.map((item: any) => ({
          ...item,
          downloadDate: new Date(item.downloadDate)
        }));
        setDownloads(downloadsWithDates);
      } catch (error) {
        console.error("Error parsing downloads:", error);
      }
    }
  }, []);
  
  // Save downloads to localStorage when they change
  useEffect(() => {
    localStorage.setItem("downloadHistory", JSON.stringify(downloads));
  }, [downloads]);

  const handleUrlSubmit = (url: string) => {
    setVideoUrl(url);
    
    // Get actual video details from the URL
    const videoDetails = getVideoDetails(url);
    
    if (videoDetails) {
      setVideoInfo(videoDetails);
      setAppState(AppState.SELECT_FORMAT);
    } else {
      toast.error("Could not retrieve video details. Please check the URL.");
    }
  };

  const handleFormatSelect = (format: VideoFormat) => {
    setSelectedFormat(format);
  };

  const handleStartDownload = () => {
    if (!selectedFormat) return;
    setAppState(AppState.DOWNLOADING);
  };

  const handleDownloadComplete = () => {
    if (!videoInfo || !selectedFormat) return;
    
    // Add to download history
    const newDownloadItem: DownloadItem = {
      id: Date.now().toString(),
      title: videoInfo.title,
      thumbnailUrl: videoInfo.thumbnailUrl,
      url: videoUrl,
      format: selectedFormat,
      downloadDate: new Date(),
      filePath: `~/Downloads/${videoInfo.title.replace(/[^\w]/g, '_')}.${selectedFormat.id.split('-')[0]}`
    };
    
    setDownloads(prev => [newDownloadItem, ...prev]);
    
    // Reset app state
    setAppState(AppState.INPUT_URL);
    setVideoUrl("");
    setVideoInfo(null);
    setSelectedFormat(null);
  };

  const handleCancelDownload = () => {
    toast.info("Download canceled");
    setAppState(AppState.INPUT_URL);
    setVideoUrl("");
    setVideoInfo(null);
    setSelectedFormat(null);
  };

  const handleClearHistory = () => {
    setDownloads([]);
  };

  const handleOpenFile = (item: DownloadItem) => {
    // In a real app, this would open the file
    toast.info(`Opening: ${item.filePath}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <AppHeader downloadsCount={downloads.length} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 pb-10 pt-4">
        <div className="space-y-6">
          {appState === AppState.INPUT_URL && (
            <>
              <div className="text-center mt-10 mb-12 animate-slide-down">
                <h1 className="text-3xl font-medium mb-4">
                  Download Videos with Ease
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Simply paste a video URL from YouTube, Vimeo, or other platforms to get started.
                </p>
              </div>
              
              <VideoUrlInput onSubmit={handleUrlSubmit} />
              
              {downloads.length > 0 && (
                <div className="mt-16">
                  <DownloadHistory 
                    downloads={downloads} 
                    onClearHistory={handleClearHistory}
                    onOpenFile={handleOpenFile}
                  />
                </div>
              )}
            </>
          )}
          
          {appState === AppState.SELECT_FORMAT && videoInfo && (
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
              
              <VideoFormatSelector onSelect={handleFormatSelect} />
              
              <div className="flex justify-center mt-8 animate-slide-up">
                <Button
                  onClick={handleStartDownload}
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
                  onClick={handleCancelDownload}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
          
          {appState === AppState.DOWNLOADING && videoUrl && selectedFormat && (
            <DownloadProgress
              videoUrl={videoUrl}
              selectedFormat={selectedFormat}
              onComplete={handleDownloadComplete}
              onCancel={handleCancelDownload}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
