
import * as React from "react"

const MOBILE_BREAKPOINT = 375

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to check if current view is mobile-sized or has mobile class
    const checkMobileView = () => {
      const isMobileSize = window.innerWidth < MOBILE_BREAKPOINT;
      const hasMobileClass = document.documentElement.classList.contains('mobile-view');
      return isMobileSize || hasMobileClass;
    };

    // Set initial state
    setIsMobile(checkMobileView());
    
    // Listen for both window resize and a custom mobile-view-change event
    const handleChange = () => {
      setIsMobile(checkMobileView());
      console.log("Mobile state updated:", checkMobileView());
    };
    
    window.addEventListener("resize", handleChange);
    
    // Listen for the custom classChange event
    document.documentElement.addEventListener("classChange", handleChange);
    
    // Watch for class changes on documentElement 
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleChange();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      window.removeEventListener("resize", handleChange);
      document.documentElement.removeEventListener("classChange", handleChange);
      observer.disconnect();
    };
  }, []);

  return !!isMobile;
}
