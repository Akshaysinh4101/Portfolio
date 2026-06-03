import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiDownload } from "react-icons/fi";
import { useMagnetic } from "../hooks/useMagnetic";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  // Magnetic ref for logo/logo area
  const logoRef = useMagnetic(0.2);
  const cvBtnRef = useMagnetic(0.25);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Scroll spy using IntersectionObserver to avoid layout thrashing
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // Active zone in viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element);
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8 py-4 ${
          scrolled ? "bg-darkBg/60 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            ref={logoRef}
            onClick={() => handleNavClick("hero")}
            className="flex flex-col text-left group select-none magnetic-btn"
          >
            <span className="heading-font font-bold text-lg md:text-xl tracking-wider text-white">
              AKSHAY<span className="text-purple-500">.</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 group-hover:text-cyan-400 transition-colors uppercase">
              Dev Architect
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-6 py-1.5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-1.5 text-xs font-medium tracking-wide transition-colors uppercase rounded-full ${
                  activeSection === item.id ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-purple-500/20 border border-purple-500/30 rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Resume Button & Social Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors text-lg"
            >
              <FiGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors text-lg"
            >
              <FiLinkedin />
            </a>
            <a
              ref={cvBtnRef}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("CV Download placeholder clicked.");
              }}
              className="magnetic-btn flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-500/20 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:scale-105 transition-all"
            >
              <FiDownload className="text-sm" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-200 hover:text-white transition-colors text-2xl p-2 z-50 relative"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-darkBg/95 backdrop-blur-lg z-30 lg:hidden flex flex-col items-center justify-center gap-8"
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: idx * 0.05, ease: "easeOut" }}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xl md:text-2xl font-semibold tracking-widest uppercase hover:text-purple-400 transition-colors ${
                    activeSection === item.id ? "text-purple-500" : "text-slate-300"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: NAV_ITEMS.length * 0.05 + 0.1 }}
              className="flex items-center gap-6 mt-8"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-purple-500 transition-colors text-2xl"
              >
                <FiGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-purple-500 transition-colors text-2xl"
              >
                <FiLinkedin />
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("CV Download placeholder clicked.");
                }}
                className="flex items-center gap-2 bg-purple-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full"
              >
                <FiDownload />
                <span>Resume</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
