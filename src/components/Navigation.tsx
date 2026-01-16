import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

interface NavigationProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  // Initialize scroll progress tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = useMemo(() => [
    { id: "hero", label: "Home", num: "01" },
    { id: "about", label: "About", num: "02" },
    { id: "experience", label: "Work", num: "03" },
    { id: "projects", label: "Projects", num: "04" },
    { id: "skills", label: "Skills", num: "05" },
    { id: "contact", label: "Contact", num: "06" },
  ], []);

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY <= 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: atTop ? -10 : 0,
            opacity: 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-auto relative bg-background/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
        >
          {/* 1. LAYER: CONTINUOUS PROGRESS BAR (Clipped inside the pill) */}
          <div className="absolute inset-0 rounded-full overflow-hidden -z-20 pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-blue-500/20 origin-left"
              style={{ scaleX }}
            />
            {/* Bright lead-glow for the blue fill */}
            <motion.div
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-blue-400/10 to-blue-400/40 origin-left"
              style={{ scaleX }}
            />
          </div>

          {/* 2. LAYER: Subtle Base Track */}
          <div className="absolute inset-0 bg-white/5 rounded-full -z-30" />

          {/* 3. LAYER: INTERACTIVE CONTENT & OVERHANG BUBBLE */}
          <div className="relative px-2 py-1.5 flex items-center gap-1 md:gap-2">
            {/* Logo */}
            <motion.div
              className="pl-4 pr-2 flex items-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img src="/logo_main.png" alt="Logo" className="h-11 w-11 object-contain brightness-110 contrast-125" />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionClick(item.id)}
                    className={`group relative w-[100px] lg:w-[120px] py-2.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer outline-none ${isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {/* The Overhang Bubble (Vertical overhang allowed) */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-highlight"
                        className="absolute inset-x-0 inset-y-[-4px] bg-primary rounded-full -z-10 shadow-[0_0_25px_rgba(114,114,240,0.6)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <span className={`text-[10px] font-mono opacity-50 transition-colors ${isActive ? "text-primary-foreground/70" : "group-hover:text-primary"
                      }`}>
                      {item.num}
                    </span>
                    <span className="text-sm font-bold tracking-widest uppercase truncate" style={{ fontFamily: 'Baumans, sans-serif' }}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button inside the pill */}
            <div className="md:hidden flex items-center px-4 py-2">
              <button
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <span className="ml-3 text-sm font-bold tracking-widest uppercase text-primary" style={{ fontFamily: 'Baumans, sans-serif' }}>
                {navItems.find(n => n.id === activeSection)?.label || "Menu"}
              </span>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed inset-x-4 top-24 z-40 bg-background/95 backdrop-blur-2xl border border-white/10 rounded-3xl md:hidden overflow-hidden shadow-2xl"
          >
            <div className="p-6 grid grid-cols-1 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`py-4 text-xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-4 rounded-xl ${activeSection === item.id ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-white/5"
                    }`}
                  onClick={() => {
                    onSectionClick(item.id);
                    setIsOpen(false);
                  }}
                >
                  <span className="text-xs font-mono opacity-50">{item.num}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}