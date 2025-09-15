import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { title: "Home", href: "#" },
    { title: "About", href: "#" },
    { title: "Features", href: "#" },
    { title: "Blog", href: "#" },
    { title: "Pricing", href: "#" },
    { title: "Contact", href: "#" },
    { title: "FAQ", href: "#" }
  ];

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="text-white hover:bg-white/20 z-50 relative"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-background to-background-secondary shadow-large z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-16 flex flex-col h-full">
          <nav className="space-y-6 flex-1">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2"
                onClick={toggleMenu}
              >
                {item.title}
              </a>
            ))}
          </nav>
          
          {/* Login/Sign Up Section */}
          <div className="border-t border-border pt-6 mt-6">
            <Button 
              className="w-full mb-3 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={toggleMenu}
            >
              Login / Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;