import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function FallbackImage({ src, alt, className }: { src: string; alt: string, className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`w-full h-full grid place-items-center bg-gradient-to-br from-primary/15 via-ring/15 to-accent/15 text-muted-foreground ${className}`}>
        <span className="px-3 py-1 text-sm text-center">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-contain p-4 bg-muted/20 ${className}`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

function ProjectCard({ project, index, setRef, variants, onPandasClick }: { project: any; index: number; setRef: (el: HTMLDivElement | null) => void; variants: any; onPandasClick?: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      ref={setRef}
      variants={variants}
      className={`w-[85vw] sm:w-[45vw] lg:w-[25vw] h-[500px] snap-start perspective-1000 group ${isFlipped ? '' : 'hover:z-50'}`}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        initial={{ rotateY: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="w-full h-full transform-style-3d cursor-pointer relative"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 backface-hidden rounded-[28px] overflow-hidden liquid-glass border border-primary/20 shadow-xl"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
        >
          <div className="w-full h-full relative">
            <FallbackImage
              src={project.image}
              alt={project.title}
              className={`transition-transform duration-500 ${!isFlipped ? 'group-hover:scale-105' : ''}`}
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

            <div className={`absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300 ${!isFlipped ? 'transform translate-y-2 group-hover:translate-y-0' : ''}`}>
              <h3 className="text-3xl font-bold text-white mb-1 drop-shadow-md" style={{ fontFamily: 'Baumans, sans-serif' }}>{project.title}</h3>
              <p className="text-white/80 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Tap to view details
              </p>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-[28px] overflow-hidden liquid-glass border border-primary/20 shadow-xl p-6 bg-card/95 backdrop-blur-xl"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="h-full flex flex-col overflow-hidden">
            <div className="flex justify-between items-start mb-4 shrink-0">
              <h3 className="text-3xl font-bold text-primary" style={{ fontFamily: 'Baumans, sans-serif' }}>{project.title}</h3>
              <div className="w-8 h-8 rounded-full bg-primary/10 grid place-items-center text-primary text-xs font-bold">
                {index + 1}
              </div>
            </div>

            <ScrollArea className="flex-grow min-h-0 pr-4 -mr-4 mb-2">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description.split(/(Pandas|pandas)/).map((part: string, i: number) => {
                  if (part.toLowerCase() === 'pandas' && onPandasClick) {
                    return (
                      <span
                        key={i}
                        className="cursor-pointer hover:text-primary transition-colors underline decoration-dotted"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPandasClick();
                        }}
                      >
                        {part}
                      </span>
                    );
                  }
                  return part;
                })}
              </p>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="text-xs px-2.5 py-1 bg-primary/10 text-primary hover:bg-primary/20 border-primary/10 transition-colors">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollArea>

            <div className="mt-auto pt-3 border-t border-border/50 flex flex-col gap-1.5 shrink-0">
              {project.live && project.live !== "#" && (
                <Button
                  size="sm"
                  variant="default"
                  className="w-full gap-2 font-bold shadow-lg hover:shadow-primary/25 transition-all"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-2 font-bold transition-all"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  View Source Code
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [pandasClickCount, setPandasClickCount] = useState(0);
  const [showPandasVideo, setShowPandasVideo] = useState(false);

  const projects = [
    {
      title: "Coached",
      description:
        "Full-stack AI app delivering sport-specific workout plans, analytics, and social features.",
      image: "/images/coached.png",
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
      title: "Syllabuddy",
      description:
        "Collaborative web app that helps students manage their academic life. Upload syllabi, let AI extract dates and answer questions via RAG, track assignments with friends, and export everything to Google Calendar.",
      image: "/images/Syllabuddy.png",
      technologies: [
        "React 18",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express 5",
        "MongoDB",
        "Azure AI (GPT-4o)",
        "Vercel",
      ],
      category: "fullstack",
      github: "https://github.com/SriSrik123/Syllabuddy",
      live: "https://syllabuddyai.vercel.app",
    },
    {
      title: "EcoSnap",
      description:
        "AI-powered sustainability social app that gamifies environmental action through pollution reporting, plant identification, and community-driven challenges. Transforms everyday observations into crowdsourced, research-ready environmental data.",
      image: "/images/ecosnap.png",
      technologies: [
        "React Native",
        "Expo",
        "React",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "Firebase Firestore",
        "Google Gemini 2.5 Pro",
        "xAI",
        "Google Maps API",
        "OpenWeatherMap",
        "NASA FIRMS",
      ],
      category: "fullstack",
      github: "https://github.com/SriSrik123/EcoSnap",
      live: "#",
    },
    {
      title: "ASlearn",
      description:
        "Built real-time sign recognition app with YOLOv5 and PyTorch for gesture detection. Flask backend deployed on AWS for scalability.",
      image: "/images/aslearn.png",
      technologies: ["React.js", "Flask", "PyTorch", "AWS", "YOLOv5"],
      category: "ai",
      github: "https://github.com/SriSrik123/ASlearn",
      live: "#",
    },
    {
      title: "SwiftFillAI",
      description:
        "Chrome extension using AI for website assistance and automating form filling to streamline online tasks.",
      image: "/images/swiftfillai.png",
      technologies: ["Google Gemini", "JavaScript"],
      category: "ai",
      github: "https://github.com/SriSrik123/SwiftFillAI",
      live: "#",
    },
    {
      title: "ShopPulse",
      description:
        "Developed an AI-driven product recommendation system leveraging a dataset of 20,000+ products processed with Pandas to offer personalized shopping suggestions.",
      image: "/images/shoppulse.png",
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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

  const handlePandasClick = () => {
    const newCount = pandasClickCount + 1;
    setPandasClickCount(newCount);
    if (newCount === 5) {
      setShowPandasVideo(true);
      setPandasClickCount(0);
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Easter Egg Video Overlay */}
      <AnimatePresence>
        {showPandasVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowPandasVideo(false)}
          >
            <motion.video
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src="/video/soham.mp4"
              autoPlay
              playsInline
              className="max-w-full max-h-[80vh] rounded-xl shadow-2xl border border-primary/20"
              onEnded={() => setShowPandasVideo(false)}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {projects.map((p, idx) => (
            <button
              key={p.title}
              style={{ fontFamily: 'Baumans, sans-serif' }}
              className="text-base md:text-lg text-muted-foreground hover:text-primary transition-all duration-300 cursor-pointer hover:scale-110 px-3 py-1"
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
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
          className="relative"
        >
          <ScrollArea className="w-full pb-8">
            <div
              ref={scrollerRef}
              className="w-max flex gap-8 px-8 sm:px-12 md:px-0 mx-auto"
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  setRef={(el) => { itemRefs.current[index] = el; }}
                  variants={item}
                  onPandasClick={project.description.toLowerCase().includes('pandas') ? handlePandasClick : undefined}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
            {/* Hidden scrollbar for cleaner look, swipe driven */}
          </ScrollArea>
        </motion.div>
      </div>
    </section>
  );
}