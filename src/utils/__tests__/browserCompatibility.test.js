/**
 * Browser Compatibility Tests
 * Tests for cross-browser compatibility utilities
 */

import {
    detectBrowser,
    checkWebGLSupport,
    checkCSSSupport,
    checkAPISupport,
    checkFormSupport,
    checkPolyfillNeeds
} from '../browserCompatibility';

describe('Browser Compatibility Utilities', () => {
    describe('detectBrowser', () => {
        it('should detect browser information', () => {
            const browser = detectBrowser();

            expect(browser).toHaveProperty('name');
            expect(browser).toHaveProperty('userAgent');
            expect(browser).toHaveProperty('chrome');
            expect(browser).toHaveProperty('firefox');
            expect(browser).toHaveProperty('safari');
            expect(browser).toHaveProperty('edge');
            expect(browser).toHaveProperty('ie');

            expect(typeof browser.name).toBe('string');
            expect(typeof browser.userAgent).toBe('string');
        });

        it('should identify at least one browser as true', () => {
            const browser = detectBrowser();
            const browserFlags = [
                browser.chrome,
                browser.firefox,
                browser.safari,
                browser.edge,
                browser.ie
            ];

            // At least one should be true, or name should be 'unknown'
            const hasIdentifiedBrowser = browserFlags.some(flag => flag === true);
            expect(hasIdentifiedBrowser || browser.name === 'unknown').toBe(true);
        });
    });

    describe('checkWebGLSupport', () => {
        it('should check WebGL support', () => {
            const webgl = checkWebGLSupport();

            expect(webgl).toHaveProperty('supported');
            expect(typeof webgl.supported).toBe('boolean');

            if (webgl.supported) {
                expect(webgl).toHaveProperty('version');
                expect(webgl).toHaveProperty('renderer');
                expect(webgl).toHaveProperty('vendor');
                expect(webgl).toHaveProperty('maxTextureSize');
                expect(webgl).toHaveProperty('maxVertexAttributes');
            }
        });

        it('should handle WebGL errors gracefully', () => {
            const webgl = checkWebGLSupport();

            if (!webgl.supported) {
                expect(webgl.version).toBeNull();
                expect(webgl.renderer).toBeNull();
                expect(webgl.vendor).toBeNull();
            }
        });
    });

    describe('checkCSSSupport', () => {
        it('should check CSS feature support', () => {
            const css = checkCSSSupport();

            expect(css).toHaveProperty('backdropFilter');
            expect(css).toHaveProperty('grid');
            expect(css).toHaveProperty('flexbox');
            expect(css).toHaveProperty('customProperties');
            expect(css).toHaveProperty('transforms3d');
            expect(css).toHaveProperty('animations');
            expect(css).toHaveProperty('transitions');
            expect(css).toHaveProperty('clipPath');
            expect(css).toHaveProperty('objectFit');
            expect(css).toHaveProperty('aspectRatio');

            // All values should be boolean
            Object.values(css).forEach(value => {
                expect(typeof value).toBe('boolean');
            });
        });

        it('should handle test environment without CSS.supports', () => {
            const css = checkCSSSupport();

            // In test environment (jsdom), CSS.supports may not be available
            // Function should return all false values gracefully
            expect(css).toBeDefined();
            Object.values(css).forEach(value => {
                expect(typeof value).toBe('boolean');
            });
        });
    });

    describe('checkAPISupport', () => {
        it('should check JavaScript API support', () => {
            const api = checkAPISupport();

            expect(api).toHaveProperty('intersectionObserver');
            expect(api).toHaveProperty('resizeObserver');
            expect(api).toHaveProperty('requestAnimationFrame');
            expect(api).toHaveProperty('localStorage');
            expect(api).toHaveProperty('fetch');
            expect(api).toHaveProperty('promises');
            expect(api).toHaveProperty('asyncAwait');
            expect(api).toHaveProperty('es6Modules');
            expect(api).toHaveProperty('webWorkers');
            expect(api).toHaveProperty('serviceWorker');

            // All values should be boolean
            Object.values(api).forEach(value => {
                expect(typeof value).toBe('boolean');
            });
        });

        it('should detect essential APIs', () => {
            const api = checkAPISupport();

            // These should be available in test environment
            expect(api.promises).toBe(true);
            expect(api.requestAnimationFrame).toBe(true);
        });
    });

    describe('checkFormSupport', () => {
        it('should check form feature support', () => {
            const form = checkFormSupport();

            expect(form).toHaveProperty('validation');
            expect(form).toHaveProperty('required');
            expect(form).toHaveProperty('pattern');
            expect(form).toHaveProperty('email');
            expect(form).toHaveProperty('placeholder');
            expect(form).toHaveProperty('autofocus');

            // All values should be boolean
            Object.values(form).forEach(value => {
                expect(typeof value).toBe('boolean');
            });
        });

        it('should detect HTML5 form features', () => {
            const form = checkFormSupport();

            // Modern browsers should support these
            expect(form.validation).toBe(true);
            expect(form.required).toBe(true);
            expect(form.placeholder).toBe(true);
        });
    });

    describe('checkPolyfillNeeds', () => {
        it('should identify polyfill requirements', () => {
            const polyfills = checkPolyfillNeeds();

            expect(polyfills).toHaveProperty('needsIntersectionObserver');
            expect(polyfills).toHaveProperty('needsResizeObserver');
            expect(polyfills).toHaveProperty('needsRequestAnimationFrame');
            expect(polyfills).toHaveProperty('needsFetch');
            expect(polyfills).toHaveProperty('needsPromise');
            expect(polyfills).toHaveProperty('needsObjectFit');

            // All values should be boolean
            Object.values(polyfills).forEach(value => {
                expect(typeof value).toBe('boolean');
            });
        });
    });
});

describe('Browser Compatibility Integration', () => {
    it('should provide consistent results across multiple calls', () => {
        const browser1 = detectBrowser();
        const browser2 = detectBrowser();

        expect(browser1.name).toBe(browser2.name);
    });

    it('should handle missing features gracefully', () => {
        const css = checkCSSSupport();
        const api = checkAPISupport();

        // Should not throw errors even if features are missing
        expect(css).toBeDefined();
        expect(api).toBeDefined();
    });
});
