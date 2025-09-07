import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";

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
      icon: MapPin,
      label: "HackerRank",
      value: "hellosri2006f",
      href: "https://www.hackerrank.com/profile/hellosri2006f"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, collaborations, or opportunities. 
            Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Replace Contact Form with a simple Email CTA card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm neon-border border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Email Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Prefer email? Click below to open your email client with my address.
                </p>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow cursor-pointer"
                  asChild
                >
                  <a href="mailto:srinarayan.srikanth@gmail.com">
                    <Send className="h-4 w-4 mr-2" />
                    Compose Email
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-card/30 backdrop-blur-sm border-accent/30">
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
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-background/30 hover:bg-background/50 transition-all duration-300 cursor-pointer group"
                  >
                    <info.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors neon-glow" />
                    <div>
                      <p className="font-medium text-foreground">{info.label}</p>
                      <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="bg-card/30 backdrop-blur-sm border-ring/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-ring mb-4">Let's Connect!</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're interested in collaborating on a project, discussing opportunities, 
                  or just want to chat about technology and innovation, I'd love to hear from you. 
                  I'm always excited to connect with fellow developers, entrepreneurs, and tech enthusiasts.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}