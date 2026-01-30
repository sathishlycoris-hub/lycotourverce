import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

const quickLinks = [
  // { href: "/explore", label: "Explore Places" },
  { href: "/experiences", label: "Experiences" },
  { href: "/stories", label: "Travel Stories" },
  { href: "/gallery", label: "Gallery" },
];

const aboutLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/services", label: "Our Services" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-editorial section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-semibold">
                Lyco<span className="text-accent"> Tourism</span>
              </span>
            </Link>
            <p className="mt-4 text-primary-foreground/80 text-sm leading-relaxed">
              Discover extraordinary destinations through thoughtful exploration 
              and authentic cultural experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Explore</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Flat No. G1 & G3, RS No. 378/1A, 1B, 1C, Aikya-2 Apartments, Korukonda Road,
Konthamuru, Rajahmundry,
East Godavari,<br></br>
Andhra Pradesh – 533102</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contact@lycoris.in</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91-7673946789</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} LycoTourism. All rights reserved.
            </p>
            {/* <p className="text-sm text-primary-foreground/70">
              Committed to sustainable and responsible tourism.
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
