
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
    <div className="h-[600px] flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4 max-w-[800px] mx-auto">
      <div className="glass-panel rounded-xl p-6 text-center max-w-md animate-fade-in shadow-sm">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <span className="text-xl font-medium">404</span>
        </div>
        
        <h1 className="text-xl font-medium mb-2">Page not found</h1>
        
        <p className="text-sm text-muted-foreground mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="w-full h-8 text-sm">
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
