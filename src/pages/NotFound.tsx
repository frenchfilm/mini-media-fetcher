
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="h-[600px] flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-3 overflow-hidden">
      <div className="glass-panel rounded-xl p-4 text-center max-w-[480px] animate-fade-in shadow-sm">
        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center">
          <span className="text-lg font-medium">404</span>
        </div>
        
        <h1 className="text-lg font-medium mb-1.5">Page not found</h1>
        
        <p className="text-xs text-muted-foreground mb-2.5">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="w-full h-7 text-xs">
          <a href="/">
            <ArrowLeft className="h-3 w-3 mr-1" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
