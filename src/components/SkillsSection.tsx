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
      skills: ["Flask", "FastAPI", "Supabase", "Firebase", "REST API"]
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
      skills: ["PyTorch", "YOLOvX", "OpenCV", "Tesseract", "Regex", "Claude", "Gemini", "Mistral", "OpenAI", "Qwen", "Llama", "PyMuPDF", "LayoutParser"]
    }
  ];

  const certifications = [
    {
      title: "Microsoft",
      courses: ["Azure Fundamentals"]
    },
    {
      title: "Full Stack Web Development",
      issuer: "Indian Institute of Technology (IIT)",
      period: "March 2024 - March 2025"
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

  const combinedCertifications = [
    ...certifications,
    { title: "HackerRank", courses: hackerRankSkills }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
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
              viewport={{ once: false }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="liquid-glass h-full">
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
          viewport={{ once: false }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {combinedCertifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false }}
              >
                <Card className="liquid-glass">
                  <CardHeader>
                    <CardTitle className="text-lg text-accent">{cert.title}</CardTitle>
                    {("issuer" in cert && cert.issuer) && (
                      <p className="text-sm text-muted-foreground">{(cert as any).issuer}</p>
                    )}
                    {("period" in cert && cert.period) && (
                      <p className="text-xs text-muted-foreground">{(cert as any).period}</p>
                    )}
                  </CardHeader>
                  {("courses" in cert && (cert as any).courses) && (
                    <CardContent>
                      <ul className="space-y-1">
                        {(cert as any).courses.map((course: string, i: number) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 bg-accent rounded-full"></div>
                            {course}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                  {("course" in cert && (cert as any).course) && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{(cert as any).course}</p>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
