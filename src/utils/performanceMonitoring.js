/**
 * Performance Monitoring Utilities
 * 
 * Provides utilities for measuring and tracking performance metrics
 * using the Performance API
 */

class PerformanceMonitor {
  constructor() {
    this.marks = new Map();
    this.measures = new Map();
    this.enabled = process.env.NODE_ENV === 'development';
  }

  /**
   * Mark the start of a performance measurement
   * @param {string} name - Name of the performance mark
   */
  mark(name) {
    if (!this.enabled || typeof performance === 'undefined') return;
    
    try {
      performance.mark(name);
      this.marks.set(name, performance.now());
    } catch (error) {
      console.warn(`Failed to create performance mark: ${name}`, error);
    }
  }

  /**
   * Measure the time between two marks
   * @param {string} name - Name of the measurement
   * @param {string} startMark - Name of the start mark
   * @param {string} endMark - Name of the end mark (optional, uses current time if not provided)
   * @returns {number} Duration in milliseconds
   */
  measure(name, startMark, endMark = null) {
    if (!this.enabled || typeof performance === 'undefined') return 0;
    
    try {
      if (endMark) {
        performance.measure(name, startMark, endMark);
      } else {
        performance.measure(name, startMark);
      }

      const measure = performance.getEntriesByName(name, 'measure')[0];
      const duration = measure ? measure.duration : 0;
      
      this.measures.set(name, duration);
      
      if (this.enabled) {
        console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
      }
      
      return duration;
    } catch (error) {
      console.warn(`Failed to measure performance: ${name}`, error);
      return 0;
    }
  }

  /**
   * Get all performance marks
   * @returns {Map} Map of mark names to timestamps
   */
  getMarks() {
    return this.marks;
  }

  /**
   * Get all performance measures
   * @returns {Map} Map of measure names to durations
   */
  getMeasures() {
    return this.measures;
  }

  /**
   * Clear all performance marks and measures
   */
  clear() {
    if (typeof performance === 'undefined') return;
    
    try {
      performance.clearMarks();
      performance.clearMeasures();
      this.marks.clear();
      this.measures.clear();
    } catch (error) {
      console.warn('Failed to clear performance data', error);
    }
  }

  /**
   * Get a summary of all performance measurements
   * @returns {Object} Summary object with all measurements
   */
  getSummary() {
    const summary = {
      marks: Array.from(this.marks.entries()),
      measures: Array.from(this.measures.entries()),
      totalMeasures: this.measures.size
    };

    if (this.enabled) {
      console.table(summary.measures);
    }

    return summary;
  }

  /**
   * Measure component render time
   * @param {string} componentName - Name of the component
   * @returns {Function} Cleanup function to end measurement
   */
  measureComponentRender(componentName) {
    const startMark = `${componentName}-render-start`;
    const endMark = `${componentName}-render-end`;
    const measureName = `${componentName}-render`;

    this.mark(startMark);

    return () => {
      this.mark(endMark);
      return this.measure(measureName, startMark, endMark);
    };
  }

  /**
   * Measure async operation
   * @param {string} operationName - Name of the operation
   * @param {Function} operation - Async function to measure
   * @returns {Promise} Result of the operation
   */
  async measureAsync(operationName, operation) {
    const startMark = `${operationName}-start`;
    const endMark = `${operationName}-end`;
    
    this.mark(startMark);
    
    try {
      const result = await operation();
      this.mark(endMark);
      this.measure(operationName, startMark, endMark);
      return result;
    } catch (error) {
      this.mark(endMark);
      this.measure(`${operationName}-error`, startMark, endMark);
      throw error;
    }
  }

  /**
   * Get Web Vitals metrics
   * @returns {Object} Web Vitals metrics
   */
  getWebVitals() {
    if (typeof performance === 'undefined') return {};

    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');

    return {
      // Time to First Byte
      ttfb: navigation ? navigation.responseStart - navigation.requestStart : 0,
      
      // DOM Content Loaded
      domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
      
      // Load Complete
      loadComplete: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
      
      // First Paint
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
      
      // First Contentful Paint
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
    };
  }

  /**
   * Log Web Vitals to console
   */
  logWebVitals() {
    if (!this.enabled) return;

    const vitals = this.getWebVitals();
    console.group('🚀 Web Vitals');
    console.log('TTFB:', vitals.ttfb.toFixed(2), 'ms');
    console.log('DOM Content Loaded:', vitals.domContentLoaded.toFixed(2), 'ms');
    console.log('Load Complete:', vitals.loadComplete.toFixed(2), 'ms');
    console.log('First Paint:', vitals.firstPaint.toFixed(2), 'ms');
    console.log('First Contentful Paint:', vitals.firstContentfulPaint.toFixed(2), 'ms');
    console.groupEnd();
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Mark initial load
performanceMonitor.mark('app-init');

// Log Web Vitals when page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    performanceMonitor.mark('app-loaded');
    performanceMonitor.measure('app-load-time', 'app-init', 'app-loaded');
    
    // Log Web Vitals after a short delay to ensure all metrics are available
    setTimeout(() => {
      performanceMonitor.logWebVitals();
    }, 100);
  });
}

export default performanceMonitor;
