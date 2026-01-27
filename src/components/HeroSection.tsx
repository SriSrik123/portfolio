"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, Linkedin } from "lucide-react";
import { useRef, useState } from "react";
import { HackerRankIcon } from "@/components/icons/HackerRankIcon";

interface HeroSectionProps {
  onSectionClick: (section: string) => void;
}

export default function HeroSection({ onSectionClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  // Track scroll relative to this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Prism opacity: fully visible at top, fades out as you scroll down
  const prismOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleProfileClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 5) {
      setShowVideo(true);
      setClickCount(0);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Easter Egg Video Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.video
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src="/video/video.mp4"
              autoPlay
              playsInline
              className="max-w-full max-h-[80vh] rounded-xl shadow-2xl border border-primary/20"
              onEnded={() => setShowVideo(false)}
              onClick={(e) => e.stopPropagation()} // Allow clicking video pause/play if controls enabled (disabled here) or just prevent closing
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prism full background with fade-out */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: prismOpacity }}
      >

      </motion.div>

      {/* Hero Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center -translate-y-9">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0 }}
          className="mb-8 mt-32"
        >
          <div className="relative mx-auto w-80 h-65">
            <div
              className="relative z-10 w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-primary/50 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={handleProfileClick}
            >
              <img
                src="/images/profile.png"
                alt="Profile photo"
                className="w-full h-full object-cover translate-y-0 scale-100"
              />
            </div>
          </div>
        </motion.div>

        {/* Name and Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="metallic-gradient">Srinarayan Srikanth</span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="h-1 w-48 md:w-64 mx-auto rounded-full overflow-hidden mb-6"
          >
            <motion.div
              animate={{ backgroundPositionX: ["0%", "200%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--primary), var(--ring), var(--accent))",
                backgroundSize: "200% 100%",
              }}
            />
          </motion.div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2" style={{ fontFamily: 'Baumans, sans-serif' }}>
            Comcast | Computer Science Student
          </p>
          <p className="text-lg md:text-xl text-accent mb-2" style={{ fontFamily: 'Baumans, sans-serif' }}>
            AI Strategy | AI/ML Enthusiast | Full Stack Developer
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8" style={{ fontFamily: 'Baumans, sans-serif' }}>
            National Team Swimmer
          </p>
        </motion.div>


        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow cursor-pointer"
            onClick={() => onSectionClick("projects")}
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground neon-border cursor-pointer"
            onClick={() => onSectionClick("contact")}
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex justify-center space-x-6 mb-12"
        >
          <motion.a
            href="https://github.com/SriSrik123"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(114,114,240,0.8))" }}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <Github className="h-14 w-14" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/srinarayan-srikanth-bb2750259/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(114,114,240,0.8))" }}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <Linkedin className="h-14 w-14" />
          </motion.a>
          <motion.a
            href="http://hackerrank.com/profile/hellosri2006"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(114,114,240,0.8))" }}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <HackerRankIcon className="h-14 w-14" />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={() => onSectionClick("about")}
        >
          <ChevronDown className="h-8 w-8 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
