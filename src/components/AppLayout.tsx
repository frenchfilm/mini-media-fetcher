
import React from 'react';
import AppFooter from './AppFooter';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
  onOpenNewsletter?: () => void;
  onOpenContact?: () => void;
}

const AppLayout = ({ 
  children, 
  onOpenNewsletter,
  onOpenContact
}: AppLayoutProps) => {
  const isMobile = useIsMobile();

  const handleOpenNewsletter = () => {
    if (onOpenNewsletter) {
      onOpenNewsletter();
    }
  };

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <div 
      className="w-full min-h-[600px] bg-background flex flex-col relative overflow-hidden"
      id="app-container"
      style={{ 
        width: isMobile ? '100%' : '800px',
        minWidth: isMobile ? '300px' : 'auto',
        padding: isMobile ? '8px' : '24px',
        position: 'relative'
      }}
    >
      {/* Body Section with scrolling content */}
      <div className="flex-1 w-full overflow-y-auto z-0 pb-20" style={{ height: 'calc(100% - 72px)' }}>
        {children}
      </div>
      
      {/* Footer Section - Fixed at bottom with higher z-index */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-background" style={{ padding: isMobile ? '8px' : '24px' }}>
        <AppFooter 
          onOpenNewsletter={handleOpenNewsletter}
          onOpenContact={handleContactClick}
        />
      </div>
    </div>
  );
};

export default AppLayout;
