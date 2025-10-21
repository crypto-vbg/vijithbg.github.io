#!/usr/bin/env node

/**
 * Performance Setup Checker
 * 
 * Verifies that all performance optimizations are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Performance Setup\n');
console.log('=' .repeat(60));

const checks = [];

// Check 1: Performance monitoring utilities exist
console.log('\n📦 Checking Performance Utilities...\n');

const performanceFiles = [
  'src/utils/performanceMonitoring.js',
  'src/utils/performanceAudit.js',
  'src/utils/performanceOptimizations.js'
];

performanceFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  checks.push({
    name: `${file} exists`,
    passed: exists,
    category: 'Utilities'
  });
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// Check 2: Performance components exist
console.log('\n🎨 Checking Performance Components...\n');

const componentFiles = [
  'src/components/FPSCounter.jsx',
  'src/components/PerformanceDashboard.jsx',
  'src/components/ErrorBoundary.jsx'
];

componentFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  checks.push({
    name: `${file} exists`,
    passed: exists,
    category: 'Components'
  });
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// Check 3: Production environment configuration
console.log('\n⚙️  Checking Production Configuration...\n');

const envProdExists = fs.existsSync(path.join(process.cwd(), '.env.production'));
checks.push({
  name: '.env.production exists',
  passed: envProdExists,
  category: 'Configuration'
});
console.log(`  ${envProdExists ? '✅' : '❌'} .env.production`);

if (envProdExists) {
  const envContent = fs.readFileSync(path.join(process.cwd(), '.env.production'), 'utf8');
  const hasSourceMapDisabled = envContent.includes('GENERATE_SOURCEMAP=false');
  checks.push({
    name: 'Source maps disabled in production',
    passed: hasSourceMapDisabled,
    category: 'Configuration'
  });
  console.log(`  ${hasSourceMapDisabled ? '✅' : '❌'} Source maps disabled`);
}

// Check 4: Package.json scripts
console.log('\n📜 Checking NPM Scripts...\n');

const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
const requiredScripts = [
  'build',
  'build:analyze',
  'audit:performance',
  'serve'
];

requiredScripts.forEach(script => {
  const exists = packageJson.scripts && packageJson.scripts[script];
  checks.push({
    name: `Script "${script}" exists`,
    passed: !!exists,
    category: 'Scripts'
  });
  console.log(`  ${exists ? '✅' : '❌'} ${script}`);
});

// Check 5: Lazy loading in App.js
console.log('\n🔄 Checking Code Splitting...\n');

const appJsPath = path.join(process.cwd(), 'src/App.js');
if (fs.existsSync(appJsPath)) {
  const appContent = fs.readFileSync(appJsPath, 'utf8');
  
  const hasLazy = appContent.includes('lazy(');
  checks.push({
    name: 'Lazy loading implemented',
    passed: hasLazy,
    category: 'Code Splitting'
  });
  console.log(`  ${hasLazy ? '✅' : '❌'} React.lazy() used`);
  
  const hasSuspense = appContent.includes('<Suspense');
  checks.push({
    name: 'Suspense boundaries implemented',
    passed: hasSuspense,
    category: 'Code Splitting'
  });
  console.log(`  ${hasSuspense ? '✅' : '❌'} Suspense boundaries`);
  
  const hasErrorBoundary = appContent.includes('<ErrorBoundary');
  checks.push({
    name: 'Error boundaries implemented',
    passed: hasErrorBoundary,
    category: 'Error Handling'
  });
  console.log(`  ${hasErrorBoundary ? '✅' : '❌'} Error boundaries`);
}

// Check 6: Performance hooks
console.log('\n🪝 Checking Performance Hooks...\n');

const hookFiles = [
  'src/hooks/useFPSMonitor.js',
  'src/hooks/useScrollProgress.js',
  'src/hooks/useMousePosition.js',
  'src/hooks/useIntersectionObserver.js'
];

hookFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  checks.push({
    name: `${file} exists`,
    passed: exists,
    category: 'Hooks'
  });
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// Check 7: Documentation
console.log('\n📚 Checking Documentation...\n');

const docFiles = [
  'PERFORMANCE_AUDIT.md',
  'PERFORMANCE_OPTIMIZATIONS.md'
];

docFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  checks.push({
    name: `${file} exists`,
    passed: exists,
    category: 'Documentation'
  });
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 Summary by Category:\n');

const categories = [...new Set(checks.map(c => c.category))];
categories.forEach(category => {
  const categoryChecks = checks.filter(c => c.category === category);
  const passed = categoryChecks.filter(c => c.passed).length;
  const total = categoryChecks.length;
  const percentage = Math.round((passed / total) * 100);
  
  const status = percentage === 100 ? '✅' : percentage >= 80 ? '⚠️' : '❌';
  console.log(`  ${status} ${category}: ${passed}/${total} (${percentage}%)`);
});

// Overall
const totalPassed = checks.filter(c => c.passed).length;
const totalChecks = checks.length;
const overallPercentage = Math.round((totalPassed / totalChecks) * 100);

console.log('\n' + '='.repeat(60));
console.log(`\n🎯 Overall: ${totalPassed}/${totalChecks} checks passed (${overallPercentage}%)\n`);

if (overallPercentage === 100) {
  console.log('🎉 Perfect! All performance optimizations are in place.\n');
} else if (overallPercentage >= 80) {
  console.log('✅ Good! Most performance optimizations are in place.\n');
} else {
  console.log('⚠️  Some performance optimizations are missing.\n');
}

// Next steps
console.log('📋 Next Steps:\n');
console.log('  1. Fix any missing files or configurations');
console.log('  2. Run: npm run build');
console.log('  3. Run: npm run audit:performance');
console.log('  4. Test locally: npm run serve');
console.log('  5. Run Lighthouse audit in Chrome DevTools\n');

// Exit with appropriate code
process.exit(overallPercentage >= 80 ? 0 : 1);
