import './CentralPlanet.css';

/**
 * CentralPlanet Component
 * Large circular element with gradient background and pulsing glow animation
 */
const CentralPlanet = ({ prefersReducedMotion }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="central-planet w-[200px] h-[200px] rounded-full bg-gradient-to-br from-purple-600 via-violet-500 to-cyan-400 flex items-center justify-center shadow-2xl">
        {/* Pulsing glow effect - disabled if reduced motion is preferred */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-violet-500 to-cyan-400 ${prefersReducedMotion ? '' : 'animate-pulse-glow'}`}></div>
        
        {/* User icon/avatar */}
        <div className="relative z-10 text-6xl">
          👨‍🚀
        </div>
      </div>
    </div>
  );
};

export default CentralPlanet;
