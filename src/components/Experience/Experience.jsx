import { motion } from 'framer-motion';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import ExperienceCard from './ExperienceCard';
import { experience } from '../../config/portfolioConfig';

const Experience = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.6,
            staggerChildren: 0.2
          }
        }
      };

  return (
    <section
      id="experience"
      ref={ref}
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-900/10 to-black"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {/* Section Title */}
        <div className="text-center mb-12 xs:mb-16">
          <motion.h2
            variants={prefersReducedMotion ? {} : {
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-3xl xs:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              Professional Journey
            </span>
          </motion.h2>
          <motion.div
            variants={prefersReducedMotion ? {} : {
              hidden: { width: 0 },
              visible: { width: '100px' }
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto mb-6"
          />
          <motion.p
            variants={prefersReducedMotion ? {} : {
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            className="text-white/70 text-base xs:text-lg px-4"
          >
            My career path in AI and Data Science
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-violet-400 to-transparent"></div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                isVisible={isVisible}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
