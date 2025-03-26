
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
    <div className={`w-full ${isMobile ? 'min-w-[300px]' : 'w-[800px]'} min-h-[600px] bg-background flex flex-col relative p-2 sm:p-6 sm:pt-10`}>
      {/* Body Section with proper padding */}
      <main className="flex-1 w-full overflow-auto mb-2">
        {children}
      </main>
      
      {/* Footer Section - Now flexible height for mobile */}
      <AppFooter 
        onOpenNewsletter={handleOpenNewsletter}
        onContactClick={handleContactClick}
        downloadsCount={downloadsCount}
      />
    </div>
  );
};

export default AppLayout;
