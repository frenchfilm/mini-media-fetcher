
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { getDefaultDownloadPath } from "@/utils/videoUtils";
import { FolderOpen } from "lucide-react";

const DownloadSettings = () => {
  const defaultDownloadPath = getDefaultDownloadPath();
  const [downloadPath, setDownloadPath] = useState(defaultDownloadPath);
  const [autostart, setAutostart] = useState(false);
  const [downloadThumbnail, setDownloadThumbnail] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [maxDownloads, setMaxDownloads] = useState(3);
  const [quality, setQuality] = useState("Best quality available");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="download-folder">Default Download Location</Label>
        <div className="flex gap-2">
          <Input 
            id="download-folder" 
            readOnly 
            value={downloadPath}
            className="flex-1 bg-white border-secondary"
          />
          <Button variant="outline" size="icon" className="softbare-button">
            <FolderOpen className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="default-quality">Default Format</Label>
        <select 
          id="default-quality"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="flex h-10 w-full rounded-md border border-secondary bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="Best quality available">Best quality available</option>
          <option value="2160p (UHD)">2160p (Ultra HD)</option>
          <option value="1080p (FHD)">1080p (Full HD)</option>
          <option value="720p (HD)">720p (HD)</option>
          <option value="480p (SD)">480p (SD)</option>
          <option value="360p">360p (SD)</option>
          <option value="mp3-audio">Audio Only (MP3)</option>
          <option value="m4a-audio">Audio Only (M4A)</option>
        </select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="autostart" 
          checked={autostart}
          onCheckedChange={(checked) => setAutostart(checked === true)}
        />
        <Label htmlFor="autostart">Start download automatically</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="notifications" 
          checked={showNotifications}
          onCheckedChange={(checked) => setShowNotifications(checked === true)}
        />
        <Label htmlFor="notifications">Show notification when download completes</Label>
      </div>
    </div>
  );
};

export default DownloadSettings;
