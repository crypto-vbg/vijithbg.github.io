import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/portfolioData';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';

const Projects = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title with Animated Underline */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : (isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
          transition={prefersReducedMotion ? {} : { duration: 0.6 }}
          className="text-center mb-12 xs:mb-16"
        >
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold text-white mb-4">
            Mission Archives
          </h2>
          <motion.div
            initial={prefersReducedMotion ? { width: '100px' } : { width: 0 }}
            animate={prefersReducedMotion ? { width: '100px' } : (isVisible ? { width: '100px' } : { width: 0 })}
            transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto"
          />
          <p className="text-white/70 mt-6 text-base xs:text-lg px-4">
            Explore the cosmic projects I've launched into the digital universe
          </p>
        </motion.div>

        {/* Projects Grid - Responsive: 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isVisible={isVisible}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
