
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

interface DownloadPageHeaderProps {
  title: string;
}

const DownloadPageHeader = ({ title }: DownloadPageHeaderProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-3">
      <Button 
        size="sm"
        className="px-3 py-1 h-8 text-xs font-semibold app-wide-button-high-contrast"
        onClick={() => navigate('/')}
        autoFocus={false}
      >
        {isMobile ? "←" : "← Back"}
      </Button>
      <h2 className="text-base font-fraunces text-center">{title}</h2>
      <div className="w-[60px]"></div>
    </div>
  );
};

export default DownloadPageHeader;
