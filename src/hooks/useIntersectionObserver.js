import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to detect when an element enters the viewport
 * @param {Object} options - Intersection Observer options
 * @returns {Array} [ref, isVisible] - Ref to attach to element and visibility state
 */
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.1,
      triggerOnce: true,
      ...options
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (defaultOptions.triggerOnce) {
          observer.unobserve(element);
        }
      } else if (!defaultOptions.triggerOnce) {
        setIsVisible(false);
      }
    }, defaultOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

export default useIntersectionObserver;
