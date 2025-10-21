import React, { useState, useEffect } from 'react';
import { getCompatibilityReport, logCompatibilityReport } from '../utils/browserCompatibility';

/**
 * BrowserCompatibilityTest Component
 * Displays browser compatibility information and test results
 * Only shown in development mode
 */
const BrowserCompatibilityTest = () => {
  const [report, setReport] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Auto-run compatibility check on mount
    runCompatibilityTest();
  }, []);

  const runCompatibilityTest = async () => {
    setIsLoading(true);
    try {
      const compatReport = await getCompatibilityReport();
      setReport(compatReport);
      logCompatibilityReport(compatReport);
    } catch (error) {
      console.error('Failed to generate compatibility report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPerformanceColor = (level) => {
    if (level === 'high') return 'text-green-400';
    if (level === 'medium') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
        aria-label="Toggle browser compatibility test"
      >
        <span>🌐</span>
        <span className="hidden sm:inline">Browser Test</span>
      </button>

      {/* Compatibility Report Panel */}
      {isVisible && (
        <div className="absolute bottom-14 right-0 w-96 max-h-[80vh] overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Browser Compatibility</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-gray-400">Running tests...</p>
            </div>
          )}

          {report && !isLoading && (
            <div className="space-y-4">
              {/* Overall Score */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Compatibility Score</span>
                  <span className={`text-2xl font-bold ${getScoreColor(report.compatibilityScore)}`}>
                    {report.compatibilityScore}%
                  </span>
                </div>
              </div>

              {/* Browser Info */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Browser</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-mono">{report.browser.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform:</span>
                    <span className="font-mono">{report.platform.os}</span>
                  </div>
                </div>
              </div>

              {/* WebGL Support */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">WebGL</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Supported:</span>
                    <span className={report.webgl.supported ? 'text-green-400' : 'text-red-400'}>
                      {report.webgl.supported ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                  {report.webgl.supported && (
                    <>
                      <div className="flex justify-between">
                        <span>Version:</span>
                        <span className="font-mono text-xs">{report.webgl.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Renderer:</span>
                        <span className="font-mono text-xs truncate max-w-[200px]" title={report.webgl.renderer}>
                          {report.webgl.renderer}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Performance */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Performance</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>FPS:</span>
                    <span className={getPerformanceColor(report.performance.performanceLevel)}>
                      {report.performance.fps}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span className={getPerformanceColor(report.performance.performanceLevel)}>
                      {report.performance.performanceLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* CSS Features */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">CSS Features</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  {Object.entries(report.css).map(([feature, supported]) => (
                    <div key={feature} className="flex justify-between">
                      <span className="capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className={supported ? 'text-green-400' : 'text-red-400'}>
                        {supported ? '✓' : '✗'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Support */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">JavaScript APIs</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  {Object.entries(report.api).slice(0, 6).map(([api, supported]) => (
                    <div key={api} className="flex justify-between">
                      <span className="capitalize">{api.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className={supported ? 'text-green-400' : 'text-red-400'}>
                        {supported ? '✓' : '✗'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              {report.recommendations.length > 0 && (
                <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">⚠️ Recommendations</h4>
                  <ul className="text-sm text-yellow-200 space-y-1 list-disc list-inside">
                    {report.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Refresh Button */}
              <button
                onClick={runCompatibilityTest}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg transition-colors duration-200"
              >
                Refresh Test
              </button>

              {/* Export Button */}
              <button
                onClick={() => {
                  const dataStr = JSON.stringify(report, null, 2);
                  const dataBlob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `compatibility-report-${Date.now()}.json`;
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors duration-200"
              >
                Export Report
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrowserCompatibilityTest;
