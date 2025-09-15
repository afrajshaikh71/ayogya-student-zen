import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const navLinks = ["Home", "About", "Features", "Blog", "Pricing", "Contact", "FAQ"];
  
  return (
    <footer className="bg-gradient-to-t from-background-secondary to-background border-t border-border px-6 py-8">
      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 md:gap-8">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mb-6">
        <a
          href="#"
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          aria-label="Twitter"
        >
          <Twitter className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          aria-label="YouTube"
        >
          <Youtube className="h-5 w-5" />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-muted-foreground">
        © 2024 Ayogya. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;