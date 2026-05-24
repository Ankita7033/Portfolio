import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "Machine Learning Intern",
    company: "1stop.ai",
    location: "Remote",
    period: "Jun 2024 - Aug 2024",
    description: [
      "Developed ML models for predictive analytics with 92% accuracy",
      "Implemented data pipelines processing 1M+ records daily",
      "Optimized model inference time by 40% through quantization",
    ],
    color: "#c9a961",
    certificate: "https://drive.google.com/file/d/1qIBUxxXFB8VUzr3qiYWS5aZCDyDsx5th/view?usp=sharing",
  },
  {
    title: "Software Engineering Simulation",
    company: "JPMorgan Chase & Co.",
    location: "Virtual",
    period: "Mar 2024 - May 2024",
    description: [
      "Built financial data visualization dashboards using React",
      "Implemented real-time data feeds with WebSocket integration",
      "Contributed to trading platform interface improvements",
    ],
    color: "#dab987",
    certificate: "https://drive.google.com/file/d/16-bFoFVsXmbgn7Iy9B2Avrgjwbct1wki/view?usp=sharing",
  },
  {
    title: "Technology Internship Simulation",
    company: "Citi",
    location: "Virtual",
    period: "Jan 2024 - Feb 2024",
    description: [
      "Developed microservices architecture for banking applications",
      "Implemented security best practices in API development",
      "Participated in agile development workflows",
    ],
    color: "#a89276",
    certificate: "https://drive.google.com/file/d/1O-taljmSC-3ECluESPDJmNkp0hmjfsBc/view?usp=sharing",
  },
];

export function ExperienceSection() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-6 pt-24 pb-16">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-muted-foreground">Professional journey and contributions</p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-20"
              >
                {/* Timeline Node */}
                <motion.div
                  className="absolute left-6 top-6 w-5 h-5 rounded-full border-4 border-background"
                  style={{ backgroundColor: exp.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      `0 0 0 0 ${exp.color}40`,
                      `0 0 0 10px ${exp.color}00`,
                      `0 0 0 0 ${exp.color}40`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-strong rounded-2xl p-6 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl mb-1">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-primary">
                        <Briefcase className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="glass rounded-lg px-3 py-1 text-xs text-muted-foreground">
                      {exp.period}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1">▹</span>
                        <span className="group-hover:text-foreground transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <a href={exp.certificate} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    <ExternalLink className="w-4 h-4 inline-block mr-1" />
                    View Certificate
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}