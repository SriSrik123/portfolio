import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { HackerRankIcon } from "@/components/icons/HackerRankIcon";

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "srinarayan.srikanth@gmail.com",
      href: "mailto:srinarayan.srikanth@gmail.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Srinarayan Srikanth",
      href: "https://www.linkedin.com/in/srinarayan-srikanth-bb2750259/"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "SriSrik123",
      href: "https://github.com/SriSrik123"
    },
    {
<<<<<<< HEAD
      icon: HackerRankIcon,
=======
      icon: MapPin,
>>>>>>> parent of 77bfbf3 (edited contact)
      label: "HackerRank",
      value: "hellosri2006",
      href: "https://www.hackerrank.com/profile/hellosri2006"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, collaborations, or opportunities.
            Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Centered Contact Information box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <Card className="liquid-glass">
              <CardHeader>
                <CardTitle className="text-2xl text-accent">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: false }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-background/30 hover:bg-background/50 transition-all duration-300 cursor-pointer group"
                  >
<<<<<<< HEAD
                    <info.icon className="h-20 w-20 text-primary group-hover:text-primary transition-colors" />
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-1 overflow-hidden">
                      <h3 className="text-xl font-bold text-white tracking-widest uppercase whitespace-nowrap">
                        {info.label}
                      </h3>
                      <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-border/40" />
                      <p className="text-lg text-primary/80 group-hover:text-primary transition-colors line-clamp-1 truncate">
=======
                    <info.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors neon-glow" />
                    <div>
                      <p className="font-medium text-foreground">{info.label}</p>
                      <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
>>>>>>> parent of 77bfbf3 (edited contact)
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}