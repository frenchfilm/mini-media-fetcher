
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Folder, History } from 'lucide-react';
import { VideoFormat } from './VideoFormatSelector';

const urlSchema = z.object({
  url: z.string().url('Invalid URL')
});

interface VideoUrlInputProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
  onFolderSelect: () => void;
  onPresetChange?: (preset: { format: VideoFormat | null, quality: string | null }) => void;
  onHistoryClick?: () => void; // Add this prop
}

const VideoUrlInput: React.FC<VideoUrlInputProps> = ({
  onSubmit,
  isLoading,
  onFolderSelect,
  onPresetChange,
  onHistoryClick // destructure the new prop
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(urlSchema)
  });

  const onSubmitHandler = async (data: { url: string }) => {
    await onSubmit(data.url);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="flex items-center space-x-2">
        <div className="flex-1">
          <Input
            placeholder="Paste video URL here"
            {...register('url')}
            disabled={isLoading}
          />
          {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
        </div>
        <Button 
          type="submit" 
          variant="secondary" 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Download'}
        </Button>
        <Button 
          type="button"
          variant="outline"
          size="icon"
          onClick={onFolderSelect}
        >
          <Folder className="h-4 w-4" />
        </Button>
        {onHistoryClick && ( // Conditionally render history button
          <Button 
            type="button"
            variant="outline"
            size="icon"
            onClick={onHistoryClick}
          >
            <History className="h-4 w-4" />
          </Button>
        )}
      </form>
    </div>
  );
};

export default VideoUrlInput;
