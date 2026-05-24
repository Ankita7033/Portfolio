import { motion } from "motion/react";
import { Trophy, Award, Star, Code, Target, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const achievements = [
  {
    icon: Code,
    title: "DSA Problems",
    value: 500,
    suffix: "+",
    description: "Solved across platforms",
    color: "#c9a961",
  },
  {
    icon: Star,
    title: "HackerRank Stars",
    value: 23,
    suffix: "⭐",
    description: "Across 5 domains",
    color: "#dab987",
  },
  {
    icon: Trophy,
    title: "Certifications",
    value: 15,
    suffix: "+",
    description: "Professional credentials",
    color: "#a89276",
  },
  {
    icon: Target,
    title: "Projects Completed",
    value: 25,
    suffix: "+",
    description: "Full-stack applications",
    color: "#b5a084",
  },
];

const platformLinks = {
  LeetCode: "https://leetcode.com/u/Ankita_Maji/",
  GeeksforGeeks: "https://www.geeksforgeeks.org/profile/ankitama5noe",
  HackerRank: "https://www.hackerrank.com/profile/ankitamaji7033",
  Codeforces: "https://codeforces.com/profile/AnkitaMaji",
};

const certifications = [
  { name: "NPTEL Cloud Computing", link: "https://drive.google.com/file/d/1hsRfS2-mgK5qbCLUegy5CjgZkZVa0JCj/view?usp=sharing" },
  { name: "DSA Training Certificate", link: "https://drive.google.com/file/d/12-BY6hGbgCxeV_P64LxbHPhNwlsKEFvt/view?usp=sharing" },
  { name: "CSE Pathshala Advanced DSA", link: "https://drive.google.com/file/d/1Bu6Ry9JuvUT5VdnHcncdAh24T2oI51Gz/view?usp=sharing" },
  { name: "AWS Machine Learning Essentials", link: "https://drive.google.com/file/d/1QsdsQeBtIN5uKObDDdOrRCVZschaRI2D/view?usp=sharing" },
  { name: "NVIDIA Disaster Response AI", link: "https://drive.google.com/file/d/1W2f6be2vvwGa9kWUUJ_VK40_k96r7O--/view?usp=sharing" },
];

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}</>;
}

export function AchievementsSection() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-6 pt-24 pb-16">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Achievements & Certifications
          </h2>
          <p className="text-muted-foreground">Milestones and professional credentials</p>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="glass-strong rounded-2xl p-6 text-center relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at center, ${achievement.color}15 0%, transparent 70%)`,
                }}
              />
              
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center relative z-10"
                style={{ backgroundColor: `${achievement.color}20` }}
              >
                <achievement.icon className="w-8 h-8" style={{ color: achievement.color }} />
              </div>

              <div className="text-4xl mb-2 relative z-10" style={{ color: achievement.color }}>
                <AnimatedCounter end={achievement.value} />
                {achievement.suffix}
              </div>

              <h3 className="mb-1 relative z-10">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground relative z-10">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        {/* HackerRank Ratings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-strong rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl mb-6 text-center">HackerRank Ratings</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { lang: "Java", stars: 5 },
              { lang: "Python", stars: 5 },
              { lang: "C", stars: 5 },
              { lang: "SQL", stars: 5 },
              { lang: "C++", stars: 4 },
            ].map((rating, index) => (
              <motion.div
                key={rating.lang}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass rounded-xl p-4 text-center hover:bg-white/10 transition-all"
              >
                <div className="text-lg mb-2">{rating.lang}</div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 + i * 0.05 }}
                    >
                      {i < rating.stars ? "⭐" : "☆"}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-strong rounded-2xl p-8"
        >
          <h3 className="text-2xl mb-6 text-center flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ x: 10 }}
                className="glass rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm">{cert.name}</span>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="ml-2">
                  <ExternalLink className="w-4 h-4 text-primary" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}