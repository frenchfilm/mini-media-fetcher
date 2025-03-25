
import React from 'react';
import AppFooter from './AppFooter';

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
    <div className="w-[800px] h-[600px] bg-gradient-to-b from-background to-secondary/30 flex flex-col relative p-6">
      {/* Body Section with proper padding */}
      <main className="h-[504px] w-full overflow-hidden">
        {children}
      </main>
      
      {/* Footer Section - Fixed 72px height */}
      <AppFooter 
        onOpenNewsletter={handleOpenNewsletter}
        onContactClick={handleContactClick}
        downloadsCount={downloadsCount}
      />
    </div>
  );
};

export default AppLayout;
