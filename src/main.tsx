
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a container with exact 800x600 dimensions
const rootElement = document.getElementById("root")!;
rootElement.style.width = "800px";
rootElement.style.height = "600px";
rootElement.style.margin = "0 auto";
rootElement.style.overflow = "hidden"; // Prevent scrollbars
rootElement.style.position = "relative"; // For proper positioning
rootElement.style.display = "flex"; // Use flexbox
rootElement.style.flexDirection = "column"; // Stack children vertically

// Add a background color to make sure it's visible in all environments
rootElement.style.backgroundColor = "#fff";
// Ensure the root will be properly displayed in all environments
rootElement.style.minHeight = "600px";

createRoot(rootElement).render(<App />);
