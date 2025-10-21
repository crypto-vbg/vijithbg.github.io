const OrbitingPlanets = ({ prefersReducedMotion }) => {
  // Adjust orbit radius based on screen size
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const radiusMultiplier = isMobile ? 0.7 : 1;

  const planets = [
    { emoji: '🪐', radius: 140 * radiusMultiplier, duration: 8, size: 'text-2xl xs:text-3xl' },
    { emoji: '🌍', radius: 170 * radiusMultiplier, duration: 12, size: 'text-3xl xs:text-4xl' },
    { emoji: '🌙', radius: 200 * radiusMultiplier, duration: 15, size: 'text-xl xs:text-2xl' }
  ];

  // If reduced motion is preferred, don't render orbiting planets
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {planets.map((planet, index) => (
        <div
          key={index}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${planet.radius * 2}px`,
            height: `${planet.radius * 2}px`
          }}
        >
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${planet.size}`}
            style={{
              animation: `orbit-${index} ${planet.duration}s linear infinite`,
              transformOrigin: `center ${planet.radius}px`
            }}
          >
            <div
              style={{
                animation: `counter-rotate-${index} ${planet.duration}s linear infinite`
              }}
            >
              {planet.emoji}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrbitingPlanets;
