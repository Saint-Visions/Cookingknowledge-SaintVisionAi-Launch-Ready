# SaintVision AI - Render Deployment Guide

## Overview
This project is configured for deployment on Render.com as a static site. The `render.yaml` file contains all necessary configuration.

## Deployment Steps

### 1. Connect Repository
1. Sign up/login to [Render.com](https://render.com)
2. Click "New" → "Static Site"
3. Connect your GitHub repository

### 2. Configuration
The deployment will automatically use the `render.yaml` configuration:

- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `./dist/spa`
- **Node Version**: Latest LTS
- **Auto-Deploy**: Enabled on `main` branch

### 3. Environment Variables (Optional)
If you need environment variables, add them in the Render dashboard:
- `NODE_ENV=production`
- Add any API keys or secrets as needed

### 4. Custom Domain (Optional)
After deployment, you can add a custom domain in the Render dashboard under "Settings" → "Custom Domains".

## Project Structure
```
├── render.yaml          # Render deployment configuration
├── _redirects           # SPA routing configuration
├── dist/spa/           # Built static files (after npm run build)
├── client/             # React source code
└── package.json        # Dependencies and scripts
```

## Features Deployed
- ✅ SPA with React Router
- ✅ Enterprise Command Center (Workstation)
- ✅ AI Dashboard & Dual AI Chat
- ✅ Complete UI with all pages
- ✅ Mobile responsive design
- ✅ SEO optimized

## Routes Available
- `/` - Homepage
- `/dashboard` - AI Dashboard
- `/workstation` - Enterprise Command Center
- `/workspace/notes` - War Room (Dual AI)
- `/pricing` - Pricing page
- `/signin` - Authentication
- And all other configured routes

## Support
- Build logs available in Render dashboard
- Static assets served from CDN
- Automatic HTTPS enabled
- Global CDN for fast loading

## Performance
- Build time: ~3 minutes
- Bundle size: ~257KB (gzipped)
- CSS size: ~18KB (gzipped)
- All modern optimizations enabled
