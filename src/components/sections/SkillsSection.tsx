import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useState, useRef } from "react";
import { Code2, Cpu, Database, Cloud, X, RotateCcw } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    color: "#3776AB",
    skills: [
      { name: "Python",     level: 95, color: "#3776AB" },
      { name: "Java",       level: 90, color: "#007396" },
      { name: "C/C++",      level: 85, color: "#00599C" },
      { name: "SQL",        level: 88, color: "#4479A1" },
      { name: "JavaScript", level: 82, color: "#F7DF1E" },
    ],
  },
  {
    title: "ML Libraries",
    icon: Cpu,
    color: "#FF6F00",
    skills: [
      { name: "TensorFlow",  level: 92, color: "#FF6F00" },
      { name: "PyTorch",     level: 90, color: "#EE4C2C" },
      { name: "Scikit-learn",level: 88, color: "#F7931E" },
      { name: "Keras",       level: 85, color: "#D00000" },
      { name: "OpenCV",      level: 80, color: "#5C3EE8" },
    ],
  },
  {
    title: "Platforms",
    icon: Cloud,
    color: "#FF9900",
    skills: [
      { name: "AWS",        level: 85, color: "#FF9900" },
      { name: "Docker",     level: 88, color: "#2496ED" },
      { name: "Kubernetes", level: 75, color: "#326CE5" },
      { name: "Git",        level: 93, color: "#F05032" },
      { name: "Linux",      level: 90, color: "#FCC624" },
    ],
  },
  {
    title: "Backend",
    icon: Database,
    color: "#009688",
    skills: [
      { name: "Flask",      level: 90, color: "#c9a961" },
      { name: "FastAPI",    level: 87, color: "#009688" },
      { name: "Node.js",    level: 80, color: "#339933" },
      { name: "PostgreSQL", level: 85, color: "#4169E1" },
      { name: "MongoDB",    level: 82, color: "#47A248" },
    ],
  },
];

const achievements = [
  { platform: "HackerRank",    skills: ["Java: 5⭐", "Python: 5⭐", "C: 5⭐", "SQL: 5⭐", "C++: 4⭐"], link: "https://www.hackerrank.com/profile/ankitamaji7033" },
  { platform: "LeetCode",      achievement: "500+ DSA Problems Solved",  link: "https://leetcode.com/u/Ankita_Maji/" },
  { platform: "GeeksforGeeks", achievement: "500+ Problems Solved",      link: "https://www.geeksforgeeks.org/profile/ankitama5noe" },
  { platform: "Codeforces",    achievement: "Active Competitive Coder",  link: "https://codeforces.com/profile/AnkitaMaji" },
];

// Circular progress ring for card back
function CircularProgress({ value, color, size = 80 }: { value: number; color: string; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="mx-auto mb-2" style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={10} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
      />
    </svg>
  );
}

// 3D Flip card – front: skill bars, back: circular progress
function SkillCard({ category, categoryIndex }: { category: typeof skillCategories[0]; index?: number; categoryIndex: number }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  // per-card mouse tilt
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 22 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 22 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    my.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };
  const handleLeave = () => { mx.set(0); my.set(0); setHovered(false); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: categoryIndex * 0.1, type: "spring", stiffness: 160 }}
      style={{ perspective: "800px" }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX: flipped ? 0 : rx, rotateY: flipped ? 180 : ry, transformStyle: "preserve-3d", position: "relative" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onMouseEnter={() => setHovered(true)}
        className="w-full cursor-pointer"
        onClick={() => setFlipped(!flipped)}
        title={flipped ? "Click to flip back" : "Click to see proficiency"}
      >
        {/* ── FRONT ── */}
        <div
          className="glass-strong rounded-2xl p-6 w-full"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: hovered && !flipped
              ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${category.color}20`
              : "0 10px 30px rgba(0,0,0,0.3)",
            background: hovered && !flipped
              ? `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`
              : undefined,
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${category.color}20` }}
              animate={hovered && !flipped ? { rotateY: [0, 20, 0], rotateX: [0, -10, 0] } : {}}
              transition={{ duration: 0.6 }}
            >
              <category.icon className="w-5 h-5" style={{ color: category.color }} />
            </motion.div>
            <h3 className="text-lg">{category.title}</h3>
            <motion.div
              className="ml-auto opacity-30 text-xs flex items-center gap-1"
              animate={{ opacity: hovered ? 0.7 : 0.3 }}
            >
              <RotateCcw className="w-3 h-3" /> flip
            </motion.div>
          </div>

          <div className="space-y-3">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.06 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.06 + 0.3, duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: skill.color,
                      boxShadow: `0 0 8px ${skill.color}60`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="glass-strong rounded-2xl p-6 w-full absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${category.color}25`,
            background: `linear-gradient(135deg, ${category.color}08, rgba(255,255,255,0.02))`,
          }}
        >
          <h3 className="text-center text-lg mb-4">{category.title}</h3>
          <div className="grid grid-cols-2 gap-4">
            {category.skills.slice(0, 4).map((skill) => (
              <div key={skill.name} className="text-center">
                <CircularProgress value={skill.level} color={skill.color} size={72} />
                <div className="text-xs text-muted-foreground mt-1">{skill.name}</div>
                <div className="text-xs font-bold" style={{ color: skill.color }}>{skill.level}%</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground/60 mt-3">Click to flip back</p>
        </div>
      </motion.div>
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
          <p className="text-xs text-muted-foreground/50 mt-2">↻ Click any card to see circular proficiency view</p>
        </motion.div>

        {/* 3D Flip Skill Cards */}
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