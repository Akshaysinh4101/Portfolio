import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [hoverType, setHoverType] = useState("default"); // default, link, text, project
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 18, stiffness: 750, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest("a, button, select, input, textarea, [role='button']")) {
        setHoverType("link");
      } else if (target.closest(".project-card")) {
        setHoverType("project");
      } else if (target.closest(".heading-reveal, h1, h2")) {
        setHoverType("text");
      } else {
        setHoverType("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    // Add cursor-active class to body
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Animation values based on hover type for outer ring
  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "transparent",
      borderColor: "rgba(139, 92, 246, 0.4)",
    },
    link: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(139, 92, 246, 0.12)",
      borderColor: "rgba(139, 92, 246, 0.8)",
    },
    project: {
      width: 96,
      height: 96,
      backgroundColor: "rgba(6, 182, 212, 0.15)",
      borderColor: "rgba(6, 182, 212, 0.9)",
      borderRadius: "9999px",
    },
    text: {
      width: 8,
      height: 48,
      backgroundColor: "rgba(217, 70, 239, 0.7)",
      borderColor: "transparent",
      borderRadius: "4px",
    }
  };

  // Dynamic values for inner dot based on hover type
  const innerVariants = {
    default: {
      scale: 1,
      opacity: 1,
      backgroundColor: "#ffffff"
    },
    link: {
      scale: 0.3,
      opacity: 0.5,
      backgroundColor: "rgba(139, 92, 246, 1)"
    },
    project: {
      scale: 0,
      opacity: 0,
      backgroundColor: "rgba(6, 182, 212, 1)"
    },
    text: {
      scale: 0.2,
      opacity: 0.2,
      backgroundColor: "rgba(217, 70, 239, 1)"
    }
  };

  return (
    <>
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-50 mix-blend-screen hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={variants[hoverType]}
        transition={{ type: "spring", stiffness: 320, damping: 25, mass: 0.7 }}
      >
        {hoverType === "project" && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase font-mono tracking-widest text-cyan-300 font-bold">
            View
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-50 mix-blend-screen hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={innerVariants[hoverType]}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </>
  );
};
export default CustomCursor;
