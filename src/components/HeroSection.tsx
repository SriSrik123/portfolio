"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Github, Linkedin } from "lucide-react";
import { useRef } from "react";
import Prism from "@/components/Prism";

interface HeroSectionProps {
  onSectionClick: (section: string) => void;
}

export default function HeroSection({ onSectionClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Track scroll relative to this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Prism opacity: fully visible at top, fades out as you scroll down
  const prismOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Prism full background with fade-out */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: prismOpacity }}
      >
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.5}
          glow={1}
        />
      </motion.div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative mx-auto w-64 h-64">
            <div className="relative z-10 w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/50 shadow-xl">
              <img
                src="/images/profile.jpg"
                alt="Profile photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Name and Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
            Hi, I'm <span className="text-primary">Srinarayan Srikanth</span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="h-1 w-48 md:w-64 mx-auto rounded-full overflow-hidden mb-6 origin-left"
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
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            Computer Science Student | AI/ML Enthusiast
          </p>
          <p className="text-lg md:text-xl text-accent mb-8">
            Full Stack Developer | National Team Swimmer
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Passionate Computer Science student with hands-on experience building AI agents to optimize workflows.
          Skilled in applying real-world solutions through internships at companies like Neural Metrics and Comcast.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
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
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex justify-center space-x-6 mb-12"
        >
          <motion.a
            href="https://github.com/SriSrik123"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: "var(--primary)" }}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <Github className="h-8 w-8" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/srinarayan-srikanth-bb2750259/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: "var(--ring)" }}
            className="text-muted-foreground hover:text-ring transition-colors cursor-pointer"
          >
            <Linkedin className="h-8 w-8" />
          </motion.a>
          <motion.a
            href="http://hackerrank.com/profile/hellosri2006"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <img
              src="/images/hackerrank.png"
              alt="HackerRank"
              className="h-8 w-8 object-contain"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
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
