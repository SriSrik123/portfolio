import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, lazy, Suspense } from "react";
import { Download } from "lucide-react";

const PhillySkyline3D = lazy(() => import("./PhillySkyline3D"));

export default function AboutSection() {
  const [shouldLoadModel, setShouldLoadModel] = useState(false);
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}

          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}

          >
            <Card className="liquid-glass">
              <CardContent className="p-6 sm:p-8">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I am a Computer Science student at Drexel University, Philadelphia, Class of 2029. My academic and
                  professional journey spans both the U.S. and India, where I've gained unique perspectives in applying
                  AI and software development to solve real-world challenges.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  My passions lie in AI/ML, full-stack development, and building intelligent applications that create real
                  impact. From designing AI-powered systems at Neural Metrics to exploring AI strategy at Comcast, I thrive
                  at the intersection of technology and business transformation.
                </p>
                <motion.a
                  href="/Srinarayan Srikanth Resume.pdf"
                  download="Srinarayan_Srikanth_Resume.pdf"
                  className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 neon-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-5 w-5" />
                  Download Resume
                </motion.a>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3D Philadelphia Skyline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}

            className="h-[300px] sm:h-[400px] lg:h-[500px] w-full max-w-full overflow-hidden"
            onViewportEnter={() => setShouldLoadModel(true)}
          >
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
              {shouldLoadModel && <PhillySkyline3D />}
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
