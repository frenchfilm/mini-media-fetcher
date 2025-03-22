
import { extractVideoId } from "./videoExtraction";
import { extractDomain, generateRandomId } from "./urlValidation";

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
