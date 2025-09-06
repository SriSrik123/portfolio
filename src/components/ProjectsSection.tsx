import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useState, useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function FallbackImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full grid place-items-center bg-gradient-to-br from-primary/15 via-ring/15 to-accent/15 text-muted-foreground">
        <span className="px-3 py-1 text-sm">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

export default function ProjectsSection() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const projects = [
    {
      title: "Coached - AI Fitness Tracking App",
      description:
        "Full-stack AI app delivering sport-specific workout plans, analytics, and social features.",
      image:
        "https://harmless-tapir-303.convex.cloud/api/storage/80a84346-89cf-41e2-b079-12d925e3cf3d",
      technologies: [
        "React 18.3.1",
        "TypeScript 5.5.3",
        "Vite 5.4.1",
        "Tailwind CSS 3.4.11",
        "Radix UI",
        "shadcn/ui",
        "Capacitor 7.4.1",
        "Supabase",
        "Google Gemini API",
      ],
      category: "fullstack",
      github: "https://github.com/SriSrik123/Workout-Tracker",
      live: "#",
    },
    {
      title: "ASlearn - AI Sign Language Platform",
      description:
        "Built real-time sign recognition app with YOLOv5 and PyTorch for gesture detection. Flask backend deployed on AWS for scalability.",
      image:
        "https://harmless-tapir-303.convex.cloud/api/storage/b0d97b20-705d-42a7-b95c-bbd996862d90",
      technologies: ["React.js", "Flask", "PyTorch", "AWS", "YOLOv5"],
      category: "ai",
      github: "https://github.com/SriSrik123/ASlearn",
      live: "#",
    },
    {
      title: "SwiftFillAI",
      description:
        "Chrome extension using AI for website assistance and automating form filling to streamline online tasks.",
      image:
        "https://harmless-tapir-303.convex.cloud/api/storage/a49f20da-229f-4933-b75d-31c62b55a69e",
      technologies: ["Google Gemini", "JavaScript"],
      category: "ai",
      github: "https://github.com/SriSrik123/SwiftFillAI",
      live: "#",
    },
    {
      title: "ShopPulse",
      description:
        "Developed an AI-driven product recommendation system leveraging a dataset of 20,000+ products to offer personalized shopping suggestions.",
      image:
        "https://harmless-tapir-303.convex.cloud/api/storage/af1536f6-e01c-42d6-b428-f3e601130ee4",
      technologies: ["Python", "Pandas", "Flask"],
      category: "ai",
      github: "https://github.com/SriSrik123/AIProductRecommender",
      live: "#",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55 } },
  };

  const scrollToProject = (index: number) => {
    const el = itemRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A gallery of work in AI/ML and full‑stack development
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {projects.map((p, idx) => (
            <button
              key={p.title}
              className="text-sm md:text-base text-muted-foreground hover:text-primary underline-offset-4 hover:underline cursor-pointer"
              onClick={() => scrollToProject(idx)}
            >
              {p.title}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <ScrollArea className="w-full">
            <div
              ref={scrollerRef}
              className="w-max flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  variants={item}
                  whileHover={{ y: -6, rotate: index % 2 === 0 ? -0.4 : 0.4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="w-[70vw] sm:w-[45vw] lg:w-[28vw] snap-start"
                >
                  <Card className="bg-card/60 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 h-full">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.35 }} className="w-full h-full">
                        <FallbackImage src={project.image} alt={project.title} />
                      </motion.div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">
                        {project.title}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {project.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex pt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.div>
      </div>
    </section>
  );
}