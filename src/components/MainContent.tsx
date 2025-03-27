
import { AppState } from "@/hooks/useAppState";
import UrlInputSection from "@/components/UrlInputSection";
import FormatSelectionSection from "@/components/FormatSelectionSection";
import DownloadProgress from "@/components/DownloadProgress";
import { VideoFormat } from "@/components/VideoFormatSelector";
import { FormatPreset } from "@/hooks/useAppState";

interface MainContentProps {
  appState: AppState;
  videoUrl: string;
  videoInfo: any;
  selectedFormat: VideoFormat | null;
  onUrlSubmit: (url: string, videoInfo: any) => void;
  onFormatSelect: (format: VideoFormat) => void;
  onStartDownload: () => void;
  onDownloadComplete: () => void;
  onCancelDownload: () => void;
  onOpenNewsletter: () => void;
  onPresetChange: (preset: FormatPreset) => void;
}

const MainContent = ({
  appState,
  videoUrl,
  videoInfo,
  selectedFormat,
  onUrlSubmit,
  onFormatSelect,
  onStartDownload,
  onDownloadComplete,
  onCancelDownload,
  onOpenNewsletter,
  onPresetChange
}: MainContentProps) => {
  return (
    <div className="h-full">
      {appState === AppState.INPUT_URL && (
        <UrlInputSection 
          onUrlSubmit={onUrlSubmit} 
          onOpenNewsletter={onOpenNewsletter}
          onPresetChange={onPresetChange}
        />
      )}
      
      {appState === AppState.SELECT_FORMAT && videoInfo && (
        <FormatSelectionSection
          videoInfo={videoInfo}
          videoUrl={videoUrl}
          onFormatSelect={onFormatSelect}
          selectedFormat={selectedFormat}
          onStartDownload={onStartDownload}
          onCancel={onCancelDownload}
        />
      )}
      
      {appState === AppState.DOWNLOADING && videoUrl && selectedFormat && (
        <DownloadProgress
          videoUrl={videoUrl}
          selectedFormat={selectedFormat}
          onComplete={onDownloadComplete}
          onCancel={onCancelDownload}
        />
      )}
    </div>
  );
};

export default MainContent;
