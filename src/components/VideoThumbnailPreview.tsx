
import { useRef, useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface VideoThumbnailPreviewProps {
  src: string;
  alt?: string;
}

export default function VideoThumbnailPreview({ src, alt = 'Video Thumbnail' }: VideoThumbnailPreviewProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageError, setImageError] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    
    const handleLoad = () => {
      console.log("Image loaded successfully:", src);
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
    <div className={`mx-auto ${isMobile ? 'w-[200px] h-[160px]' : 'w-[250px] h-[200px]'} bg-black overflow-hidden rounded-xl flex items-center justify-center relative`}>
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

