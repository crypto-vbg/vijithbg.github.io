import { motion } from 'framer-motion';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import ProfileImage from './ProfileImage';
import OrbitingPlanets from './OrbitingPlanets';
import AchievementIcons from './AchievementIcons';

const About = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 1,
            staggerChildren: 0.3
          }
        }
      };

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8 }
        }
      };

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Animated Nebula Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 animate-nebula"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-violet-900/20 via-purple-900/20 to-blue-900/20 animate-nebula-reverse"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {/* Grid Layout: 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Profile Image with Orbiting Planets */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <ProfileImage prefersReducedMotion={prefersReducedMotion} />
              <OrbitingPlanets prefersReducedMotion={prefersReducedMotion} />
            </div>
          </motion.div>

          {/* Right Column: Bio Text */}
          <motion.div variants={itemVariants} className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              About Me
            </h2>
            <p className="text-base xs:text-lg text-white/80 leading-relaxed">
              AI Engineer with expertise in developing and deploying Generative AI and Data Science solutions 
              across enterprise environments at GSK (GlaxoSmithKline).
            </p>
            <p className="text-base xs:text-lg text-white/80 leading-relaxed">
              I specialize in LLM-based systems, multi-agent architectures, and Responsible AI frameworks. 
              My work focuses on leveraging Azure, Databricks, and open-source technologies to deliver 
              scalable, secure, and efficient AI-driven analytics systems.
            </p>
            <p className="text-base xs:text-lg text-white/80 leading-relaxed">
              With a B.Tech in Computer Science from PES University (CGPA: 8.46) and Databricks Certified 
              Generative AI Engineer credentials, I'm passionate about building intelligent systems that 
              solve real-world problems in finance, healthcare, and enterprise analytics.
            </p>
          </motion.div>
        </div>

        {/* Achievement Icons Section */}
        <motion.div variants={itemVariants}>
          <AchievementIcons />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
