import { motion } from 'framer-motion';

/**
 * SkillsListView Component
 * Displays skills in a categorized list format with proficiency bars
 */
const SkillsListView = ({ skills }) => {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Sort skills within each category by proficiency
  Object.keys(skillsByCategory).forEach(category => {
    skillsByCategory[category].sort((a, b) => b.proficiency - a.proficiency);
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            {/* Category Title */}
            <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              {category}
            </h3>

            {/* Skills in this category */}
            <div className="space-y-4">
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.1 + index * 0.05, duration: 0.3 }}
                  className="group"
                >
                  {/* Skill Name and Icon */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="text-white/90 font-medium">{skill.name}</span>
                    </div>
                    <span className="text-cyan-400 text-sm font-semibold">{skill.proficiency}%</span>
                  </div>

                  {/* Proficiency Bar */}
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ delay: categoryIndex * 0.1 + index * 0.05 + 0.2, duration: 0.8, ease: 'easeOut' }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
                      style={{
                        boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsListView;
