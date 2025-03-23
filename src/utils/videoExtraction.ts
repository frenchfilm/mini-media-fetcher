
import { extractDomain, generateRandomId } from "./urlValidation";

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
  
  // PornHub specific detection
  const pornhubRegex = /(?:pornhub\.com\/(?:view_video\.php\?viewkey=|embed\/))([a-zA-Z0-9]+)/i;
  const pornhubMatch = url.match(pornhubRegex);
  if (pornhubMatch) return { id: pornhubMatch[1], platform: 'pornhub' };
  
  // Reddit videos
  const redditRegex = /reddit\.com\/r\/[^\/]+\/comments\/([a-zA-Z0-9]+)/i;
  const redditMatch = url.match(redditRegex);
  if (redditMatch) return { id: redditMatch[1], platform: 'reddit' };
  
  // If we can't identify the platform specifically, extract the domain as the platform
  const domain = extractDomain(url);
  if (domain && domain !== 'unknown-domain') {
    return { id: generateRandomId(), platform: domain };
  }
  
  return null;
};
