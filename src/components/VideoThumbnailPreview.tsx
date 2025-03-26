
import { useRef, useEffect, useState } from 'react';

interface VideoThumbnailPreviewProps {
  src: string;
  alt?: string;
}

export default function VideoThumbnailPreview({ src, alt = 'Video Thumbnail' }: VideoThumbnailPreviewProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);
  
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    
    const handleLoad = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      // Set landscape mode if width >= height
      setIsLandscape(w >= h);
    };
    
    img.addEventListener('load', handleLoad);
    
    // Check if image is already loaded
    if (img.complete) {
      handleLoad();
    }
    
    return () => img.removeEventListener('load', handleLoad);
  }, [src]);
  
  return (
    <div className="w-full h-full bg-black overflow-hidden rounded-xl flex items-center justify-center">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={
          isLandscape === null
            ? 'hidden' // Hide until we determine aspect ratio
            : isLandscape
              ? 'w-full h-auto object-contain' // Landscape image
              : 'h-full w-auto object-contain' // Portrait image
        }
      />
    </div>
  );
}
