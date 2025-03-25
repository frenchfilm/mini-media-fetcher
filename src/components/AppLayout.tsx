
import React from 'react';
import AppHeader from './AppHeader';
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail } from "lucide-react";
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
    <div className="h-[600px] w-[800px] flex flex-col bg-gradient-to-b from-background to-secondary/30">
      {/* Header Section */}
      <AppHeader downloadsCount={downloadsCount} />
      
      {/* Content Section */}
      <main className="flex-1 mx-6 mt-2 mb-1 overflow-auto">
        {children}
      </main>
      
      {/* Footer Section with fixed height to ensure visibility */}
      <div className="px-6 pb-3 pt-1">
        <div className="flex flex-row items-center justify-center gap-2 mb-1">
          <Button 
            variant="contrast" 
            onClick={() => navigate("/contact")}
            className="action-button-dark dark:bg-primary dark:text-secondary dark:border-primary/70"
            size="sm"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            <span className="text-xs">Request Feature</span>
          </Button>
          
          <Button 
            variant="contrast" 
            onClick={handleOpenNewsletter}
            className="action-button-dark dark:bg-primary dark:text-secondary dark:border-primary/70"
            size="sm"
          >
            <Mail className="h-3 w-3 mr-1" />
            <span className="text-xs">Newsletter</span>
          </Button>
        </div>
        
        <footer className="text-center text-[10px] text-muted-foreground">
          <p className="italic">
            Apps as nature intended them - quiet, private, ad-free.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
