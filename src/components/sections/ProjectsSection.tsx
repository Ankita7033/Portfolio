import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { Folder, FileCode, FileJson, Github, ExternalLink, ChevronRight } from "lucide-react";

// ─── Project data ──────────────────────────────────────────────────────────
const projects = [
  {
    name: "PulseChain",
    description: "Automated disease outbreak early warning system that watches 5 real-world data signals simultaneously — wastewater, pharmacy sales, absenteeism, ED triage, and search trends — using Bayesian fusion and statistical engines to issue tiered alerts 9.3 days before traditional surveillance.",
    tech: ["n8n", "Python", "FastAPI", "Kafka", "TimescaleDB", "Redis", "Docker"],
    github: "https://github.com/Ankita7033/pulsechain",
    features: [
      "5-signal Bayesian fusion: wastewater RNA, pharmacy sales, absenteeism, ED triage & search trends",
      "Regional seasonal baseline model — compares against what is normal for that region at that time of year",
      "CUSUM + Z-score anomaly detection chained with explainable alert generation",
      "3-tier alert system: Tier 1 SMS/CDC API/FHIR push, Tier 2 email, Tier 3 monitoring watch",
      "Cross-region SIR spread model predicts which neighbouring regions are at risk and by when",
      "11-workflow n8n orchestration with SLA escalation, audit logging, and dead-letter error recovery",
    ],
    metrics: { "lead time": "+9.3 days", "false positive": "5.1%", "events/hr": "96,100", "P50 latency": "6.2 sec", "success rate": "99.74%", "test coverage": "34 tests" },
  },
  {
    name: "DisasterGuard",
    description: "Real-time disaster prediction and alert system using ML models to analyze weather patterns, seismic data, and historical disaster records.",
    tech: ["Python", "TensorFlow", "Flask", "React", "PostgreSQL"],
    github: "https://github.com/Ankita7033/Disasterguard",
    demo: "https://disasterguard-six.vercel.app/",
    features: [
      "Real-time data processing and analysis",
      "Scalable microservices architecture",
      "Advanced ML model integration",
      "Interactive monitoring dashboard",
    ],
    metrics: { accuracy: "94.5%", alerts: "10,000+", coverage: "15 regions" },
  },
  {
    name: "MOSAIC",
    description: "Advanced task scheduler with intelligent resource allocation using reinforcement learning for optimizing multi-threaded workloads.",
    tech: ["C++", "PyTorch", "CUDA", "Docker"],
    github: "https://github.com/Ankita7033/MOSAIC",
    features: [
      "Real-time data processing and analysis",
      "Scalable microservices architecture",
      "Advanced ML model integration",
      "Interactive monitoring dashboard",
    ],
    metrics: { efficiency: "87%", throughput: "2.5× faster", tasks: "100K+/day" },
  },
  {
    name: "Diabetes Graph ML",
    description: "Graph neural network based diabetes risk prediction using patient medical history, lifestyle data, and genetic markers.",
    tech: ["Python", "PyG", "FastAPI", "Vue.js", "MongoDB"],
    github: "https://github.com/Ankita7033/T2D_USING_K-MEANS",
    features: [
      "Real-time data processing and analysis",
      "Scalable microservices architecture",
      "Advanced ML model integration",
      "Interactive monitoring dashboard",
    ],
    metrics: { precision: "91.2%", patients: "50,000+", features: "200+ markers" },
  },
];

// ─── Architecture node/edge data ───────────────────────────────────────────
const NODE_COLORS = {
  input: { bg: "rgba(0,200,220,0.12)", stroke: "rgba(0,200,220,0.65)", text: "#00c8dc", pulse: "rgba(0,200,220,0.35)" },
  process: { bg: "rgba(201,169,97,0.13)", stroke: "rgba(201,169,97,0.65)", text: "#c9a961", pulse: "rgba(201,169,97,0.35)" },
  model: { bg: "rgba(168,85,247,0.13)", stroke: "rgba(168,85,247,0.65)", text: "#a855f7", pulse: "rgba(168,85,247,0.35)" },
  output: { bg: "rgba(52,211,153,0.12)", stroke: "rgba(52,211,153,0.65)", text: "#34d399", pulse: "rgba(52,211,153,0.35)" },
} as const;

