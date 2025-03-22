
/**
 * Utility functions for video processing
 */

// Function to validate if a URL is from a supported video platform
export const validateUrl = (url: string): boolean => {
  // Accept any URL with minimal validation
  // Just check if it resembles a URL structure
  try {
    // Try to construct a URL object - this will validate basic URL structure
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch (e) {
    // If it fails URL construction, check if it at least has a domain-like structure
    const simpleDomainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    return simpleDomainRegex.test(url.trim());
  }
};

// Function to get video details from the URL
export const getVideoDetails = (url: string) => {
  // Extract video ID based on the platform
  const videoSource = extractVideoId(url);
  if (!videoSource) {
    // For non-standard platforms, create a generic video source
    return {
      id: generateRandomId(),
      title: 'Video from ' + extractDomain(url),
      thumbnailUrl: `https://placeholder.pics/svg/300x200/DEDEDE/555555/Video`,
      url,
      platform: 'generic'
    };
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
  } else if (videoSource.platform === 'facebook') {
    thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Facebook%20Video`;
    title = `Facebook Video`;
  } else if (videoSource.platform === 'twitter') {
    thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Twitter%20Video`;
    title = `Twitter Video`;
  } else if (videoSource.platform === 'tiktok') {
    thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/TikTok%20Video`;
    title = `TikTok Video`;
  } else if (videoSource.platform === 'instagram') {
    thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Instagram%20Video`;
    title = `Instagram Video`;
  } else {
    thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Video%20from%20${videoSource.platform}`;
    title = `Video from ${videoSource.platform}`;
  }

  return {
    id: videoSource.id,
    title,
    thumbnailUrl,
    url,
    platform: videoSource.platform
  };
};

// Helper function to extract domain from URL
const extractDomain = (url: string): string => {
  try {
    // Try to parse the URL
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname.replace('www.', '');
  } catch (e) {
    // If parsing fails, try regex extraction
    const domainMatch = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i);
    return domainMatch ? domainMatch[1] : 'unknown-domain';
  }
};

// Generate a random ID for non-standard video sources
const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 15);
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
  
  // Facebook videos
  const fbRegex = /facebook\.com\/(?:watch\/\?v=|[^\/]+\/videos\/|video\.php\?v=)(\d+)/i;
  const fbMatch = url.match(fbRegex);
  if (fbMatch) return { id: fbMatch[1], platform: 'facebook' };
  
  // Twitter/X videos
  const twitterRegex = /(?:twitter\.com|x\.com)\/[^\/]+\/status\/(\d+)/i;
  const twitterMatch = url.match(twitterRegex);
  if (twitterMatch) return { id: twitterMatch[1], platform: 'twitter' };
  
  // TikTok videos
  const tiktokRegex = /tiktok\.com\/@[^\/]+\/video\/(\d+)/i;
  const tiktokMatch = url.match(tiktokRegex);
  if (tiktokMatch) return { id: tiktokMatch[1], platform: 'tiktok' };
  
  // Instagram
  const instaRegex = /instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/i;
  const instaMatch = url.match(instaRegex);
  if (instaMatch) return { id: instaMatch[1], platform: 'instagram' };
  
  // If we can't identify the platform specifically, extract the domain as the platform
  const domain = extractDomain(url);
  if (domain && domain !== 'unknown-domain') {
    return { id: generateRandomId(), platform: domain };
  }
  
  return null;
};

