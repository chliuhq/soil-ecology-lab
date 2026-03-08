# 土壤生态课题组网站 - 一键发布脚本
# 用法：在项目根目录运行  .\publish.ps1
#       或在 soil-ecology-lab 目录运行  ..\publish.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  土壤生态课题组网站 - 一键发布" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 进入项目目录
Set-Location "$root\soil-ecology-lab"

# 步骤 1：生成数据
Write-Host "[1/3] 正在从 Markdown 生成网站数据..." -ForegroundColor Yellow
try {
    node scripts/build-content.js
} catch {
    Write-Host "数据生成失败，请检查 Markdown 文件格式" -ForegroundColor Red
    Set-Location $root
    exit 1
}

# 步骤 2：构建网站
Write-Host ""
Write-Host "[2/3] 正在构建网站..." -ForegroundColor Yellow
try {
    npx next build
} catch {
    Write-Host "网站构建失败，请检查错误信息" -ForegroundColor Red
    Set-Location $root
    exit 1
}

# 步骤 3：Git 提交推送
Write-Host ""
Write-Host "[3/3] 正在提交并推送到 GitHub..." -ForegroundColor Yellow
Set-Location $root
git add .
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "更新网站内容 $timestamp"
git push

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git 推送失败，请检查网络连接" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  发布完成！网站将在几分钟后更新" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