type NodeType = keyof typeof NODE_COLORS;

interface ArchNode { id: string; label: string; type: NodeType; cx: number; cy: number; desc: string; }
interface ArchEdge { from: string; to: string; label?: string; }

const architectureData: Record<string, { nodes: ArchNode[]; edges: ArchEdge[] }> = {
  "PulseChain": {
    nodes: [
      { id: "ww",    label: "Wastewater",   type: "input",   cx: 68,  cy: 35,  desc: "CDC NWSS API: viral RNA copies/mL in sewage — appears 5-7 days before first hospital case. Polled every 15 min with synthetic fallback." },
      { id: "ph",    label: "Pharmacy",      type: "input",   cx: 68,  cy: 95,  desc: "Bulk purchases of fever/flu medication — people buy medicine before seeing a doctor. Polled every 6 hours." },
      { id: "st",    label: "Search Trends", type: "input",   cx: 68,  cy: 155, desc: "Google Trends for symptom queries — people search symptoms before seeing anyone. Polled every 6 hours." },
      { id: "ab",    label: "Absenteeism",   type: "input",   cx: 68,  cy: 215, desc: "School and workplace absence rates — people stay home before going to hospital. Polled every 30 min." },
      { id: "ed",    label: "ED Triage",     type: "input",   cx: 68,  cy: 275, desc: "Keywords ('fever','cough','flu-like') in emergency room intake forms — clinical signal from ER intake notes." },
      { id: "kafka", label: "Kafka Queue",   type: "process", cx: 240, cy: 160, desc: "Message buffer between ingestion workflows (running at 15 min / 30 min / 6 hr) and the always-on anomaly detector. Prevents data loss." },
      { id: "anom",  label: "Anomaly Engine",type: "model",   cx: 415, cy: 160, desc: "Workflow 05: fetches regional seasonal baseline, computes Z-score, runs CUSUM trend detection, calls FastAPI Bayesian fusion. Core of the system." },
      { id: "bayes", label: "Bayesian Fusion",type: "model",  cx: 565, cy: 100, desc: "FastAPI Python service: combines all 5 signals using Bayes' theorem. 1 signal spike → low P(outbreak). 5 signals elevated → P(outbreak)≈0.82 with 90% credible interval." },
      { id: "spread",label: "Spread Model",  type: "model",   cx: 565, cy: 210, desc: "SIR epidemiological model + mobility graph: once outbreak detected in one region, predicts which neighbouring regions are at risk and estimated arrival time." },
      { id: "router",label: "Alert Router",  type: "process", cx: 690, cy: 100, desc: "Workflow 07: P≥0.75→Tier 1 Emergency, P≥0.50→Tier 2 Advisory, P≥0.25→Tier 3 Watch. Writes full audit log of every routing decision." },
      { id: "notif", label: "Notifications", type: "output",  cx: 690, cy: 210, desc: "Workflow 08: Tier 1 sends SMS (Twilio) + CDC API push + hospital FHIR + email. Tier 2 sends email + dashboard alert. All dispatches tracked with status." },
    ],
    edges: [
      { from: "ww",    to: "kafka",  label: "events" },
      { from: "ph",    to: "kafka",  label: "events" },
      { from: "ab",    to: "kafka",  label: "events" },
      { from: "ed",    to: "kafka",  label: "events" },
      { from: "st",    to: "kafka",  label: "events" },
      { from: "kafka", to: "anom",   label: "signals" },
      { from: "anom",  to: "bayes",  label: "z-scores" },
      { from: "anom",  to: "spread", label: "region" },
      { from: "bayes", to: "router", label: "P(outbreak)" },
      { from: "spread",to: "router", label: "forecast" },
      { from: "router",to: "notif",  label: "tier 1/2" },
    ],
  },
  "DisasterGuard": {
    nodes: [
      { id: "sensor", label: "Sensor APIs", type: "input", cx: 75, cy: 150, desc: "Real-time feeds from 15+ regions: weather APIs, seismic sensors & satellite imagery." },
      { id: "queue", label: "Kafka Queue", type: "process", cx: 240, cy: 150, desc: "Fault-tolerant message queue handling 1M+ events/day with replay & backpressure support." },
      { id: "prep", label: "Preprocessor", type: "process", cx: 405, cy: 150, desc: "Feature engineering, normalization, rolling-window stats and missing-value imputation." },
      { id: "ml", label: "LSTM + CNN", type: "model", cx: 565, cy: 150, desc: "Ensemble: LSTM for temporal patterns + CNN for spatial signals — 94.5 % accuracy." },
      { id: "alert", label: "Alert Engine", type: "output", cx: 700, cy: 70, desc: "Multi-channel notifications (SMS, push, webhooks) reaching 10,000+ subscribers." },
      { id: "dash", label: "Dashboard", type: "output", cx: 700, cy: 230, desc: "Live React dashboard with regional heat-maps and trend analysis across 15 regions." },
    ],
    edges: [
      { from: "sensor", to: "queue", label: "events" },
      { from: "queue", to: "prep", label: "batches" },
      { from: "prep", to: "ml", label: "tensors" },
      { from: "ml", to: "alert", label: "risk >" },
      { from: "ml", to: "dash", label: "scores" },
    ],
  },
  "MOSAIC": {
    nodes: [
      { id: "tq", label: "Task Queue", type: "input", cx: 375, cy: 40, desc: "Priority queue with 100 K+ tasks/day, preemption support and SLA deadlines." },
      { id: "rl", label: "DQN Agent", type: "model", cx: 375, cy: 155, desc: "Deep Q-Network learning optimal scheduling policies via environment interaction." },
      { id: "rm", label: "Resource Mgr", type: "process", cx: 600, cy: 155, desc: "NUMA-aware CPU/GPU allocator tracking utilisation across worker nodes." },
      { id: "ex", label: "Executor", type: "process", cx: 600, cy: 270, desc: "Parallel task runner achieving 2.5× throughput via dynamic batching." },
      { id: "mon", label: "Monitor", type: "output", cx: 150, cy: 155, desc: "Real-time telemetry, SLA tracking and reward signal for the RL feedback loop." },
    ],
    edges: [
      { from: "tq", to: "rl", label: "tasks" },
      { from: "rl", to: "rm", label: "allocate" },
      { from: "rm", to: "ex", label: "run" },
      { from: "ex", to: "mon", label: "metrics" },
      { from: "mon", to: "rl", label: "reward ↺" },
    ],
  },
  "Diabetes Graph ML": {
    nodes: [
      { id: "raw", label: "Patient Data", type: "input", cx: 75, cy: 155, desc: "50,000+ records: lab results, lifestyle factors & 200+ genetic markers." },
      { id: "graph", label: "Graph Builder", type: "process", cx: 230, cy: 155, desc: "Builds heterogeneous patient-similarity graph with comorbidity edges." },
      { id: "gnn1", label: "GAT Layer", type: "model", cx: 390, cy: 70, desc: "Graph Attention Network learning local neighbourhood features." },
      { id: "gnn2", label: "GraphSAGE", type: "model", cx: 390, cy: 240, desc: "Aggregates multi-hop relational information across the patient graph." },
      { id: "pool", label: "Readout", type: "process", cx: 545, cy: 155, desc: "Differentiable pooling combining multi-scale node embeddings." },
      { id: "api", label: "FastAPI", type: "output", cx: 690, cy: 80, desc: "Sub-10 ms inference endpoint with calibrated uncertainty bounds." },
      { id: "viz", label: "Vue Dashboard", type: "output", cx: 690, cy: 230, desc: "Interactive graph explorer showing patient risk clusters." },
    ],
    edges: [
      { from: "raw", to: "graph" },
      { from: "graph", to: "gnn1" },
      { from: "graph", to: "gnn2" },
      { from: "gnn1", to: "pool" },
      { from: "gnn2", to: "pool" },
      { from: "pool", to: "api" },
      { from: "pool", to: "viz" },
    ],
  },
};

