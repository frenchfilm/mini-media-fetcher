
import { useRef, useEffect, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useIsMobile } from '@/hooks/use-mobile';

interface VideoThumbnailPreviewProps {
  src: string;
  alt?: string;
}

export default function VideoThumbnailPreview({ src, alt = 'Video Thumbnail' }: VideoThumbnailPreviewProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);
  const isMobile = useIsMobile();
  
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
  
  // Calculate the max width and height constraints based on viewport
  const maxWidth = isMobile ? 'max-w-[280px]' : 'max-w-[640px]';
  const maxHeight = isMobile ? 'max-h-[180px]' : 'max-h-[320px]';
  
  return (
    <div className={`mx-auto ${maxWidth} ${maxHeight} bg-black overflow-hidden rounded-xl flex items-center justify-center`}>
      <div className="relative w-full h-full">
        {isLandscape !== null && (
          <AspectRatio ratio={isLandscape ? 16/9 : 9/16} className="overflow-hidden">
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              className="object-contain w-full h-full"
            />
          </AspectRatio>
        )}
      </div>
    </div>
  );
}
