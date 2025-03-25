
import { useRef, useEffect, useState } from 'react';

export default function VideoThumbnailPreview({ src, alt = 'Video Thumbnail' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageStyle, setImageStyle] = useState({});
  
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    
    const handleLoad = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      const container = containerRef.current;
      
      if (!container) return;
      
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Calculate aspect ratios
      const imgRatio = w / h;
      const containerRatio = containerWidth / containerHeight;
      
      // Determine if we should fit by width or height
      if (imgRatio > containerRatio) {
        // Landscape image - fit by width
        setImageStyle({
          width: '100%',
          height: 'auto',
          maxHeight: '100%'
        });
      } else {
        // Portrait image - fit by height
        setImageStyle({
          width: 'auto',
          height: '100%',
          maxWidth: '100%'
        });
      }
    };
    
    img.addEventListener('load', handleLoad);
    
    // Initial check if image is already loaded
    if (img.complete) {
      handleLoad();
    }
    
    return () => img.removeEventListener('load', handleLoad);
  }, [src]);
  
  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-black overflow-hidden rounded-xl flex items-center justify-center"
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={imageStyle}
      />
    </div>
  );
}
