
import * as React from "react"

const MOBILE_BREAKPOINT = 375

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to check if current view is mobile-sized
    const checkMobileView = () => {
      const isMobileSize = window.innerWidth < MOBILE_BREAKPOINT;
      const hasMobileClass = document.documentElement.classList.contains('mobile-view');
      return isMobileSize || hasMobileClass;
    };

    // Set initial state
    setIsMobile(checkMobileView());
    
    // Listen for both window resize and a custom mobile-view-change event
    const handleResize = () => {
      setIsMobile(checkMobileView());
    };
    
    window.addEventListener("resize", handleResize);
    document.documentElement.addEventListener("classChange", handleResize);
    
    // Watch for class changes on documentElement 
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsMobile(checkMobileView());
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.documentElement.removeEventListener("classChange", handleResize);
      observer.disconnect();
    };
  }, []);

  return !!isMobile;
}
