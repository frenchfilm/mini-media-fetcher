
import React from 'react';
import AppFooter from './AppFooter';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
  onOpenNewsletter?: () => void;
  onOpenContact?: () => void;
  downloadsCount?: number;
}

const AppLayout = ({ 
  children, 
  onOpenNewsletter,
  onOpenContact,
  downloadsCount = 0
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
      className={`w-full ${isMobile ? 'min-w-[300px]' : 'w-[800px]'} min-h-[600px] bg-background flex flex-col relative p-2 sm:p-6`} 
      id="app-container"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Body Section with proper padding */}
      <main className="flex-1 w-full overflow-hidden mb-2 relative">
        {children}
      </main>
      
      {/* Footer Section - Now with higher z-index to sit on top */}
      <div className="relative z-10 bg-background">
        <AppFooter 
          onOpenNewsletter={handleOpenNewsletter}
          onOpenContact={handleContactClick}
          downloadsCount={downloadsCount}
        />
      </div>
    </div>
  );
};

export default AppLayout;
