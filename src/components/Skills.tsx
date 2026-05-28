import { motion } from "motion/react";
import { FaNodeJs, FaDocker, FaAws, FaFigma, FaGitAlt, FaServer, FaPython } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiCplusplus, SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiPostgresql, SiMongodb } from "react-icons/si";

export function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "Python", icon: FaPython, color: "text-[#3776AB]" },
        { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
        { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
        { name: "C++", icon: SiCplusplus, color: "text-[#00599C]" },
      ],
    },
    {
      title: "ML Libraries",
      skills: [
        { name: "TensorFlow", icon: SiTensorflow, color: "text-[#FF6F00]" },
        { name: "PyTorch", icon: SiPytorch, color: "text-[#EE4C2C]" },
        { name: "Scikit-Learn", icon: SiScikitlearn, color: "text-[#F7931E]" },
        { name: "Pandas", icon: SiPandas, color: "text-[#150458]" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "text-[#339933]" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
        { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
        { name: "REST APIs", icon: FaServer, color: "text-muted-foreground" },
      ],
    },
    {
      title: "Platforms & Tools",
      skills: [
        { name: "Docker", icon: FaDocker, color: "text-[#2496ED]" },
        { name: "AWS", icon: FaAws, color: "text-[#FF9900]" },
        { name: "Git", icon: FaGitAlt, color: "text-[#F05032]" },
        { name: "Figma", icon: FaFigma, color: "text-[#F24E1E]" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm tracking-wide mb-4">
            Skills & Expertise
          </span>
          <h2 className="text-4xl md:text-5xl mb-6">
            Technical{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Proficiency
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and the tools I use
            to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="glass rounded-3xl p-8 hover:bg-white/40 transition-all duration-300"
            >
              <h3 className="text-2xl mb-6">{category.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-secondary/20 hover:bg-secondary/40 transition-colors border border-border/50 hover:border-primary/50 group"
                  >
                    <skill.icon className={`w-10 h-10 mb-3 transition-transform group-hover:scale-110 ${skill.color}`} />
                    <span className="text-xs font-medium text-center">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 glass rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl mb-4">Always Learning</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Technology evolves rapidly, and so do I. I'm constantly exploring
            new frameworks, tools, and best practices to stay at the forefront
            of web development.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "AI/ML Integration",
              "Web3",
              "Microservices",
              "Serverless",
              "Progressive Web Apps",
            ].map((item) => (
              <span
                key={item}
                className="px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
