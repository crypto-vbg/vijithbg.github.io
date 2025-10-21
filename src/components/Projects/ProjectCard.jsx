import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '../OptimizedImage';

const ProjectCard = ({ project, index, isVisible, prefersReducedMotion }) => {

  // Staggered animation with 100ms delay per card - simplified if reduced motion is preferred
  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: 'easeOut'
          }
        }
      };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="group relative"
    >
      {/* Glassmorphism Card */}
      <div className="relative h-full bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50 hover:-translate-y-2">
        
        {/* Project Thumbnail with Optimized Loading */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-900/50 to-cyan-900/50">
          <OptimizedImage
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            lazy={true}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Card Content */}
        <div className="p-4 xs:p-6">
          {/* Project Title */}
          <h3 className="text-lg xs:text-xl font-bold text-white mb-2 xs:mb-3 group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="text-white/70 text-xs xs:text-sm mb-3 xs:mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 text-xs font-medium bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30"
              >
                {tag}
              </span>
            ))}
          </div>


        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
