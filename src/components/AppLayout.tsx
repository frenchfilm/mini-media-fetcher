
import React from 'react';
import AppFooter from './AppFooter';
import { useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  onOpenNewsletter?: () => void;
  downloadsCount?: number;
}

const AppLayout = ({ 
  children, 
  onOpenNewsletter,
  downloadsCount = 0
}: AppLayoutProps) => {
  const navigate = useNavigate();
  
  const handleOpenNewsletter = () => {
    if (onOpenNewsletter) {
      onOpenNewsletter();
    }
  };

  return (
    <div className="w-[800px] h-[600px] bg-gradient-to-b from-background to-secondary/30 flex flex-col">
      {/* Body Section with proper padding */}
      <main className="h-[528px] w-full overflow-hidden p-6">
        {children}
      </main>
      
      {/* Footer Section - Fixed 72px height */}
      <AppFooter 
        onOpenNewsletter={handleOpenNewsletter}
        onContactClick={() => navigate("/contact")}
        downloadsCount={downloadsCount}
      />
    </div>
  );
};

export default AppLayout;
