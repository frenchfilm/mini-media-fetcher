
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface NewsletterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewsletterDialog = ({ open, onOpenChange }: NewsletterDialogProps) => {
  const [email, setEmail] = useState("");
  const [interestedInCrypto, setInterestedInCrypto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed to newsletter!");
      setIsSubmitting(false);
      onOpenChange(false);
      setEmail("");
      setInterestedInCrypto(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscribe to our Newsletter</DialogTitle>
          <DialogDescription>
            Stay updated with the latest features and releases from SoftBare.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="bg-white"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="crypto" 
              checked={interestedInCrypto}
              onCheckedChange={(checked) => setInterestedInCrypto(checked as boolean)}
            />
            <Label 
              htmlFor="crypto" 
              className="cursor-pointer text-sm font-normal"
            >
              I'm interested in Crypto Projects
            </Label>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="text-white dark:text-secondary"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterDialog;
