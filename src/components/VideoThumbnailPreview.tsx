
import { useRef, useEffect, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play } from 'lucide-react';

interface VideoThumbnailPreviewProps {
  src: string;
  alt?: string;
}

export default function VideoThumbnailPreview({ src, alt = 'Video Thumbnail' }: VideoThumbnailPreviewProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    
    const handleLoad = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      // Set landscape mode if width >= height
      setIsLandscape(w >= h);
    };
    
    const handleError = () => {
      console.error("Failed to load image:", src);
      setImageError(true);
    };
    
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    
    // Check if image is already loaded
    if (img.complete) {
      handleLoad();
    }
    
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);
  
  // Log the source to debug
  console.log("VideoThumbnailPreview rendering with src:", src);
  
  return (
    <div className="mx-auto w-[250px] h-[200px] bg-black overflow-hidden rounded-xl flex items-center justify-center relative">
      <div className="relative w-full h-full">
        {!imageError && (
          <div className="w-full h-full flex items-center justify-center">
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              className="max-h-full max-w-full object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="rounded-full bg-white/25 p-3 backdrop-blur-sm">
                <Play className="h-8 w-8 text-white" fill="white" />
              </div>
            </div>
          </div>
        )}
        
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <Play className="h-12 w-12 mb-2" />
            <p className="text-sm">Video Preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