// ─── Interactive SVG Architecture Graph ────────────────────────────────────
function ArchitectureGraph({ projectName }: { projectName: string }) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const data = architectureData[projectName];
  if (!data) return null;

  const nodeMap = Object.fromEntries(data.nodes.map((n) => [n.id, n]));
  const selected = selectedNode ? nodeMap[selectedNode] : null;

  // Which node IDs are connected to the selected node?
  const connectedIds = new Set<string>();
  if (selectedNode) {
    data.edges.forEach((e) => {
      if (e.from === selectedNode) connectedIds.add(e.to);
      if (e.to === selectedNode) connectedIds.add(e.from);
    });
  }
  const dimNode = (id: string) => selectedNode && id !== selectedNode && !connectedIds.has(id);

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Legend */}
      <div className="flex gap-4 justify-end flex-wrap">
        {(Object.keys(NODE_COLORS) as NodeType[]).map((t) => (
          <div key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground capitalize">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: NODE_COLORS[t].text }} />
            {t}
          </div>
        ))}
      </div>

      {/* SVG Graph */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-xl overflow-hidden"
        style={{ background: "rgba(0,0,0,0.25)" }}
      >
        <svg viewBox="0 0 760 310" className="w-full" style={{ display: "block" }}>
          <defs>
            <filter id="nodeGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="partGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="rgba(201,169,97,0.45)" />
            </marker>
          </defs>

          {/* ── Edges ── */}
          {data.edges.map((edge, i) => {
            const f = nodeMap[edge.from];
            const t = nodeMap[edge.to];
            const isActive = f.id === selectedNode || t.id === selectedNode;
            const opacity = selectedNode ? (isActive ? 1 : 0.15) : 0.45;
            const strokeColor = isActive
              ? "rgba(201,169,97,0.85)"
              : "rgba(201,169,97,0.35)";

            // determine midpoint for label
            const mx = (f.cx + t.cx) / 2;
            const my = (f.cy + t.cy) / 2;

            return (
              <g key={`e-${i}`} style={{ opacity }}>
                {/* Base line */}
                <line
                  x1={f.cx} y1={f.cy}
                  x2={t.cx} y2={t.cy}
                  stroke={strokeColor}
                  strokeWidth={isActive ? 2 : 1.5}
                  strokeDasharray="6 4"
                  markerEnd="url(#arrow)"
                />
                {/* Edge label */}
                {edge.label && (
                  <text
                    x={mx} y={my - 7}
                    textAnchor="middle"
                    fill="rgba(201,169,97,0.55)"
                    fontSize={9}
                    fontFamily="monospace"
                  >
                    {edge.label}
                  </text>
                )}
                {/* Animated particle */}
                <motion.circle
                  r={isActive ? 5 : 3.5}
                  cx={0} cy={0}
                  fill={isActive ? "#c9a961" : "rgba(201,169,97,0.7)"}
                  filter="url(#partGlow)"
                  initial={{ x: f.cx, y: f.cy, opacity: 0 }}
                  animate={{
                    x: [f.cx, t.cx],
                    y: [f.cy, t.cy],
                    opacity: [0, 0.9, 0.9, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.38,
                    times: [0, 0.1, 0.9, 1],
                  }}
                />
              </g>
            );
          })}

          {/* ── Nodes ── */}
          {data.nodes.map((node) => {
            const c = NODE_COLORS[node.type];
            const isSelected = selectedNode === node.id;
            const dim = dimNode(node.id);
            const w = 112, h = 48;

            return (
              <motion.g
                key={node.id}
                onClick={() => setSelectedNode(isSelected ? null : node.id)}
                style={{ cursor: "pointer", opacity: dim ? 0.2 : 1 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: dim ? 0.2 : 1, scale: 1 }}
                transition={{ delay: 0.05 }}
                whileHover={!dim ? { scale: 1.1 } : {}}
              >
                {/* Outer pulse ring when selected */}
                {isSelected && (
                  <motion.rect
                    x={node.cx - w / 2 - 6}
                    y={node.cy - h / 2 - 6}
                    width={w + 12}
                    height={h + 12}
                    rx={16}
                    fill="none"
                    stroke={c.stroke}
                    strokeWidth={2}
                    animate={{ opacity: [0.8, 0, 0.8], scale: [1, 1.04, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                  />
                )}

                {/* Node body */}
                <rect
                  x={node.cx - w / 2}
                  y={node.cy - h / 2}
                  width={w}
                  height={h}
                  rx={12}
                  fill={isSelected ? c.bg.replace("0.12", "0.35").replace("0.13", "0.35") : c.bg}
                  stroke={c.stroke}
                  strokeWidth={isSelected ? 2 : 1}
                  filter={isSelected ? "url(#nodeGlow)" : undefined}
                />

                {/* Type indicator */}
                <circle cx={node.cx - w / 2 + 12} cy={node.cy - h / 2 + 10} r={3} fill={c.text} />

                {/* Label */}
                <text
                  x={node.cx}
                  y={node.cy + 5}
                  textAnchor="middle"
                  fill={isSelected ? c.text : "rgba(255,255,255,0.82)"}
                  fontSize={11}
                  fontWeight={isSelected ? "700" : "500"}
                  fontFamily="'Inter', sans-serif"
                >
                  {node.label}
                </text>

                {/* Type label small */}
                <text
                  x={node.cx}
                  y={node.cy + h / 2 - 7}
                  textAnchor="middle"
                  fill={c.text}
                  fontSize={8}
                  fontFamily="monospace"
                  opacity={0.65}
                >
                  {node.type}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </motion.div>

      {/* Info panel */}
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.25 }}
            className="glass rounded-xl p-4 overflow-hidden"
            style={{ borderColor: NODE_COLORS[selected.type].stroke, borderWidth: 1 }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: NODE_COLORS[selected.type].text }}
              />
              <span className="text-sm font-semibold" style={{ color: NODE_COLORS[selected.type].text }}>
                {selected.label}
              </span>
              <span className="ml-auto text-xs text-muted-foreground capitalize px-2 py-0.5 rounded-full"
                style={{ background: NODE_COLORS[selected.type].bg }}>
                {selected.type}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{selected.desc}</p>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-center text-muted-foreground/40 py-1"
          >
            ↑ Click any node to explore · Particles show live data flow
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Floating 3D background shapes ─────────────────────────────────────────
function FloatingShape({ x, y, size, delay, shape }: {
  x: number; y: number; size: number; delay: number; shape: "cube" | "diamond" | "sphere";
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{ y: [-15, 15, -15], rotateX: [0, 180, 360], rotateY: [0, 270, 360], opacity: [0.12, 0.4, 0.12] }}
      transition={{ duration: 7 + delay * 1.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        className="w-full h-full"
        style={{
          background: shape === "sphere"
            ? "radial-gradient(circle, rgba(201,169,97,0.5) 0%, transparent 70%)"
            : "linear-gradient(135deg, rgba(201,169,97,0.3), rgba(218,185,135,0.08))",
          borderRadius: shape === "sphere" ? "50%" : shape === "diamond" ? "4px" : "10px",
          border: "1px solid rgba(201,169,97,0.3)",
          transform: shape === "diamond" ? "rotate(45deg)" : "none",
        }}
      />
    </motion.div>
  );
}

// ─── Main Section ───────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [activeTab, setActiveTab] = useState<"readme" | "architecture" | "metrics">("readme");

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 22 });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]: string[]) => `radial-gradient(circle at ${x} ${y}, rgba(201,169,97,0.11) 0%, transparent 55%)`
  );
  const shadowDepth = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) => `${x * -30}px ${y * -30}px 60px rgba(0,0,0,0.5), 0 30px 80px rgba(0,0,0,0.4)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const project = projects[selectedProject];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-6 pt-24 pb-12 relative overflow-hidden">

      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: "600px" }}>
        <FloatingShape x={4} y={12} size={38} delay={0} shape="cube" />
        <FloatingShape x={89} y={10} size={28} delay={1.5} shape="diamond" />
        <FloatingShape x={94} y={55} size={50} delay={0.7} shape="sphere" />
        <FloatingShape x={2} y={72} size={32} delay={2.2} shape="cube" />
        <FloatingShape x={48} y={3} size={22} delay={1.1} shape="diamond" />
        <FloatingShape x={78} y={88} size={44} delay={0.4} shape="sphere" />
      </div>

      {/* 3D tilt wrapper */}
      <div style={{ perspective: "1400px" }} className="w-full max-w-6xl">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.93, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", boxShadow: shadowDepth }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-[640px] glass-strong rounded-2xl overflow-hidden flex flex-col relative"
        >
          {/* Mouse-following glow */}
          <motion.div className="absolute inset-0 pointer-events-none z-0 rounded-2xl" style={{ background: glowBg }} />
          <div className="absolute inset-0 rounded-2xl pointer-events-none z-20"
            style={{ background: "linear-gradient(135deg, rgba(201,169,97,0.07) 0%, transparent 40%, transparent 60%, rgba(201,169,97,0.03) 100%)" }} />

          {/* VS Code Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 relative z-10" style={{ transform: "translateZ(10px)" }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 text-sm text-muted-foreground">Projects — Ankita Maji</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileCode className="w-4 h-4" />
              <span>portfolio.workspace</span>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden relative z-10">
            {/* Sidebar */}
            <div className="w-60 border-r border-border/50 p-4 overflow-y-auto flex-shrink-0" style={{ transform: "translateZ(5px)" }}>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5" /> Explorer
              </div>
              <div className="space-y-1 mb-6">
                {projects.map((proj, index) => (
                  <motion.button
                    key={proj.name}
                    onClick={() => { setSelectedProject(index); setActiveTab("readme"); }}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-all flex items-center gap-2 ${selectedProject === index ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5"
                      }`}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <ChevronRight className={`w-3 h-3 transition-transform flex-shrink-0 ${selectedProject === index ? "rotate-90" : ""}`} />
                    <FileCode className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{proj.name}</span>
                  </motion.button>
                ))}
              </div>
              <div className="border-t border-border/50 pt-4">
                <div className="text-xs text-muted-foreground mb-2">Tech Stack</div>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <motion.span key={tech} whileHover={{ scale: 1.08, y: -2 }}
                      className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded cursor-default">
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main editor area */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Tabs */}
              <div className="flex items-center gap-1 px-4 border-b border-border/50 flex-shrink-0">
                {(["readme", "architecture", "metrics"] as const).map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ y: -1 }}
                    className={`px-4 py-2 text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {tab === "metrics" ? <FileJson className="w-4 h-4" /> : <FileCode className="w-4 h-4" />}
                    {tab === "readme" ? "README.md" : tab === "architecture" ? "ARCHITECTURE" : "metrics.json"}
                  </motion.button>
                ))}
              </div>

              {/* Content area */}
              <div className="flex-1 p-5 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === "readme" && (
                    <motion.div key="readme" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <h2 className="text-2xl mb-3 text-foreground">{project.name}</h2>
                      <p className="text-muted-foreground mb-5 leading-relaxed">{project.description}</p>
                      <div>
                        <h3 className="text-base mb-3 text-foreground">Key Features</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {(project.features ?? ["Real-time data processing and analysis", "Scalable microservices architecture", "Advanced ML model integration", "Interactive monitoring dashboard"]).map((f: string) => (
                            <motion.li key={f} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-2">
                              <span className="text-primary mt-0.5">▹</span> {f}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "architecture" && (
                    <motion.div key={`arch-${project.name}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="h-full">
                      <ArchitectureGraph projectName={project.name} />
                    </motion.div>
                  )}

                  {activeTab === "metrics" && (
                    <motion.div key="metrics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <h3 className="text-xl mb-5 text-foreground">Performance Metrics</h3>
                      <div className="grid grid-cols-3 gap-4" style={{ perspective: "600px" }}>
                        {Object.entries(project.metrics).map(([key, value], i) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, z: -50, scale: 0.8 }}
                            animate={{ opacity: 1, z: 0, scale: 1 }}
                            transition={{ delay: i * 0.12 }}
                            whileHover={{ z: 20, y: -6, scale: 1.06 }}
                            className="glass-strong rounded-xl p-5 text-center cursor-default"
                            style={{ transformStyle: "preserve-3d", boxShadow: "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,169,97,0.12)" }}
                          >
                            <div className="text-2xl mb-1 text-primary font-bold" style={{ textShadow: "0 0 20px rgba(201,169,97,0.4)", transform: "translateZ(5px)" }}>{value}</div>
                            <div className="text-xs text-muted-foreground capitalize" style={{ transform: "translateZ(2px)" }}>{key}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-end gap-3 px-5 py-3 border-t border-border/50 flex-shrink-0">
                <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.04 }}
                  className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
                  <Github className="w-4 h-4" /> GitHub
                </motion.a>
                {project.demo && (
                  <motion.a href={project.demo} target="_blank" rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.04 }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-all flex items-center gap-2 text-sm">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}