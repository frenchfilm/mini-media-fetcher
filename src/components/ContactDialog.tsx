
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

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
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [newsletterEnabled, setNewsletterEnabled] = useState(true);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail) {
      toast.success("Successfully subscribed to newsletter!");
      setSubscribeEmail("");
    }
  };

  const handleManageSubscription = () => {
    // Simulate opening subscription management in new tab
    window.open("https://example.com/manage-subscription", "_blank");
    toast.success("Opening subscription management page");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Subscriptions</DialogTitle>
        </DialogHeader>
        
        {/* Top Buttons Section */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Button 
            className="app-wide-button-high-contrast flex-1 h-8 text-xs w-full"
            onClick={handleManageSubscription}
          >
            Manage Subscriptions <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
          
          <a 
            href="https://t.me/softbare" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button 
              className="app-wide-button-high-contrast h-8 text-xs w-full"
            >
              Crypto
            </Button>
          </a>
        </div>
        
        {/* Newsletter Section - Reduced bottom padding */}
        <div className="border-b pb-1.5 mb-2 space-y-2">
          <h4 className="text-sm font-medium">Newsletter</h4>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Subscribe to updates</span>
            <Switch 
              checked={newsletterEnabled} 
              onCheckedChange={setNewsletterEnabled} 
            />
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2">
            <Input
              type="email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="h-8 text-sm flex-1 bg-white"
            />
            <Button 
              type="submit" 
              className="h-8 text-sm app-wide-button-high-contrast"
            >
              Subscribe
            </Button>
          </form>
        </div>
        
        {/* Contact Form Section */}
        <div className="py-1">
          <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
          <form onSubmit={handleSubmit} className="space-y-1">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-0.5">
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
              
              <div className="space-y-0.5">
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
            
            <div className="space-y-0.5">
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
            
            <div className="space-y-0.5">
              <Label htmlFor="message" className="text-foreground text-xs">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={2}
                required
                className="text-sm bg-white"
              />
            </div>
            
            <DialogFooter className="pt-1">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
