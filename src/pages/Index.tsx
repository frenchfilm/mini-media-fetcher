
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import VideoUrlInput from "@/components/VideoUrlInput";
import VideoFormatSelector, { VideoFormat } from "@/components/VideoFormatSelector";
import DownloadProgress from "@/components/DownloadProgress";
import DownloadHistory, { DownloadItem } from "@/components/DownloadHistory";
import AppHeader from "@/components/AppHeader";

// Function to generate dummy video details (simulates video metadata fetching)
const getVideoDetails = (url: string) => {
  // In a real app, this would fetch actual metadata from the URL
  const videoIds = [
    "dQw4w9WgXcQ", // Rick Astley
    "9bZkp7q19f0", // Gangnam Style
    "JGwWNGJdvx8", // Shape of You
    "kJQP7kiw5Fk", // Despacito
    "OPf0YbXqDm0", // Uptown Funk
  ];
  
  const randomId = videoIds[Math.floor(Math.random() * videoIds.length)];
  const titles = [
    "Amazing Travel Vlog - Summer 2023",
    "How to Master Web Development in 2023",
    "The Ultimate Cooking Guide for Beginners",
    "Top 10 Hidden Gems in Europe",
    "Learn Photography in 10 Minutes",
  ];
  
  return {
    id: randomId,
    title: titles[Math.floor(Math.random() * titles.length)],
    thumbnailUrl: `https://img.youtube.com/vi/${randomId}/mqdefault.jpg`,
    url: url
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
    
    // Simulate fetching video info
    setTimeout(() => {
      const videoDetails = getVideoDetails(url);
      setVideoInfo(videoDetails);
      setAppState(AppState.SELECT_FORMAT);
    }, 1000);
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
