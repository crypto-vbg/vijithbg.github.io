import { motion } from 'framer-motion';

const ExperienceCard = ({ experience, index, isVisible, prefersReducedMotion }) => {
  const isEven = index % 2 === 0;

  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: isEven ? -50 : 50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.2
          }
        }
      };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 -ml-2 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full border-4 border-black z-10 shadow-lg shadow-cyan-500/50"></div>

      {/* Card */}
      <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
          {/* Company and Role */}
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-2">
              {experience.company}
            </h3>
            <p className="text-lg text-white/90 font-semibold mb-1">
              {experience.role}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {experience.period}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {experience.location}
              </span>
            </div>
          </div>

          {/* Highlights */}
          <ul className="space-y-2 mb-4">
            {experience.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                <span className="text-cyan-400 mt-1">▹</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block md:w-5/12"></div>
    </motion.div>
  );
};

export default ExperienceCard;
