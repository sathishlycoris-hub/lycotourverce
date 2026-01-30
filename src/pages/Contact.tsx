import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MapPin, Mail, Phone, Send, 
  Instagram, Facebook, Twitter, 
  Clock, ShieldCheck 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Received",
      description: "Thank you! Our team will respond within 24-48 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary from-slate-50 to-white border-b">
        <div className="container-editorial py-16 md:py-20 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary mb-4">
            We're Here to Help
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-5">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Planning your next journey or have questions about our services? 
            Our team is ready to assist you personally.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-12 gap-12 xl:gap-16">
            {/* Form - 7 columns */}
            <div className="lg:col-span-7">
              <Card className="border-none shadow-lg">
                <CardContent className="p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-medium mb-8">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-7">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Inquiry about..."
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your travel plans, questions or suggestions..."
                        rows={7}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full md:w-auto px-10"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>

                    <p className="text-xs text-muted-foreground text-center md:text-left mt-4">
                      <ShieldCheck className="inline h-3.5 w-3.5 mr-1" />
                      We respect your privacy — your information is secure with us
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info - 5 columns */}
            <div className="lg:col-span-5 space-y-8">
              {/* Contact Details */}
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-medium mb-6">Our Office</h3>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1.5">Head Office</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Flat No. G1 & G3, Aikya-2 Apartments<br />
                          Korukonda Road, Konthamuru<br />
                          Rajahmundry, East Godavari<br />
                          Andhra Pradesh – 533102
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1.5">Email</h4>
                        <a 
                          href="mailto:contact@lycoris.in" 
                          className="text-sm text-primary hover:underline"
                        >
                          contact@lycoris.in
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Phone className="h-5 w-5 text-primary mt-1 shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1.5">Phone</h4>
                        <a 
                          href="tel:+917673946789" 
                          className="text-sm hover:underline"
                        >
                          +91 76739 46789
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Clock className="h-5 w-5 text-primary mt-1 shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1.5">Working Hours</h4>
                        <p className="text-sm text-muted-foreground">
                          Monday – Saturday: 10:00 AM – 7:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social & Trust */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-slate-50 to-white">
                <CardContent className="p-8">
                  <h3 className="text-xl font-medium mb-5">Connect With Us</h3>
                  
                  <p className="text-sm text-muted-foreground mb-6">
                    Follow our journey and get travel inspiration, offers & updates
                  </p>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-2 hover:bg-gradient-to-br hover:from-pink-50 hover:via-purple-50 hover:to-pink-100 hover:text-pink-600 hover:border-pink-200 transition-all"
                      asChild
                    >
                      <a href="https://instagram.com/lycoris_travels" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Instagram className="h-5 w-5" />
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"
                      asChild
                    >
                      <a href="https://facebook.com/lycoristravels" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <Facebook className="h-5 w-5" />
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-2 hover:bg-black hover:text-white hover:border-gray-800 transition-all"
                      asChild
                    >
                      <a href="https://x.com/lycoris_travels" target="_blank" rel="noopener noreferrer" aria-label="X">
                        <Twitter className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Map Section - you can replace with real Google Maps later */}
      <section className="bg-slate-50 py-16 border-t">
        <div className="container-editorial text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-6">Find Us Here</h2>
          <div className="h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg max-w-5xl mx-auto">
            {/* You can later replace this placeholder with: */}
            <iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"></iframe>
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Google Maps Embed Area (Add your location iframe here)
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;