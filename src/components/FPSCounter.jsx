import React from 'react';
import useFPSMonitor from '../hooks/useFPSMonitor';

/**
 * FPS Counter component for development mode
 * Displays current FPS and performance status
 * Only visible in development environment
 */
const FPSCounter = () => {
  const { fps, shouldReduceQuality } = useFPSMonitor(30);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Determine color based on FPS
  const getFPSColor = () => {
    if (fps >= 50) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
      <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg px-4 py-2 shadow-lg">
        <div className="flex items-center gap-3">
          {/* FPS Display */}
          <div className="text-center">
            <div className={`text-2xl font-bold ${getFPSColor()}`}>
              {fps}
            </div>
            <div className="text-xs text-white/50">FPS</div>
          </div>

          {/* Separator */}
          <div className="w-px h-8 bg-white/20" />

          {/* Performance Status */}
          <div className="text-xs">
            <div className="text-white/70">Performance</div>
            <div className={`font-semibold ${shouldReduceQuality ? 'text-red-400' : 'text-green-400'}`}>
              {shouldReduceQuality ? 'Reduced' : 'Optimal'}
            </div>
          </div>
        </div>

        {/* Warning indicator */}
        {shouldReduceQuality && (
          <div className="mt-2 pt-2 border-t border-white/10">
            <div className="text-xs text-yellow-400 flex items-center gap-1">
              <span>⚠️</span>
              <span>Quality reduced for performance</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FPSCounter;
