
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getDefaultDownloadPath } from "@/utils/videoUtils";

const DownloadSettings = () => {
  const defaultDownloadPath = getDefaultDownloadPath();
  const [downloadPath, setDownloadPath] = useState(defaultDownloadPath);
  const [autostart, setAutostart] = useState(false);
  const [downloadThumbnail, setDownloadThumbnail] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [maxDownloads, setMaxDownloads] = useState(3);
  const [quality, setQuality] = useState("high");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="download-folder">Default Download Location</Label>
        <div className="flex gap-2">
          <Input 
            id="download-folder" 
            readOnly 
            value={downloadPath}
            className="flex-1"
          />
          <Button variant="outline" size="sm">
            Change
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="default-quality">Default Download Quality</Label>
        <select 
          id="default-quality"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="low">Low (360p)</option>
          <option value="medium">Medium (720p)</option>
          <option value="high">High (1080p)</option>
          <option value="ultra">Ultra HD (2160p)</option>
        </select>
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="autostart">Start download automatically</Label>
        <Switch 
          id="autostart" 
          checked={autostart}
          onCheckedChange={setAutostart}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="thumbnail">Download thumbnail with video</Label>
        <Switch 
          id="thumbnail" 
          checked={downloadThumbnail}
          onCheckedChange={setDownloadThumbnail}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Show notifications</Label>
        <Switch 
          id="notifications" 
          checked={showNotifications}
          onCheckedChange={setShowNotifications}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="simultaneous">Maximum simultaneous downloads</Label>
        <Input 
          id="simultaneous" 
          type="number" 
          min={1}
          max={10}
          value={maxDownloads}
          onChange={(e) => setMaxDownloads(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default DownloadSettings;
