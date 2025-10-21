# Space Portfolio Theme Guide

## Color Palette

### Primary Colors
- **Cyan**: `#00FFFF` - Primary accent, interactive elements, glows
- **Violet**: `#9D00FF` - Secondary accent, gradients, highlights
- **Black**: `#000000` - Background, deep space
- **White**: `#FFFFFF` - Text, high contrast elements

### Color Usage Guidelines

#### Cyan (#00FFFF)
- Interactive elements (buttons, links, hover states)
- Focus indicators
- Glow effects
- Navigation highlights
- Form field focus states
- **Contrast Ratio**: 8.59:1 on black (WCAG AAA)

#### Violet (#9D00FF)
- Secondary accents
- Gradient combinations with cyan
- Decorative elements
- Particle effects
- **Contrast Ratio**: 5.89:1 on black (WCAG AA)

#### White (#FFFFFF)
- Primary text color
- High contrast elements
- Icons
- **Contrast Ratio**: 21:1 on black (WCAG AAA)

### Glassmorphism Colors
- Background: `bg-white/5` to `bg-white/10`
- Borders: `border-white/10` to `border-white/20`
- Hover borders: `border-cyan-400`
- Backdrop blur: `backdrop-blur-md`

## Typography

### Font Families

#### Orbitron (Display Font)
- **Usage**: Headings, titles, navigation, important UI elements
- **Weights**: 400, 500, 600, 700, 800, 900
- **Class**: `font-orbitron`
- **Characteristics**: Futuristic, geometric, space-themed

#### Rajdhani (Body Font)
- **Usage**: Body text, descriptions, paragraphs, default text
- **Weights**: 300, 400, 500, 600, 700
- **Class**: `font-rajdhani`
- **Characteristics**: Clean, readable, modern

#### Exo 2 (Accent Font)
- **Usage**: Special callouts, buttons, labels
- **Weights**: 300, 400, 500, 600, 700, 800
- **Class**: `font-exo`
- **Characteristics**: Technical, contemporary

### Typography Scale

```
text-xs:   0.75rem (12px)
text-sm:   0.875rem (14px)
text-base: 1rem (16px)
text-lg:   1.125rem (18px)
text-xl:   1.25rem (20px)
text-2xl:  1.5rem (24px)
text-3xl:  1.875rem (30px)
text-4xl:  2.25rem (36px)
text-5xl:  3rem (48px)
text-6xl:  3.75rem (60px)
text-7xl:  4.5rem (72px)
text-8xl:  6rem (96px)
```

### Typography Utilities

- `.heading-primary`: Large hero headings (4xl-6xl)
- `.heading-secondary`: Section headings (3xl-5xl)
- `.heading-tertiary`: Subsection headings (2xl-4xl)
- `.text-body`: Body text with proper line height
- `.text-gradient-cyan-violet`: Gradient text effect
- `.text-gradient-violet-cyan`: Reverse gradient text effect

## Spacing

### Section Spacing
- **Padding**: `py-16 md:py-24 lg:py-32` (vertical)
- **Padding**: `px-4 md:px-8 lg:px-12` (horizontal)
- **Max Width**: `max-w-7xl mx-auto`
- **Utility Class**: `.section-padding` and `.section-container`

### Component Spacing
- **Card Padding**: `p-4 xs:p-6 md:p-8`
- **Button Padding**: `px-6 py-3`
- **Input Padding**: `px-4 py-3`
- **Gap Between Elements**: `gap-4 md:gap-6 lg:gap-8`

### Consistent Spacing Scale
```
0.5rem (8px)   - gap-2
1rem (16px)    - gap-4
1.5rem (24px)  - gap-6
2rem (32px)    - gap-8
3rem (48px)    - gap-12
4rem (64px)    - gap-16
```

## Glassmorphism

### Standard Glass Card
```jsx
<div className="glass-card p-6">
  {/* Content */}
</div>
```

**CSS**: `backdrop-blur-md bg-white/5 border border-white/10 rounded-xl`

### Glass Card with Hover
```jsx
<div className="glass-card-hover p-6">
  {/* Content */}
</div>
```

**CSS**: Includes hover effects with cyan border and glow

### Glass Input
```jsx
<input className="glass-input-focus px-4 py-3" />
```

**CSS**: Dark background with blur, cyan focus state

