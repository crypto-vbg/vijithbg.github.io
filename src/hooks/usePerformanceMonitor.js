import { useEffect, useRef } from 'react';
import performanceMonitor from '../utils/performanceMonitoring';

/**
 * Custom hook to monitor component performance
 * @param {string} componentName - Name of the component to monitor
 * @param {boolean} enabled - Whether monitoring is enabled (default: true in development)
 * @returns {Object} Performance monitoring utilities
 */
const usePerformanceMonitor = (componentName, enabled = process.env.NODE_ENV === 'development') => {
  const renderCountRef = useRef(0);
  const mountTimeRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    // Mark component mount
    const mountMark = `${componentName}-mount`;
    performanceMonitor.mark(mountMark);
    mountTimeRef.current = performance.now();

    console.log(`📊 ${componentName} mounted`);

    return () => {
      // Measure component lifetime on unmount
      const unmountMark = `${componentName}-unmount`;
      performanceMonitor.mark(unmountMark);
      performanceMonitor.measure(`${componentName}-lifetime`, mountMark, unmountMark);
      
      console.log(`📊 ${componentName} unmounted after ${renderCountRef.current} renders`);
    };
  }, [componentName, enabled]);

  // Track render count
  useEffect(() => {
    if (!enabled) return;
    
    renderCountRef.current += 1;
    
    if (renderCountRef.current > 1) {
      console.log(`📊 ${componentName} re-rendered (${renderCountRef.current} total renders)`);
    }
  });

  return {
    /**
     * Mark the start of an operation
     */
    markStart: (operationName) => {
      if (!enabled) return;
      performanceMonitor.mark(`${componentName}-${operationName}-start`);
    },

    /**
     * Mark the end of an operation and measure duration
     */
    markEnd: (operationName) => {
      if (!enabled) return;
      const startMark = `${componentName}-${operationName}-start`;
      const endMark = `${componentName}-${operationName}-end`;
      performanceMonitor.mark(endMark);
      return performanceMonitor.measure(`${componentName}-${operationName}`, startMark, endMark);
    },

    /**
     * Measure an async operation
     */
    measureAsync: async (operationName, operation) => {
      if (!enabled) return await operation();
      return await performanceMonitor.measureAsync(`${componentName}-${operationName}`, operation);
    },

    /**
     * Get render count
     */
    getRenderCount: () => renderCountRef.current,

    /**
     * Get time since mount
     */
    getTimeSinceMountMs: () => {
      if (!mountTimeRef.current) return 0;
      return performance.now() - mountTimeRef.current;
    }
  };
};

export default usePerformanceMonitor;
