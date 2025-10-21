import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Footer = () => {
  const [footerRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const canvasRef = useRef(null);

  // Animated dust particles (Sub-task 10.2)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 75;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    // Animation loop
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `rgba(34, 211, 238, ${particle.opacity})`);
        gradient.addColorStop(0.5, `rgba(34, 211, 238, ${particle.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.footer
      ref={footerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative py-12 overflow-hidden"
    >
      {/* Animated dust particles canvas (Sub-task 10.2) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Footer content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Rotating icon (Sub-task 10.3) */}
          <div className="text-4xl md:text-5xl animate-rotate-slow">
            🚀
          </div>

          {/* Copyright text */}
          <p className="text-gray-400 text-sm md:text-base text-center">
            © {new Date().getFullYear()} Vijith B G. All rights reserved.
          </p>

          {/* Additional tagline */}
          <p className="text-cyan-400/60 text-xs md:text-sm text-center">
            Building intelligent systems with AI, one project at a time
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
