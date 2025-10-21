import { useFrame, useThree } from '@react-three/fiber';

const CameraController = ({ mousePosition = { x: 0.5, y: 0.5 }, scrollProgress = 0 }) => {
  const { camera } = useThree();

  // Smooth interpolation helper (lerp)
  const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
  };

  useFrame(() => {
    // Calculate target rotation based on mouse position
    const targetRotationY = (mousePosition.x - 0.5) * 0.1; // Subtle horizontal rotation
    const targetRotationX = (mousePosition.y - 0.5) * 0.1; // Subtle vertical rotation

    // Calculate target Z position based on scroll progress
    const targetZ = 5 - scrollProgress * 2; // Move camera forward as user scrolls

    // Apply smooth interpolation to prevent jarring movements
    camera.rotation.y = lerp(camera.rotation.y, targetRotationY, 0.05);
    camera.rotation.x = lerp(camera.rotation.x, -targetRotationX, 0.05);
    camera.position.z = lerp(camera.position.z, targetZ, 0.05);
  });

  return null;
};

export default CameraController;
