
import { toast } from "sonner";

// Function to get the proper download path based on the OS
export const getDefaultDownloadPath = (): string => {
  // In a real desktop application (Electron/Tauri), use app-specific paths
  // that are relative to the application's location
  
  // For Electron, typically:
  // const { app } = require('electron');
  // return path.join(app.getPath('downloads'), 'VideoDownloader');
  
  // For a portable app, you might use:
  // const appPath = path.dirname(process.execPath);
  // return path.join(appPath, 'downloads');
  
  // Detect platform for the simulation
  const isWindows = navigator.platform.indexOf('Win') > -1;
  const isMac = navigator.platform.indexOf('Mac') > -1;
  
  // In the simulation, return platform-specific paths
  if (isWindows) {
    return 'C:\\Users\\YourUsername\\Downloads';
  } else if (isMac) {
    return '/Users/YourUsername/Downloads';
  } else {
    // Linux/other
    return '/home/yourusername/Downloads';
  }
};

// Function to get the file path for a saved video
export const getVideoFilePath = (videoTitle: string, format: string): string => {
  const basePath = getDefaultDownloadPath();
  const safeFileName = videoTitle.replace(/[^\w]/g, '_');
  return `${basePath}/${safeFileName}.${format}`;
};

// Check if download directory exists and create it if it doesn't
export const ensureDownloadDirectoryExists = (): boolean => {
  // In a real desktop app (Electron/Tauri), this would be implemented as:
  /*
  try {
    const fs = require('fs');
    const path = require('path');
    const downloadPath = getDefaultDownloadPath();
    
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }
    return true;
  } catch (error) {
    console.error('Failed to create download directory:', error);
    return false;
  }
  */
  
  // For the simulation, just return true
  console.log("Creating download directory (simulation mode)");
  return true;
};

// Function to determine if we're running in a desktop environment
export const isDesktopEnvironment = (): boolean => {
  // In Electron, we would check:
  // return typeof process !== 'undefined' && process.versions && !!process.versions.electron;
  
  // In Tauri:
  // return !!(window as any).__TAURI__;
  
  // In the web preview/simulation:
  return false;
};

// Open a file explorer to show the downloaded file
export const openFileLocation = (filePath: string): void => {
  // In Electron, we would use:
  /*
  const { shell } = require('electron');
  shell.showItemInFolder(filePath);
  */
  
  // In Tauri, we would use:
  /*
  import { open } from '@tauri-apps/api/shell';
  open(filePath);
  */
  
  // In the web preview, just log it
  console.log(`Opening file location (simulation): ${filePath}`);
  toast.info(`This would open ${filePath} in a desktop environment`);
};
