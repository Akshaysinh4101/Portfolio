import React, { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "../components/Navbar";
import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import AnimatedBackground from "../components/AnimatedBackground";

export const Layout = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis scroll physics
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.12,
      syncTouch: false,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Save lenis reference globally for scroll interactions
    window.lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-darkBg text-slate-200 antialiased overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Ambient Glowing Orbs Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-Right Purple Orb */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full orb-purple opacity-70 animate-pulse-slow" />
        
        {/* Mid-Left Cyan Orb */}
        <div className="absolute top-[35%] left-[-15%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full orb-cyan opacity-50 animate-float" />
        
        {/* Lower-Right Pink Orb */}
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full orb-pink opacity-40 animate-pulse-slow" />
        
        {/* Base Grid Overlay */}
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      </div>

      {/* Header Navbar */}
      <Navbar />

      {/* Page Content */}
      <main id="main-content" className="relative z-10 w-full" tabIndex="-1">
        {children}
      </main>

    </div>
  );
};

export default Layout;
