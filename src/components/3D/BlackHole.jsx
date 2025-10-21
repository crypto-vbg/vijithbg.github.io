import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BlackHole = ({ position = [0, 2, -5], scale = 1, simplify = false }) => {
  const eventHorizonRef = useRef();
  const accretionDiskRef = useRef();
  const particleRingRef = useRef();
  const particleOpacityRef = useRef(0);

  // Custom shaders for the event horizon swirling effect
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          
          // Create swirling effect
          float angle = atan(vUv.y - center.y, vUv.x - center.x);
          float swirl = sin(dist * 10.0 - time * 2.0 + angle * 3.0) * 0.5 + 0.5;
          
          // Radial gradient from black center to purple edge
          vec3 blackColor = vec3(0.0, 0.0, 0.0);
          vec3 purpleColor = vec3(0.6, 0.0, 1.0);
          vec3 color = mix(blackColor, purpleColor, swirl * (1.0 - dist * 0.5));
          
          // Fade out at edges
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  // Generate particle ring positions (fewer particles on mobile)
  const particlePositions = useMemo(() => {
    const particleCount = simplify ? 100 : 200;
    const positions = new Float32Array(particleCount * 3);
    const radius = 2.5;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const offset = (Math.random() - 0.5) * 0.3;
      
      positions[i * 3] = Math.cos(angle) * (radius + offset);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 2] = Math.sin(angle) * (radius + offset);
    }
    
    return positions;
  }, [simplify]);

  // Animation loop
  useFrame((state, delta) => {
    // Update shader time uniform for swirling effect
    if (eventHorizonRef.current) {
      eventHorizonRef.current.material.uniforms.time.value = state.clock.elapsedTime;
      
      // Continuous Y-axis rotation at 0.5 radians per second
      eventHorizonRef.current.rotation.y += 0.5 * delta;
    }

    // Rotate accretion disk at 0.3 radians per second
    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.z += 0.3 * delta;
    }

    // Animate particle ring with pulsing opacity
    if (particleRingRef.current) {
      // Pulsing opacity animation
      particleOpacityRef.current = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      particleRingRef.current.material.opacity = particleOpacityRef.current;
      
      // Rotate particle ring
      particleRingRef.current.rotation.y += 0.2 * delta;
    }
  });

  // Adjust geometry detail based on quality setting
  const sphereDetail = simplify ? 32 : 64;
  const torusDetail = simplify ? [8, 50] : [16, 100];
  const particleCount = simplify ? 100 : 200;

  return (
    <group position={position} scale={scale}>
      {/* Event Horizon - Sphere with custom shader */}
      <mesh ref={eventHorizonRef}>
        <sphereGeometry args={[1.5, sphereDetail, sphereDetail]} />
        <primitive object={shaderMaterial} attach="material" />
      </mesh>

      {/* Accretion Disk - Torus with purple emissive material */}
      <mesh ref={accretionDiskRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.3, ...torusDetail]} />
        <meshStandardMaterial
          color="#9D00FF"
          emissive="#9D00FF"
          emissiveIntensity={simplify ? 1.5 : 2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Particle Ring - Orbital particles */}
      <points ref={particleRingRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00FFFF"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

export default BlackHole;
