import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getOptimalParticleCount, shouldDisableParallax } from '../../utils/deviceDetection';

const Starfield = ({ mousePosition = { x: 0.5, y: 0.5 }, scrollProgress = 0 }) => {
  const pointsRef = useRef();
  const particleCount = getOptimalParticleCount();
  const disableParallax = shouldDisableParallax();

  // Generate star positions and colors
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Color options: white, cyan, violet
    const colorOptions = [
      new THREE.Color(1, 1, 1),      // White
      new THREE.Color(0, 1, 1),      // Cyan (#00FFFF)
      new THREE.Color(0.616, 0, 1),  // Violet (#9D00FF)
    ];

    for (let i = 0; i < particleCount; i++) {
      // Generate spherical distribution (radius 50 units)
      const radius = 50;
      const theta = Math.random() * Math.PI * 2; // Azimuthal angle
      const phi = Math.acos(2 * Math.random() - 1); // Polar angle

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Random color from options
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varying sizes (0.05 to 0.2 units)
      sizes[i] = Math.random() * 0.15 + 0.05;
    }

    return { positions, colors, sizes };
  }, []);

  // Store original positions for parallax calculations
  const originalPositions = useMemo(() => {
    return new Float32Array(positions);
  }, [positions]);

  // Smooth interpolation helper (lerp)
  const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
  };

  // Continuous drift animation with parallax
  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      const time = state.clock.getElapsedTime();

      // Calculate parallax offsets (disabled on mobile for performance)
      const parallaxX = disableParallax ? 0 : (mousePosition.x - 0.5) * 0.5;
      const parallaxY = disableParallax ? 0 : (mousePosition.y - 0.5) * 0.5;
      const scrollParallax = disableParallax ? 0 : scrollProgress * 2;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Get original position
        const origX = originalPositions[i3];
        const origY = originalPositions[i3 + 1];
        const origZ = originalPositions[i3 + 2];

        // Calculate depth factor for parallax (based on Z position)
        const depthFactor = (origZ + 50) / 100; // Normalize to 0-1 range

        // Continuous drift effect
        const driftX = Math.sin(time * 0.1 + i) * 0.5;
        const driftY = Math.cos(time * 0.1 + i) * 0.5;
        const driftZ = Math.sin(time * 0.05 + i) * 0.5;

        // Apply parallax based on depth
        const parallaxOffsetX = parallaxX * depthFactor * 5;
        const parallaxOffsetY = parallaxY * depthFactor * 5;
        const scrollOffsetZ = scrollParallax * depthFactor * 3;

        // Calculate target positions
        const targetX = origX + driftX + parallaxOffsetX;
        const targetY = origY + driftY - parallaxOffsetY;
        const targetZ = origZ + driftZ + scrollOffsetZ;

        // Smooth interpolation to target positions
        positions[i3] = lerp(positions[i3], targetX, 0.1);
        positions[i3 + 1] = lerp(positions[i3 + 1], targetY, 0.1);
        positions[i3 + 2] = lerp(positions[i3 + 2], targetZ, 0.1);

        // Wrap around if stars drift too far
        const distance = Math.sqrt(
          positions[i3] ** 2 + 
          positions[i3 + 1] ** 2 + 
          positions[i3 + 2] ** 2
        );
        
        if (distance > 60) {
          // Reset to opposite side
          const factor = 40 / distance;
          positions[i3] *= -factor;
          positions[i3 + 1] *= -factor;
          positions[i3 + 2] *= -factor;
          
          // Update original positions too
          originalPositions[i3] = positions[i3];
          originalPositions[i3 + 1] = positions[i3 + 1];
          originalPositions[i3 + 2] = positions[i3 + 2];
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default Starfield;
