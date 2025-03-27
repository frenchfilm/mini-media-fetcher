
// Since we can't directly update VideoUrlInput.tsx as it's a read-only file,
// we can create a wrapper or modify its parent component

import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from "@/components/ui/input";

// A simple wrapper component to ensure focus is placed on the input
const FocusableInput = ({ inputProps }: { inputProps: React.InputHTMLAttributes<HTMLInputElement> }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Focus the input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return <Input ref={inputRef} {...inputProps} />;
};

export default FocusableInput;
