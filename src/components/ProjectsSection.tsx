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
      title: "Coached - AI Fitness Tracking App",
      description: "Full-stack AI app delivering sport-specific workout plans, analytics, and social features.",
      image: "https://harmless-tapir-303.convex.cloud/api/storage/4c4bd0bb-7bb3-4940-978a-827ba8f3f771",
      technologies: ["React 18.3.1", "TypeScript 5.5.3", "Vite 5.4.1", "Tailwind CSS 3.4.11", "Radix UI", "shadcn/ui", "Capacitor 7.4.1", "Supabase", "Google Gemini API"],
      category: "fullstack",
      github: "https://github.com/Srinarayan-Srikanth/coached",
      live: "#"
    },
    {
      title: "ASlearn - AI Sign Language Platform",
      description: "Built real-time sign recognition app with YOLO v5 and PyTorch for gesture detection. Flask backend deployed on AWS for scalability.",
      image: "https://harmless-tapir-303.convex.cloud/api/storage/f7c97d2a-7a25-4351-b995-bc159524f6cf",
      technologies: ["React.js", "Flask", "PyTorch", "AWS", "YOLO v5"],
      category: "ai",
      github: "https://github.com/Srinarayan-Srikanth/aslearn",
      live: "#"
    },
    {
      title: "SwiftFillAI",
      description: "Chrome extension using AI for web assistance and automating form fill to streamline online tasks.",
      image: "https://harmless-tapir-303.convex.cloud/api/storage/fabe3147-fbc6-4ac1-a238-890383d9b5ed",
      technologies: ["Google Gemini", "JavaScript"],
      category: "ai",
      github: "https://github.com/Srinarayan-Srikanth/swiftfillai",
      live: "#"
    }
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "fullstack", label: "Full Stack" },
    { id: "ai", label: "AI/ML" },
    { id: "web", label: "Web Development" }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work in AI/ML, full-stack development, and innovative solutions
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
                  ? "bg-primary text-primary-foreground neon-glow"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
              onClick={() => setFilter(category.id)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm neon-border border-primary/30 hover:border-primary/60 transition-all duration-300 h-full">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Technologies */}
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

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 neon-glow cursor-pointer"
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
        </div>
      </div>
    </section>
  );
}
