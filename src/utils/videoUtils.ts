
/**
 * Utility functions for video processing
 */

// Function to validate if a URL is from a supported video platform
export const validateUrl = (url: string): boolean => {
  // Check if the URL is from a supported platform
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i;
  const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+$/i;
  const dailymotionRegex = /^(https?:\/\/)?(www\.)?(dailymotion\.com|dai\.ly)\/.+$/i;
  
  return youtubeRegex.test(url) || vimeoRegex.test(url) || dailymotionRegex.test(url);
};

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

// Extract video ID from various video platforms with improved regex patterns
export const extractVideoId = (url: string): { id: string; platform: string } | null => {
  // YouTube - handle multiple formats including shorts, watch, embed, youtu.be
  const ytRegex = /(?:youtube\.com\/(?:(?:watch\?v=)|(?:embed\/)|(?:shorts\/)|(?:live\/)|(?:v\/))|(youtu\.be\/))([a-zA-Z0-9_-]{11})/i;
  const ytMatch = url.match(ytRegex);
  if (ytMatch) return { id: ytMatch[2] || ytMatch[1], platform: 'youtube' };
  
  // YouTube alternative format
  const ytAltRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/i;
  const ytAltMatch = url.match(ytAltRegex);
  if (ytAltMatch) return { id: ytAltMatch[1], platform: 'youtube' };
  
  // Vimeo - handle both vimeo.com/id and vimeo.com/video/id formats
  const vimeoRegex = /(?:vimeo\.com\/(?:video\/|channels\/[^\/]+\/|groups\/[^\/]+\/videos\/|album\/[^\/]+\/video\/|)?)(\d+)(?:$|\/|\?|#)/i;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) return { id: vimeoMatch[1], platform: 'vimeo' };
  
  // Dailymotion - handle both dailymotion.com/video/id and dai.ly/id formats
  const dmRegex = /(?:(?:dailymotion\.com\/(?:video\/|embed\/|))|(dai\.ly\/))([a-zA-Z0-9]+)(?:_[\w-]*)?/i;
  const dmMatch = url.match(dmRegex);
  if (dmMatch) return { id: dmMatch[2] || dmMatch[1], platform: 'dailymotion' };
  
  return null;
};
