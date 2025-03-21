
/**
 * Utility functions for video processing
 */

// Function to get video details from the URL
export const getVideoDetails = (url: string) => {
  // Extract video ID based on the platform
  const videoSource = extractVideoId(url);
  if (!videoSource) {
    return null;
  }

  // Get thumbnail URL based on platform
  let thumbnailUrl = '';
  let title = 'Video from ' + videoSource.platform;
  
  if (videoSource.platform === 'youtube') {
    thumbnailUrl = `https://img.youtube.com/vi/${videoSource.id}/mqdefault.jpg`;
    title = `YouTube Video (ID: ${videoSource.id})`;
  } else if (videoSource.platform === 'vimeo') {
    // In a real app, you'd fetch the thumbnail from Vimeo API
    thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Vimeo%20Video%20${videoSource.id}`;
    title = `Vimeo Video (ID: ${videoSource.id})`;
  } else if (videoSource.platform === 'dailymotion') {
    thumbnailUrl = `https://www.dailymotion.com/thumbnail/video/${videoSource.id}`;
    title = `Dailymotion Video (ID: ${videoSource.id})`;
  }

  return {
    id: videoSource.id,
    title,
    thumbnailUrl,
    url,
    platform: videoSource.platform
  };
};

// Extract video ID from various video platforms
export const extractVideoId = (url: string): { id: string; platform: string } | null => {
  // YouTube
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const ytMatch = url.match(ytRegex);
  if (ytMatch) return { id: ytMatch[1], platform: 'youtube' };
  
  // Vimeo
  const vimeoRegex = /(?:vimeo\.com\/(?:video\/)?(\d+))/i;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) return { id: vimeoMatch[1], platform: 'vimeo' };
  
  // Dailymotion
  const dmRegex = /(?:dailymotion\.com\/(?:video\/)([\w]+))/i;
  const dmMatch = url.match(dmRegex);
  if (dmMatch) return { id: dmMatch[1], platform: 'dailymotion' };
  
  return null;
};
