import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Download, Mail, Github, Linkedin, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import myImage from "../../My image.jpeg";

interface HomeSectionProps {
  onNavigate: (section: number) => void;
}

// Floating 3D tech tag around the hero card
function FloatingTag({
  label, x, y, delay,
}: {
  label: string; x: number; y: number; delay: number;
}) {
  return (
    <motion.div
      className="absolute text-xs px-3 py-1.5 rounded-full pointer-events-none select-none hidden md:flex items-center gap-1.5"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: "rgba(201,169,97,0.08)",
        border: "1px solid rgba(201,169,97,0.25)",
        color: "rgba(201,169,97,0.7)",
        backdropFilter: "blur(8px)",
      }}
      animate={{
        y: [-8, 8, -8],
        x: [-4, 4, -4],
        opacity: [0.4, 0.9, 0.4],
        rotateX: [0, 10, 0],
        rotateY: [-8, 8, -8],
      }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
      {label}
    </motion.div>
  );
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  const roles = [
    "Machine Learning Engineer",
    "Systems Programmer",
    "AI Platform Developer",
  ];

  const [currentRole, setCurrentRole] = useState(0);
  const [showResumeOptions, setShowResumeOptions] = useState(false);

  // 3D card tilt
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 20 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    my.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };
  const handleCardMouseLeave = () => { mx.set(0); my.set(0); };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const floatingTags = [
    { label: "Python", x: -18, y: 10, delay: 0 },
    { label: "TensorFlow", x: 105, y: 15, delay: 0.8 },
    { label: "PyTorch", x: -20, y: 50, delay: 1.4 },
    { label: "AWS", x: 108, y: 55, delay: 0.5 },
    { label: "C++", x: -15, y: 82, delay: 1.9 },
    { label: "Docker", x: 106, y: 82, delay: 1.1 },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 pt-20 pb-10 relative overflow-hidden">
      {/* Neural network background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            style={{ left: `${20 + i * 12}%`, top: `${30 + (i % 3) * 20}%` }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
          >
            {i < 7 && (
              <motion.div
                className="absolute w-[100px] h-px bg-gradient-to-r from-primary to-transparent"
                style={{ left: 0, top: "50%", transformOrigin: "left" }}
                animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full flex justify-center"
      >
        {/* 3D tilt perspective wrapper */}
        <div style={{ perspective: "1000px" }} className="relative">
          {/* Floating tech tags around the card */}
          {floatingTags.map((tag) => (
            <FloatingTag key={tag.label} {...tag} />
          ))}

          <motion.div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,97,0.1)",
            }}
            className="glass-strong rounded-3xl p-12 max-w-2xl mx-auto text-center"
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(201,169,97,0.07) 0%, transparent 60%)",
              }}
            />

            {/* ── Profile Image with 3D Orbital Rings ── */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-40 h-40 mx-auto mb-8 relative"
              style={{ perspective: "500px", transformStyle: "preserve-3d" }}
            >
              {/* Profile circle */}
              <div className="w-full h-full rounded-full glass-strong overflow-hidden border-2 border-primary/30 relative z-10"
                style={{ transform: "translateZ(10px)" }}
              >
                <img
                  src={myImage}
                  alt="Ankita Maji"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Ring 1 – equatorial plane */}
              <motion.div
                className="absolute rounded-full border-2"
                style={{
                  inset: "-14px",
                  borderColor: "rgba(201,169,97,0.55)",
                  rotateX: 72,
                  transformStyle: "preserve-3d",
                  boxShadow: "0 0 12px rgba(201,169,97,0.3)",
                }}
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              >
                {/* Electron dot on ring 1 */}
                <div
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    top: "-6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#c9a961",
                    boxShadow: "0 0 14px rgba(201,169,97,0.9), 0 0 28px rgba(201,169,97,0.5)",
                  }}
                />
              </motion.div>

              {/* Ring 2 – tilted 40° */}
              <motion.div
                className="absolute rounded-full border"
                style={{
                  inset: "-24px",
                  borderColor: "rgba(218,185,135,0.38)",
                  rotateX: 30,
                  rotateY: 40,
                  transformStyle: "preserve-3d",
                }}
                animate={{ rotateZ: [360, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
              >
                {/* Electron dot on ring 2 */}
                <div
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    top: "-5px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#dab987",
                    boxShadow: "0 0 12px rgba(218,185,135,0.8)",
                  }}
                />
              </motion.div>

              {/* Ring 3 – other plane */}
              <motion.div
                className="absolute rounded-full border"
                style={{
                  inset: "-34px",
                  borderColor: "rgba(201,169,97,0.22)",
                  rotateX: 55,
                  rotateY: -30,
                  transformStyle: "preserve-3d",
                }}
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                {/* Electron dot on ring 3 */}
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    bottom: "-4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#c9a961",
                    boxShadow: "0 0 10px rgba(201,169,97,0.7)",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
              style={{ transform: "translateZ(8px)" }}
            >
              Ankita Maji
            </motion.h1>

            {/* Animated Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="h-12 mb-8"
            >
              <motion.p
                key={currentRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl md:text-2xl text-muted-foreground"
              >
                {roles[currentRole]}
              </motion.p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 justify-center mb-8"
              style={{ transform: "translateZ(6px)" }}
            >
              <motion.button
                onClick={() => onNavigate(2)}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-accent transition-all duration-300 flex items-center gap-2 group"
                style={{ boxShadow: "0 8px 24px rgba(201,169,97,0.3)" }}
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <div className="relative">
                <motion.button
                  onClick={() => setShowResumeOptions(!showResumeOptions)}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 glass-strong rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </motion.button>
                {showResumeOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute top-full mt-2 w-full glass-strong rounded-xl overflow-hidden z-10 min-w-max"
                  >
                    <a
                      href="https://drive.google.com/file/d/1L3Kb1W5J6hYNMw7ZFh_T7mRZaTX7DLzA/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-sm hover:bg-white/10 transition-colors"
                    >
                      Specialized Resume
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1YqjWWtv3cj3b-ds_pCpQNrgnbf1yVG1X/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-sm hover:bg-white/10 transition-colors border-t border-border/50"
                    >
                      Generalized Resume
                    </a>
                  </motion.div>
                )}
              </div>

              <motion.button
                onClick={() => onNavigate(7)}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 glass-strong rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-4 justify-center"
              style={{ transform: "translateZ(4px)" }}
            >
              {[
                { href: "https://github.com/Ankita7033", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/ankitamaji2010", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:ankitamaji7033@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -6, scale: 1.15, rotateZ: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                  style={{
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}