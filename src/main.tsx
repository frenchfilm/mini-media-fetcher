
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set up the root element
const rootElement = document.getElementById("root")!;
rootElement.style.minWidth = "300px"; // Set minimum width for small screens
rootElement.style.width = "100%";
rootElement.style.maxWidth = "800px"; // Maximum width for the app
rootElement.style.height = "600px";
rootElement.style.position = "relative";
rootElement.style.overflow = "hidden";
rootElement.style.backgroundColor = "transparent";
rootElement.style.padding = "0";
rootElement.style.margin = "0 auto"; // This centers the element horizontally
rootElement.style.left = "0";
rootElement.style.right = "0";

// Align the app to the top with some padding and set body background to black
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "flex-start"; // Changed from center to flex-start
document.body.style.paddingTop = "2rem"; // Add some padding at the top
document.body.style.minHeight = "100vh";
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.backgroundColor = "black"; // Set body background to black

// Allow the app to maintain aspect ratio and fit responsive windows
window.addEventListener('resize', () => {
  const windowWidth = window.innerWidth;
  
  // Adjust for different window sizes while maintaining minimum and maximum constraints
  if (windowWidth < 800) {
    rootElement.style.width = "100%";
    document.documentElement.classList.add('mobile-view');
    
    // Set a max-height for popover elements on mobile to prevent them from extending beyond viewport
    document.documentElement.style.setProperty('--radix-popover-content-available-height', '50vh');
    document.documentElement.style.setProperty('--radix-select-content-available-height', '50vh');
  } else {
    rootElement.style.width = "800px";
    document.documentElement.classList.remove('mobile-view');
    
    // Reset height variables for desktop
    document.documentElement.style.removeProperty('--radix-popover-content-available-height');
    document.documentElement.style.removeProperty('--radix-select-content-available-height');
  }
});

// Trigger resize event on load to set initial state
window.dispatchEvent(new Event('resize'));

createRoot(rootElement).render(<App />);
