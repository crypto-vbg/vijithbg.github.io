import React, { useState } from 'react';

/**
 * OptimizedImage component with WebP support, responsive srcset, and lazy loading
 * 
 * @param {string} src - Base image path (without extension)
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS classes
 * @param {boolean} lazy - Enable lazy loading (default: true)
 * @param {object} sizes - Responsive sizes configuration
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  lazy = true,
  sizes = {
    mobile: 320,
    tablet: 768,
    desktop: 1024
  },
  fallback = null
}) => {
  const [imageError, setImageError] = useState(false);
  const [format, setFormat] = useState('webp');

  // Handle image load error - fallback to JPEG
  const handleError = () => {
    if (format === 'webp') {
      setFormat('jpg');
    } else {
      setImageError(true);
    }
  };

  // If image failed to load completely, show fallback
  if (imageError) {
    return fallback || (
      <div className={`flex items-center justify-center bg-gradient-to-br from-violet-900/50 to-cyan-900/50 ${className}`}>
        <div className="text-6xl opacity-50">🚀</div>
      </div>
    );
  }

  // Generate srcset for responsive images
  const generateSrcSet = (basePath, ext) => {
    const srcset = [];
    if (sizes.mobile) srcset.push(`${basePath}-${sizes.mobile}w.${ext} ${sizes.mobile}w`);
    if (sizes.tablet) srcset.push(`${basePath}-${sizes.tablet}w.${ext} ${sizes.tablet}w`);
    if (sizes.desktop) srcset.push(`${basePath}-${sizes.desktop}w.${ext} ${sizes.desktop}w`);
    return srcset.join(', ');
  };

  // Determine image extension
  const imageExt = format === 'webp' ? 'webp' : 'jpg';
  const imageSrc = `${src}.${imageExt}`;
  const srcSet = generateSrcSet(src, imageExt);

  return (
    <picture>
      {/* WebP format for modern browsers */}
      {format === 'webp' && (
        <source
          type="image/webp"
          srcSet={srcSet}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      
      {/* JPEG fallback */}
      <img
        src={imageSrc}
        srcSet={srcSet}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onError={handleError}
        className={className}
        decoding="async"
      />
    </picture>
  );
};

export default OptimizedImage;
