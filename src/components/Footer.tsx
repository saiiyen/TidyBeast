import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";
import tidyBeastLogo from "@/assets/tidybeast-logo.png";
import threadsIcon from "@/assets/threads.svg";

// Custom Threads icon component using the SVG from repo
const ThreadsIcon = ({ className }: { className?: string }) => (
  <img 
    src={threadsIcon} 
    alt="Threads" 
    className={`${className} filter brightness-0 invert`}
  />
);

const Footer = () => {
  const navigate = useNavigate();
  
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/tidybeast_cleaning/", name: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/share/16LK8scBLU/", name: "Facebook" },
    { icon: ThreadsIcon, href: "https://www.threads.com/@tidybeast_cleaning", name: "Threads" },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Home Cleaning",
    "Deep Cleaning", 
    "House Maiden",
    "Move-In/Out",
    "Sofa Cleaning",
    "Carpet Cleaning",
    "Sanitization",
    "Kitchen Cleaning",
    "Washroom Cleaning"
  ];

  return (
    <footer className="bg-gradient-to-br from-primary-dark to-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src={tidyBeastLogo} 
                  alt="TidyBeast" 
                  className="h-12 w-12 animate-float mascot-hover transition-all duration-300 group-hover:animate-wiggle"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse opacity-80"></div>
              </div>
              <span className="text-2xl font-bold group-hover:text-accent transition-colors duration-300">TidyBeast</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Revolutionizing the cleaning industry with ethics, trust, technology, and eco-friendly practices across urban India.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:animate-bounce-gentle relative group"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-5 w-5 relative z-10" />
                    <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-primary-foreground/80 hover:text-white transition-colors duration-300 relative group text-left"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button 
                    className="text-primary-foreground/80 hover:text-white transition-all duration-300 cursor-pointer text-left relative group hover:translate-x-1"
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {service}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Phone</p>
                  <a 
                    href="tel:+919959047238" 
                    className="font-semibold hover:text-accent transition-colors duration-300"
                  >
                    +91 99590 47238
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Email</p>
                  <a 
                    href="mailto:choosetidybeast@gmail.com" 
                    className="font-semibold hover:text-accent transition-colors duration-300"
                  >
                    choosetidybeast@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Service Areas</p>
                  <p className="font-semibold">Hyderabad & Surrounding Areas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 TidyBeast. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;