
import { toast } from "sonner";

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

// Helper function to extract domain from URL
export const extractDomain = (url: string): string => {
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
export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};
