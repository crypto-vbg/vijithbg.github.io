/**
 * Browser Compatibility Utilities
 * Detects browser features and provides fallbacks for cross-browser compatibility
 */

/**
 * Detect current browser
 * @returns {Object} Browser information
 */
export const detectBrowser = () => {
  const userAgent = navigator.userAgent;
  const browsers = {
    chrome: /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor),
    firefox: /Firefox/.test(userAgent),
    safari: /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor),
    edge: /Edg/.test(userAgent),
    ie: /MSIE|Trident/.test(userAgent)
  };

  const browserName = Object.keys(browsers).find(key => browsers[key]) || 'unknown';
  
  return {
    name: browserName,
    userAgent,
    ...browsers
  };
};

/**
 * Check WebGL support
 * @returns {Object} WebGL support information
 */
export const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      return {
        supported: false,
        version: null,
        renderer: null,
        vendor: null
      };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    
    return {
      supported: true,
      version: gl.getParameter(gl.VERSION),
      renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown',
      vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxVertexAttributes: gl.getParameter(gl.MAX_VERTEX_ATTRIBS)
    };
  } catch (e) {
    return {
      supported: false,
      error: e.message
    };
  }
};

/**
 * Check CSS feature support
 * @returns {Object} CSS feature support
 */
export const checkCSSSupport = () => {
  // Check if CSS.supports is available (not in all test environments)
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return {
      backdropFilter: false,
      grid: false,
      flexbox: false,
      customProperties: false,
      transforms3d: false,
      animations: false,
      transitions: false,
      clipPath: false,
      objectFit: false,
      aspectRatio: false
    };
  }
  
  return {
    backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)') || 
                    CSS.supports('-webkit-backdrop-filter', 'blur(10px)'),
    grid: CSS.supports('display', 'grid'),
    flexbox: CSS.supports('display', 'flex'),
    customProperties: CSS.supports('--custom', 'value'),
    transforms3d: CSS.supports('transform', 'translateZ(0)'),
    animations: CSS.supports('animation', '1s'),
    transitions: CSS.supports('transition', '1s'),
    clipPath: CSS.supports('clip-path', 'circle(50%)'),
    objectFit: CSS.supports('object-fit', 'cover'),
    aspectRatio: CSS.supports('aspect-ratio', '16/9')
  };
};

/**
 * Check JavaScript API support
 * @returns {Object} API support information
 */
export const checkAPISupport = () => {
  return {
    intersectionObserver: 'IntersectionObserver' in window,
    resizeObserver: 'ResizeObserver' in window,
    requestAnimationFrame: 'requestAnimationFrame' in window,
    localStorage: (() => {
      try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    })(),
    fetch: 'fetch' in window,
    promises: 'Promise' in window,
    asyncAwait: (() => {
      try {
        eval('(async () => {})');
        return true;
      } catch (e) {
        return false;
      }
    })(),
    es6Modules: 'noModule' in document.createElement('script'),
    webWorkers: 'Worker' in window,
    serviceWorker: 'serviceWorker' in navigator
  };
};

/**
 * Check form validation support
 * @returns {Object} Form validation support
 */
export const checkFormSupport = () => {
  const input = document.createElement('input');
  
  return {
    validation: 'validity' in input,
    required: 'required' in input,
    pattern: 'pattern' in input,
    email: (() => {
      input.type = 'email';
      return input.type === 'email';
    })(),
    placeholder: 'placeholder' in input,
    autofocus: 'autofocus' in input
  };
};

/**
 * Check animation performance
 * @returns {Promise<Object>} Performance metrics
 */
export const checkAnimationPerformance = () => {
  return new Promise((resolve) => {
    let frameCount = 0;
    let startTime = performance.now();
    const duration = 1000; // Test for 1 second

    const countFrames = () => {
      frameCount++;
      const elapsed = performance.now() - startTime;
      
      if (elapsed < duration) {
        requestAnimationFrame(countFrames);
      } else {
        const fps = Math.round((frameCount / elapsed) * 1000);
        resolve({
          fps,
          performanceLevel: fps >= 60 ? 'high' : fps >= 30 ? 'medium' : 'low',
          recommendReducedQuality: fps < 30
        });
      }
    };

    requestAnimationFrame(countFrames);
  });
};

/**
 * Get comprehensive browser compatibility report
 * @returns {Promise<Object>} Complete compatibility report
 */
