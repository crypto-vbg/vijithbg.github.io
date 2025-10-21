import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';

const ProfileImage = ({ prefersReducedMotion }) => {
  return (
    <motion.div
      className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-80 md:h-80"
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      transition={prefersReducedMotion ? {} : { duration: 0.3 }}
    >
      {/* Glowing Border Frame (Helmet Visor) */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-violet-400 to-purple-500 p-1 animate-pulse-slow">
        <div className="w-full h-full rounded-full bg-black/80 backdrop-blur-sm"></div>
      </div>

      {/* Inner Glow Effect */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 blur-xl"></div>

      {/* Profile Image Container */}
      <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-cyan-400/30 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900">
        <img
          src={process.env.PUBLIC_URL + personalInfo.profileImage}
          alt={`${personalInfo.name} - Profile`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Outer Glow Ring */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 blur-2xl -z-10"></div>
    </motion.div>
  );
};

export default ProfileImage;
