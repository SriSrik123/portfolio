import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Code, Database, Cloud, Wrench, GitBranch, Award } from "lucide-react";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      color: "text-primary",
      skills: ["Python", "Java", "C++", "SQL", "JavaScript", "TypeScript", "HTML/CSS"]
    },
    {
      title: "Frontend Libraries/Frameworks",
      icon: Code,
      color: "text-accent",
      skills: ["React", "Angular", "Tailwind CSS", "React Query", "React Hook Form", "Recharts", "Next-Themes", "Lucide React"]
    },
    {
      title: "Backend/Database",
      icon: Database,
      color: "text-ring",
      skills: ["FastAPI", "Supabase", "Firebase", "REST API"]
    },
    {
      title: "Cloud Platforms",
      icon: Cloud,
      color: "text-chart-4",
      skills: ["Azure", "Render", "Vercel", "AWS Services: Bedrock, Lambda, Secrets Manager, ECS, EC2"]
    },
    {
      title: "Development Tools",
      icon: Wrench,
      color: "text-chart-5",
      skills: ["VS Code", "Jenkins", "Docker", "PostCSS", "Date-fns", "Capacitor"]
    },
    {
      title: "Version Control",
      icon: GitBranch,
      color: "text-primary",
      skills: ["GitHub", "GitLab", "Bitbucket"]
    },
    {
      title: "AI/ML & APIs",
      icon: Award,
      color: "text-accent",
      skills: ["PyTorch", "YOLO v5", "OpenCV", "Tesseract", "Regex", "Google Gemini", "Mistral", "OpenAI", "Owen", "Llama", "PyMuPDF", "LayoutParser"]
    }
  ];

  const certifications = [
    {
      title: "Full Stack Web Development",
      issuer: "Indian Institute of Technology (IIT)",
      period: "March 2024 - March 2026"
    },
    {
      title: "LinkedIn Learning",
      courses: ["Prompt Engineering", "Learning JIRA", "Software Development", "Foundations in AI"]
    },
    {
      title: "DeepLearning.AI",
      course: "AI with Python"
    }
  ];

  const hackerRankSkills = [
    "Java", "Python", "React.js", "CSS", "Frontend Developer", "Software Engineer", "Problem Solving"
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Technical Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow"></div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm neon-border border-primary/30 hover:border-primary/60 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className={`text-lg flex items-center gap-3 ${category.color}`}>
                    <category.icon className="h-6 w-6 neon-glow" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-accent">Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/30 backdrop-blur-sm border-accent/30 hover:border-accent/60 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-accent">{cert.title}</CardTitle>
                    {cert.issuer && (
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    )}
                    {cert.period && (
                      <p className="text-xs text-muted-foreground">{cert.period}</p>
                    )}
                  </CardHeader>
                  {cert.courses && (
                    <CardContent>
                      <ul className="space-y-1">
                        {cert.courses.map((course, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 bg-accent rounded-full"></div>
                            {course}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                  {cert.course && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{cert.course}</p>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* HackerRank Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-ring">HackerRank</h3>
          <Card className="bg-card/30 backdrop-blur-sm border-ring/30">
            <CardContent className="p-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {hackerRankSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-transparent border border-ring/40 text-ring hover:bg-ring/10"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}