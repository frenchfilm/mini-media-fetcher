
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

// Align the app to the top with padding and set body background to black
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "flex-start"; // Align to top
document.body.style.paddingTop = "1rem"; // Reduced padding to provide more space
document.body.style.minHeight = "100vh";
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.backgroundColor = "black"; // Set body background to black

// Handle mobile view toggle
const handleViewModeChange = () => {
  const windowWidth = window.innerWidth;
  const isMobileView = document.documentElement.classList.contains('mobile-view');
  
  if (isMobileView) {
    // Force exact 375px width for mobile view
    rootElement.style.width = "375px";
    rootElement.style.maxWidth = "375px";
    
    // Set more conservative max-height for popover elements on mobile
    document.documentElement.style.setProperty('--radix-popover-content-available-height', '35vh');
    document.documentElement.style.setProperty('--radix-select-content-available-height', '35vh');
    
    // Add styles to ensure dropdowns stay within container
    document.documentElement.style.setProperty('--radix-popover-content-transform-origin', 'var(--radix-popper-transform-origin)');
    document.documentElement.style.setProperty('--radix-select-content-transform-origin', 'var(--radix-popper-transform-origin)');
    document.documentElement.style.setProperty('--radix-dropdown-menu-content-transform-origin', 'var(--radix-popper-transform-origin)');
  } else if (windowWidth < 800) {
    // Responsive behavior for normal small screens (not mobile view)
    rootElement.style.width = "100%";
    rootElement.style.maxWidth = "800px";
    
    // Set more conservative max-height for popover elements on small screens
    document.documentElement.style.setProperty('--radix-popover-content-available-height', '35vh');
    document.documentElement.style.setProperty('--radix-select-content-available-height', '35vh');
  } else {
    // Full desktop width
    rootElement.style.width = "800px";
    rootElement.style.maxWidth = "800px";
    
    // Reset height variables for desktop
    document.documentElement.style.removeProperty('--radix-popover-content-available-height');
    document.documentElement.style.removeProperty('--radix-select-content-available-height');
    document.documentElement.style.removeProperty('--radix-popover-content-transform-origin');
    document.documentElement.style.removeProperty('--radix-select-content-transform-origin');
    document.documentElement.style.removeProperty('--radix-dropdown-menu-content-transform-origin');
  }
};

// Attach resize event listener
window.addEventListener('resize', handleViewModeChange);

// Also listen for custom classChange event for manual view mode toggling
document.documentElement.addEventListener('classChange', handleViewModeChange);

// Define styles to ensure dialogs and other fixed elements respect app boundaries
document.documentElement.style.setProperty('--app-width', '800px');
document.documentElement.style.setProperty('--app-height', '600px');

// Trigger resize event on load to set initial state
window.dispatchEvent(new Event('resize'));

createRoot(rootElement).render(<App />);
