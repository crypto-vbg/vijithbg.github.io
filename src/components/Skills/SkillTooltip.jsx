import { AnimatePresence, motion } from 'framer-motion';
import './SkillTooltip.css';

/**
 * SkillTooltip Component
 * Displays skill name and circular proficiency indicator on hover
 */
const SkillTooltip = ({ skill, position }) => {
  if (!skill) return null;

  // Calculate circle properties for proficiency indicator
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = (skill.proficiency / 100) * circumference;
  const remaining = circumference - progress;

  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          className="skill-tooltip fixed z-50 pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: -20, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <div className="tooltip-content backdrop-blur-md bg-black/80 border border-cyan-400/50 rounded-lg p-4 shadow-xl">
            {/* Skill Name */}
            <h3 className="text-white font-bold text-lg mb-3 text-center">
              {skill.name}
            </h3>

            {/* Circular Proficiency Indicator */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                {/* Background circle */}
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="6"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${progress} ${remaining}`}
                    strokeLinecap="round"
                    className="progress-circle"
                  />
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">
                    {skill.proficiency}%
                  </span>
                </div>
              </div>

              {/* Proficiency label */}
              <p className="text-white/70 text-sm mt-2">Proficiency</p>
            </div>
          </div>

          {/* Tooltip arrow */}
          <div className="tooltip-arrow"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkillTooltip;
