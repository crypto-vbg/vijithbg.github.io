/**
 * Performance Audit Utilities
 * 
 * Utilities for measuring and reporting performance metrics
 * in the browser during runtime
 */

class PerformanceAuditor {
  constructor() {
    this.metrics = {
      loadTime: 0,
      timeToInteractive: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      firstInputDelay: 0,
      fps: [],
      averageFPS: 0
    };
    
    this.observers = [];
    this.enabled = typeof window !== 'undefined' && typeof performance !== 'undefined';
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    if (!this.enabled) return;

    // Measure load time
    this.measureLoadTime();
    
    // Measure Core Web Vitals
    this.measureCoreWebVitals();
    
    // Start FPS monitoring
    this.startFPSMonitoring();
    
    // Log results after page load
    if (document.readyState === 'complete') {
      this.logResults();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => this.logResults(), 1000);
      });
    }
  }

  /**
   * Measure page load time
   */
  measureLoadTime() {
    if (!this.enabled) return;

    try {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.timeToInteractive = navigation.domInteractive - navigation.fetchStart;
      }
    } catch (error) {
      console.warn('Failed to measure load time:', error);
    }
  }

  /**
   * Measure Core Web Vitals
   */
  measureCoreWebVitals() {
    if (!this.enabled) return;

    // First Contentful Paint (FCP)
    try {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.firstContentfulPaint = fcpEntry.startTime;
      }
    } catch (error) {
      console.warn('Failed to measure FCP:', error);
    }

    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.largestContentfulPaint = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (error) {
        console.warn('Failed to observe LCP:', error);
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
              this.metrics.cumulativeLayoutShift = clsScore;
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (error) {
        console.warn('Failed to observe CLS:', error);
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstInput = entries[0];
          this.metrics.firstInputDelay = firstInput.processingStart - firstInput.startTime;
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (error) {
        console.warn('Failed to observe FID:', error);
      }
    }
  }

  /**
   * Start FPS monitoring
   */
  startFPSMonitoring() {
    if (!this.enabled) return;

    let lastTime = performance.now();
    let frames = 0;
    const fpsHistory = [];
    const maxHistory = 60; // Keep last 60 FPS measurements

    const measureFPS = (currentTime) => {
      frames++;
      const delta = currentTime - lastTime;

      if (delta >= 1000) {
        const fps = Math.round((frames * 1000) / delta);
        fpsHistory.push(fps);
        
        if (fpsHistory.length > maxHistory) {
          fpsHistory.shift();
        }
        
        this.metrics.fps = fpsHistory;
        this.metrics.averageFPS = Math.round(
          fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length
        );
        
        frames = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  /**
   * Get current metrics
   * @returns {Object} Current performance metrics
   */
  getMetrics() {
    return { ...this.metrics };
  }

  /**
   * Check if metrics meet performance targets
   * @returns {Object} Performance check results
   */
  checkPerformanceTargets() {
    const results = {
      passed: true,
      checks: []
    };

    // Load time target: < 3 seconds
    const loadTimeCheck = {
      metric: 'Load Time',
      value: this.metrics.loadTime,
      target: 3000,
      passed: this.metrics.loadTime < 3000,
      unit: 'ms'
    };
    results.checks.push(loadTimeCheck);
    if (!loadTimeCheck.passed) results.passed = false;

    // Time to Interactive target: < 4 seconds
    const ttiCheck = {
      metric: 'Time to Interactive',
      value: this.metrics.timeToInteractive,
      target: 4000,
      passed: this.metrics.timeToInteractive < 4000,
      unit: 'ms'
    };
    results.checks.push(ttiCheck);
    if (!ttiCheck.passed) results.passed = false;

    // FCP target: < 1.8 seconds
    const fcpCheck = {
      metric: 'First Contentful Paint',
      value: this.metrics.firstContentfulPaint,
      target: 1800,
      passed: this.metrics.firstContentfulPaint < 1800,
      unit: 'ms'
    };
    results.checks.push(fcpCheck);
    if (!fcpCheck.passed) results.passed = false;

    // LCP target: < 2.5 seconds
    const lcpCheck = {
      metric: 'Largest Contentful Paint',
      value: this.metrics.largestContentfulPaint,
      target: 2500,
      passed: this.metrics.largestContentfulPaint < 2500,
      unit: 'ms'
    };
    results.checks.push(lcpCheck);
    if (!lcpCheck.passed) results.passed = false;

    // CLS target: < 0.1
    const clsCheck = {
      metric: 'Cumulative Layout Shift',
      value: this.metrics.cumulativeLayoutShift,
      target: 0.1,
      passed: this.metrics.cumulativeLayoutShift < 0.1,
      unit: ''
    };
    results.checks.push(clsCheck);
    if (!clsCheck.passed) results.passed = false;

    // FPS target: > 30
    const fpsCheck = {
      metric: 'Average FPS',
      value: this.metrics.averageFPS,
      target: 30,
      passed: this.metrics.averageFPS > 30,
      unit: 'fps'
    };
    results.checks.push(fpsCheck);
    if (!fpsCheck.passed) results.passed = false;

    return results;
  }

  /**
   * Log performance results to console
   */
  logResults() {
    if (!this.enabled || process.env.NODE_ENV !== 'development') return;

    console.group('🚀 Performance Audit Results');
    
    console.log('\n📊 Core Metrics:');
    console.log(`  Load Time: ${this.metrics.loadTime.toFixed(0)}ms (target: < 3000ms)`);
    console.log(`  Time to Interactive: ${this.metrics.timeToInteractive.toFixed(0)}ms (target: < 4000ms)`);
    console.log(`  First Contentful Paint: ${this.metrics.firstContentfulPaint.toFixed(0)}ms (target: < 1800ms)`);
    console.log(`  Largest Contentful Paint: ${this.metrics.largestContentfulPaint.toFixed(0)}ms (target: < 2500ms)`);
    console.log(`  Cumulative Layout Shift: ${this.metrics.cumulativeLayoutShift.toFixed(3)} (target: < 0.1)`);
    console.log(`  Average FPS: ${this.metrics.averageFPS} (target: > 30)`);

    const results = this.checkPerformanceTargets();
    
    console.log('\n✅ Performance Checks:');
    results.checks.forEach(check => {
      const status = check.passed ? '✅' : '❌';
      const value = check.unit ? `${check.value.toFixed(0)}${check.unit}` : check.value.toFixed(3);
      const target = check.unit ? `${check.target}${check.unit}` : check.target;
      console.log(`  ${status} ${check.metric}: ${value} (target: ${check.passed ? '<' : '>'} ${target})`);
    });

    if (results.passed) {
      console.log('\n🎉 All performance targets met!');
    } else {
      console.log('\n⚠️  Some performance targets not met. See recommendations below.');
    }

    console.log('\n💡 Recommendations:');
    if (this.metrics.loadTime >= 3000) {
      console.log('  • Reduce bundle size with code splitting');
      console.log('  • Enable compression (gzip/brotli)');
      console.log('  • Optimize images and assets');
    }
    if (this.metrics.averageFPS < 30) {
      console.log('  • Reduce particle count in 3D scene');
      console.log('  • Disable post-processing effects');
      console.log('  • Optimize animation loops');
    }
    if (this.metrics.largestContentfulPaint >= 2500) {
      console.log('  • Preload critical images');
      console.log('  • Use lazy loading for below-fold content');
      console.log('  • Optimize font loading');
    }
    if (this.metrics.cumulativeLayoutShift >= 0.1) {
      console.log('  • Set explicit dimensions for images');
      console.log('  • Reserve space for dynamic content');
      console.log('  • Avoid inserting content above existing content');
    }

    console.groupEnd();
  }

  /**
   * Generate performance report
   * @returns {string} HTML report
   */
  generateReport() {
    const results = this.checkPerformanceTargets();
    
    let html = '<div style="font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff;">';
    html += '<h2 style="color: #00ffff;">🚀 Performance Audit Report</h2>';
    
    html += '<h3>Core Metrics:</h3>';
    html += '<table style="width: 100%; border-collapse: collapse;">';
    results.checks.forEach(check => {
      const color = check.passed ? '#00ff00' : '#ff0000';
      const status = check.passed ? '✅' : '❌';
      const value = check.unit ? `${check.value.toFixed(0)}${check.unit}` : check.value.toFixed(3);
      const target = check.unit ? `${check.target}${check.unit}` : check.target;
      
      html += `<tr style="border-bottom: 1px solid #333;">`;
      html += `<td style="padding: 8px;">${status}</td>`;
      html += `<td style="padding: 8px;">${check.metric}</td>`;
      html += `<td style="padding: 8px; color: ${color};">${value}</td>`;
      html += `<td style="padding: 8px; color: #888;">Target: ${target}</td>`;
      html += `</tr>`;
    });
    html += '</table>';
    
    html += '</div>';
    
    return html;
  }

  /**
   * Cleanup observers
   */
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Create singleton instance
const performanceAuditor = new PerformanceAuditor();

// Auto-initialize in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  performanceAuditor.init();
}

export default performanceAuditor;
