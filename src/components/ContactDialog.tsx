
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending the message
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setIsSending(false);
      onOpenChange(false);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            Send us a message and we'll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="firstName" className="text-foreground text-xs">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="h-8 text-sm bg-white"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="lastName" className="text-foreground text-xs">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="h-8 text-sm bg-white"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="email" className="text-foreground text-xs">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-8 text-sm bg-white"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="message" className="text-foreground text-xs">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              required
              className="text-sm bg-white"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              className="app-wide-button-high-contrast"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
              {!isSending && <Send className="ml-1 h-3 w-3" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
