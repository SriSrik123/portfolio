import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface NavigationProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY <= 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const socialLinks: Array<never> = [];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 ${
          atTop ? "-translate-y-16 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo removed; keep minimal spacer for layout */}
            <div className="w-6" aria-hidden />

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
            {/* Mobile Social Links removed */}
          </div>
        </motion.div>
      )}
    </>
  );
}