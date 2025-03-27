
import { useState } from "react";
import { toast } from "sonner";
import { VideoFormat } from "@/components/VideoFormatSelector";
import { getVideoFilePath, isDesktopEnvironment } from "@/utils/videoUtils";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";

export enum AppState {
  INPUT_URL = "input_url",
  SELECT_FORMAT = "select_format",
  DOWNLOADING = "downloading",
}

export interface FormatPreset {
  format: VideoFormat | null;
  quality: string | null;
}

export const useAppState = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT_URL);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);
  const [formatPreset, setFormatPreset] = useState<FormatPreset>({ format: null, quality: null });
  const { downloads, addDownload, clearHistory } = useDownloadHistory();
  
  const handleUrlSubmit = (url: string, videoDetails: any) => {
    setVideoUrl(url);
    setVideoInfo(videoDetails);
    
    // If we have a format preset, automatically select it
    if (formatPreset.format) {
      setSelectedFormat(formatPreset.format);
      // If we have both format and quality preset, skip format selection and start download
      if (formatPreset.quality) {
        setAppState(AppState.DOWNLOADING);
        return;
      }
    }
    
    setAppState(AppState.SELECT_FORMAT);
    toast.success("Video information retrieved successfully");
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
    
    const filePath = getVideoFilePath(
      videoInfo.title, 
      selectedFormat.id.split('-')[0]
    );
    
    const newDownloadItem = {
      id: Date.now().toString(),
      title: videoInfo.title,
      thumbnailUrl: videoInfo.thumbnailUrl,
      url: videoUrl,
      format: selectedFormat,
      downloadDate: new Date(),
      filePath: filePath
    };
    
    addDownload(newDownloadItem);
    
    if (!isDesktopEnvironment()) {
      toast.info("Download completed (simulation mode). In a desktop app, the file would be saved to your Downloads folder.");
    } else {
      toast.success("Download completed successfully!");
    }
    
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

  const handlePresetChange = (preset: FormatPreset) => {
    setFormatPreset(preset);
    console.log("Format preset updated:", preset);
  };

  return {
    appState,
    videoUrl,
    videoInfo,
    selectedFormat,
    downloads,
    handleUrlSubmit,
    handleFormatSelect,
    handleStartDownload,
    handleDownloadComplete,
    handleCancelDownload,
    handlePresetChange,
  };
};