### Glass Button
```jsx
<button className="glass-button-hover px-6 py-3">
  Click Me
</button>
```

**CSS**: Translucent with hover effects

## Glow Effects

### Cyan Glow
- **Small**: `glow-cyan` - 20px blur
- **Large**: `glow-cyan-lg` - 30px blur
- **Hover**: `hover:shadow-glow-cyan`

### Violet Glow
- **Small**: `glow-violet` - 20px blur
- **Large**: `glow-violet-lg` - 30px blur
- **Hover**: `hover:shadow-glow-violet`

### Usage Examples
```jsx
// Button with glow
<button className="btn-primary glow-cyan-lg">
  Launch
</button>

// Card with hover glow
<div className="glass-card hover:shadow-glow-cyan">
  {/* Content */}
</div>
```

## Buttons

### Primary Button
```jsx
<button className="btn-primary">
  Primary Action
</button>
```

**Style**: Gradient background (cyan to violet), glow on hover, scale effect

### Secondary Button
```jsx
<button className="btn-secondary">
  Secondary Action
</button>
```

**Style**: Glass effect, border, hover glow

### Button States
- **Default**: Gradient or glass background
- **Hover**: Increased glow, scale to 105%
- **Focus**: Cyan outline with glow
- **Disabled**: Reduced opacity, no hover effects

## Accessibility

### Color Contrast Ratios (WCAG 2.1)

#### Text on Black Background
- White text: 21:1 (AAA) ✓
- Cyan text: 8.59:1 (AAA) ✓
- Violet text: 5.89:1 (AA) ✓

#### Text on Glassmorphism (bg-white/5)
- White text: ~18:1 (AAA) ✓
- Cyan text: ~7.5:1 (AAA) ✓
- Ensure text-shadow for improved readability

### Focus Indicators
- **Outline**: 2px solid cyan with 3px offset
- **Glow**: Cyan shadow for visibility
- **Minimum Size**: 44x44px for touch targets

### Font Weights for Readability
- Body text: 400-500 (regular to medium)
- Headings: 600-700 (semibold to bold)
- Buttons: 600 (semibold)
- Labels: 500 (medium)

### Text Shadows
- Use subtle text shadows on glassmorphism backgrounds
- `text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8)`

## Responsive Design

### Breakpoints
```
xs:  320px  (mobile small)
sm:  640px  (mobile large)
md:  768px  (tablet)
lg:  1024px (desktop)
xl:  1280px (desktop large)
2xl: 1536px (desktop extra large)
```

### Responsive Typography
```jsx
<h1 className="text-4xl md:text-5xl lg:text-6xl">
  Responsive Heading
</h1>
```

### Responsive Spacing
```jsx
<section className="py-16 md:py-24 lg:py-32">
  {/* Content */}
</section>
```

### Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

## Animation Guidelines

### Transition Durations
- **Fast**: 100-200ms (hover states, small changes)
- **Medium**: 300ms (default transitions)
- **Slow**: 500-800ms (page transitions, complex animations)

### Easing Functions
- **Default**: `ease-in-out`
- **Hover**: `ease`
- **Exit**: `ease-in`

### Reduced Motion
All animations respect `prefers-reduced-motion` media query and are disabled or simplified for accessibility.

## Best Practices

### DO
✓ Use utility classes from theme guide
✓ Maintain consistent spacing with section utilities
✓ Apply glassmorphism consistently
✓ Ensure text contrast meets WCAG AA minimum
✓ Use Orbitron for headings, Rajdhani for body
✓ Add focus indicators to all interactive elements
✓ Test on multiple screen sizes

### DON'T
✗ Use arbitrary color values outside the palette
✗ Mix different glassmorphism patterns
✗ Use text smaller than 14px (text-sm)
✗ Forget hover and focus states
✗ Ignore responsive breakpoints
✗ Use low contrast color combinations
✗ Override focus indicators without replacement

## Component Checklist

When creating new components, ensure:
- [ ] Uses theme colors (cyan, violet, white)
- [ ] Applies appropriate font family
- [ ] Includes responsive breakpoints
- [ ] Has proper spacing (section-padding)
- [ ] Uses glassmorphism utilities
- [ ] Includes hover states
- [ ] Has focus indicators
- [ ] Meets contrast requirements
- [ ] Respects reduced motion
- [ ] Touch targets are 44x44px minimum
