import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Starfield from './Starfield';
import CameraController from './CameraController';
import BlackHole from './BlackHole';
import { shouldReduceQuality, shouldDisableParallax } from '../../utils/deviceDetection';
import useFPSMonitor from '../../hooks/useFPSMonitor';
import useReducedMotion from '../../hooks/useReducedMotion';

// WebGL fallback component for unsupported browsers
const WebGLFallback = () => (
  <div className="fixed inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-50">
      {/* Static stars fallback */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
        />
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm px-4">
      <p>Your browser doesn't support 3D graphics. Showing simplified version.</p>
    </div>
  </div>
);

const StarfieldCanvas = ({ mousePosition, scrollProgress }) => {
  const [adaptiveQuality, setAdaptiveQuality] = useState(shouldReduceQuality());
  const { fps, shouldReduceQuality: fpsReduceQuality } = useFPSMonitor(30);
  const disableParallax = shouldDisableParallax();
  const prefersReducedMotion = useReducedMotion();

  // Adapt quality based on FPS monitoring
  useEffect(() => {
    if (fpsReduceQuality && !adaptiveQuality) {
      setAdaptiveQuality(true);
      console.log('🎮 Adaptive Quality: Reducing 3D quality due to low FPS:', fps);
      console.log('🎮 Adaptive Quality: Disabling post-processing and reducing particle count');
    }
  }, [fpsReduceQuality, fps, adaptiveQuality]);

  // Log initial quality settings
  useEffect(() => {
    console.log('🎮 3D Canvas initialized with quality settings:', {
      adaptiveQuality,
      disableParallax,
      initialFPS: fps
    });
  }, [adaptiveQuality, disableParallax, fps]);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none" 
      style={{ zIndex: 0 }}
      role="img"
      aria-label="Decorative 3D space background with animated starfield and black hole"
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
        }}
        fallback={<WebGLFallback />}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Fog for depth perception */}
        <fog attach="fog" args={['#000000', 10, 50]} />
        
        <Suspense fallback={null}>
          <Starfield 
            mousePosition={(disableParallax || prefersReducedMotion) ? { x: 0.5, y: 0.5 } : mousePosition} 
            scrollProgress={(disableParallax || prefersReducedMotion) ? 0 : scrollProgress} 
          />
          <BlackHole 
            position={[0, 2, -5]} 
            scale={adaptiveQuality ? 0.7 : 1}
            simplify={adaptiveQuality || prefersReducedMotion}
          />
          <CameraController 
            mousePosition={(disableParallax || prefersReducedMotion) ? { x: 0.5, y: 0.5 } : mousePosition} 
            scrollProgress={(disableParallax || prefersReducedMotion) ? 0 : scrollProgress} 
          />
          
          {/* Post-processing bloom effect - disabled on mobile/low-end devices and when reduced motion is preferred */}
          {!adaptiveQuality && !prefersReducedMotion && (
            <EffectComposer>
              <Bloom
                intensity={1.5}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                radius={0.8}
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarfieldCanvas;
