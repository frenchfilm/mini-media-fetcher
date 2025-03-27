
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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
          <DialogTitle>Contact & Subscriptions</DialogTitle>
          <DialogDescription>
            Manage your subscriptions or send us a message.
          </DialogDescription>
        </DialogHeader>
        
        {/* Subscription Section */}
        <div className="border-b pb-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Manage subscription</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2"
              onClick={handleManageSubscription}
            >
              Manage <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Newsletter</span>
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

          <div className="flex items-center justify-between pt-1">
            <span className="text-sm">Do you crypto?</span>
            <a 
              href="https://t.me/softbare" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Join our Telegram
            </a>
          </div>
        </div>
        
        {/* Contact Form Section */}
        <form onSubmit={handleSubmit} className="space-y-3 py-3">
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
          
          <DialogFooter className="pt-2">
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
