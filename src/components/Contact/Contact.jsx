import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import ParticleBackground from './ParticleBackground';
import SocialIcons from './SocialIcons';

/**
 * Contact Component
 * Main contact section with form, particles, and social links
 */
const Contact = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleBackground particleCount={150} />

      {/* Content Container */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={prefersReducedMotion ? {} : { duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Section Title */}
        <div className="text-center mb-12 xs:mb-16">
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 animate-pulse-slow">
              Let's Connect
            </span>
          </h2>
          <p className="text-white/70 text-base xs:text-lg px-4 mb-8">
            Reach out to me through these channels
          </p>
        </div>

        {/* Social Icons */}
        <SocialIcons />
      </motion.div>
    </section>
  );
};

export default Contact;
