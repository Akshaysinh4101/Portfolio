import React from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { DEVELOPER_INFO } from "../constants";
import { useMagnetic } from "../hooks/useMagnetic";

export const Footer = () => {
  const logoRef = useMagnetic(0.2);
  const gitRef = useMagnetic(0.3);
  const lnRef = useMagnetic(0.3);
  const mailRef = useMagnetic(0.3);

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
    <footer className="w-full border-t border-white/5 bg-slate-950/20 py-12 px-4 md:px-8 mt-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand logo & tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <button
            ref={logoRef}
            onClick={() => handleScrollTo("hero")}
            className="magnetic-btn heading-font font-bold text-lg tracking-wider text-white mb-1"
          >
            AKSHAY<span className="text-purple-500">.</span>
          </button>
          <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">
            Scalable Backend Engineering
          </span>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
          <button onClick={() => handleScrollTo("about")} className="hover:text-white transition-colors cursor-pointer outline-none">
            About
          </button>
          <button onClick={() => handleScrollTo("skills")} className="hover:text-white transition-colors cursor-pointer outline-none">
            Skills
          </button>
          <button onClick={() => handleScrollTo("projects")} className="hover:text-white transition-colors cursor-pointer outline-none">
            Projects
          </button>
          <button onClick={() => handleScrollTo("contact")} className="hover:text-white transition-colors cursor-pointer outline-none">
            Contact
          </button>
        </div>

        {/* Right: Social & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3">
          {/* Icons */}
          <div className="flex items-center gap-4 text-slate-400">
            <a
              ref={gitRef}
              href={DEVELOPER_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn hover:text-white transition-colors p-1"
              aria-label="GitHub Profile"
            >
              <FiGithub />
            </a>
            <a
              ref={lnRef}
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
          </div>

          {/* Copyright */}
          <span className="text-[10px] text-slate-600 font-mono">
            &copy; 2026 Akshaysinh Vaghela. All Rights Reserved.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
