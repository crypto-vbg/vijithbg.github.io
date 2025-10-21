/**
 * Image Optimization Utilities
 * 
 * Guidelines for optimizing images in the portfolio:
 * 
 * 1. Convert images to WebP format with JPEG fallback
 *    - Use tools like: imagemin, sharp, or online converters
 *    - Command: npx @squoosh/cli --webp auto <image.jpg>
 * 
 * 2. Create responsive image sizes:
 *    - Mobile: 320w (for screens up to 768px)
 *    - Tablet: 768w (for screens up to 1024px)
 *    - Desktop: 1024w (for larger screens)
 * 
 * 3. Compress images to under 200KB each:
 *    - WebP quality: 80-85
 *    - JPEG quality: 75-80
 * 
 * 4. Naming convention:
 *    - Original: project-name.jpg
 *    - WebP: project-name.webp
 *    - Responsive: project-name-320w.webp, project-name-768w.webp, etc.
 * 
 * 5. Place optimized images in: public/images/projects/
 * 
 * Example structure:
 * public/
 *   images/
 *     projects/
 *       project1-320w.webp
 *       project1-768w.webp
 *       project1-1024w.webp
 *       project1-320w.jpg
 *       project1-768w.jpg
 *       project1-1024w.jpg
 */

/**
 * Get optimized image path based on base name
 * @param {string} baseName - Base name without extension (e.g., 'project1')
 * @param {string} size - Size variant ('320w', '768w', '1024w')
 * @param {string} format - Image format ('webp' or 'jpg')
 * @returns {string} Full path to optimized image
 */
export const getOptimizedImagePath = (baseName, size = '1024w', format = 'webp') => {
  return `/images/projects/${baseName}-${size}.${format}`;
};

/**
 * Preload critical images for better performance
 * @param {Array<string>} imagePaths - Array of image paths to preload
 */
export const preloadImages = (imagePaths) => {
  if (typeof window === 'undefined') return;
  
  imagePaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
};

/**
 * Check if WebP is supported in the browser
 * @returns {Promise<boolean>}
 */
export const checkWebPSupport = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Get image dimensions for responsive loading
 * @param {number} viewportWidth - Current viewport width
 * @returns {string} Appropriate image size
 */
export const getResponsiveImageSize = (viewportWidth) => {
  if (viewportWidth <= 768) return '320w';
  if (viewportWidth <= 1024) return '768w';
  return '1024w';
};

export default {
  getOptimizedImagePath,
  preloadImages,
  checkWebPSupport,
  getResponsiveImageSize
};
