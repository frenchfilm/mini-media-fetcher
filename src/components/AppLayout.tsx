
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
      className={`w-full ${isMobile ? 'min-w-[300px]' : 'w-[800px]'} min-h-[600px] bg-background relative p-2 sm:p-6`} 
      id="app-container"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Content Area */}
      <div className="w-full h-full pb-[80px]">
        {/* Body Section with scrolling content */}
        <main className="flex-1 w-full overflow-y-auto pb-4 z-0" style={{ height: '100%', maxHeight: '100%' }}>
          {children}
        </main>
      </div>
      
      {/* Footer Section - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-background w-full">
        <AppFooter 
          onOpenNewsletter={handleOpenNewsletter}
          onOpenContact={handleContactClick}
        />
      </div>
    </div>
  );
};

export default AppLayout;
