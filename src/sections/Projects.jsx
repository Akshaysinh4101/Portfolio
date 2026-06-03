import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { PROJECTS } from "../constants";
import { useMagnetic } from "../hooks/useMagnetic";
import { fadeInUp, staggerContainer, scaleUp } from "../animations/variants";

const ProjectCard = ({ project }) => {
  const gitRef = useMagnetic(0.25);
  const demoRef = useMagnetic(0.25);

  return (
    <motion.div
      variants={scaleUp(0)}
      className="project-card glass-panel rounded-2xl overflow-hidden shadow-xl flex flex-col group relative transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1.5 hover:border-purple-500/30 hover:shadow-purple-500/10"
    >
      {/* Project Image Container */}
      <div className="relative h-48 md:h-52 w-full overflow-hidden border-b border-white/5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100"
          loading="lazy"
        />
        {/* Glow Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between items-start text-left select-none">
        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-300 rounded"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h4 className="heading-font font-bold text-lg text-white mb-2 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h4>

          {/* Description */}
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 font-light">
            {project.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-auto">
          <a
            ref={gitRef}
            href={project.githubUrl}
            onClick={(e) => project.githubUrl === "#" && e.preventDefault()}
            className="magnetic-btn border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full p-2.5 shadow-md flex items-center justify-center transition-all"
            aria-label="View source code on GitHub"
          >
            <FiGithub className="text-sm" />
          </a>
          <a
            ref={demoRef}
            href={project.liveUrl}
            onClick={(e) => project.liveUrl === "#" && e.preventDefault()}
            className="magnetic-btn border border-purple-500/20 hover:border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-full p-2.5 shadow-md flex items-center justify-center transition-all"
            aria-label="View live demo website"
          >
            <FiExternalLink className="text-sm" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="text-center mb-16 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="heading-font text-xs md:text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase mb-3"
        >
          Portfolio
        </motion.span>
        
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="heading-font text-3xl md:text-4xl font-extrabold text-white tracking-tight"
        >
          Featured System Implementations
        </motion.h3>
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={staggerContainer(0.15, 0.2)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
