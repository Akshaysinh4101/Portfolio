import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiFigma, 
  SiLaravel, SiPhp, SiNodedotjs, SiExpress, SiGraphql, SiPython,
  SiMysql, SiPostgresql, SiRedis, SiMongodb, SiDocker, SiGit, SiGithub,
  SiPostman, SiPrisma, SiSequelize, SiFirebase, SiHtml5, SiCss, SiNginx
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

// Helper function to return brand icons with native colors
const getTechIcon = (name) => {
  const iconSize = "text-sm md:text-base transition-transform duration-300 group-hover:scale-110";
  switch (name.toLowerCase()) {
    case "react.js":
    case "react":
      return <SiReact className={`${iconSize} text-[#61DAFB]`} />;
    case "next.js":
      return <SiNextdotjs className={`${iconSize} text-white`} />;
    case "typescript":
      return <SiTypescript className={`${iconSize} text-[#3178C6]`} />;
    case "javascript":
      return <SiJavascript className={`${iconSize} text-[#F7DF1E]`} />;
    case "tailwind css":
    case "tailwind":
      return <SiTailwindcss className={`${iconSize} text-[#06B6D4]`} />;
    case "figma":
      return <SiFigma className={`${iconSize} text-[#F24E1E]`} />;
    case "laravel":
      return <SiLaravel className={`${iconSize} text-[#FF2D20]`} />;
    case "php":
      return <SiPhp className={`${iconSize} text-[#777BB4]`} />;
    case "node.js":
      return <SiNodedotjs className={`${iconSize} text-[#339933]`} />;
    case "express.js":
    case "express":
      return <SiExpress className={`${iconSize} text-slate-300`} />;
    case "graphql":
      return <SiGraphql className={`${iconSize} text-[#E10098]`} />;
    case "python":
      return <SiPython className={`${iconSize} text-[#3776AB]`} />;
    case "mysql":
      return <SiMysql className={`${iconSize} text-[#4479A1]`} />;
    case "postgresql":
      return <SiPostgresql className={`${iconSize} text-[#4169E1]`} />;
    case "redis":
      return <SiRedis className={`${iconSize} text-[#DC382D]`} />;
    case "mongodb":
      return <SiMongodb className={`${iconSize} text-[#47A248]`} />;
    case "aws":
    case "aws ec2":
    case "aws s3":
      return <FaAws className={`${iconSize} text-[#FF9900]`} />;
    case "docker":
      return <SiDocker className={`${iconSize} text-[#2496ED]`} />;
    case "git":
      return <SiGit className={`${iconSize} text-[#F05032]`} />;
    case "github":
      return <SiGithub className={`${iconSize} text-white`} />;
    case "github actions":
      return <SiGithub className={`${iconSize} text-white`} />;
    case "postman":
      return <SiPostman className={`${iconSize} text-[#FF6C37]`} />;
    case "prisma":
      return <SiPrisma className={`${iconSize} text-[#2D3748]`} />;
    case "sequelize":
      return <SiSequelize className={`${iconSize} text-[#52B0E7]`} />;
    case "firebase":
      return <SiFirebase className={`${iconSize} text-[#FFCA28]`} />;
    case "html5":
      return <SiHtml5 className={`${iconSize} text-[#E34F26]`} />;
    case "css":
    case "css3":
      return <SiCss className={`${iconSize} text-[#1572B6]`} />;
    case "nginx":
      return <SiNginx className={`${iconSize} text-[#009639]`} />;
    default:
      return null;
  }
};

const CLOUD_ITEMS = [
  { name: "React.js", floatClass: "animate-float-drift-1" },
  { name: "Next.js", floatClass: "animate-float-drift-2" },
  { name: "JavaScript", floatClass: "animate-float-drift-3" },
  { name: "Tailwind CSS", floatClass: "animate-float-drift-4" },
  { name: "Laravel", floatClass: "animate-float-drift-1" },
  { name: "PHP", floatClass: "animate-float-drift-2" },
  { name: "Node.js", floatClass: "animate-float-drift-3" },
  { name: "Express.js", floatClass: "animate-float-drift-4" },
  { name: "MySQL", floatClass: "animate-float-drift-1" },
  { name: "PostgreSQL", floatClass: "animate-float-drift-2" },
  { name: "MongoDB", floatClass: "animate-float-drift-3" },
  { name: "Redis", floatClass: "animate-float-drift-4" },
  { name: "AWS", floatClass: "animate-float-drift-1" },
  { name: "Git", floatClass: "animate-float-drift-2" },
  { name: "GitHub", floatClass: "animate-float-drift-3" },
  { name: "Postman", floatClass: "animate-float-drift-4" },
  { name: "Prisma", floatClass: "animate-float-drift-1" }
];

export const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px 0px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 max-w-7xl mx-auto w-full select-none flex flex-col gap-12 overflow-hidden"
    >
      {/* Header */}
      <div className="text-center flex flex-col items-center px-4 md:px-8">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="heading-font text-xs md:text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase mb-3"
        >
          My Skills
        </motion.span>
        
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="heading-font text-3xl md:text-4xl font-extrabold text-white tracking-tight"
        >
          Technology Stack & Core Expertise
        </motion.h3>
      </div>

      {/* Floating Technology Cloud */}
      <div className="flex flex-col items-center px-4 md:px-8 text-center gap-4">
        <div className="max-w-md">
          <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
            An organic snapshot of my primary technology stack. Hover to interact.
          </p>
        </div>

        {/* Floating Cloud Wrapper */}
        <div className="flex flex-wrap justify-center items-center gap-6 max-w-4xl py-6">
          {CLOUD_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`${item.floatClass} flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl glass-panel text-slate-300 text-xs md:text-sm font-mono hover:border-purple-500/40 hover:shadow-purple-500/10 hover:text-white transition-all duration-300 hover:scale-105 cursor-default shadow-lg`}
            >
              {getTechIcon(item.name)}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
