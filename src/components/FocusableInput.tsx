
import { useEffect, useRef } from 'react';
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
