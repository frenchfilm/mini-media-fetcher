
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="flex-1 flex items-center justify-center">
        <div className="glass-panel rounded-xl p-6 text-center max-w-md animate-fade-in shadow-sm">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg font-medium">404</span>
          </div>
          
          <h1 className="text-xl font-medium mb-2">Page not found</h1>
          
          <p className="text-sm text-muted-foreground mb-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button asChild variant="contrast" className="w-full">
            <a href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
