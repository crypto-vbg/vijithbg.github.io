import React from 'react';

const LoadingSpinner = ({ fullScreen = false }) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    : "flex items-center justify-center py-20";

  return (
    <div className={containerClass}>
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-violet-500 rounded-full animate-pulse shadow-lg shadow-violet-500/50"></div>
        </div>
      </div>
      
      {fullScreen && (
        <p className="absolute mt-24 text-cyan-400/70 text-sm animate-pulse">
          Loading...
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
