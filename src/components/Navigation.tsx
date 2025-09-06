import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X, Award } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/SriSrik123", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/srinarayan-srikanth-bb2750259/", label: "LinkedIn" },
    { icon: Award, href: "http://hackerrank.com/profile/hellosri2006", label: "HackerRank" },
    { icon: Mail, href: "mailto:srinarayan.srikanth@gmail.com", label: "Email" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold text-primary cursor-pointer"
              onClick={() => onSectionClick("hero")}
            >
              SS
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? "text-primary neon-glow"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => onSectionClick(item.id)}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Desktop Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, color: "var(--primary)" }}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {link.label === "HackerRank" ? (
                    <img
                      src="https://harmless-tapir-303.convex.cloud/api/storage/bd29f612-67bb-4ad3-b394-ae9618eb5e6a"
                      alt="HackerRank"
                      className="h-5 w-5 object-contain"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <link.icon className="h-5 w-5" />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border md:hidden"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full text-left justify-start cursor-pointer ${
                  activeSection === item.id
                    ? "text-primary neon-glow"
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => {
                  onSectionClick(item.id);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </Button>
            ))}
            <div className="flex justify-center space-x-6 pt-4 border-t border-border">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, color: "var(--primary)" }}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {link.label === "HackerRank" ? (
                    <img
                      src="https://harmless-tapir-303.convex.cloud/api/storage/bd29f612-67bb-4ad3-b394-ae9618eb5e6a"
                      alt="HackerRank"
                      className="h-6 w-6 object-contain"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <link.icon className="h-6 w-6" />
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}