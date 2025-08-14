#!/bin/bash

echo "🚀 Deploying SaintVision AI to Render..."

# Check if yarn is available
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn not found. Using npm instead..."
    npm install
    npm run build
else
    echo "✅ Using Yarn for deployment"
    yarn install --frozen-lockfile
    yarn build
fi

echo "✅ Build complete! Files ready in ./dist/spa"
echo ""
echo "📁 Built files:"
ls -la dist/spa/

echo ""
echo "🌐 Next steps:"
echo "1. Push this code to your GitHub repository"
echo "2. Go to render.com and create a new Static Site"
echo "3. Connect your GitHub repo"
echo "4. Render will automatically use render.yaml configuration"
echo ""
echo "📋 Quick Render Setup:"
echo "- Build Command: yarn install --frozen-lockfile && yarn build"
echo "- Publish Directory: ./dist/spa" 
echo "- Environment: Static Site"
echo ""
echo "🎯 Your app will be live at: https://your-app-name.onrender.com"
echo ""
echo "🚀 Ready to deploy!"
