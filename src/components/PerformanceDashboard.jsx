import React, { useState, useEffect } from 'react';
import performanceAuditor from '../utils/performanceAudit';

/**
 * Performance Dashboard Component
 * Displays real-time performance metrics in development mode
 */
const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    // Update metrics every 2 seconds
    const interval = setInterval(() => {
      const currentMetrics = performanceAuditor.getMetrics();
      const checkResults = performanceAuditor.checkPerformanceTargets();
      setMetrics(currentMetrics);
      setResults(checkResults);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Don't render in production
  if (process.env.NODE_ENV !== 'development' || !metrics) {
    return null;
  }

  const getStatusColor = (passed) => {
    return passed ? 'text-green-400' : 'text-red-400';
  };

  const getStatusIcon = (passed) => {
    return passed ? '✅' : '❌';
  };

  return (
    <div className="fixed bottom-20 right-4 z-[9999] pointer-events-auto">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-black/80 backdrop-blur-md border border-violet-500/30 rounded-lg px-4 py-2 shadow-lg hover:border-violet-500/50 transition-colors mb-2"
      >
        <div className="flex items-center gap-2">
          <span className="text-violet-400 text-sm font-semibold">
            {isExpanded ? '📊 Hide Metrics' : '📊 Performance'}
          </span>
          {results && (
            <span className={`text-xs ${results.passed ? 'text-green-400' : 'text-yellow-400'}`}>
              {results.passed ? '✓' : '⚠'}
            </span>
          )}
        </div>
      </button>

      {/* Expanded Dashboard */}
      {isExpanded && (
        <div className="bg-black/90 backdrop-blur-md border border-violet-500/30 rounded-lg p-4 shadow-2xl max-w-md max-h-96 overflow-y-auto">
          <h3 className="text-violet-400 font-bold mb-3 text-sm">Performance Metrics</h3>

          {/* Core Metrics */}
          <div className="space-y-2 mb-4">
            <MetricRow
              label="Load Time"
              value={`${metrics.loadTime.toFixed(0)}ms`}
              target="< 3000ms"
              passed={metrics.loadTime < 3000}
            />
            <MetricRow
              label="Time to Interactive"
              value={`${metrics.timeToInteractive.toFixed(0)}ms`}
              target="< 4000ms"
              passed={metrics.timeToInteractive < 4000}
            />
            <MetricRow
              label="First Contentful Paint"
              value={`${metrics.firstContentfulPaint.toFixed(0)}ms`}
              target="< 1800ms"
              passed={metrics.firstContentfulPaint < 1800}
            />
            <MetricRow
              label="Largest Contentful Paint"
              value={`${metrics.largestContentfulPaint.toFixed(0)}ms`}
              target="< 2500ms"
              passed={metrics.largestContentfulPaint < 2500}
            />
            <MetricRow
              label="Cumulative Layout Shift"
              value={metrics.cumulativeLayoutShift.toFixed(3)}
              target="< 0.1"
              passed={metrics.cumulativeLayoutShift < 0.1}
            />
            <MetricRow
              label="Average FPS"
              value={metrics.averageFPS}
              target="> 30"
              passed={metrics.averageFPS > 30}
            />
          </div>

          {/* Overall Status */}
          {results && (
            <div className={`mt-4 pt-4 border-t border-white/10 text-center ${getStatusColor(results.passed)}`}>
              <div className="text-lg font-bold">
                {results.passed ? '🎉 All Targets Met!' : '⚠️ Needs Optimization'}
              </div>
              <div className="text-xs text-white/50 mt-1">
                {results.checks.filter(c => c.passed).length} / {results.checks.length} checks passed
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                performanceAuditor.logResults();
              }}
              className="w-full bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/50 rounded px-3 py-2 text-xs text-violet-300 transition-colors"
            >
              Log Detailed Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Metric Row Component
 */
const MetricRow = ({ label, value, target, passed }) => {
  const statusColor = passed ? 'text-green-400' : 'text-red-400';
  const statusIcon = passed ? '✅' : '❌';

  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 flex-1">
        <span className="text-lg">{statusIcon}</span>
        <span className="text-white/70">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-mono font-semibold ${statusColor}`}>{value}</span>
        <span className="text-white/40 text-[10px]">{target}</span>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
