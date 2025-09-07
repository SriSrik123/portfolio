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
import Prism from "@/components/Prism";

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
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground dark"
    >
      {/* Rotating Prism background with scroll-reactive scale & parallax */}
      <motion.div
        className="fixed inset-0 -z-10 opacity-[0.7] pointer-events-none"
        style={{ scale: sBgScale, y: sBgY }}
      >
        <Prism
          animationType="rotate"
          timeScale={0.55}
          height={3.8}
          baseWidth={6.2}
          scale={3.4}
          hueShift={-8}
          colorFrequency={1.7}
          noise={0.85}
          glow={2.2}
        />
      </motion.div>

      <Navigation activeSection={activeSection} onSectionClick={scrollToSection} />
      
      <main>
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
  );
}