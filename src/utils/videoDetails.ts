
import { extractVideoId } from "./videoExtraction";
import { extractDomain, generateRandomId } from "./urlValidation";
import { toast } from "sonner";

// Function to get video details from the URL
export const getVideoDetails = async (url: string) => {
  try {
    // Extract video ID based on the platform
    const videoSource = extractVideoId(url);
    
    if (!videoSource) {
      // For non-standard platforms, create a generic video source
      return {
        id: generateRandomId(),
        title: 'Video from ' + extractDomain(url),
        thumbnailUrl: `https://placeholder.pics/svg/300x200/DEDEDE/555555/Video`,
        previewImage: null,
        url,
        platform: 'generic'
      };
    }

    // Get thumbnail URL and title based on platform
    let thumbnailUrl = '';
    let previewImage = null;
    let title = 'Video from ' + videoSource.platform;
    let metadataFetched = false;
    
    // First try the generic oEmbed approach for all platforms
    try {
      const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      // Check if we got valid data from noembed
      if (!data.error && data.title) {
        title = data.title;
        metadataFetched = true;
        
        if (data.thumbnail_url) {
          thumbnailUrl = data.thumbnail_url;
          previewImage = data.thumbnail_url;
        }
      }
    } catch (error) {
      console.error("Failed to fetch metadata from noembed:", error);
      // Continue with platform-specific fallbacks
    }
    
    // If oEmbed failed or didn't provide complete data, use platform-specific fallbacks
    if (!metadataFetched || !thumbnailUrl) {
      if (videoSource.platform === 'youtube') {
        // YouTube provides different thumbnail qualities - try to get the highest quality
        thumbnailUrl = thumbnailUrl || `https://img.youtube.com/vi/${videoSource.id}/mqdefault.jpg`;
        // Try to get high-quality preview image
        previewImage = `https://img.youtube.com/vi/${videoSource.id}/maxresdefault.jpg`;
        
        if (!metadataFetched) {
          title = `YouTube Video`;
        }
      } else if (videoSource.platform === 'vimeo' && !thumbnailUrl) {
        // We already tried oEmbed which is best for Vimeo
        thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Vimeo%20Video`;
      } else if (videoSource.platform === 'dailymotion' && !thumbnailUrl) {
        thumbnailUrl = `https://www.dailymotion.com/thumbnail/video/${videoSource.id}`;
        previewImage = `https://www.dailymotion.com/thumbnail/video/${videoSource.id}/x1080`;
      } else if (!thumbnailUrl) {
        // If we don't have a thumbnail URL at this point, use a generic one
        thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Video%20from%20${videoSource.platform}`;
      }
    }

    return {
      id: videoSource.id,
      title,
      thumbnailUrl,
      previewImage,
      url,
      platform: videoSource.platform
    };
  } catch (error) {
    console.error("Error getting video details:", error);
    toast.error("Failed to retrieve video information");
    return null;
  }
};
