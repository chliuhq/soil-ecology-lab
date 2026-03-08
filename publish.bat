@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   Soil Ecology Lab - Publish Website
echo ========================================
echo.

cd /d "%~dp0soil-ecology-lab"

echo [1/3] Building content from Markdown...
call npm run content
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Content build failed.
    pause
    exit /b 1
)

echo.
echo [2/3] Building website...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Website build failed.
    pause
    exit /b 1
)

echo.
echo [3/3] Pushing to GitHub...
cd /d "%~dp0"
git add .
git commit -m "update %date%"
git push

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Git push failed. Check your network.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Done! Website will update shortly.
echo ========================================
echo.
pause

