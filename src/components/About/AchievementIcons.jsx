import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

const AchievementIcons = () => {
    const prefersReducedMotion = useReducedMotion();

    const achievements = [
        {
            icon: '🚀',
            value: '2+',
            label: 'Enterprise Projects Launched'
        },
        {
            icon: '⭐',
            value: '4+',
            label: 'Enterprise Hackathon Won'
        },
        {
            icon: '🌟',
            value: '2+',
            label: 'Years Experience'
        },
        {
            icon: '🏆',
            value: '7+',
            label: 'Distinction Awards Won'
        }
    ];

    const containerVariants = prefersReducedMotion
        ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
        : {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.15
                }
            }
        };

    const itemVariants = prefersReducedMotion
        ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
        : {
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.6,
                    ease: 'easeOut'
                }
            }
        };

    return (
        <motion.div
            className="mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={prefersReducedMotion ? {} : {
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                        className="achievement-card relative group"
                        role="article"
                        aria-label={`${achievement.value} ${achievement.label}`}
                    >
                        {/* Holographic Card */}
                        <div className="relative p-4 xs:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
                            {/* Glow Effect on Hover */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 to-violet-500/0 group-hover:from-cyan-500/10 group-hover:to-violet-500/10 transition-all duration-300"></div>

                            {/* Content */}
                            <div className="relative z-10 text-center space-y-2">
                                {/* Icon */}
                                <div
                                    className="text-3xl xs:text-4xl md:text-5xl mb-2 xs:mb-3 transform group-hover:scale-110 transition-transform duration-300"
                                    aria-hidden="true"
                                >
                                    {achievement.icon}
                                </div>

                                {/* Value */}
                                <div className="text-xl xs:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                                    {achievement.value}
                                </div>

                                {/* Label */}
                                <div className="text-xs xs:text-sm md:text-base text-white/70">
                                    {achievement.label}
                                </div>
                            </div>

                            {/* Cyan Glow on Hover */}
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-cyan-500/20"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default AchievementIcons;
