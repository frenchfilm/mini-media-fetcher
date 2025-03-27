
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

  return (
    <div 
      className={`w-full ${isMobile ? 'min-w-[300px]' : 'w-[800px]'} min-h-[600px] flex flex-col bg-background`} 
      id="app-container"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Main content area */}
      <main className="flex-1 w-full overflow-y-auto pb-24">
        {children}
      </main>
      
      {/* Footer - fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-background" style={{ 
        width: isMobile ? '100%' : '800px', 
        maxWidth: '800px',
        margin: '0 auto',
        left: '0',
        right: '0'
      }}>
        <AppFooter 
          onOpenNewsletter={onOpenNewsletter}
          onOpenContact={onOpenContact}
        />
      </div>
    </div>
  );
};

export default AppLayout;
