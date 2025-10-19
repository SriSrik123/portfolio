import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Building, Calendar, MapPin, Trophy } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      title: "AI Strategy, Development & Business Transformation Co-op",
      company: "Comcast Corporation",
      location: "Philadelphia, PA",
      period: "Sept 2025 - Present",
      description: [
        "Collaborate with senior executives and business units to identify high-impact AI use cases and drive enterprise-wide adoption.",
        "Research and evaluate emerging AI tools, startups, and partnerships to strengthen Comcast’s internal AI capabilities and strategic position.",
        "Develop, prototype, and demo AI-powered applications and tools for executive leadership, supporting deployment across multiple departments.",
        "Support go-to-market strategies, partnership evaluations, and implementation of new AI technologies within Comcast’s ecosystem."
      ],
      current: true
    },
    {
      title: "AI Product Development Intern",
      company: "Neural Metrics",
      location: "Chennai, India",
      period: "July 2025 - Sept 2025",
      description: [
        "Identified and solved critical challenges in team productivity and code quality by developing an AI-driven intelligent code verification system integrated with Bitbucket and Jira.",
        "Built an AI-powered PDF extraction pipeline using FastAPI, OpenCV, Tesseract, Regex, PyMuPDF, and LayoutParser to process complex business forms such as ACORD documents.",
        "Enhanced CI/CD processes using Jenkins, Docker, and AWS (Bedrock, ECS, Lambda, ECR) to streamline deployment workflows.",
        "Developed a prompt evaluation system and logging framework for AI Ops, improving model confidence tracking and performance monitoring."
      ],
      current: false
    },
    {
      title: "Swim Coach, Swim Instructor, Lifeguard",
      company: "Lifetime Health & Fitness Center",
      location: "Princeton, NJ",
      period: "June 2023 - July 2025",
      description: [
        "Ensured the safety of children in and around the pool while enforcing facility safety policies and maintaining situational awareness.",
        "Designed and led swim lessons and training sessions tailored to varying age groups and skill levels.",
        "Maintained clear communication with parents regarding progress, addressing questions and concerns proactively.",
        "Created an engaging, supportive learning environment to foster confidence and skill development among young swimmers.",
        "Customized instruction plans for children with special needs and specific goals, ensuring personalized progress and safety."
      ],
      current: false
    },
    {
      title: "Philanthropic Co-Founder",
      company: "Community Bike Repair Shop",
      location: "Princeton, NJ",
      period: "June 2021 - August 2024",
      description: [
        "Founded a neighborhood bike repair shop to provide affordable repair services during the COVID-19 pandemic when traditional shops were closed.",
        "Managed operations including purchasing, budgeting, marketing, and customer relations.",
        "Served the community by offering quick, low-cost repair options while building strong relationships with local residents.",
        "Developed entrepreneurial, customer service, and technical problem-solving skills through hands-on business management."
      ],
      current: false
    }
  ];

  const extracurricular = [
    {
      title: "American National Team Swimmer",
      achievements: [
        "Captain - PTAC Swim Club; won 20+ gold medals at state and regional meets (2016–2024).",
        "Three-time high school sectional finalist (2021–2024).",
        "Represented the U.S. at national-level competitions; awarded 'Best Overall Freshman' at Nationals 2025."
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
