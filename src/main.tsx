
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a container with max-width constraints
const rootElement = document.getElementById("root")!;
rootElement.style.maxWidth = "800px";
rootElement.style.margin = "0 auto";
rootElement.style.height = "600px";
rootElement.style.overflow = "auto";

createRoot(rootElement).render(<App />);
