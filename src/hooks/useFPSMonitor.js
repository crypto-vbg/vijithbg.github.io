import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook to monitor FPS and suggest quality adjustments
 * @param {number} targetFPS - Target FPS threshold (default: 30)
 * @returns {Object} - { fps, shouldReduceQuality }
 */
const useFPSMonitor = (targetFPS = 30) => {
  const [fps, setFps] = useState(60);
  const [shouldReduceQuality, setShouldReduceQuality] = useState(false);
  const frameTimesRef = useRef([]);
  const lastTimeRef = useRef(performance.now());
  const frameIdRef = useRef(null);

  useEffect(() => {
    let lowFPSCount = 0;
    const maxLowFPSCount = 30; // 30 consecutive low FPS frames before reducing quality

    const measureFPS = () => {
      const now = performance.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Store frame times (keep last 60 frames)
      frameTimesRef.current.push(delta);
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift();
      }

      // Calculate average FPS
      if (frameTimesRef.current.length >= 10) {
        const avgDelta = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
        const currentFPS = 1000 / avgDelta;
        setFps(Math.round(currentFPS));

        // Check if FPS is consistently below target
        if (currentFPS < targetFPS) {
          lowFPSCount++;
          if (lowFPSCount >= maxLowFPSCount) {
            setShouldReduceQuality(true);
          }
        } else {
          lowFPSCount = 0;
        }
      }

      frameIdRef.current = requestAnimationFrame(measureFPS);
    };

    frameIdRef.current = requestAnimationFrame(measureFPS);

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [targetFPS]);

  return { fps, shouldReduceQuality };
};

export default useFPSMonitor;
