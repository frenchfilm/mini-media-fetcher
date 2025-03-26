
import { useRef, useEffect, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
    <div className="mx-auto w-[250px] h-[200px] bg-black overflow-hidden rounded-xl flex items-center justify-center">
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
