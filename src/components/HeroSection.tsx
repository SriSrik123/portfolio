import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, Download, Github, Linkedin } from "lucide-react";

interface HeroSectionProps {
  onSectionClick: (section: string) => void;
}

export default function HeroSection({ onSectionClick }: HeroSectionProps) {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative gradient-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden neon-border border-primary">
            <img
              src="https://harmless-tapir-303.convex.cloud/api/storage/be3666df-549b-44ad-a3f5-092313ca0ab5"
              alt="Srinarayan Srikanth"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Name and Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
            Hi, I'm <span className="text-primary">Srinarayan Srikanth</span>
          </h1>
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