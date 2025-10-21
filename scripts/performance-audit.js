#!/usr/bin/env node

/**
 * Performance Audit Script
 * 
 * This script performs a comprehensive performance audit including:
 * - Build size analysis
 * - Bundle composition
 * - Performance recommendations
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Space Portfolio - Performance Audit\n');
console.log('=' .repeat(60));

// Check if build directory exists
const buildDir = path.join(process.cwd(), 'build');
if (!fs.existsSync(buildDir)) {
  console.error('❌ Build directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Analyze build directory
function getDirectorySize(dirPath) {
  let totalSize = 0;
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  });

  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeJSFiles() {
  const jsDir = path.join(buildDir, 'static', 'js');
  if (!fs.existsSync(jsDir)) return [];

  const files = fs.readdirSync(jsDir);
  return files
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const filePath = path.join(jsDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        type: file.includes('.chunk.') ? 'chunk' : file.includes('main.') ? 'main' : 'runtime'
      };
    })
    .sort((a, b) => b.size - a.size);
}

function analyzeCSSFiles() {
  const cssDir = path.join(buildDir, 'static', 'css');
  if (!fs.existsSync(cssDir)) return [];

  const files = fs.readdirSync(cssDir);
  return files
    .filter(file => file.endsWith('.css'))
    .map(file => {
      const filePath = path.join(cssDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size
      };
    })
    .sort((a, b) => b.size - a.size);
}

// Run analysis
console.log('\n📊 Build Size Analysis\n');

const totalSize = getDirectorySize(buildDir);
console.log(`Total Build Size: ${formatBytes(totalSize)}`);

const jsFiles = analyzeJSFiles();
const cssFiles = analyzeCSSFiles();

console.log('\n📦 JavaScript Bundles:\n');
jsFiles.forEach(file => {
  const sizeStr = formatBytes(file.size).padEnd(12);
  const typeStr = `[${file.type}]`.padEnd(10);
  console.log(`  ${sizeStr} ${typeStr} ${file.name}`);
});

const totalJS = jsFiles.reduce((sum, file) => sum + file.size, 0);
console.log(`\n  Total JS: ${formatBytes(totalJS)}`);

console.log('\n🎨 CSS Files:\n');
cssFiles.forEach(file => {
  const sizeStr = formatBytes(file.size).padEnd(12);
  console.log(`  ${sizeStr} ${file.name}`);
});

const totalCSS = cssFiles.reduce((sum, file) => sum + file.size, 0);
console.log(`\n  Total CSS: ${formatBytes(totalCSS)}`);

// Performance recommendations
console.log('\n\n💡 Performance Recommendations:\n');

const recommendations = [];

// Check main bundle size
const mainBundle = jsFiles.find(f => f.type === 'main');
if (mainBundle && mainBundle.size > 500 * 1024) {
  recommendations.push({
    level: '⚠️',
    message: `Main bundle is ${formatBytes(mainBundle.size)}. Consider code splitting.`,
    target: '< 500 KB'
  });
} else if (mainBundle) {
  recommendations.push({
    level: '✅',
    message: `Main bundle size is optimal: ${formatBytes(mainBundle.size)}`,
    target: '< 500 KB'
  });
}

// Check total JS size
if (totalJS > 1024 * 1024) {
  recommendations.push({
    level: '⚠️',
    message: `Total JS is ${formatBytes(totalJS)}. Consider lazy loading more components.`,
    target: '< 1 MB'
  });
} else {
  recommendations.push({
    level: '✅',
    message: `Total JS size is good: ${formatBytes(totalJS)}`,
    target: '< 1 MB'
  });
}

// Check CSS size
if (totalCSS > 100 * 1024) {
  recommendations.push({
    level: '⚠️',
    message: `CSS is ${formatBytes(totalCSS)}. Consider purging unused styles.`,
    target: '< 100 KB'
  });
} else {
  recommendations.push({
    level: '✅',
    message: `CSS size is optimal: ${formatBytes(totalCSS)}`,
    target: '< 100 KB'
  });
}

// Check total build size
if (totalSize > 2 * 1024 * 1024) {
  recommendations.push({
    level: '⚠️',
    message: `Total build is ${formatBytes(totalSize)}. Optimize images and assets.`,
    target: '< 2 MB'
  });
} else {
  recommendations.push({
    level: '✅',
    message: `Total build size is good: ${formatBytes(totalSize)}`,
    target: '< 2 MB'
  });
}

recommendations.forEach(rec => {
  console.log(`  ${rec.level} ${rec.message}`);
  console.log(`     Target: ${rec.target}\n`);
});

// Check for source maps in production
const hasSourceMaps = jsFiles.some(f => f.name.endsWith('.map'));
if (hasSourceMaps) {
  console.log('  ⚠️  Source maps detected in build. Disable for production.');
  console.log('     Add GENERATE_SOURCEMAP=false to build script\n');
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📋 Performance Checklist:\n');

const checklist = [
  { item: 'Code splitting implemented', status: jsFiles.length > 2 },
  { item: 'Lazy loading for heavy components', status: jsFiles.some(f => f.type === 'chunk') },
  { item: 'CSS optimized', status: totalCSS < 100 * 1024 },
  { item: 'Total bundle size < 1MB', status: totalJS < 1024 * 1024 },
  { item: 'Build size < 2MB', status: totalSize < 2 * 1024 * 1024 }
];

checklist.forEach(item => {
  const status = item.status ? '✅' : '❌';
  console.log(`  ${status} ${item.item}`);
});

console.log('\n' + '='.repeat(60));
console.log('\n🎯 Next Steps:\n');
console.log('  1. Run production build: npm run build');
console.log('  2. Test locally: npx serve -s build');
console.log('  3. Run Lighthouse audit in Chrome DevTools');
console.log('  4. Check Core Web Vitals in production');
console.log('  5. Monitor FPS during 3D rendering\n');

// Exit with appropriate code
const hasWarnings = recommendations.some(r => r.level === '⚠️');
process.exit(hasWarnings ? 1 : 0);
