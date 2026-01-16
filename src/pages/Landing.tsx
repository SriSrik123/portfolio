import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import DarkVeil from "@/components/DarkVeil";

export default function Landing() {
  const [activeSection, setActiveSection] = useState("hero");

  // Set site title
  useEffect(() => {
    document.title = "Srinarayan Srikanth";
  }, []);

  // Add scroll progress hooks
  const { scrollYProgress } = useScroll();
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]); // background prism scale
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]); // subtle parallax up

  const sectionScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const aboutY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const expY = useTransform(scrollYProgress, [0, 1], [0, -65]);
  const projY = useTransform(scrollYProgress, [0, 1], [0, -85]);
  const skillsY = useTransform(scrollYProgress, [0, 1], [0, -105]);
  const contactY = useTransform(scrollYProgress, [0, 1], [0, -125]);

  // Add smooth springs to reduce jitter and polish motion
  const springCfg = { stiffness: 80, damping: 22, mass: 0.25 };
  const sBgScale = useSpring(bgScale, springCfg);
  const sBgY = useSpring(bgY, springCfg);
  const sSectionScale = useSpring(sectionScale, springCfg);
  const sAboutY = useSpring(aboutY, springCfg);
  const sExpY = useSpring(expY, springCfg);
  const sProjY = useSpring(projY, springCfg);
  const sSkillsY = useSpring(skillsY, springCfg);
  const sContactY = useSpring(contactY, springCfg);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 64; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Immediately update active section when clicking
      setActiveSection(sectionId);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "projects", "skills", "contact"];
      const headerOffset = 100; // Offset from top to determine which section is "active"

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          const elementBottom = rect.bottom;

          // Check if section is in the viewport (accounting for header)
          if (elementTop <= headerOffset && elementBottom > headerOffset) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll(); // Run on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* DarkVeil animated background - always visible */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, mixBlendMode: 'screen' }}
      >
        <div className="w-full h-full opacity-100">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0.05}
            scanlineIntensity={0.1}
            speed={0.4}
            scanlineFrequency={0.3}
            warpAmount={0.4}
            resolutionScale={1}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background text-foreground dark"
      >
        <Navigation activeSection={activeSection} onSectionClick={scrollToSection} />

        <main className="relative z-10">
          {/* Each section gets subtle scroll-tied movement/scale */}
          <HeroSection onSectionClick={scrollToSection} />
          <motion.div style={{ y: sAboutY, scale: sSectionScale }}>
            <AboutSection />
          </motion.div>
          <motion.div style={{ y: sExpY, scale: sSectionScale }}>
            <ExperienceSection />
          </motion.div>
          <motion.div style={{ y: sProjY, scale: sSectionScale }}>
            <ProjectsSection />
          </motion.div>
          <motion.div style={{ y: sSkillsY, scale: sSectionScale }}>
            <SkillsSection />
          </motion.div>
          <motion.div style={{ y: sContactY, scale: sSectionScale }}>
            <ContactSection />
          </motion.div>
        </main>

        <Footer />
      </motion.div>
    </>
  );
}