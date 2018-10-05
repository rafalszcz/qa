﻿#################
# Configuration #
#################
$cdnSite = "http://sppdev4.cn.in.pekao.com.pl" # => CDN SharePoint site
$cdnLib = "Documents/qa" # => Document library and eventual folders
#######
# End #
#######

Write-Host ************************************************************************************** -ForegroundColor Yellow
Write-Host * Reading the cdnBasePath from write-manifests.json and collectiong the bundle files * -ForegroundColor Yellow
Write-Host ************************************************************************************** -ForegroundColor Yellow
$cdnConfig = Get-Content -Raw -Path .\config\copy-assets.json | ConvertFrom-Json
$bundlePath = Convert-Path $cdnConfig.deployCdnPath
$files = Get-ChildItem $bundlePath\*.*

Write-Host **************************************** -ForegroundColor Yellow
Write-Host Uploading the bundle on Office 365 CDN * -ForegroundColor Yellow
Write-Host **************************************** -ForegroundColor Yellow
Connect-PnPOnline $cdnSite -Credentials giuleon
foreach ($file in $files) {
    $fullPath = $file.DirectoryName + "\" + $file.Name
    Add-PnPFile -Path $fullPath -Folder $cdnLib
}
