import { motion } from "motion/react";
import { Quote } from "lucide-react";

export function AboutSection() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-6 pt-24 pb-16">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-muted-foreground">Passionate about solving real-world problems through technology</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-3xl p-12 relative overflow-hidden mb-8"
        >
          {/* Background decoration */}
          <motion.div
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #c9a961 0%, transparent 70%)" }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4 mb-8"
            >
              <Quote className="w-12 h-12 text-primary flex-shrink-0 mt-2" />
              <p className="text-2xl md:text-3xl text-foreground leading-relaxed italic">
                "The best way to predict the future is to create it."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 text-muted-foreground"
            >
              <p>
                I'm Ankita Maji, a passionate Computer Science student specializing in Machine Learning and AI. 
                My journey in technology is driven by a desire to build intelligent systems that solve real-world problems 
                and make a meaningful impact on people's lives.
              </p>
              
              <p>
                With expertise spanning across ML frameworks, cloud platforms, and full-stack development, 
                I thrive on transforming complex challenges into elegant solutions. From disaster prediction systems 
                to intelligent schedulers, I believe in the power of technology to create a better tomorrow.
              </p>

              <p>
                When I'm not coding or training models, you'll find me solving algorithmic challenges, 
                exploring new technologies, or contributing to open-source projects. I'm always eager to learn, 
                collaborate, and push the boundaries of what's possible.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Focus Areas", value: "ML • AI • Cloud • Systems" },
            { label: "Current Status", value: "B.Tech Final Year" },
            { label: "Open to", value: "Collaborations • Internships" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="glass-strong rounded-xl p-6 text-center"
            >
              <div className="text-sm text-muted-foreground mb-2">{item.label}</div>
              <div className="text-foreground">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
