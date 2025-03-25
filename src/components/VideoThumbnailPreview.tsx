
import { useRef, useEffect, useState } from 'react';

export default function VideoThumbnailPreview({ src, alt = 'Video Thumbnail' }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [fitClass, setFitClass] = useState('w-full h-auto object-contain');

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      const newClass = w >= h
        ? 'w-full h-auto object-contain'
        : 'h-full w-auto object-contain';
      setFitClass(newClass);
    };

    img.addEventListener('load', handleLoad);
    return () => img.removeEventListener('load', handleLoad);
  }, [src]);

  return (
    <div className="w-full h-full bg-black overflow-hidden rounded-xl flex items-center justify-center">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={fitClass}
      />
    </div>
  );
}
