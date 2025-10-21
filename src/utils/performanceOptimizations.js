/**
 * Performance Optimization Utilities
 * 
 * Collection of utilities to optimize runtime performance
 */

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 100) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Request idle callback wrapper with fallback
 * @param {Function} callback - Function to execute during idle time
 * @param {Object} options - Options for requestIdleCallback
 */
export const requestIdleCallbackPolyfill = (callback, options = {}) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  // Fallback for browsers that don't support requestIdleCallback
  return setTimeout(() => {
    const start = Date.now();
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
    });
  }, 1);
};

/**
 * Cancel idle callback with fallback
 * @param {number} id - ID returned by requestIdleCallback
 */
export const cancelIdleCallbackPolyfill = (id) => {
  if ('cancelIdleCallback' in window) {
    return window.cancelIdleCallback(id);
  }
  return clearTimeout(id);
};

/**
 * Detect if device is low-end based on hardware concurrency
 * @returns {boolean} True if device is low-end
 */
export const isLowEndDevice = () => {
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;
  
  // Check device memory (if available)
  const memory = navigator.deviceMemory || 4;
  
  // Check if mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Consider low-end if:
  // - Less than 4 CPU cores
  // - Less than 4GB RAM
  // - Mobile device with less than 2 cores
  return cores < 4 || memory < 4 || (isMobile && cores < 2);
};

/**
 * Get optimal particle count based on device capabilities
 * @returns {number} Recommended particle count
 */
export const getOptimalParticleCount = () => {
  const isMobile = window.innerWidth < 768;
  const isLowEnd = isLowEndDevice();
  
  if (isMobile && isLowEnd) return 500;
  if (isMobile) return 1000;
  if (isLowEnd) return 2000;
  return 5000;
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if reduced motion is preferred
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

/**
 * Preload image
 * @param {string} src - Image source URL
 * @returns {Promise} Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images
 * @param {string[]} sources - Array of image source URLs
 * @returns {Promise} Promise that resolves when all images are loaded
 */
export const preloadImages = (sources) => {
  return Promise.all(sources.map(preloadImage));
};

/**
 * Lazy load component with retry logic
 * @param {Function} importFunc - Dynamic import function
 * @param {number} retries - Number of retries
 * @returns {Promise} Promise that resolves to the component
 */
export const lazyWithRetry = (importFunc, retries = 3) => {
  return new Promise((resolve, reject) => {
    importFunc()
      .then(resolve)
      .catch((error) => {
        if (retries === 0) {
          reject(error);
          return;
        }
        
        // Retry after a delay
        setTimeout(() => {
          lazyWithRetry(importFunc, retries - 1)
            .then(resolve)
            .catch(reject);
        }, 1000);
      });
  });
};

/**
 * Measure component render performance
 * @param {string} componentName - Name of the component
 * @returns {Object} Object with start and end functions
 */
export const measureRender = (componentName) => {
  const startMark = `${componentName}-render-start`;
  const endMark = `${componentName}-render-end`;
  const measureName = `${componentName}-render-time`;
  
  return {
    start: () => {
      if (typeof performance !== 'undefined') {
        performance.mark(startMark);
      }
    },
    end: () => {
      if (typeof performance !== 'undefined') {
        performance.mark(endMark);
        try {
          performance.measure(measureName, startMark, endMark);
          const measure = performance.getEntriesByName(measureName)[0];
          if (process.env.NODE_ENV === 'development') {
            console.log(`⏱️ ${componentName} render: ${measure.duration.toFixed(2)}ms`);
          }
          return measure.duration;
        } catch (e) {
          // Ignore errors
        }
      }
      return 0;
    }
  };
};

/**
 * Check if WebGL is supported
 * @returns {boolean} True if WebGL is supported
 */
export const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

/**
 * Get WebGL capabilities
 * @returns {Object} WebGL capabilities
 */
export const getWebGLCapabilities = () => {
  if (!isWebGLSupported()) {
    return { supported: false };
  }
  
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    return {
      supported: true,
      vendor: gl.getParameter(gl.VENDOR),
      renderer: gl.getParameter(gl.RENDERER),
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxVertexAttributes: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
      maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
      maxFragmentUniforms: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
      maxVertexUniforms: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)
    };
  } catch (e) {
    return { supported: false, error: e.message };
  }
};

/**
 * Optimize images by converting to WebP if supported
 * @param {string} src - Original image source
 * @returns {string} Optimized image source
 */
export const getOptimizedImageSrc = (src) => {
  // Check if browser supports WebP
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;
  
  if (supportsWebP && src.endsWith('.jpg') || src.endsWith('.png')) {
    // Replace extension with .webp if available
    const webpSrc = src.replace(/\.(jpg|png)$/, '.webp');
    return webpSrc;
  }
  
  return src;
};

/**
 * Create intersection observer with options
 * @param {Function} callback - Callback function
 * @param {Object} options - Intersection observer options
 * @returns {IntersectionObserver} Intersection observer instance
 */
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };
  
  if ('IntersectionObserver' in window) {
    return new IntersectionObserver(callback, defaultOptions);
  }
  
  // Fallback for browsers without IntersectionObserver
  return {
    observe: () => callback([{ isIntersecting: true }]),
    unobserve: () => {},
    disconnect: () => {}
  };
};

/**
 * Disable console logs in production
 */
export const disableConsoleLogs = () => {
  if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_DISABLE_LOGS === 'true') {
    console.log = () => {};
    console.warn = () => {};
    console.info = () => {};
    // Keep console.error for critical issues
  }
};

// Initialize optimizations
if (typeof window !== 'undefined') {
  disableConsoleLogs();
}

export default {
  debounce,
  throttle,
  requestIdleCallbackPolyfill,
  cancelIdleCallbackPolyfill,
  isLowEndDevice,
  getOptimalParticleCount,
  prefersReducedMotion,
  preloadImage,
  preloadImages,
  lazyWithRetry,
  measureRender,
  isWebGLSupported,
  getWebGLCapabilities,
  getOptimizedImageSrc,
  createIntersectionObserver,
  disableConsoleLogs
};
