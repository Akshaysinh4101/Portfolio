import React, { useEffect, useRef } from "react";

export const Hero3DGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let points = [];
    const colors = ["#8b5cf6", "#06b6d4", "#d946ef", "#3b82f6"];

    // Mouse coordinates mapped to rotation velocity bias
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e) => {
      // Mapped to -1 to 1 range
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initial rotation angles
    let rotX = 0;
    let rotY = 0;

    // Generate points on sphere and orbiting rings
    const initPoints = () => {
      points = [];
      const sphereCount = 75;
      const ringCount = 28;

      // 1. Sphere Points (using Fibonacci distribution for perfect even spacing)
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
      for (let i = 0; i < sphereCount; i++) {
        const y = 1 - (i / (sphereCount - 1)) * 2; // goes from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        points.push({
          baseX: x,
          baseY: y,
          baseZ: z,
          x: 0,
          y: 0,
          z: 0,
          color: i % 2 === 0 ? "#8b5cf6" : "#3b82f6", // Purple/Blue mix for sphere
          type: "sphere",
          index: i,
        });
      }

      // 2. Ring 1 (Tilted around Z-axis by 30 deg, cyan)
      const tilt1 = (30 * Math.PI) / 180;
      const cosT1 = Math.cos(tilt1);
      const sinT1 = Math.sin(tilt1);
      const ringRadius1 = 1.35; // slightly larger than sphere radius 1.0

      for (let i = 0; i < ringCount; i++) {
        const angle = (i / ringCount) * Math.PI * 2;
        const rx = ringRadius1 * Math.cos(angle);
        const ry = 0;
        const rz = ringRadius1 * Math.sin(angle);

        // Apply tilt
        const tx = rx * cosT1 - ry * sinT1;
        const ty = rx * sinT1 + ry * cosT1;
        const tz = rz;

        points.push({
          baseX: tx,
          baseY: ty,
          baseZ: tz,
          x: 0,
          y: 0,
          z: 0,
          color: "#06b6d4", // Cyan
          type: "ring1",
          index: i,
        });
      }

      // 3. Ring 2 (Tilted around Z-axis by -30 deg, pink)
      const tilt2 = (-30 * Math.PI) / 180;
      const cosT2 = Math.cos(tilt2);
      const sinT2 = Math.sin(tilt2);
      const ringRadius2 = 1.45;

      for (let i = 0; i < ringCount; i++) {
        const angle = (i / ringCount) * Math.PI * 2;
        const rx = ringRadius2 * Math.cos(angle);
        const ry = 0;
        const rz = ringRadius2 * Math.sin(angle);

        // Apply tilt
        const tx = rx * cosT2 - ry * sinT2;
        const ty = rx * sinT2 + ry * cosT2;
        const tz = rz;

        points.push({
          baseX: tx,
          baseY: ty,
          baseZ: tz,
          x: 0,
          y: 0,
          z: 0,
          color: "#d946ef", // Pink
          type: "ring2",
          index: i,
        });
      }
    };

    const resizeCanvas = () => {
      // Make it square based on parent size, or just fill the relative parent
      const parent = canvas.parentElement;
      const size = parent ? Math.min(parent.clientWidth, parent.clientHeight, 450) : 400;
      canvas.width = size;
      canvas.height = size;
      initPoints();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // MutationObserver to capture initial layout rendering correctly
    const observer = new MutationObserver(resizeCanvas);
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement, { attributes: true });
    }

    let isCanvasVisible = false;
    let isLoopRunning = false;

    const startLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        animate();
      }
    };

    const stopLoop = () => {
      if (isLoopRunning) {
        cancelAnimationFrame(animationFrameId);
        isLoopRunning = false;
      }
    };

    // Render loop
    const animate = () => {
      if (document.visibilityState === "hidden") {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Clear with soft trails (creates a subtle neon glow effect)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp mouse variables
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Base rotation + mouse movement bias
      const speedX = 0.0025 + mouse.y * 0.008;
      const speedY = 0.0035 + mouse.x * 0.008;

      rotX += speedX;
      rotY += speedY;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // 3D parameters based on responsive canvas sizing
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = canvas.width * 0.3; // Sphere radius in pixels
      const F = scale * 2.2;            // Focal length
      const cameraDist = scale * 1.8;   // Camera distance offset

      // 1. Transform all points into rotated 3D coordinates
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotation Y
        let x1 = p.baseX * cosY - p.baseZ * sinY;
        let z1 = p.baseX * sinY + p.baseZ * cosY;

        // Rotation X
        let y2 = p.baseY * cosX - z1 * sinX;
        let z2 = p.baseY * sinX + z1 * cosX;

        p.x = x1 * scale;
        p.y = y2 * scale;
        p.z = z2 * scale;

        // Calculate 2D Projection
        p.perspective = F / (F + cameraDist + p.z);
        p.projX = centerX + p.x * p.perspective;
        p.projY = centerY + p.y * p.perspective;
      }

      // 2. Sort points by depth (Z-index descending) for correct 3D occlusion
      const sortedPoints = [...points].sort((a, b) => b.z - a.z);

      // 3. Draw lines / constellation web
      // We process connections using the raw points array (using indices)
      const maxDist3D = scale * 0.48; // Max 3D distance to connect sphere points
      const maxDist3DSq = maxDist3D * maxDist3D;
      const spherePoints = points.filter((p) => p.type === "sphere");

      for (let i = 0; i < spherePoints.length; i++) {
        const p1 = spherePoints[i];
        for (let j = i + 1; j < spherePoints.length; j++) {
          const p2 = spherePoints[j];
          
          // 3D Distance
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDist3DSq) {
            const dist3D = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);

            // Compute alpha based on average depth and distance
            const avgZ = (p1.z + p2.z) / 2;
            const depthScale = F / (F + cameraDist + avgZ);
            const distOpacity = (maxDist3D - dist3D) / maxDist3D;
            const alpha = distOpacity * 0.12 * depthScale;

            const grad = ctx.createLinearGradient(p1.projX, p1.projY, p2.projX, p2.projY);
            grad.addColorStop(0, p1.color);
            grad.addColorStop(1, p2.color);

            ctx.strokeStyle = grad;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.6 * depthScale;
            ctx.stroke();
          }
        }
      }

      // Draw Orbit Ring lines (Ring 1 & Ring 2)
      const drawRingConnections = (type) => {
        const ringPoints = points.filter((p) => p.type === type);
        const length = ringPoints.length;

        for (let i = 0; i < length; i++) {
          const p1 = ringPoints[i];
          const p2 = ringPoints[(i + 1) % length]; // next point

          ctx.beginPath();
          ctx.moveTo(p1.projX, p1.projY);
          ctx.lineTo(p2.projX, p2.projY);

          const avgZ = (p1.z + p2.z) / 2;
          const depthScale = F / (F + cameraDist + avgZ);
          const alpha = 0.14 * depthScale;

          ctx.strokeStyle = p1.color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.8 * depthScale;
          ctx.stroke();
        }
      };

      drawRingConnections("ring1");
      drawRingConnections("ring2");

      // 4. Draw Particles (using the depth-sorted array)
      for (let i = 0; i < sortedPoints.length; i++) {
        const p = sortedPoints[i];

        // Draw particle dot
        ctx.beginPath();
        const baseSize = p.type === "sphere" ? 1.6 : 1.2;
        const size = baseSize * p.perspective * 1.5;
        
        ctx.arc(p.projX, p.projY, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        // Depth opacity
        const alpha = (p.type === "sphere" ? 0.65 : 0.5) * p.perspective;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Extra subtle neon core for foreground particles
        if (p.z < -scale * 0.5) {
          ctx.beginPath();
          ctx.arc(p.projX, p.projY, size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = 0.9 * p.perspective;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isCanvasVisible = entry.isIntersecting;
          if (isCanvasVisible) {
            startLoop();
          } else {
            stopLoop();
          }
        });
      },
      { threshold: 0 }
    );

    intersectionObserver.observe(canvas);

    return () => {
      stopLoop();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute max-w-full max-h-full pointer-events-none select-none z-0"
    />
  );
};

export default Hero3DGlobe;
