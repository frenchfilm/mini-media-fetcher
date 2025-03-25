
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set up the root element
const rootElement = document.getElementById("root")!;
rootElement.style.position = "relative";
rootElement.style.width = "800px";
rootElement.style.height = "600px";
rootElement.style.overflow = "hidden";
rootElement.style.backgroundColor = "transparent";

createRoot(rootElement).render(<App />);
