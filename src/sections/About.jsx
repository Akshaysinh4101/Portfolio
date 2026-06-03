import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import { DEVELOPER_INFO, STATS } from "../constants";
import { fadeInUp, staggerContainer } from "../animations/variants";

const AnimatedCounter = ({ value, suffix, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="heading-font font-bold text-3xl md:text-5xl text-white">
      {count}
      <span className="text-purple-500">{suffix}</span>
    </span>
  );
};

export const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("profile.js");

  const techBadges = [
    "Node.js", "Laravel", "AWS", "MySQL", "PostgreSQL", 
    "Docker", "Redis", "REST APIs", "GraphQL", "TypeScript"
  ];

  const tabContent = {
    "profile.js": (
      <div className="space-y-1">
        <p className="text-purple-400">const <span className="text-blue-400">developer</span> = &#123;</p>
        <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-green-300">"{DEVELOPER_INFO.name}"</span>,</p>
        <p className="pl-4"><span className="text-slate-400">focus:</span> <span className="text-green-300">"Backend Architectures"</span>,</p>
        <p className="pl-4"><span className="text-slate-400">coreStack:</span> [<span className="text-cyan-400">"Node.js"</span>, <span className="text-cyan-400">"Laravel"</span>, <span className="text-cyan-400">"AWS"</span>],</p>
        <p className="pl-4"><span className="text-slate-400">codeQuality:</span> <span className="text-orange-400">"Clean & Maintainable"</span>,</p>
        <p className="pl-4"><span className="text-slate-400">experienceYears:</span> <span className="text-orange-400">4</span>,</p>
        <p className="pl-4"><span className="text-slate-400">cloudScale:</span> <span className="text-blue-400">true</span>,</p>
        <p className="text-purple-400">&#125;;</p>
      </div>
    ),
    "stack.json": (
      <div className="space-y-1">
        <p className="text-slate-400">&#123;</p>
        <p className="pl-4"><span className="text-purple-400">"languages"</span>: [<span className="text-green-300">"JavaScript"</span>, <span className="text-green-300">"TypeScript"</span>, <span className="text-green-300">"PHP"</span>],</p>
        <p className="pl-4"><span className="text-purple-400">"frameworks"</span>: [<span className="text-green-300">"Laravel"</span>, <span className="text-green-300">"Express"</span>, <span className="text-green-300">"React"</span>],</p>
        <p className="pl-4"><span className="text-purple-400">"databases"</span>: [<span className="text-green-300">"PostgreSQL"</span>, <span className="text-green-300">"MySQL"</span>, <span className="text-green-300">"Redis"</span>],</p>
        <p className="pl-4"><span className="text-purple-400">"devops"</span>: [<span className="text-green-300">"AWS"</span>, <span className="text-green-300">"Docker"</span>, <span className="text-green-300">"CI/CD"</span>]</p>
        <p className="text-slate-400">&#125;</p>
      </div>
    ),
    "metrics.yaml": (
      <div className="space-y-1">
        <p className="text-purple-400">metrics:</p>
        <p className="pl-4"><span className="text-blue-400">system_uptime</span>: <span className="text-green-300">"99.9%"</span></p>
        <p className="pl-4"><span className="text-blue-400">projects_completed</span>: <span className="text-orange-400">30</span></p>
        <p className="pl-4"><span className="text-blue-400">api_average_latency</span>: <span className="text-green-300">"45ms"</span></p>
        <p className="pl-4"><span className="text-blue-400">caching_hit_rate</span>: <span className="text-green-300">"94%"</span></p>
        <p className="pl-4"><span className="text-blue-400">containerized_deployments</span>: <span className="text-blue-400">true</span></p>
      </div>
    )
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full select-none"
    >
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
      >
        {/* Left Column: Interactive Terminal/IDE Card */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <motion.div
            variants={fadeInUp(0.1)}
            className="w-full max-w-md rounded-2xl glass-panel border border-white/10 p-5 md:p-6 shadow-2xl relative"
          >
            {/* Terminal Top Nav / Tabs */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <div className="flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar">
                {Object.keys(tabContent).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-t-lg font-mono text-[10px] transition-all flex items-center gap-1.5 border-b-2 outline-none ${
                      activeTab === tab
                        ? "bg-white/5 border-purple-500 text-white"
                        : "border-transparent text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      tab.endsWith(".js") ? "bg-yellow-500" : tab.endsWith(".json") ? "bg-cyan-400" : "bg-orange-500"
                    }`} />
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5 pr-2 hidden sm:flex">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
            </div>

            {/* IDE Terminal Content */}
            <div className="font-mono text-xs text-left text-slate-300 min-h-[180px] leading-relaxed overflow-x-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  {tabContent[activeTab]}
                </motion.div>
              </AnimatePresence>

              <div className="pt-4 border-t border-white/5 mt-4 text-[10px] text-slate-500">
                <p>// Executing status check...</p>
                <p className="text-green-400">&gt; System: Ready. All tests passed.</p>
              </div>
            </div>

            {/* Glowing Corner Accent */}
            <div className="absolute -top-1 -right-1 w-20 h-20 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
          </motion.div>
        </div>

        {/* Right Column: Narrative & Stats */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div variants={fadeInUp(0.1)}>
            <h2 className="heading-font text-xs md:text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase mb-3">
              About Me
            </h2>
            <h3 className="heading-font text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
              Engineering High-Performance Backend Architectures
            </h3>
          </motion.div>

          <motion.p
            variants={fadeInUp(0.2)}
            className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 font-light"
          >
            {DEVELOPER_INFO.about}
          </motion.p>

          {/* Tech Badges */}
          <motion.div
            variants={fadeInUp(0.3)}
            className="flex flex-wrap gap-2 mb-10"
          >
            {techBadges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all text-xs font-mono text-slate-300 rounded-full cursor-default"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Stats Counters */}
          <motion.div
            variants={fadeInUp(0.4)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full pt-8 border-t border-white/5"
          >
            {STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start gap-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="text-[10px] md:text-xs font-mono tracking-wide text-slate-500 uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
