import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { DEVELOPER_INFO } from "../constants";
import { useMagnetic } from "../hooks/useMagnetic";
import { fadeInUp, staggerContainer } from "../animations/variants";

export const Hero = () => {
  const exploreRef = useMagnetic(0.2);
  const contactRef = useMagnetic(0.2);
  const githubRef = useMagnetic(0.35);
  const linkedinRef = useMagnetic(0.35);
  const mailRef = useMagnetic(0.35);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex items-center justify-center relative pt-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden select-none"
    >
      <motion.div
        variants={staggerContainer(0.12, 0.25)}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10 py-12"
      >
        {/* Left Info Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            variants={fadeInUp(0)}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono rounded-full uppercase tracking-wider mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            Available for new opportunities
          </motion.div>

          <motion.h2
            variants={fadeInUp(0.1)}
            className="text-slate-400 text-lg md:text-xl font-medium tracking-wide mb-2"
          >
            Hi, I am
          </motion.h2>

          <motion.h1
            variants={fadeInUp(0.2)}
            className="heading-font text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-none"
          >
            {DEVELOPER_INFO.name}
          </motion.h1>

          <motion.h3
            variants={fadeInUp(0.3)}
            className="heading-font text-xl md:text-2xl font-bold tracking-wide mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            {DEVELOPER_INFO.role}
          </motion.h3>

          <motion.p
            variants={fadeInUp(0.4)}
            className="text-slate-400 text-sm md:text-base max-w-lg mb-8 leading-relaxed font-light"
          >
            {DEVELOPER_INFO.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp(0.5)}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <button
              ref={exploreRef}
              onClick={() => handleScrollTo("projects")}
              className="magnetic-btn flex items-center gap-2 bg-white text-darkBg hover:bg-slate-200 text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              <span>Explore My Work</span>
              <FiArrowRight className="text-sm" />
            </button>
            
            <button
              ref={contactRef}
              onClick={() => handleScrollTo("contact")}
              className="magnetic-btn flex items-center gap-2 bg-transparent text-white border border-white/20 hover:border-purple-500/50 hover:bg-purple-500/10 text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full hover:scale-105 transition-all"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Quick Socials */}
          <motion.div
            variants={fadeInUp(0.6)}
            className="flex items-center gap-5 text-slate-500 text-lg"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-600">Connect</span>
            <div className="w-10 h-[1px] bg-slate-800" />
            <a
              ref={githubRef}
              href={DEVELOPER_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn hover:text-white transition-colors p-1"
              aria-label="GitHub Profile"
            >
              <FiGithub />
            </a>
            <a
              ref={linkedinRef}
              href={DEVELOPER_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn hover:text-white transition-colors p-1"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin />
            </a>
            <a
              ref={mailRef}
              href={`mailto:${DEVELOPER_INFO.email}`}
              className="magnetic-btn hover:text-white transition-colors p-1"
              aria-label="Send Email"
            >
              <FiMail />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Premium Glowing Tech Card backdrop */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          {/* Neon Glow Backdrops (Hardware Accelerated) */}
          <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
          <div className="absolute w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          {/* Dynamic Tech Card (Pure CSS transitions for 120fps+ responsiveness) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative w-[280px] h-[340px] md:w-[320px] md:h-[400px] rounded-2xl glass-panel border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-2xl z-10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1.5 hover:border-purple-500/30 hover:shadow-purple-500/10"
          >
            {/* Top Bar Decoration */}
            <div className="flex justify-between items-center w-full mb-4 border-b border-white/5 pb-3 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
              </span>
              <span>architect.json</span>
            </div>

            {/* Glowing Pipeline Nodes Graphic */}
            <div className="flex-1 flex flex-col justify-center gap-4 relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              <div className="flex items-center justify-between z-10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xs font-mono text-purple-400 font-bold shadow-lg shadow-purple-500/5">
                  API
                </div>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-500/30 to-indigo-500/30 relative">
                  <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-purple-400 -translate-y-1/2 animate-ping" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-xs font-mono text-indigo-400 font-bold shadow-lg shadow-indigo-500/5">
                  SVC
                </div>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-indigo-500/30 to-cyan-500/30" />
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs font-mono text-cyan-400 font-bold shadow-lg shadow-cyan-500/5">
                  DB
                </div>
              </div>

              {/* AWS / Cloud Visualizer Card */}
              <div className="mt-2 bg-slate-950/40 border border-white/5 rounded-lg p-3 font-mono text-[9px] text-slate-400 z-10 flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-slate-500 text-[8px] uppercase tracking-wider">
                  <span>AWS Engine</span>
                  <span className="text-green-400">● Live</span>
                </div>
                <div className="flex justify-between">
                  <span>CPU Load</span>
                  <span className="text-purple-400 font-semibold">12.4%</span>
                </div>
                <div className="flex justify-between">
                  <span>Memory</span>
                  <span className="text-indigo-400 font-semibold">142MB / 512MB</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mt-1">
                  <motion.div
                    animate={{ width: ["20%", "45%", "28%", "35%"] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Decoration */}
            <div className="mt-4 border-t border-white/5 pt-3 flex justify-between items-center text-[9px] font-mono text-slate-500">
              <span>LATENCY: 14ms</span>
              <span>v1.0.4</span>
            </div>
          </motion.div>

          {/* Floating AWS Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-4 right-2 md:bottom-8 md:right-8 bg-slate-950/85 border border-white/10 rounded-lg p-2.5 flex items-center gap-2 shadow-2xl backdrop-blur-md z-20 text-[9px] font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300">AWS DevOps Configured</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 font-mono text-[9px] uppercase tracking-widest">
        <span>Scroll</span>
        <motion.button
          onClick={() => handleScrollTo("about")}
          aria-label="Scroll to About Section"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-4 h-7 rounded-full border border-slate-600 flex justify-center p-1 focus:outline-none focus:border-purple-400"
        >
          <div className="w-1 h-1.5 bg-purple-400 rounded-full" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
