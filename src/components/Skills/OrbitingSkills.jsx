import { useState } from 'react';
import SkillTooltip from './SkillTooltip';
import './OrbitingSkills.css';

/**
 * OrbitingSkills Component
 * Renders skill icons that orbit around the central planet
 */
const OrbitingSkills = ({ skills, prefersReducedMotion }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Group skills by orbit radius for animation assignment
  const skillsByOrbit = skills.reduce((acc, skill, index) => {
    const key = `${skill.orbitRadius}-${skill.orbitDuration}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({ ...skill, index });
    return acc;
  }, {});

  const handleMouseEnter = (skill, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    });
    setHoveredSkill(skill);
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  // If reduced motion is preferred, render skills in a static grid
  if (prefersReducedMotion) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-8 mt-32">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center"
              onMouseEnter={(e) => handleMouseEnter(skill, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="text-4xl md:text-5xl transition-transform duration-200 hover:scale-110">
                {skill.icon}
              </div>
              <div className="text-xs text-white/60 mt-2">{skill.name}</div>
            </div>
          ))}
        </div>
        <SkillTooltip
          skill={hoveredSkill}
          position={tooltipPosition}
        />
      </div>
    );
  }

  return (
    <>
      {/* Render orbit paths for visual reference */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="orbit-ring w-[500px] h-[500px] rounded-full border border-white/5"></div>
        <div className="orbit-ring w-[600px] h-[600px] rounded-full border border-white/5"></div>
        <div className="orbit-ring w-[700px] h-[700px] rounded-full border border-white/5"></div>
      </div>

      {/* Render orbiting skills */}
      {Object.entries(skillsByOrbit).map(([orbitKey, orbitSkills]) => {
        const { orbitRadius, orbitDuration } = orbitSkills[0];
        const angleStep = 360 / orbitSkills.length;

        return orbitSkills.map((skill, idx) => {
          const startAngle = idx * angleStep;

          return (
            <div
              key={`${skill.name}-${skill.index}`}
              className="orbiting-skill"
              style={{
                '--orbit-radius': `${orbitRadius}px`,
                '--orbit-duration': `${orbitDuration}s`,
                '--start-angle': `${startAngle}deg`
              }}
              onMouseEnter={(e) => handleMouseEnter(skill, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="skill-icon-wrapper">
                <div className="skill-icon text-4xl md:text-5xl transition-transform duration-200 hover:scale-110">
                  {skill.icon}
                </div>
              </div>
            </div>
          );
        });
      })}

      {/* Tooltip */}
      <SkillTooltip
        skill={hoveredSkill}
        position={tooltipPosition}
      />
    </>
  );
};

export default OrbitingSkills;
