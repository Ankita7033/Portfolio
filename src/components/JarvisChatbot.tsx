import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Cpu } from "lucide-react";

interface Message {
  type: "user" | "jarvis";
  content: string;
}

const responses: Record<string, string> = {
  projects: "Ankita has worked on 3 major projects: DisasterGuard (disaster prediction ML system), MOSAIC (intelligent task scheduler), and Diabetes Graph ML (GNN-based prediction). Would you like details on any specific project?",
  skills: "Ankita is proficient in Python, Java, C/C++, SQL, and JavaScript. She specializes in ML libraries like TensorFlow, PyTorch, and Scikit-learn, with strong backend experience in Flask and FastAPI.",
  internships: "Ankita completed 3 internships: ML Intern at 1stop.ai, Software Engineering Simulation at JPMorgan, and Technology Simulation at Citi. Each focused on different aspects of software engineering and ML.",
  achievements: "Key achievements include 500+ DSA problems solved, 5⭐ ratings in Java, Python, C, and SQL on HackerRank, and 15+ professional certifications.",
  education: "Ankita is pursuing B.Tech in Computer Science Engineering from Lovely Professional University (2021-2025) with a CGPA of 8.64.",
  "tech stack": "Primary stack includes Python, TensorFlow/PyTorch for ML, Flask/FastAPI for backend, React for frontend, PostgreSQL/MongoDB for databases, and AWS/Docker for deployment.",
  mosaic: "MOSAIC is an advanced task scheduler using reinforcement learning for intelligent resource allocation. It optimizes multi-threaded workloads with 87% efficiency and handles 100K+ tasks daily.",
  disasterguard: "DisasterGuard uses ML models to predict disasters by analyzing weather patterns and seismic data. It achieves 94.5% accuracy and has sent 10,000+ alerts across 15 regions.",
  default: "I'm JARVIS, Ankita's portfolio assistant! Ask me about her projects, skills, internships, achievements, education, or tech stack. Try: 'Tell me about projects' or 'Explain MOSAIC'",
};

export function JarvisChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: "jarvis", content: "Hello! I'm JARVIS. How can I help you learn about Ankita's work?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simple keyword matching
    const lowerInput = input.toLowerCase();
    let response = responses.default;

    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      const jarvisMessage: Message = { type: "jarvis", content: response };
      setMessages((prev) => [...prev, jarvisMessage]);
    }, 500);

    setInput("");
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg z-50 group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] glass-strong rounded-2xl overflow-hidden z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/50 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">JARVIS</h3>
                <p className="text-xs text-muted-foreground">Portfolio Assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "glass text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 px-4 py-2 bg-input-background glass rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
