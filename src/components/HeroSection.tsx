import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, Download, Github, Linkedin } from "lucide-react";
import Prism from "@/components/Prism";

interface HeroSectionProps {
  onSectionClick: (section: string) => void;
}

export default function HeroSection({ onSectionClick }: HeroSectionProps) {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative gradient-bg pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          {/* WebGL blue animation behind profile image */}
          <div className="relative mx-auto w-64 h-64">
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <Prism
                animationType="rotate"
                timeScale={0.7}
                height={4.2}
                baseWidth={6.2}
                scale={3.4}
                hueShift={-8}
                colorFrequency={1.8}
                noise={0.9}
                glow={3.0}
              />
            </div>
            <div className="relative z-10 w-48 h-48 mx-auto rounded-full overflow-hidden neon-border border-primary ring-2 ring-primary/30">
              <img
                src="/images/profile.jpg"
                alt="Profile photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Name and Title with animated backdrop */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* layered 'video-like' blur orbs behind the name */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 -inset-y-6 -z-10 mx-auto w-[85%] h-28 rounded-[999px] blur-2xl"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in oklch, var(--primary) 65%, black), color-mix(in oklch, var(--ring) 65%, black))",
              opacity: 0.22,
            }}
            animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden
            className="absolute -z-10 left-1/4 top-[-10px] w-24 h-24 rounded-full blur-[30px]"
            style={{ background: "oklch(0.72 0.14 240 / 0.55)" }}
            animate={{ x: [0, 40, -10, 0], y: [0, -10, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -z-10 right-1/4 top-[-20px] w-28 h-28 rounded-full blur-[34px]"
            style={{ background: "oklch(0.74 0.12 235 / 0.5)" }}
            animate={{ x: [0, -30, 15, 0], y: [0, 10, -8, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
            Hi, I'm <span className="text-primary">Srinarayan Srikanth</span>
          </h1>
          {/* animated underline accent behind the name */}
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
          {/* HackerRank link - remove box styling */}
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