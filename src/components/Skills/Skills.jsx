import { useState } from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import CentralPlanet from './CentralPlanet';
import OrbitingSkills from './OrbitingSkills';
import SkillsListView from './SkillsListView';
import { skills } from '../../config/portfolioConfig';

const Skills = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState('orbital'); // 'orbital' or 'list'

  const containerVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 1
          }
        }
      };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {/* Section Title */}
        <div className="text-center mb-8 xs:mb-12 md:mb-16">
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-4">
            Technical Arsenal
          </h2>
          <p className="text-white/70 text-base xs:text-lg px-4 mb-6">
            Technologies orbiting in my development universe
          </p>

          {/* View Toggle Switch */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${viewMode === 'orbital' ? 'text-cyan-400 font-semibold' : 'text-white/50'}`}>
              Orbital View
            </span>
            <button
              onClick={() => setViewMode(viewMode === 'orbital' ? 'list' : 'orbital')}
              className="relative w-16 h-8 bg-white/10 rounded-full border border-white/20 transition-all duration-300 hover:border-cyan-400/50"
              aria-label="Toggle view mode"
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full shadow-lg"
                animate={{
                  x: viewMode === 'orbital' ? 0 : 32
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                  boxShadow: '0 0 15px rgba(34, 211, 238, 0.6)'
                }}
              />
            </button>
            <span className={`text-sm ${viewMode === 'list' ? 'text-cyan-400 font-semibold' : 'text-white/50'}`}>
              List View
            </span>
          </div>
        </div>

        {/* Skills Display - Toggle between Orbital and List View */}
        {viewMode === 'orbital' ? (
          /* Orbital Visualization Container */
          <div className="relative flex items-center justify-center min-h-[500px] xs:min-h-[600px] md:min-h-[800px] lg:min-h-[900px] overflow-visible">
            {/* Central Planet */}
            <CentralPlanet prefersReducedMotion={prefersReducedMotion} />

            {/* Orbiting Skills */}
            <OrbitingSkills skills={skills} prefersReducedMotion={prefersReducedMotion} />
          </div>
        ) : (
          /* List View Container */
          <div className="py-8">
            <SkillsListView skills={skills} />
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Skills;
