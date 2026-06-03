import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { TESTIMONIALS } from "../constants";
import { fadeInUp, staggerContainer, scaleUp } from "../animations/variants";

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      variants={scaleUp(0)}
      className="glass-panel glass-panel-hover rounded-2xl p-6 md:p-8 flex flex-col justify-between text-left select-none relative overflow-hidden shadow-xl"
    >
      {/* Quote Symbol */}
      <div className="absolute top-4 right-4 text-purple-500/10 text-6xl font-serif select-none pointer-events-none">
        “
      </div>

      <div className="flex flex-col gap-6">
        {/* Quote Header Icon & Stars */}
        <div className="flex items-center justify-between">
          <div className="text-purple-400 text-lg">
            <FiMessageSquare />
          </div>
          <div className="flex gap-0.5 text-amber-400 text-[10px]">
            <FiStar className="fill-amber-400" />
            <FiStar className="fill-amber-400" />
            <FiStar className="fill-amber-400" />
            <FiStar className="fill-amber-400" />
            <FiStar className="fill-amber-400" />
          </div>
        </div>

        {/* Content */}
        <p className="text-slate-200 text-sm md:text-base italic leading-relaxed font-light">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Author Metadata */}
      <div className="flex items-center gap-4 mt-8 border-t border-white/5 pt-4">
        {/* Avatar Graphic placeholder */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
          {testimonial.author.charAt(0)}
        </div>
        
        <div>
          <h5 className="font-semibold text-xs md:text-sm text-white">
            {testimonial.author}
          </h5>
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
            {testimonial.relation}
          </span>
        </div>
      </div>

      {/* Subtle bottom light decoration */}
      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />
    </motion.div>
  );
};

export const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
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
          Endorsements
        </motion.span>
        
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="heading-font text-3xl md:text-4xl font-extrabold text-white tracking-tight"
        >
          Client & Partner Reviews
        </motion.h3>
      </div>

      {/* Testimonials Grid */}
      <motion.div
        variants={staggerContainer(0.12, 0.2)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {TESTIMONIALS.map((testimonial, idx) => (
          <TestimonialCard key={idx} testimonial={testimonial} />
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
