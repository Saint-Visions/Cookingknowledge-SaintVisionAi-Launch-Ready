# 🚀 Deploy SaintVision AI to Render

## Quick Setup (2 Minutes)

### Step 1: Connect GitHub to Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New"** → **"Static Site"**
3. Connect your GitHub account
4. Select this repository

### Step 2: Configure Deployment
Render will automatically detect the `render.yaml` file. If not, use these settings:

**Build & Deploy Settings:**
- **Build Command**: `yarn install --frozen-lockfile && yarn build`
- **Publish Directory**: `./dist/spa`
- **Node Version**: `18` (or latest)

### Step 3: Environment Variables (Optional)
Add these in Render dashboard if needed:
- `NODE_ENV=production`
- `VITE_PUBLIC_BUILDER_KEY=2c553a9d8cf24e6eae81a4a63962c5a4`

### Step 4: Deploy
Click **"Create Static Site"** and Render will:
- ✅ Install dependencies with yarn
- ✅ Build the SPA
- ✅ Deploy to CDN
- ✅ Provide HTTPS domain

## What Gets Deployed

### ✅ Working Features:
- **Dashboard** - Dual AI system (GPT-4o + Azure)
- **War Room** - Sticky notes and dual AI chat
- **Console** - AI agent conversations
- **Homepage** - Marketing site with "Start Cookin'" CTA
- **Complete UI** - All pages and components

### ✅ Latest Code Includes:
- **Deepgram Integration** - Real-time voice transcription
- **Hybrid Speech Service** - Smart routing (Deepgram + Azure)
- **Voice Interface Components** - 3 modes (compact/full/floating)
- **Authentication System** - Demo access and OAuth
- **Enterprise Features** - Workstation, voice demo, test pages

## Deployment URLs

After deployment, you'll get:
- **Production URL**: `https://your-app-name.onrender.com`
- **Auto SSL/HTTPS** enabled
- **Global CDN** for fast loading
- **Custom domain** support available

## Key Routes

- `/` - Homepage with "Start Cookin'" button
- `/dashboard` - Main AI dashboard
- `/signin` - Authentication (with demo access)
- `/workspace/notes` - War Room dual AI chat
- `/console` - Agent conversations
- `/workstation` - Enterprise command center (latest code)
- `/voice-demo` - Deepgram voice showcase (latest code)
- `/direct` - Direct access page (latest code)

## Build Process

```bash
# What Render will run:
yarn install --frozen-lockfile  # Install dependencies
yarn build                      # Build SPA
# Deploy ./dist/spa to CDN
```

## Performance Optimizations

The `render.yaml` includes:
- **Asset caching** (1 year for /assets/*)
- **SPA routing** (/* → /index.html)
- **Optimized headers** (X-Robots-Tag, Cache-Control)
- **Production environment** variables

## Troubleshooting

### Build Fails?
- Check Node.js version (use 18+)
- Ensure `yarn.lock` exists
- Verify all dependencies install locally

### 404 Errors?
- SPA routing is configured in render.yaml
- All routes should redirect to /index.html

### Performance Issues?
- Assets are cached for 1 year
- Static files served from global CDN
- Gzipped automatically by Render

## Next Steps

1. **Deploy now** - Push to GitHub, connect to Render
2. **Custom domain** - Add your domain in Render settings
3. **Environment variables** - Add API keys for full functionality
4. **Monitoring** - Use Render's built-in analytics

## Full Feature Access

To get the complete Deepgram voice features:
1. Deploy the current code (this will work)
2. The latest voice features are in the codebase
3. After deployment, all routes will be accessible

**Ready to deploy!** 🚀
