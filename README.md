# Space-Themed Portfolio

A modern, interactive portfolio website with a stunning space theme featuring 3D animations, particle effects, and smooth scrolling experiences.

## 🚀 Features

- **3D Space Environment**: Interactive starfield and black hole animations using Three.js
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Framer Motion powered transitions and effects
- **Performance Optimized**: Lazy loading, code splitting, and performance monitoring
- **Accessibility**: WCAG compliant with reduced motion support
- **Modern Stack**: Built with React 18 and Tailwind CSS

## 🛠️ Tech Stack

- React 18
- Three.js & React Three Fiber
- Framer Motion
- Tailwind CSS
- React Icons
- Intersection Observer API

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🌐 Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions on every push to the master branch.

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── 3D/         # Three.js components
│   │   ├── About/      # About section
│   │   ├── Contact/    # Contact section
│   │   ├── Experience/ # Experience section
│   │   ├── Projects/   # Projects section
│   │   └── Skills/     # Skills section
│   ├── config/         # Configuration files
│   ├── data/           # Portfolio data
│   ├── hooks/          # Custom React hooks
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
└── .github/workflows/  # GitHub Actions
```

## ⚙️ Configuration

Edit `src/config/portfolioConfig.js` to customize:
- Personal information
- Social media links
- Contact details
- Feature flags

Edit `src/data/portfolioData.js` to update:
- Projects
- Skills
- Experience
- Achievements

## 🎨 Customization

The portfolio uses a space theme with customizable colors in `tailwind.config.js`:
- Primary colors: Purple/blue gradients
- Accent colors: Cyan/pink
- Background: Deep space blacks

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ and ☕
