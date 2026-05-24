import { motion } from "motion/react";
import { Home, User, FolderGit2, Code2, Briefcase, Award, GraduationCap, Mail, Moon, Sun } from "lucide-react";

interface NavigationProps {
  currentSection: number;
  setCurrentSection: (section: number) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Navigation({ currentSection, setCurrentSection, darkMode, toggleDarkMode }: NavigationProps) {
  const navItems = [
    { icon: Home, label: "Home", id: 0 },
    { icon: User, label: "About", id: 1 },
    { icon: FolderGit2, label: "Projects", id: 2 },
    { icon: Code2, label: "Skills", id: 3 },
    { icon: Briefcase, label: "Experience", id: 4 },
    { icon: Award, label: "Achievements", id: 5 },
    { icon: GraduationCap, label: "Education", id: 6 },
    { icon: Mail, label: "Connect", id: 7 },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-strong rounded-full px-6 py-3 flex items-center gap-6">
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`relative p-2 rounded-lg transition-all ${
                currentSection === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
              {currentSection === item.id && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-border" />

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          title="Toggle theme"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </motion.nav>
  );
}