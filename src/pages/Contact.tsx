
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const navigate = useNavigate();
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
      navigate("/");
    }, 1500);
  };

  return (
    <div className="h-[600px] flex flex-col bg-gradient-to-b from-background to-secondary/30 max-w-[800px] mx-auto overflow-hidden">
      <header className="py-2 px-4 border-b">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mr-2 text-foreground h-8 px-2"
            size="sm"
          >
            <ArrowLeft className="h-3 w-3 mr-1" />
            Back
          </Button>
          <h1 className="text-lg font-fraunces text-foreground">Contact Us</h1>
        </div>
      </header>
      
      <main className="flex-1 px-4 py-3 overflow-auto">
        <div className="bg-white rounded-lg shadow-sm border p-4 dark:bg-secondary dark:border-border">
          <h2 className="text-base font-fraunces mb-3 text-foreground">Send us a message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-foreground text-xs">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="h-8 text-sm dark:bg-secondary dark:border-border dark:text-foreground"
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
                  className="h-8 text-sm dark:bg-secondary dark:border-border dark:text-foreground"
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
                className="h-8 text-sm dark:bg-secondary dark:border-border dark:text-foreground"
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
                className="text-sm dark:bg-secondary dark:border-border dark:text-foreground"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-8 text-sm text-white dark:bg-primary dark:text-secondary-foreground"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
              {!isSending && <Send className="ml-1 h-3 w-3" />}
            </Button>
          </form>
        </div>
      </main>
      
      <footer className="py-2 px-4 text-center text-xs text-muted-foreground">
        <p>SoftBare Video Downloader • Apps as nature intended them</p>
      </footer>
    </div>
  );
};

export default Contact;
