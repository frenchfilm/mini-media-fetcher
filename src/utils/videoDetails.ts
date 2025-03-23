
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
    
    if (videoSource.platform === 'youtube') {
      // YouTube provides different thumbnail qualities
      thumbnailUrl = `https://img.youtube.com/vi/${videoSource.id}/mqdefault.jpg`;
      previewImage = `https://img.youtube.com/vi/${videoSource.id}/maxresdefault.jpg`;
      
      // Try to fetch actual title (in a real app, this would use YouTube API)
      try {
        const response = await fetch(`https://noembed.com/embed?url=${url}`);
        const data = await response.json();
        if (data.title) {
          title = data.title;
        } else {
          title = `YouTube Video`;
        }
      } catch (error) {
        console.error("Failed to fetch YouTube metadata:", error);
        title = `YouTube Video`;
      }
    } else if (videoSource.platform === 'vimeo') {
      // Try to fetch Vimeo metadata using noembed
      try {
        const response = await fetch(`https://noembed.com/embed?url=${url}`);
        const data = await response.json();
        if (data.title) {
          title = data.title;
        }
        if (data.thumbnail_url) {
          thumbnailUrl = data.thumbnail_url;
          previewImage = data.thumbnail_url;
        } else {
          thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Vimeo%20Video`;
        }
      } catch (error) {
        console.error("Failed to fetch Vimeo metadata:", error);
        title = `Vimeo Video (ID: ${videoSource.id})`;
        thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Vimeo%20Video`;
      }
    } else if (videoSource.platform === 'dailymotion') {
      thumbnailUrl = `https://www.dailymotion.com/thumbnail/video/${videoSource.id}`;
      previewImage = thumbnailUrl;
      
      // Try to fetch actual title
      try {
        const response = await fetch(`https://noembed.com/embed?url=${url}`);
        const data = await response.json();
        if (data.title) {
          title = data.title;
        } else {
          title = `Dailymotion Video`;
        }
      } catch (error) {
        console.error("Failed to fetch Dailymotion metadata:", error);
        title = `Dailymotion Video`;
      }
    } else if (videoSource.platform === 'pornhub') {
      // PornHub specific handling - they don't support oEmbed
      title = `Video from PornHub`;
      thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/PornHub%20Video`;
      // In a real app, you would use a server-side proxy to scrape the actual thumbnail
    } else if (videoSource.platform === 'reddit') {
      // Reddit specific handling - their videos need special handling
      title = `Reddit Video`;
      thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Reddit%20Video`;
      // In a real app, you'd use Reddit's API with proper authentication
    } else {
      // For other platforms, try generic oEmbed approach via noembed.com
      try {
        const response = await fetch(`https://noembed.com/embed?url=${url}`);
        const data = await response.json();
        
        // Check if we got an error from noembed
        if (data.error) {
          console.log(`Platform ${videoSource.platform} not supported by oEmbed:`, data.error);
          title = `Video from ${videoSource.platform}`;
          thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Video%20from%20${videoSource.platform}`;
        } else {
          if (data.title) {
            title = data.title;
          }
          
          if (data.thumbnail_url) {
            thumbnailUrl = data.thumbnail_url;
            previewImage = data.thumbnail_url;
          } else {
            thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Video%20from%20${videoSource.platform}`;
          }
        }
      } catch (error) {
        console.error(`Failed to fetch metadata for ${videoSource.platform}:`, error);
        thumbnailUrl = `https://placeholder.pics/svg/300x200/DEDEDE/555555/Video%20from%20${videoSource.platform}`;
        title = `Video from ${videoSource.platform}`;
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
