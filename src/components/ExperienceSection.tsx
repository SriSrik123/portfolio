import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Building, Calendar, MapPin, Trophy } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      title: "AI Strategy, Business Development & Transformation Co-op",
      company: "Comcast Corporation",
      location: "Philadelphia, PA",
      period: "Sept 2025 - Present",
      description: [
        "Support strategic AI/ML initiatives across Comcast, including partnership evaluations, M&A opportunities, and enterprise-wide AI adoption.",
        "Construct business cases with financial models and executive-ready presentations for senior leadership across Comcast Cable, Sky, and NBCUniversal.",
        "Conduct research on emerging AI/ML markets, startups, and technology trends, shaping Comcast's trajectory in AI integration.",
        "Participate in high-profile projects where contributions are shared directly with top executives, influencing long-term strategy."
      ],
      current: true
    },
    {
      title: "AI Product Intern",
      company: "Neural Metrics",
      location: "Chennai, India",
      period: "July 2025 - September 2025",
      description: [
        "Identified and solved crucial challenges in team productivity and code quality by developing an AI-driven intelligent code verification system.",
        "Integrated solution with Bitbucket and Jira, reducing manual review efforts by 50%.",
        "Developed an AI-powered PDF extraction tool using FastAPI, OpenCV, Tesseract, Regex, PyMuPDF, and LayoutParser to handle complex documents such as ACORD forms.",
        "Streamlined CI/CD processes with Jenkins, Docker, and AWS (Bedrock, ECS, Lambda, ECR), enhancing deployment efficiency.",
        "Implemented a prompt evaluation system and logging framework for AI Ops, ensuring high confidence in model recommendations and ongoing monitoring of performance."
      ],
      current: false
    }
  ];

  const extracurricular = [
    {
      title: "American National Team Swimmer",
      achievements: [
        "Captain - PTAC Swim Club; won 20+ gold medals at state and regional meets (2016-2024).",
        "Three-time high school sectional finalist (2021-2024).",
        "Represented at national-level competitions; awarded 'Best Overall Freshman' at Nationals 2025."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow"></div>
        </motion.div>

        {/* Work Experience */}
        <div className="space-y-8 mb-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm neon-border border-primary/30 hover:border-primary/60 transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-primary mb-2">{exp.title}</CardTitle>
                      <div className="flex items-center gap-2 text-accent mb-2">
                        <Building className="h-4 w-4" />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    {exp.current && (
                      <Badge className="bg-primary text-primary-foreground neon-glow">
                        Current
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 neon-glow"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Extracurricular */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-accent">Extracurricular</h3>
          {extracurricular.map((activity, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm neon-border border-accent/30">
              <CardHeader>
                <CardTitle className="text-xl text-accent flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  {activity.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {activity.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 neon-glow"></div>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
