import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Video, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "glass-effect backdrop-blur-lg" : "bg-transparent"
    }`} data-testid="navigation">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3" data-testid="link-home">
            <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center animate-rotate3d">
              <Video className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Inara AI</h1>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-neon-blue transition-colors"
              data-testid="button-features"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="hover:text-neon-blue transition-colors"
              data-testid="button-pricing"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="hover:text-neon-blue transition-colors"
              data-testid="button-gallery"
            >
              Gallery
            </button>
            <Link href="/dashboard">
              <Button className="btn-3d bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-2 rounded-lg font-semibold" data-testid="button-get-started">
                Get Started
              </Button>
            </Link>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 glass-effect rounded-lg">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-left hover:text-neon-blue transition-colors"
                data-testid="button-mobile-features"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-left hover:text-neon-blue transition-colors"
                data-testid="button-mobile-pricing"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-left hover:text-neon-blue transition-colors"
                data-testid="button-mobile-gallery"
              >
                Gallery
              </button>
              <Link href="/dashboard">
                <Button className="w-full btn-3d bg-gradient-to-r from-neon-blue to-neon-purple" data-testid="button-mobile-get-started">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
