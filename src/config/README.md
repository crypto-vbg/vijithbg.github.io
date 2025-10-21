# Portfolio Configuration Guide

## 📝 Quick Start

**To update your portfolio content, edit this single file:**
```
src/config/portfolioConfig.js
```

All changes made to this file will automatically reflect across the entire website.

## 🎯 What You Can Edit

### 1. Personal Information
```javascript
export const personalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  // ... etc
}
```

### 2. Skills
Add, remove, or modify skills:
```javascript
{
  name: 'Skill Name',
  icon: '🎯',  // Any emoji
  proficiency: 90,  // 0-100
  category: 'Category Name',
  orbitRadius: 250,  // 250, 300, or 350
  orbitDuration: 10  // 10, 15, or 20
}
```

**Orbit Guidelines:**
- **Inner orbit (250px, 10s)**: Your core/primary skills
- **Middle orbit (300px, 15s)**: Important secondary skills
- **Outer orbit (350px, 20s)**: Supporting/additional skills
- Keep 6 skills per orbit for best visual balance

### 3. Projects
```javascript
{
  id: 'unique-id',
  title: 'Project Title',
  description: 'Brief description',
  image: '/images/project-image.svg',
  liveUrl: 'https://...' or null,
  githubUrl: 'https://...' or null,
  tags: ['Tag1', 'Tag2', 'Tag3']
}
```

### 4. Social Links
```javascript
{
  platform: 'Platform Name',
  url: 'https://...',
  icon: 'github' | 'linkedin' | 'email',
  ariaLabel: 'Accessibility label'
}
```

### 5. Experience, Education, Certifications
Follow the existing structure in the file.

## 🔄 How It Works

```
portfolioConfig.js (EDIT HERE)
        ↓
portfolioData.js (re-exports)
        ↓
All Components (auto-update)
```

## ✅ After Making Changes

1. Save `portfolioConfig.js`
2. The dev server will auto-reload
3. Check your browser - changes should appear immediately
4. If not, do a hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

## 📋 Common Tasks

### Add a New Skill
1. Open `src/config/portfolioConfig.js`
2. Find the `skills` array
3. Add your skill object to the appropriate orbit section
4. Save the file

### Update Your Photo
1. Place your image in `public/images/`
2. Update `personalInfo.profileImage` with the path
3. Example: `profileImage: '/images/your-photo.jpg'`

### Add a New Project
1. Add project image to `public/images/`
2. Add project object to `projects` array
3. Fill in all required fields

### Change Social Links
1. Find `socialLinks` array
2. Update URLs to your profiles
3. Add/remove platforms as needed

## 🎨 Skills View Modes

Users can toggle between two views:
- **Orbital View**: Skills orbit in 3D space (default)
- **List View**: Skills displayed in categorized lists with proficiency bars

The toggle switch appears at the top of the Technical Arsenal section.

## 🚨 Important Notes

- **DO NOT** edit `src/data/portfolioData.js` - it just re-exports from config
- **DO** edit `src/config/portfolioConfig.js` for all content changes
- Keep skill counts balanced (6 per orbit recommended)
- Use emojis for skill icons for best visual effect
- Test changes in both Orbital and List views

## 📁 File Structure

```
src/
├── config/
│   ├── portfolioConfig.js  ← EDIT THIS FILE
│   └── README.md           ← You are here
├── data/
│   └── portfolioData.js    ← Don't edit (re-exports only)
└── components/
    └── [All components use the config]
```

## 💡 Tips

1. **Proficiency Values**: Be honest - they show as percentage bars in List View
2. **Categories**: Keep consistent (AI/ML, Programming, Cloud, DevOps, etc.)
3. **Icons**: Use relevant emojis that represent each skill
4. **Orbit Balance**: Try to keep similar number of skills in each orbit
5. **Project Images**: Use consistent image sizes for best appearance

## 🐛 Troubleshooting

**Changes not appearing?**
- Hard refresh browser: `Ctrl + Shift + R`
- Check browser console for errors
- Verify JSON syntax is correct (commas, brackets, quotes)

**Skills not orbiting?**
- Check `orbitRadius` is 250, 300, or 350
- Check `orbitDuration` is 10, 15, or 20
- Verify all required fields are present

**Images not loading?**
- Verify image is in `public/images/` folder
- Check path starts with `/images/`
- Verify file name matches exactly (case-sensitive)

## 📞 Need Help?

If you encounter issues:
1. Check browser console for error messages
2. Verify your JSON syntax
3. Compare with existing entries in the config file
4. Make sure all required fields are filled

---

**Remember**: `src/config/portfolioConfig.js` is your single source of truth for all portfolio content!
