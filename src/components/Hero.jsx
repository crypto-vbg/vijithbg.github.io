import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import useReducedMotion from '../hooks/useReducedMotion';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Vijith B G';
  const prefersReducedMotion = useReducedMotion();
  
  // Typewriter effect - disabled if reduced motion is preferred
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(fullText);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Animation variants for container - simplified if reduced motion is preferred
  const containerVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
          }
        }
      };

  // Animation variants for children - simplified if reduced motion is preferred
  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            ease: 'easeOut'
          }
        }
      };

  // Subtitle animation - simplified if reduced motion is preferred
  const subtitleVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 1,
            delay: 1.5
          }
        }
      };

  return (
    <section 
      id="home" 
      className="relative min-h-screen h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        className="text-center z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title with Gradient and Typewriter Effect */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            {displayedText}
            <span className="animate-pulse" aria-hidden="true">|</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={subtitleVariants}
          className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 mb-4 px-4"
        >
          Building Intelligent Systems with AI
        </motion.p>

        <motion.p 
          variants={subtitleVariants}
          className="text-xs xs:text-sm sm:text-base md:text-lg text-cyan-300/60 mb-12 px-4"
        >
          AI Engineer | Generative AI Specialist | Data Scientist
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
        >
          <Link
            to="about"
            smooth={true}
            duration={800}
            className="inline-block cursor-pointer"
          >
            <button className="launch-button relative px-6 xs:px-8 py-3 xs:py-4 text-base xs:text-lg font-semibold text-cyan-400 border-2 border-cyan-400 rounded-full overflow-hidden transition-all duration-100 hover:text-white hover:border-cyan-300">
              <span className="relative z-10">Launch Portfolio</span>
              <div className="button-glow"></div>
            </button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={subtitleVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-cyan-400/60">
            <span className="text-xs mb-2">Scroll to explore</span>
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
              transition={prefersReducedMotion ? {} : { duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-cyan-400/60 rounded-full flex items-start justify-center p-2"
            >
              <motion.div 
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
                transition={prefersReducedMotion ? {} : { duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
