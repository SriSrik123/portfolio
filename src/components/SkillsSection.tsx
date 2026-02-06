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
      skills: ["Node.js", "Express", "Flask", "FastAPI", "MongoDB", "Supabase", "Firebase", "REST API"]
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
      skills: ["VS Code", "Vite", "Jenkins", "Docker", "PostCSS", "Date-fns", "Capacitor"]
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

  // Flatten skills for scrolling
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({
      name: skill,
      icon: cat.icon,
      color: cat.color,
    }))
  );

  // Split skills into 3 rows for variety
  const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 3));
  const row2 = allSkills.slice(Math.ceil(allSkills.length / 3), Math.ceil((allSkills.length * 2) / 3));
  const row3 = allSkills.slice(Math.ceil((allSkills.length * 2) / 3));

  return (
    <section id="skills" className="py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow"></div>
        </motion.div>
      </div>

      {/* Scrolling Skills Rows */}
      <div className="flex flex-col gap-8 mb-20">
        <SkillRow skills={row1} direction="left" speed={40} />
        <SkillRow skills={row2} direction="right" speed={50} />
        <SkillRow skills={row3} direction="left" speed={45} />
      </div>

      {/* Certifications */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <Card className="liquid-glass h-full">
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

const SkillRow = ({
  skills,
  direction,
  speed,
}: {
  skills: { name: string; icon: any; color: string }[];
  direction: "left" | "right";
  speed: number;
}) => {
  return (
    <div className="relative flex overflow-hidden group">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>

      <motion.div
        className="flex gap-4 shrink-0 px-2"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {/* Duplicate list for seamless loop */}
        {[...skills, ...skills, ...skills, ...skills].map((skill, i) => (
          <div
            key={i}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full 
              bg-secondary/40 border border-white/5 backdrop-blur-sm
              hover:bg-primary/20 hover:border-primary/30 transition-colors
              whitespace-nowrap cursor-default
            `}
          >
            <skill.icon className={`h-4 w-4 ${skill.color}`} />
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
