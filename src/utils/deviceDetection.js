/**
 * Device detection utilities for performance optimization
 */

/**
 * Detect if the device is mobile based on screen width
 * @returns {boolean}
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Detect if the device is a tablet based on screen width
 * @returns {boolean}
 */
export const isTabletDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

/**
 * Detect if the device is low-end based on hardware concurrency
 * @returns {boolean}
 */
export const isLowEndDevice = () => {
  if (typeof navigator === 'undefined') return false;
  return navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
};

/**
 * Get optimal particle count based on device capabilities
 * @returns {number}
 */
export const getOptimalParticleCount = () => {
  const isMobile = isMobileDevice();
  const isLowEnd = isLowEndDevice();
  
  if (isMobile) return 1000;
  if (isLowEnd) return 2000;
  return 5000;
};

/**
 * Check if device should use reduced quality settings
 * @returns {boolean}
 */
export const shouldReduceQuality = () => {
  return isMobileDevice() || isLowEndDevice();
};

/**
 * Check if parallax effects should be disabled
 * @returns {boolean}
 */
export const shouldDisableParallax = () => {
  return isMobileDevice();
};
