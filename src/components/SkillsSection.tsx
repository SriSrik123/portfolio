import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Database, Cloud, Wrench, GitBranch, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const certificationRows = [
  {
    label: "Microsoft & IIT Roorkee",
    type: "static" as const,
    images: [
      "/images/Certs/1760805811843.jpeg",
      "/images/Certs/1744986433612.jpeg",
    ],
  },
  {
    label: "LinkedIn Learning",
    type: "scroll" as const,
    direction: "left" as const,
    images: [
      "/images/Certs/1687451447924.jpeg",
      "/images/Certs/1734406967569.jpeg",
      "/images/Certs/1734554007734.jpeg",
      "/images/Certs/1734643513826.jpeg",
      "/images/Certs/1735851836196.jpeg",
      "/images/Certs/1735938307019.jpeg",
    ],
  },
  {
    label: "HackerRank",
    type: "scroll" as const,
    direction: "right" as const,
    images: [
      "/images/Certs/hackerrank_java.png",
      "/images/Certs/hackerrank_python.png",
      "/images/Certs/hackerrank_react.png",
      "/images/Certs/hackerrank_css.png",
      "/images/Certs/hackerrank_frontend_react.png",
      "/images/Certs/hackerrank_software_engineer.png",
      "/images/Certs/hackerrank_problem_solving.png",
    ],
  },
  {
    label: "DeepLearning.AI",
    type: "static" as const,
    images: [
      "/images/Certs/1724089257819.jpeg",
    ],
  },
];

const allCertImages = certificationRows.flatMap((row) => row.images);

export default function SkillsSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-2 text-center">Certifications</h3>
          <p className="text-muted-foreground text-center mb-10 text-sm">Click any certificate to view full size</p>
        </motion.div>

        {certificationRows.map((row, rowIndex) => {
          const globalOffset = certificationRows
            .slice(0, rowIndex)
            .reduce((sum, r) => sum + r.images.length, 0);

          return (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: rowIndex * 0.1 }}
              viewport={{ once: false }}
              className="mb-12"
            >
              <h4 className="text-lg font-semibold text-accent mb-5 text-center">{row.label}</h4>

              {row.type === "scroll" ? (
                <ScrollingCertRow
                  images={row.images}
                  direction={row.direction}
                  speed={30}
                  globalOffset={globalOffset}
                  onSelect={setSelectedImageIndex}
                />
              ) : (
                <div className="flex flex-wrap justify-center gap-5">
                  {row.images.map((img, imgIndex) => (
                    <motion.div
                      key={imgIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: imgIndex * 0.08 }}
                      viewport={{ once: false }}
                      whileHover={{ scale: 1.04, y: -6 }}
                      className="cursor-pointer group/card"
                      onClick={() => setSelectedImageIndex(globalOffset + imgIndex)}
                    >
                      <div className="w-72 h-48 sm:w-80 sm:h-52 rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-primary/5 relative">
                        <img
                          src={img}
                          alt={`${row.label} certificate ${imgIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                          loading="lazy"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-xs font-medium px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                            View Certificate
                          </span>
                          <Award className="h-4 w-4 text-white/80" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={(open) => { if (!open) setSelectedImageIndex(null); }}
      >
        <DialogContent className="max-w-5xl w-[95vw] bg-background/95 backdrop-blur-xl border-white/10 p-3 sm:p-4">
          <DialogTitle className="sr-only">Certificate Preview</DialogTitle>
          {selectedImageIndex !== null && (
            <div className="relative select-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  src={allCertImages[selectedImageIndex]}
                  alt={`Certificate ${selectedImageIndex + 1}`}
                  className="w-full rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  draggable={false}
                />
              </AnimatePresence>

              <button
                onClick={() =>
                  setSelectedImageIndex(
                    (selectedImageIndex - 1 + allCertImages.length) % allCertImages.length
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 hover:bg-primary/20 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  setSelectedImageIndex(
                    (selectedImageIndex + 1) % allCertImages.length
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 hover:bg-primary/20 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {allCertImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === selectedImageIndex
                        ? "bg-primary w-6"
                        : "bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

const ScrollingCertRow = ({
  images,
  direction,
  speed,
  globalOffset,
  onSelect,
}: {
  images: string[];
  direction: "left" | "right";
  speed: number;
  globalOffset: number;
  onSelect: (index: number) => void;
}) => {
  const duplicated = [...images, ...images, ...images, ...images];

  return (
    <div className="relative flex overflow-hidden group">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex gap-5 shrink-0 px-2"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {duplicated.map((img, i) => (
          <motion.div
            key={i}
            className="shrink-0 cursor-pointer group/card"
            whileHover={{ scale: 1.05, y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => onSelect(globalOffset + (i % images.length))}
          >
            <div className="w-72 h-48 sm:w-80 sm:h-52 rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-primary/5 relative">
              <img
                src={img}
                alt={`Certificate ${(i % images.length) + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs font-medium px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                  View Certificate
                </span>
                <Award className="h-4 w-4 text-white/80" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

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
