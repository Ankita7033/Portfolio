import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LoadingScreen } from "./components/LoadingScreen";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Navigation } from "./components/Navigation";
import { HomeSection } from "./components/sections/HomeSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { AchievementsSection } from "./components/sections/AchievementsSection";
import { EducationSection } from "./components/sections/EducationSection";
import { ConnectSection } from "./components/sections/ConnectSection";
import { JarvisChatbot } from "./components/JarvisChatbot";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const sections = [
    <HomeSection key="home" onNavigate={setCurrentSection} />,
    <AboutSection key="about" />,
    <ProjectsSection key="projects" />,
    <SkillsSection key="skills" />,
    <ExperienceSection key="experience" />,
    <AchievementsSection key="achievements" />,
    <EducationSection key="education" />,
    <ConnectSection key="connect" />,
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else if (e.key === "ArrowLeft" && currentSection > 0) {
        setCurrentSection(currentSection - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, sections.length]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <AnimatedBackground />
            
            <Navigation
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              darkMode={darkMode}
              toggleDarkMode={() => setDarkMode(!darkMode)}
            />

            {/* Section Container with Horizontal Sliding */}
            <div className="relative overflow-hidden" style={{ height: '100vh' }}>
              <motion.div
                className="flex h-full"
                animate={{
                  x: `-${currentSection * 100}%`,
                }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 300,
                }}
              >
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className="min-w-full h-full overflow-y-auto"
                    style={{ width: "100vw" }}
                  >
                    {section}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Section Indicators */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className="group"
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSection === index
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/50 group-hover:bg-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>

            <JarvisChatbot />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}