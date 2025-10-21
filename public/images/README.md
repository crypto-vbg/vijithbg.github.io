# Portfolio Images

This directory contains placeholder SVG images for the portfolio website. These are optimized, scalable vector graphics that work well as placeholders.

## Customizing Your Portfolio Images

To personalize your portfolio, replace these SVG files with your own images:

### Profile Image (`profile.svg`)
- **Recommended size**: 400x400px
- **Format**: JPG, PNG, or WebP
- **Max file size**: 100KB
- **Usage**: Displayed in the About section within a circular frame

### Project Thumbnails
Replace the following project images with screenshots or mockups of your actual projects:

1. **quantum-navigator.svg** - 800x600px
2. **stellar-database.svg** - 800x600px
3. **cosmic-chat.svg** - 800x600px
4. **nebula-engine.svg** - 800x600px
5. **orbit-tracker.svg** - 800x600px
6. **astro-dashboard.svg** - 800x600px

**Recommended specs for project images:**
- **Size**: 800x600px (4:3 aspect ratio)
- **Format**: WebP with JPG fallback for best performance
- **Max file size**: 200KB each
- **Optimization**: Use tools like TinyPNG or Squoosh to compress

### After Replacing Images

1. Update the file extensions in `src/data/portfolioData.js`:
   ```javascript
   // Change from .svg to your image format
   profileImage: '/images/profile.jpg',
   image: '/images/quantum-navigator.webp',
   ```

2. For WebP with fallback, you can use the `<picture>` element in your components:
   ```jsx
   <picture>
     <source srcSet="/images/project.webp" type="image/webp" />
     <img src="/images/project.jpg" alt="Project" />
   </picture>
   ```

### Image Optimization Tips

- Use WebP format for 25-35% smaller file sizes
- Compress images before adding them to the project
- Consider using responsive images with `srcset` for different screen sizes
- Add descriptive alt text for accessibility

### Social Media Icons

The social media icons (GitHub, LinkedIn, Twitter) are currently referenced by name in the code. The actual icon components should be implemented in your UI components using icon libraries like:
- React Icons (`react-icons`)
- Font Awesome
- Heroicons
- Or custom SVG components

Example with React Icons:
```jsx
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
```
