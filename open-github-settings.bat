@echo off
echo 🔧 Fixing GitHub Pages 404 Error
echo.
echo 📋 The issue: GitHub Pages is not enabled yet
echo.
echo ✅ Solution: Enable GitHub Pages in repository settings
echo.
echo 1. Go to: https://github.com/EyeAnton/SoulTemple/settings/pages
echo 2. Under "Source", select "Deploy from a branch"
echo 3. Select "main" branch and "/ (root)" folder
echo 4. Click "Save"
echo 5. Wait 2-3 minutes for deployment
echo.
echo 🎮 Your game will then be available at:
echo https://eyeanton.github.io/SoulTemple/
echo.
echo Press any key to open GitHub Pages settings...
pause >nul
start https://github.com/EyeAnton/SoulTemple/settings/pages

echo.
echo ✅ After enabling, wait 2-3 minutes and your game will be live!
pause
