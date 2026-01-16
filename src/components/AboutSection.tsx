import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, BookOpen, Code, Zap } from "lucide-react";

export default function AboutSection() {
  const highlights = [
    {
      icon: BookOpen,
      title: "Education",
      description: "Computer Science at Drexel University, Class of 2029"
    },
    {
      icon: Award,
      title: "Scholarship",
      description: "Proud recipient of the A.J. Drexel Scholarship"
    },
    {
      icon: Code,
      title: "Experience",
      description: "Internships at Neural Metrics and Comcast Corporation"
    },
    {
      icon: Zap,
      title: "Passion",
      description: "AI/ML, full-stack development, and intelligent applications"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm neon-border border-primary/30">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I am a Computer Science student at Drexel University, Philadelphia, Class of 2029. I am also a proud recipient
                  of the A.J. Drexel Scholarship. My academic and professional journey spans both the U.S. and India, where I've
                  gained unique perspectives in applying AI and software development to solve real-world challenges.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My passions lie in AI/ML, full-stack development, and building intelligent applications that create real
                  impact. From designing AI-powered systems at Neural Metrics to exploring AI strategy at Comcast, I thrive
                  at the intersection of technology and business transformation.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <highlight.icon className="h-12 w-12 text-primary mx-auto mb-4 neon-glow" />
                    <h3 className="text-lg font-semibold mb-2 text-primary">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
