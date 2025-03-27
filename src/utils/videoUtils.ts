
/**
 * Utility functions for video processing
 * This file re-exports all video-related utilities from their respective modules
 */

// Re-export URL validation utilities
export {
  validateUrl,
  extractDomain,
  generateRandomId
} from './urlValidation';

// Re-export video extraction utilities
export {
  extractVideoId
} from './videoExtraction';

// Re-export video details utilities
export {
  getVideoDetails
} from './videoDetails';

// Re-export file system utilities
export {
  getDefaultDownloadPath,
  getVideoFilePath,
  ensureDownloadDirectoryExists,
  isDesktopEnvironment,
  openFileLocation
} from './fileSystem';

// Format time (mm:ss)
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
