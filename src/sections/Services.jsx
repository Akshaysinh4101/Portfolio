import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FiServer, 
  FiCpu, 
  FiLayers, 
  FiDatabase, 
  FiCloud, 
  FiTrendingUp, 
  FiCreditCard, 
  FiGitMerge 
} from "react-icons/fi";
import { SERVICES } from "../constants";
import { fadeInUp, staggerContainer, scaleUp } from "../animations/variants";

// Helper to map title to icon
const getServiceIcon = (title) => {
  switch (title) {
    case "Backend Development":
      return <FiServer className="text-2xl text-purple-400" />;
    case "REST API Development":
      return <FiCpu className="text-2xl text-cyan-400" />;
    case "System Architecture":
      return <FiLayers className="text-2xl text-pink-400" />;
    case "Database Design":
      return <FiDatabase className="text-2xl text-blue-400" />;
    case "Cloud Deployment":
      return <FiCloud className="text-2xl text-indigo-400" />;
    case "Performance Optimization":
      return <FiTrendingUp className="text-2xl text-green-400" />;
    case "Payment Gateway Integration":
      return <FiCreditCard className="text-2xl text-yellow-400" />;
    case "DevOps & CI/CD":
      return <FiGitMerge className="text-2xl text-red-400" />;
    default:
      return <FiServer className="text-2xl text-purple-400" />;
  }
};

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      variants={scaleUp(0)}
      className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col items-start text-left select-none relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-purple-500/10"
    >
      {/* Icon Frame */}
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-md">
        {getServiceIcon(service.title)}
      </div>

      {/* Service Info */}
      <h4 className="heading-font font-bold text-base md:text-lg text-white mb-3">
        {service.title}
      </h4>

      <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">
        {service.description}
      </p>

      {/* Subtle corner light */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none" />
    </motion.div>
  );
};

export const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Header */}
      <div className="text-center mb-16 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="heading-font text-xs md:text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase mb-3"
        >
          Expertise
        </motion.span>
        
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="heading-font text-3xl md:text-4xl font-extrabold text-white tracking-tight"
        >
          Backend Architecture Services
        </motion.h3>
      </div>

      {/* Services Grid */}
      <motion.div
        variants={staggerContainer(0.08, 0.15)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {SERVICES.map((service, idx) => (
          <ServiceCard key={idx} service={service} />
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
