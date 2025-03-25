
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a container with exact 800x600 dimensions
const rootElement = document.getElementById("root")!;
rootElement.style.width = "800px";
rootElement.style.height = "600px";
rootElement.style.margin = "0 auto";
rootElement.style.overflow = "hidden"; // Prevent scrollbars
rootElement.style.position = "relative"; // Added to improve positioning
rootElement.style.display = "flex"; // Use flexbox
rootElement.style.flexDirection = "column"; // Stack children vertically

createRoot(rootElement).render(<App />);
