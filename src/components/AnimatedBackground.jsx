import React, { useEffect, useRef } from "react";

export const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const colors = ["#8b5cf6", "#06b6d4", "#d946ef", "#3b82f6"];

    // Mouse coordinates (viewport-relative)
    const mouse = {
      x: null,
      y: null,
      radius: 170, // interaction radius
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Particle class
    class Particle {
      constructor(w, h) {
        this.w = w;
        this.h = h;
        this.reset();
      }

      reset() {
        this.x = Math.random() * this.w;
        this.y = Math.random() * this.h;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 2 + 0.8;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.4 + 0.15;
      }

      update(w, h) {
        this.w = w;
        this.h = h;

        // Interactive movement (mouse attraction)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distSq = dx * dx + dy * dy;
          const radiusSq = mouse.radius * mouse.radius;

          if (distSq < radiusSq) {
            const distance = Math.sqrt(distSq);
            if (distance > 0) {
              const force = (mouse.radius - distance) / mouse.radius;
              // Gently pull towards mouse
              this.x += (dx / distance) * force * 0.4;
              this.y += (dy / distance) * force * 0.4;
            }
          }
        }

        // Standard drift
        this.x += this.vx;
        this.y += this.vy;

        // Screen boundary wrap
        if (this.x < 0) this.x = this.w;
        if (this.x > this.w) this.x = 0;
        if (this.y < 0) this.y = this.h;
        if (this.y > this.h) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    const initParticles = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      // Responsive particle count to ensure high FPS on all devices
      const count = window.innerWidth < 640 ? 20 : window.innerWidth < 1024 ? 40 : 65;
      
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render loop
    const animate = () => {
      // Pause drawing if tab is inactive
      if (document.visibilityState === "hidden") {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const length = particles.length;

      // Update and draw particles
      for (let i = 0; i < length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw();
      }

      const limitSq = 12100; // 110 * 110

      // Draw connection lines
      for (let i = 0; i < length; i++) {
        const p1 = particles[i];
        
        for (let j = i + 1; j < length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < limitSq) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Set opacity based on distance (closer = clearer)
            const alpha = ((110 - dist) / 110) * 0.12;
            
            // Linear gradient for connection line
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, p1.color);
            grad.addColorStop(1, p2.color);
            
            ctx.strokeStyle = grad;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const mouseRadiusSq = mouse.radius * mouse.radius;

          if (distSq < mouseRadiusSq) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);

            const alpha = ((mouse.radius - dist) / mouse.radius) * 0.15;
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
};

export default AnimatedBackground;
