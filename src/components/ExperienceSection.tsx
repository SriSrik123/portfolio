import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building, Calendar, MapPin, Trophy } from "lucide-react";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress through the experience section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Calculate the vertical position for the scrolling dot
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const experiences = [
    {
      title: "AI Strategy, Development & Business Transformation Co-op",
      company: "Comcast Corporation",
      logo: "/logos/comcast.png",
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
      logo: "/logos/NeuralMetrics.png",
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
      logo: "/logos/lifetime.png",
      location: "Princeton, NJ",
      period: "June 2021 - July 2025",
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
      logo: "/logos/bike.png",
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
    <section id="experience" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow"></div>
        </motion.div>

        {/* Work Experience Timeline */}
        <div className="relative pb-16">
          {/* Vertical Scroll Line - Centered again */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-4 bottom-4 w-1 bg-primary/20 rounded-full hidden sm:block">
            {/* Background Line fill on view */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-primary/30 rounded-full"
            />

            {/* The Active Scrolling Dot */}
            <motion.div
              style={{ top: dotY }}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(114,114,240,1)] border-2 border-background z-20"
            />
          </div>

          <div className="space-y-24 relative">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-center justify-between">

                {/* 1. Logo Side - Alternating */}
                <div className={`hidden md:flex w-[calc(50%-4rem)] items-center ${index % 2 === 0 ? 'order-last justify-start' : 'order-first justify-end'}`}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: false }}
                    className="w-120 h-120 rounded-[2rem] liquid-glass flex items-center justify-center overflow-hidden border-2 border-primary/20 bg-background/40 backdrop-blur-xl shadow-2xl"
                  >
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-120 h-120 object-contain p-4"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(exp.company)}&background=0D8ABC&color=fff`;
                      }}
                    />
                  </motion.div>
                </div>

                {/* 2. Middle Dot (Anchor Point) on the line */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
                  <div className="w-3 h-3 rounded-full bg-primary/40 border border-primary/60" />
                </div>

                {/* 3. Card Side - Alternating sides but internal text is LEFT aligned */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: false }}
                  className={`relative w-full md:w-[calc(50%-4rem)] ${index % 2 === 0 ? 'order-first' : 'order-last'} pl-12 sm:pl-0`}
                >
                  <Card className="liquid-glass hover:scale-[1.01] transition-transform duration-300">
                    <CardHeader>
                      <div className="flex flex-col gap-2 items-start">
                        <div className="md:hidden mb-4">
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="w-24 h-24 rounded-2xl liquid-glass border border-primary/30 object-contain p-2"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(exp.company)}&background=0D8ABC&color=fff`;
                            }}
                          />
                        </div>
                        <CardTitle className="text-2xl md:text-3xl mb-1 text-primary text-left">{exp.title}</CardTitle>
                        <div className="flex items-center gap-2 text-accent mb-1">
                          <Building className="h-4 w-4" />
                          <span className="font-semibold text-lg">{exp.company}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-foreground/80">
                          <div className="flex items-center gap-1 font-medium">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1 font-medium">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        {exp.current && (
                          <div className="mt-2 text-left">
                            <Badge className="bg-primary text-primary-foreground">
                              Current Role
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4 text-left">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-foreground/90 leading-relaxed">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Extracurricular */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">Extracurricular</h3>
          {extracurricular.map((activity, index) => (
            <Card key={index} className="liquid-glass">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl mb-2 text-primary flex items-center gap-2">
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
