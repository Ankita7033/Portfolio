import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Star, Cpu } from "lucide-react";
import { useRef } from "react";

// ─── Animated CGPA circular gauge ──────────────────────────────────────────
function CGPAGauge({ value, max = 10 }: { value: number; max?: number }) {
  const pct = value / max;
  const r = 46;
  const circ = 2 * Math.PI * r;
  const offset = circ - pct * circ;

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg width="128" height="128" style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <filter id="gaugeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#c9a961" />
            <stop offset="100%" stopColor="#dab987" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
        {/* Progress */}
        <motion.circle
          cx="64" cy="64" r={r}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, delay: 0.6, ease: "easeOut" }}
          filter="url(#gaugeGlow)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          className="text-2xl font-bold text-primary leading-none"
          style={{ textShadow: "0 0 16px rgba(201,169,97,0.6)" }}
        >
          {value}
        </motion.div>
        <div className="text-xs text-muted-foreground mt-0.5">/ {max}.0</div>
      </div>
    </div>
  );
}

// ─── 3D Floating decoration ─────────────────────────────────────────────────
function FloatingDecor({
  x, y, size, delay, icon: Icon, color,
}: {
  x: number; y: number; size: number; delay: number;
  icon: React.ElementType; color: string;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none flex items-center justify-center rounded-xl"
      style={{
        left: `${x}%`, top: `${y}%`,
        width: size, height: size,
        background: `${color}10`,
        border: `1px solid ${color}30`,
        backdropFilter: "blur(4px)",
      }}
      animate={{
        y: [-12, 12, -12],
        rotateX: [0, 15, 0],
        rotateY: [-10, 10, -10],
        rotateZ: [-5, 5, -5],
        opacity: [0.25, 0.55, 0.25],
      }}
      transition={{ duration: 5 + delay * 1.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Icon style={{ color, width: size * 0.45, height: size * 0.45 }} />
    </motion.div>
  );
}

// ─── 3D Orbital GraduationCap ───────────────────────────────────────────────
function OrbitalIcon() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 180 }}
      className="w-24 h-24 mx-auto mb-6 relative"
      style={{ perspective: "500px", transformStyle: "preserve-3d" }}
    >
      {/* Core icon */}
      <motion.div
        className="w-full h-full bg-primary/10 rounded-2xl flex items-center justify-center relative z-10"
        style={{ transform: "translateZ(12px)", boxShadow: "0 0 30px rgba(201,169,97,0.25)" }}
        animate={{ rotateY: [0, 5, 0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <GraduationCap className="w-12 h-12 text-primary" />
      </motion.div>

      {/* Ring 1 – equatorial */}
      <motion.div
        className="absolute rounded-full border-2"
        style={{
          inset: "-14px",
          borderColor: "rgba(201,169,97,0.5)",
          rotateX: 74,
          transformStyle: "preserve-3d",
          boxShadow: "0 0 12px rgba(201,169,97,0.2)",
        }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-3 h-3 rounded-full"
          style={{
            top: "-6px", left: "50%", transform: "translateX(-50%)",
            background: "#c9a961",
            boxShadow: "0 0 10px rgba(201,169,97,0.9)",
          }}
        />
      </motion.div>

      {/* Ring 2 – tilted */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          inset: "-22px",
          borderColor: "rgba(218,185,135,0.35)",
          rotateX: 28,
          rotateY: 45,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateZ: [360, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            top: "-4px", left: "50%", transform: "translateX(-50%)",
            background: "#dab987",
            boxShadow: "0 0 8px rgba(218,185,135,0.8)",
          }}
        />
      </motion.div>

      {/* Ring 3 */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          inset: "-30px",
          borderColor: "rgba(201,169,97,0.2)",
          rotateX: 52,
          rotateY: -30,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            bottom: "-3px", left: "50%", transform: "translateX(-50%)",
            background: "#c9a961",
            boxShadow: "0 0 7px rgba(201,169,97,0.7)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── 3D Tilt hook ───────────────────────────────────────────────────────────
function use3DTilt(strength = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [strength, -strength]), { stiffness: 140, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-strength, strength]), { stiffness: 140, damping: 22 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

// ─── Main Section ───────────────────────────────────────────────────────────
export function EducationSection() {
  const tilt = use3DTilt(7);

  const highlights = [
    "Specialized in Machine Learning & AI",
    "Data Structures & Algorithms",
    "Cloud Computing & DevOps",
    "Software Engineering Principles",
  ];

  const decorations = [
    { x: 2,  y: 10, size: 44, delay: 0,   icon: BookOpen,      color: "#c9a961" },
    { x: 90, y: 8,  size: 36, delay: 1.2, icon: Star,          color: "#dab987" },
    { x: 93, y: 62, size: 48, delay: 0.6, icon: Cpu,           color: "#c9a961" },
    { x: 1,  y: 65, size: 40, delay: 1.8, icon: Award,         color: "#dab987" },
    { x: 45, y: 2,  size: 30, delay: 0.9, icon: GraduationCap, color: "#c9a961" },
    { x: 7,  y: 88, size: 38, delay: 2.1, icon: BookOpen,      color: "#dab987" },
    { x: 86, y: 85, size: 42, delay: 0.3, icon: Star,          color: "#c9a961" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-6 pt-24 pb-12 relative overflow-hidden">

      {/* ── 3D Floating decorations ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: "600px" }}>
        {decorations.map((d, i) => <FloatingDecor key={i} {...d} />)}
      </div>

      {/* ── Ambient background orbs ── */}
      <motion.div
        className="absolute top-20 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,169,97,0.07) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(218,185,135,0.08) 0%, transparent 70%)" }}
        animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full max-w-3xl relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-muted-foreground">Academic background and achievements</p>
        </motion.div>

        {/* ── Main card with 3D tilt ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ perspective: "1100px" }}
        >
          <motion.div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            style={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transformStyle: "preserve-3d",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,97,0.1)",
            }}
            className="glass-strong rounded-3xl p-10 relative overflow-hidden"
          >
            {/* Highlight shimmer on top edge */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(201,169,97,0.07) 0%, transparent 40%)" }}
            />

            {/* Animated background sphere */}
            <motion.div
              className="absolute -top-24 -right-24 w-56 h-56 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(201,169,97,0.12) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              {/* ── 3D Orbital graduation cap ── */}
              <OrbitalIcon />

              {/* University name */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="text-3xl text-center mb-1"
                style={{ transform: "translateZ(8px)" }}
              >
                Lovely Professional University
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="text-lg text-center text-muted-foreground mb-8"
                style={{ transform: "translateZ(5px)" }}
              >
                B.Tech in Computer Science Engineering
              </motion.p>

              {/* Details grid */}
              <div className="grid md:grid-cols-2 gap-5 mb-8" style={{ perspective: "600px" }}>
                {/* Duration card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75 }}
                  whileHover={{ z: 18, y: -4, scale: 1.03 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(201,169,97,0.1)",
                  }}
                >
                  <motion.div
                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ transform: "translateZ(6px)" }}
                    whileHover={{ rotateY: 20 }}
                  >
                    <Calendar className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div style={{ transform: "translateZ(4px)" }}>
                    <div className="text-xs text-muted-foreground mb-0.5">Duration</div>
                    <div className="text-base font-medium">2021 – 2025</div>
                  </div>
                </motion.div>

                {/* CGPA card with gauge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 }}
                  whileHover={{ z: 18, y: -4, scale: 1.03 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(201,169,97,0.1)",
                  }}
                >
                  {/* CGPA gauge */}
                  <div style={{ transform: "translateZ(6px)" }}>
                    <CGPAGauge value={8.64} />
                  </div>
                  <div style={{ transform: "translateZ(4px)" }}>
                    <div className="text-xs text-muted-foreground mb-0.5">CGPA</div>
                    <div className="text-base font-medium text-primary">8.64 / 10.0</div>
                    <div className="text-xs text-muted-foreground mt-1">Top tier percentile</div>
                  </div>
                </motion.div>
              </div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 }}
                className="flex items-center justify-center gap-2 text-muted-foreground mb-8"
                style={{ transform: "translateZ(3px)" }}
              >
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <MapPin className="w-4 h-4 text-primary" />
                </motion.div>
                <span>Phagwara, Punjab, India</span>
              </motion.div>

              {/* Key highlights */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05 }}
                className="glass rounded-xl p-5"
                style={{ transform: "translateZ(5px)" }}
              >
                <h4 className="text-base mb-4 text-center flex items-center justify-center gap-2">
                  <Award className="w-4 h-4 text-primary" /> Key Highlights
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                      whileHover={{ x: 6, scale: 1.02 }}
                      className="flex items-start gap-2 text-sm p-2 rounded-lg transition-colors hover:bg-white/5"
                    >
                      <motion.span
                        className="text-primary mt-0.5 flex-shrink-0"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        ▹
                      </motion.span>
                      <span className="text-muted-foreground">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── 3D Floating stat badges below the card ── */}
        <div className="grid grid-cols-3 gap-4 mt-6" style={{ perspective: "600px" }}>
          {[
            { label: "8th Semester", value: "Final Year",    color: "#c9a961" },
            { label: "Location",     value: "Punjab, India", color: "#dab987" },
            { label: "Focus",        value: "ML • AI • Systems",color: "#c9a961" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, z: -30, y: 20 }}
              animate={{ opacity: 1, z: 0, y: 0 }}
              transition={{ delay: 1.3 + i * 0.12, type: "spring", stiffness: 160 }}
              whileHover={{ z: 16, y: -5, scale: 1.05 }}
              className="glass-strong rounded-xl p-4 text-center"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: `0 8px 24px rgba(0,0,0,0.3), 0 0 20px ${stat.color}10`,
                borderColor: `${stat.color}30`,
              }}
            >
              <div className="text-xs text-muted-foreground mb-1" style={{ transform: "translateZ(2px)" }}>{stat.label}</div>
              <div className="text-sm font-medium" style={{ color: stat.color, transform: "translateZ(4px)" }}>{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