export const getCompatibilityReport = async () => {
  const browser = detectBrowser();
  const webgl = checkWebGLSupport();
  const css = checkCSSSupport();
  const api = checkAPISupport();
  const form = checkFormSupport();
  const performance = await checkAnimationPerformance();

  const report = {
    timestamp: new Date().toISOString(),
    browser,
    webgl,
    css,
    api,
    form,
    performance,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    platform: {
      os: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency
    }
  };

  // Calculate overall compatibility score
  const scores = {
    webgl: webgl.supported ? 100 : 0,
    css: Object.values(css).filter(Boolean).length / Object.keys(css).length * 100,
    api: Object.values(api).filter(Boolean).length / Object.keys(api).length * 100,
    form: Object.values(form).filter(Boolean).length / Object.keys(form).length * 100,
    performance: performance.fps >= 60 ? 100 : performance.fps >= 30 ? 70 : 40
  };

  report.compatibilityScore = Math.round(
    Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length
  );

  report.recommendations = generateRecommendations(report);

  return report;
};

/**
 * Generate recommendations based on compatibility report
 * @param {Object} report - Compatibility report
 * @returns {Array<string>} Recommendations
 */
const generateRecommendations = (report) => {
  const recommendations = [];

  if (!report.webgl.supported) {
    recommendations.push('WebGL is not supported. 3D features will use fallback rendering.');
  }

  if (!report.css.backdropFilter) {
    recommendations.push('Backdrop filter not supported. Glassmorphism effects may appear different.');
  }

  if (report.performance.fps < 30) {
    recommendations.push('Low frame rate detected. Consider reducing animation quality.');
  }

  if (!report.api.intersectionObserver) {
    recommendations.push('IntersectionObserver not supported. Scroll animations may not work optimally.');
  }

  if (!report.form.validation) {
    recommendations.push('Native form validation not supported. Using JavaScript validation fallback.');
  }

  if (report.browser.ie) {
    recommendations.push('Internet Explorer detected. This browser is not fully supported. Please use a modern browser.');
  }

  return recommendations;
};

/**
 * Log compatibility report to console
 * @param {Object} report - Compatibility report
 */
export const logCompatibilityReport = (report) => {
  console.group('🌐 Browser Compatibility Report');
  console.log('Browser:', report.browser.name);
  console.log('Compatibility Score:', `${report.compatibilityScore}%`);
  console.log('WebGL Support:', report.webgl.supported ? '✓' : '✗');
  console.log('Performance:', `${report.performance.fps} FPS (${report.performance.performanceLevel})`);
  
  if (report.recommendations.length > 0) {
    console.group('⚠️ Recommendations');
    report.recommendations.forEach(rec => console.log('•', rec));
    console.groupEnd();
  }
  
  console.log('Full Report:', report);
  console.groupEnd();
};

/**
 * Apply vendor prefixes for CSS properties
 * @param {HTMLElement} element - Target element
 * @param {string} property - CSS property
 * @param {string} value - CSS value
 */
export const applyVendorPrefix = (element, property, value) => {
  const prefixes = ['', '-webkit-', '-moz-', '-ms-', '-o-'];
  
  prefixes.forEach(prefix => {
    try {
      element.style[prefix + property] = value;
    } catch (e) {
      // Ignore errors for unsupported prefixes
    }
  });
};

/**
 * Check if browser needs polyfills
 * @returns {Object} Polyfill requirements
 */
export const checkPolyfillNeeds = () => {
  const cssSupportsAvailable = typeof CSS !== 'undefined' && typeof CSS.supports === 'function';
  
  return {
    needsIntersectionObserver: !('IntersectionObserver' in window),
    needsResizeObserver: !('ResizeObserver' in window),
    needsRequestAnimationFrame: !('requestAnimationFrame' in window),
    needsFetch: !('fetch' in window),
    needsPromise: !('Promise' in window),
    needsObjectFit: cssSupportsAvailable ? !CSS.supports('object-fit', 'cover') : true
  };
};

export default {
  detectBrowser,
  checkWebGLSupport,
  checkCSSSupport,
  checkAPISupport,
  checkFormSupport,
  checkAnimationPerformance,
  getCompatibilityReport,
  logCompatibilityReport,
  applyVendorPrefix,
  checkPolyfillNeeds
};
