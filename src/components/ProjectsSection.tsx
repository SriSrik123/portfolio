import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import { useState } from "react";

export default function ProjectsSection() {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      title: "AI Product Recommender",
      description:
        "AI-driven product recommendation system using 20k+ products for personalized shopping.",
      image:
        "https://harmless-tapir-303.convex.cloud/api/storage/bab9b79a-3d7b-46f3-b357-fa488aa12242",
      technologies: ["Python", "Pandas", "Flask"],
      category: "ai",
      github: "https://github.com/SriSrik123/AIProductRecommender",
      live: "#",
    },
    {
      title: "SwiftFillAI",
      description:
        "Chrome extension using AI for web assistance and automated form filling.",
      image:
        "https://harmless-tapir-303.convex.cloud/api/storage/9921eba9-2788-417a-ab4c-8c8d7f44c9cc",
      technologies: ["Google Gemini", "JavaScript"],
      category: "ai",
      github: "https://github.com/SriSrik123/SwiftFillAI",
      live: "#",
    },
    {
      title: "ASlearn - AI Sign Language Platform",
      description:
        "Real-time sign recognition with YOLO v5 and PyTorch; Flask backend on AWS.",
      image:
        "https://harmless-tapir-303.convex.cloud/api/storage/e26b31e8-92fd-453c-9a79-109e5f2f9747",
      technologies: ["React.js", "Flask", "PyTorch", "AWS", "YOLO v5"],
      category: "ai",
      github: "https://github.com/SriSrik123/ASlearn",
      live: "#",
    },
    {
      title: "Workout Tracker",
      description:
        "Sport-focused workout tracking with analytics and mobile-first experience.",
      image:
        "https://harmless-tapir-303.convex.cloud/api/storage/d142f0a0-a333-46f0-a855-4ce7236acb6c",
      technologies: ["React", "TypeScript", "Tailwind", "Capacitor"],
      category: "fullstack",
      github: "https://github.com/SriSrik123/Workout-Tracker",
      live: "#",
    },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "fullstack", label: "Full Stack" },
    { id: "ai", label: "AI/ML" },
    { id: "web", label: "Web Development" },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // Gallery-style animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
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

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              className={`cursor-pointer ${
                filter === category.id
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
              onClick={() => setFilter(category.id)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid with staggered items and subtle hover tilt */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={item}
              whileHover={{ y: -6, rotate: index % 2 === 0 ? -0.4 : 0.4 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <Card className="bg-card/60 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 h-full">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
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
                    <Button
                      size="sm"
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}