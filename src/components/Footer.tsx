import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/SriSrik123", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/srinarayan-srikanth-bb2750259/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:srinarayan.srikanth@gmail.com", label: "Email" },
  ];

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <link.icon className="h-6 w-6" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>© 2024 Srinarayan Srikanth. Made with</span>
            <Heart className="h-4 w-4 text-accent fill-current" />
            <span>and lots of coffee.</span>
          </div>

          {/* Tech Stack */}
          <p className="text-sm text-muted-foreground mt-4">
            Built with React, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}