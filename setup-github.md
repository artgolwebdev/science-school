# GitHub Setup Guide

## 🚀 Complete Setup Commands

Run these commands in your project directory to set up the GitHub repository:

```bash
# 1. Initialize Git repository
git init

# 2. Add all files to staging
git add .

# 3. Create initial commit
git commit -m "first commit"

# 4. Set main branch
git branch -M main

# 5. Add remote origin
git remote add origin https://github.com/artgolwebdev/science-school.git

# 6. Push to GitHub
git push -u origin main
```

## 📋 Pre-Setup Checklist

Before running the commands, ensure you have:

- [ ] All project files in the directory
- [ ] `.gitignore` file created
- [ ] GitHub repository created at `https://github.com/artgolwebdev/science-school.git`
- [ ] Git configured with your credentials

## 🔧 GitHub Pages Configuration

After pushing to GitHub:

1. **Go to Repository Settings**
   - Navigate to `https://github.com/artgolwebdev/science-school/settings`

2. **Configure Pages**
   - Go to "Pages" section in the left sidebar
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy your site

3. **Access Your Site**
   - Your site will be available at: `https://artgolwebdev.github.io/science-school/`
   - It may take a few minutes for the first deployment

## 🛠️ Troubleshooting

### If you get authentication errors:
```bash
# Configure Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### If remote already exists:
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/artgolwebdev/science-school.git
```

### If you need to force push:
```bash
# Force push (use with caution)
git push -f origin main
```

## 📁 Project Structure After Setup

```
spirit-science/
├── .git/                    # Git repository data
├── .github/
│   └── workflows/
│       └── pages.yml        # GitHub Pages workflow
├── .gitignore              # Git ignore file
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── script.js               # JavaScript
├── bg-video.mp4            # Background video
├── logo.png                # School logo
├── README.md               # Project documentation
└── setup-github.md         # This setup guide
```

## ✅ Verification Steps

After setup, verify:

1. **Repository**: Check `https://github.com/artgolwebdev/science-school`
2. **Pages**: Go to Settings → Pages to see deployment status
3. **Live Site**: Visit `https://artgolwebdev.github.io/science-school/`
4. **Workflow**: Check Actions tab for deployment status

## 🔄 Future Updates

To update your site:

```bash
# Make changes to your files
# Then commit and push
git add .
git commit -m "Update website content"
git push origin main
```

The GitHub Actions workflow will automatically redeploy your site.
