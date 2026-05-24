import { motion } from "motion/react";
import { Mail, Phone, Linkedin, Github, Copy, Check } from "lucide-react";
import { useState } from "react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "ankitamaji7033@gmail.com",
    href: "mailto:ankitamaji7033@gmail.com",
    color: "#c9a961",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9307014709",
    href: "tel:+919307014709",
    color: "#dab987",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ankitamaji2010",
    href: "https://www.linkedin.com/in/ankitamaji2010",
    color: "#0077B5",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Ankita7033",
    href: "https://github.com/Ankita7033",
    color: "#333",
  },
];

export function ConnectSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (value: string, index: number) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-6 pt-24 pb-12">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-muted-foreground">
            Interested in collaborating or have a question? Reach out through any of these channels
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-strong rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at center, ${contact.color}10 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${contact.color}20` }}
                  >
                    <contact.icon className="w-6 h-6" style={{ color: contact.color }} />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(contact.value, index)}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-all"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>

                <h3 className="text-lg mb-2">{contact.label}</h3>
                <a
                  href={contact.href}
                  target={contact.label === "LinkedIn" || contact.label === "GitHub" ? "_blank" : undefined}
                  rel={contact.label === "LinkedIn" || contact.label === "GitHub" ? "noopener noreferrer" : undefined}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
                >
                  {contact.value}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-strong rounded-2xl p-8"
        >
          <h3 className="text-2xl mb-6 text-center">Send a Message</h3>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-input-background glass rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-input-background glass rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 text-sm">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 bg-input-background glass rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Project Collaboration"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-input-background glass rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Tell me about your project or inquiry..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Send Message
              <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}