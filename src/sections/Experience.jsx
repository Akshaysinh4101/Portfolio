import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EXPERIENCES } from "../constants";
import { scaleUp } from "../animations/variants";

const TimelineCard = ({ experience, idx }) => {
  return (
    <div className="relative pl-8 md:pl-16 border-l border-white/5 pb-12 last:pb-0 select-none">
      {/* Node Indicator Icon */}
      <div className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-purple-500 z-10 flex items-center justify-center">
        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
      </div>

      {/* Experience Details Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px 0px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
        className="glass-panel rounded-2xl p-6 shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:border-purple-500/20 hover:shadow-purple-500/5"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-4 mb-4">
          <div>
            <h4 className="heading-font font-bold text-lg text-white">
              {experience.role}
            </h4>
            <span className="text-xs font-mono text-slate-400">
              {experience.company}
            </span>
          </div>
          <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/25 md:self-start">
            {experience.period}
          </span>
        </div>

        <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">
          {experience.description}
        </p>

        {/* Backdrop Ambient Light */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />
      </motion.div>
    </div>
  );
};

export const Experience = () => {
  const containerRef = useRef(null);
  
  // Track scroll inside the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="py-24 px-4 md:px-8 max-w-4xl mx-auto w-full relative"
    >
      {/* Section Header */}
      <div className="text-center mb-20 flex flex-col items-center">
        <span className="heading-font text-xs md:text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase mb-3">
          Journey
        </span>
        <h3 className="heading-font text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Professional Timeline
        </h3>
      </div>

      {/* Timeline Wrapper */}
      <div ref={containerRef} className="relative pl-4 md:pl-8">
        {/* Dynamic Scrolling Progress Line */}
        <motion.div
          className="absolute left-[4px] md:left-[8px] top-1.5 bottom-1.5 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 origin-top z-10"
          style={{ scaleY }}
        />

        {/* Experiences Cards mapping */}
        <div className="flex flex-col gap-0">
          {EXPERIENCES.map((exp, idx) => (
            <TimelineCard key={idx} experience={exp} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
