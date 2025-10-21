# Browser Testing Quick Reference

## Quick Start

### 1. Run Development Server
```bash
npm start
```

### 2. Access Compatibility Tool
- Look for **🌐 Browser Test** button (bottom-right corner)
- Click to view compatibility report
- Export report for documentation

### 3. Check Console
Open browser DevTools (F12) and look for:
```
🌐 Browser Compatibility Report
```

## Critical Test Points

### ✅ Must Test in Each Browser

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| 3D Starfield | ✓ | ✓ | ✓ | ✓ |
| Black Hole | ✓ | ✓ | ✓ | ✓ |
| Glassmorphism | ✓ | ✓ | ✓ | ✓ |
| Form Validation | ✓ | ✓ | ✓ | ✓ |
| Smooth Scroll | ✓ | ✓ | ✓ | ✓ |
| Animations | ✓ | ✓ | ✓ | ✓ |

### 🎯 Key Test Scenarios

1. **Load Page**
   - 3D background renders
   - No console errors
   - FPS > 30

2. **Navigate**
   - Click each nav link
   - Smooth scroll works
   - Active section highlights

3. **Interact**
   - Hover over project cards
   - Hover over skill icons
   - Move mouse (parallax)

4. **Submit Form**
   - Fill all fields
   - Submit valid data
   - See shooting star

5. **Resize Window**
   - Test mobile (< 768px)
   - Test tablet (768-1023px)
   - Test desktop (> 1024px)

## Browser-Specific Notes

### Chrome
- **Best Performance**: Use as baseline
- **DevTools**: Best debugging experience
- **WebGL**: Full support

### Firefox
- **Good Performance**: Slightly lower FPS
- **DevTools**: Excellent 3D inspector
- **WebGL**: Full support
- **Note**: Check backdrop-filter (103+)

### Safari
- **Moderate Performance**: May need quality reduction
- **Vendor Prefixes**: Use `-webkit-` for backdrop-filter
- **WebGL**: Supported but may have quirks
- **iOS**: Test on actual device if possible

### Edge
- **Chromium-Based**: Similar to Chrome
- **Performance**: Comparable to Chrome
- **Legacy**: Not supported (< v79)

## Common Issues & Fixes

### Issue: 3D Not Rendering
**Check:**
- WebGL enabled in browser
- GPU acceleration enabled
- No browser extensions blocking

**Fix:**
- Fallback should display automatically
- Check console for WebGL errors

### Issue: Glassmorphism Not Working
**Check:**
- Browser supports backdrop-filter
- Vendor prefix applied

**Fix:**
```css
-webkit-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);
```

### Issue: Animations Choppy
**Check:**
- FPS counter (should be > 30)
- CPU/GPU usage

**Fix:**
- Adaptive quality reduces particles automatically
- Close other tabs/applications

### Issue: Form Not Submitting
**Check:**
- All fields filled
- Email format valid
- Console for errors

**Fix:**
- Check validation logic
- Verify event handlers

## Performance Targets

| Metric | Target | Acceptable | Poor |
|--------|--------|------------|------|
| FPS | 60 | 30-59 | < 30 |
| Load Time | < 2s | 2-3s | > 3s |
| TTI | < 3s | 3-4s | > 4s |
| LCP | < 2s | 2-2.5s | > 2.5s |

## Testing Shortcuts

### DevTools Console
```javascript
// Get compatibility report
import('./utils/browserCompatibility').then(m => 
  m.getCompatibilityReport().then(console.log)
);

// Check WebGL
import('./utils/browserCompatibility').then(m => 
  console.log(m.checkWebGLSupport())
);

// Check CSS features
import('./utils/browserCompatibility').then(m => 
  console.log(m.checkCSSSupport())
);
```

### URL Parameters (Future)
```
?debug=true          # Show debug info
?quality=low         # Force low quality
?no-webgl=true       # Disable WebGL
?fps=true            # Show FPS counter
```

## Accessibility Quick Check

### Keyboard Navigation
1. Press **Tab** repeatedly
2. Should see cyan focus indicators
3. Should reach all interactive elements

### Screen Reader
1. Enable screen reader
2. Navigate through page
3. Verify all content announced

### Reduced Motion
1. Enable in OS settings
2. Reload page
3. Animations should be minimal

## Mobile Testing

### iOS Safari
```
Settings > Safari > Advanced > Experimental Features
- Check WebGL 2.0
- Check WebGPU
```

### Android Chrome
```
chrome://flags
- Enable WebGL
- Enable GPU rasterization
```

### Device Sizes
- iPhone SE: 375x667
- iPhone 12: 390x844
- iPad: 768x1024
- iPad Pro: 1024x1366

## Reporting Template

```markdown
**Browser:** Chrome 120
**OS:** Windows 11
**Device:** Desktop
**Issue:** [Description]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected:** [What should happen]
**Actual:** [What actually happens]

**Console Errors:**
```
[Paste errors here]
```

**Screenshots:** [Attach if applicable]
**Compatibility Report:** [Export from tool]
```

## Resources

- Full Guide: `CROSS_BROWSER_TESTING.md`
- Compatibility Utils: `src/utils/browserCompatibility.js`
- Test Component: `src/components/BrowserCompatibilityTest.jsx`

## Checklist

Before deploying:
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested in Edge
- [ ] Tested on mobile
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Accessibility verified
- [ ] Forms working
- [ ] Animations smooth
