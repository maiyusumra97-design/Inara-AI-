import { Video, Twitter, Facebook, Instagram, Youtube, Globe, Zap, Shield } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const quickLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Gallery", href: "#gallery" },
    { label: "API Documentation", href: "#api" }
  ];

  const supportLinks = [
    { label: "Help Center", href: "#help" },
    { label: "Contact Us", href: "#contact" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Refund Policy", href: "#refund" }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-dark-secondary border-t border-gray-800 py-16" data-testid="footer">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6" data-testid="link-footer-home">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <Video className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold gradient-text">Inara AI</h3>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md" data-testid="text-footer-description">
              Transform your ideas into stunning 4K videos with our advanced AI technology. Create unlimited professional videos for just ₹149/month.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-dark-card rounded-lg flex items-center justify-center hover:bg-neon-blue transition-colors"
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <IconComponent className="text-lg" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6" data-testid="text-quick-links">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-neon-blue transition-colors"
                    data-testid={`button-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6" data-testid="text-support">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-neon-blue transition-colors"
                    data-testid={`button-support-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0" data-testid="text-copyright">
            © 2024 Inara AI. All rights reserved. | Built with ❤️ for creators worldwide
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2" data-testid="status-languages">
              <Globe className="h-4 w-4" />
              <span>Available in 25+ languages</span>
            </div>
            <div className="flex items-center space-x-2" data-testid="status-uptime">
              <Zap className="h-4 w-4" />
              <span>99.9% uptime</span>
            </div>
            <div className="flex items-center space-x-2" data-testid="status-security">
              <Shield className="h-4 w-4" />
              <span>Enterprise security</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
