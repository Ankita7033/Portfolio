import { motion } from "motion/react";
import { useEffect, useState, useMemo } from "react";

// Stable random values generated once (avoids re-render jitter)
function useStableParticles(count: number) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
      drift: (Math.random() - 0.5) * 40,
      depth: Math.random(), // 0 = far, 1 = close
    }));
  }, [count]);
}

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particles = useStableParticles(28);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* ── Animated gradient mesh ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #c9a961 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #dab987 0%, transparent 70%)" }}
          animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8d7a5e 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Perspective grid floor */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 169, 97, 0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 169, 97, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* ── 3D depth star-field ── */}
        <div
          className="absolute inset-0"
          style={{ perspective: "800px", transformStyle: "preserve-3d" }}
        >
          {particles.map((p) => {
            const scale = 0.4 + p.depth * 0.6;    // far=small, near=big
            const opacity = 0.1 + p.depth * 0.4;
            const blur = (1 - p.depth) * 1.5;
            const zOffset = -300 + p.depth * 300;  // near particles start higher in Z
            return (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size * scale,
                  height: p.size * scale,
                  background:
                    p.depth > 0.7
                      ? "#c9a961"
                      : p.depth > 0.4
                      ? "#dab987"
                      : "rgba(255,255,255,0.6)",
                  filter: `blur(${blur}px)`,
                  boxShadow:
                    p.depth > 0.7
                      ? `0 0 ${4 + p.depth * 8}px rgba(201,169,97,${0.5 + p.depth * 0.5})`
                      : "none",
                  translateZ: zOffset,
                }}
                animate={{
                  y: [0, p.drift, 0],
                  x: [0, p.drift * 0.4, 0],
                  opacity: [opacity * 0.4, opacity, opacity * 0.4],
                  scale: [scale * 0.85, scale * 1.15, scale * 0.85],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: p.delay,
                }}
              />
            );
          })}
        </div>

        {/* ── Slow-moving 3D floating cubes ── */}
        {[
          { x: 8,  y: 20, s: 18, a: 15 },
          { x: 85, y: 12, s: 12, a: 25 },
          { x: 92, y: 65, s: 20, a: 10 },
          { x: 6,  y: 75, s: 14, a: 20 },
          { x: 50, y: 8,  s: 10, a: 18 },
          { x: 72, y: 88, s: 16, a: 12 },
        ].map((cube, i) => (
          <motion.div
            key={`cube-${i}`}
            className="absolute"
            style={{
              left: `${cube.x}%`,
              top:  `${cube.y}%`,
              width:  cube.s,
              height: cube.s,
              border: "1px solid rgba(201, 169, 97, 0.2)",
              borderRadius: "4px",
              background: "rgba(201, 169, 97, 0.03)",
            }}
            animate={{
              y:       [-12, 12, -12],
              rotateX: [0, 180, 360],
              rotateY: [0, 270, 360],
              rotateZ: [0, 90, 0],
              opacity: [cube.a / 100, cube.a / 40, cube.a / 100],
            }}
            transition={{
              duration: 8 + i * 2.5,
              repeat: Infinity,
              ease:   "easeInOut",
              delay:  i * 0.7,
            }}
          />
        ))}
      </div>

      {/* ── Cursor glow ── */}
      <motion.div
        className="cursor-glow"
        animate={{ x: mousePosition.x - 200, y: mousePosition.y - 200 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </>
  );
}
