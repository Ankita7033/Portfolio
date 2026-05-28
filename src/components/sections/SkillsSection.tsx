import { motion } from "motion/react";
import { useState } from "react";
import { Code2, Cpu, Database, Cloud } from "lucide-react";
import { FaJava, FaPython, FaAws, FaDocker, FaGitAlt, FaLinux, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiCplusplus, SiJavascript, SiTensorflow, SiPytorch, SiScikitlearn, SiKeras, SiOpencv, SiKubernetes, SiFlask, SiFastapi, SiPostgresql, SiMongodb } from "react-icons/si";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    color: "#3776AB",
    skills: [
      { name: "Python",     skillIcon: FaPython, color: "#3776AB" },
      { name: "Java",       skillIcon: FaJava, color: "#007396" },
      { name: "C/C++",      skillIcon: SiCplusplus, color: "#00599C" },
      { name: "SQL",        skillIcon: FaDatabase, color: "#4479A1" },
      { name: "JavaScript", skillIcon: SiJavascript, color: "#F7DF1E" },
    ],
  },
  {
    title: "ML Libraries",
    icon: Cpu,
    color: "#FF6F00",
    skills: [
      { name: "TensorFlow",  skillIcon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch",     skillIcon: SiPytorch, color: "#EE4C2C" },
      { name: "Scikit-learn",skillIcon: SiScikitlearn, color: "#F7931E" },
      { name: "Keras",       skillIcon: SiKeras, color: "#D00000" },
      { name: "OpenCV",      skillIcon: SiOpencv, color: "#5C3EE8" },
    ],
  },
  {
    title: "Platforms",
    icon: Cloud,
    color: "#FF9900",
    skills: [
      { name: "AWS",        skillIcon: FaAws, color: "#FF9900" },
      { name: "Docker",     skillIcon: FaDocker, color: "#2496ED" },
      { name: "Kubernetes", skillIcon: SiKubernetes, color: "#326CE5" },
      { name: "Git",        skillIcon: FaGitAlt, color: "#F05032" },
      { name: "Linux",      skillIcon: FaLinux, color: "#FCC624" },
    ],
  },
  {
    title: "Backend",
    icon: Database,
    color: "#009688",
    skills: [
      { name: "Flask",      skillIcon: SiFlask, color: "#c9a961" },
      { name: "FastAPI",    skillIcon: SiFastapi, color: "#009688" },
      { name: "Node.js",    skillIcon: FaNodeJs, color: "#339933" },
      { name: "PostgreSQL", skillIcon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB",    skillIcon: SiMongodb, color: "#47A248" },
    ],
  },
];

const achievements = [
  { platform: "HackerRank",    skills: ["Java: 5⭐", "Python: 5⭐", "C: 5⭐", "SQL: 5⭐", "C++: 4⭐"], link: "https://www.hackerrank.com/profile/ankitamaji7033" },
  { platform: "LeetCode",      achievement: "500+ DSA Problems Solved",  link: "https://leetcode.com/u/Ankita_Maji/" },
  { platform: "GeeksforGeeks", achievement: "500+ Problems Solved",      link: "https://www.geeksforgeeks.org/profile/ankitama5noe" },
  { platform: "Codeforces",    achievement: "Active Competitive Coder",  link: "https://codeforces.com/profile/AnkitaMaji" },
];

function SkillCard({ category, categoryIndex }: { category: typeof skillCategories[0]; index?: number; categoryIndex: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: categoryIndex * 0.1, type: "spring", stiffness: 160 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-strong rounded-2xl p-6 w-full flex flex-col h-full"
      style={{
        boxShadow: hovered 
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${category.color}20`
          : "0 10px 30px rgba(0,0,0,0.3)",
        background: hovered 
          ? `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`
          : undefined,
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${category.color}20` }}
        >
          <category.icon className="w-5 h-5" style={{ color: category.color }} />
        </motion.div>
        <h3 className="text-lg font-medium">{category.title}</h3>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-6 mt-auto">
        {category.skills.map((skill, skillIndex) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.06 }}
            className="flex flex-col items-center justify-center gap-2 group w-[calc(33.333%-11px)]"
          >
            <skill.skillIcon 
              className="w-8 h-8 transition-transform group-hover:scale-110 drop-shadow-md" 
              style={{ color: skill.color }} 
            />
            <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-1">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-6 pt-24 pb-16">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-muted-foreground">Expertise across the full stack</p>
        </motion.div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCard key={category.title} category={category} categoryIndex={categoryIndex} />
          ))}
        </div>

        {/* Platform Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-strong rounded-2xl p-8"
          style={{ perspective: "600px" }}
        >
          <h3 className="text-2xl mb-6 text-center">Platform Achievements</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <motion.a
                key={item.platform}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, z: -40, scale: 0.9 }}
                animate={{ opacity: 1, z: 0, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ z: 20, y: -6, scale: 1.04 }}
                className="glass rounded-xl p-5 text-center hover:bg-white/10 transition-all block"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-base mb-2 text-primary font-medium" style={{ transform: "translateZ(4px)" }}>
                  {item.platform}
                </div>
                {item.skills ? (
                  <div className="space-y-0.5 text-xs text-muted-foreground" style={{ transform: "translateZ(2px)" }}>
                    {item.skills.map((s) => <div key={s}>{s}</div>)}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground" style={{ transform: "translateZ(2px)" }}>
                    {item.achievement}
                  </div>
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}