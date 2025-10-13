# School of Alpasca - Landing Page

A modern, minimalistic landing page for the School of Alpasca featuring smooth animations, water-themed design, and responsive layout.

## 🌐 Live Demo

Visit the live website: [https://artgolwebdev.github.io/science-school/](https://artgolwebdev.github.io/science-school/)

## ✨ Features

- **Water Drop Loading Animation** - Beautiful drop-into-water intro animation
- **Fixed Translucent Navbar** - Smooth scroll navigation with active section indicators
- **Hero Section** - Video background with static quote and typing animation
- **Responsive Design** - Optimized for all devices
- **Smooth Animations** - Fade-in effects and hover animations throughout
- **GitHub Pages Ready** - Automated deployment with GitHub Actions

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. Fork this repository
2. Go to Settings → Pages
3. Select "GitHub Actions" as source
4. The site will be automatically deployed

### Option 2: Local Development (XAMPP)

1. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start Apache server

2. **Place Files**
   - Copy all project files to `C:\xampp\htdocs\spirit-science\`
   - Ensure `bg-video.mp4` is in the root directory

3. **Access Website**
   - Open browser and navigate to `http://localhost/spirit-science/`
   - The landing page should load with the water drop animation

## 📁 File Structure
```
spirit-science/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles
├── script.js               # JavaScript functionality
├── bg-video.mp4            # Hero section background video
├── logo.png                # School logo
├── .gitignore              # Git ignore file
├── .github/
│   └── workflows/
│       └── pages.yml       # GitHub Pages workflow
└── README.md               # This file
```

## 🛠️ GitHub Setup Commands

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "first commit"

# Set main branch
git branch -M main

# Add remote origin
git remote add origin https://github.com/artgolwebdev/science-school.git

# Push to GitHub
git push -u origin main
```

## 🌐 GitHub Pages Deployment

This repository is configured for automatic GitHub Pages deployment:

1. **Automatic Deployment**: Every push to the `main` branch triggers a deployment
2. **Live URL**: `https://artgolwebdev.github.io/science-school/`
3. **Custom Domain**: Can be configured in repository settings

### Manual GitHub Pages Setup:
1. Go to repository Settings
2. Navigate to Pages section
3. Select "GitHub Actions" as source
4. The workflow will automatically deploy your site

## 🎨 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📝 Notes

- The background video (`bg-video.mp4`) should be a looping video of water surface or ripples
- All animations are CSS-based for optimal performance
- The site is fully responsive and works on mobile devices
- Form submissions are currently simulated (no backend integration)
- GitHub Pages deployment is automated via GitHub Actions

## 🎨 Customization

- Colors can be modified in the CSS variables section
- Typography uses Google Fonts (Inter and Playfair Display)
- All animations can be adjusted in the CSS animation properties
- GitHub Pages workflow can be customized in `.github/workflows/pages.yml`

## 📱 Mobile Optimization

- Touch-friendly navigation
- Optimized animations for mobile performance
- Responsive video backgrounds
- Mobile-first design approach

## 🔧 Development

### Local Development Server
```bash
# Using Python (if available)
python -m http.server 8000

# Using Node.js (if available)
npx serve .

# Using PHP (if available)
php -S localhost:8000
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
