function ProcessHtmlContent($filePath, $url) {
    Invoke-WebRequest -o $filePath $url

    # Remap the cdn files to dist folder
    $content = Get-Content $filePath -Raw
    $content = $content -replace $prodCdnUrl, $localStaticFilesPath

    # Remove all non-CDN script tags
    $pattern = '<script\b(?![^>]*src="' + $localStaticFilesPath + ')[^>]*>((?s).*?)<\/script>'
    $content = $content -replace $pattern, ''

    # Remove all noscript tags
    $pattern = '<noscript\b[^>]*>((?s).*?)<\/noscript>'
    $content = $content -replace $pattern, ''

    # Remove all iframes
    $pattern = '<iframe\b[^>]*>((?s).*?)<\/iframe>'
    $content = $content -replace $pattern, ''

    # Re-add app scripts
    $content = $content -replace '<!-- script -->', '<script src="../dist/app.js"></script>'

    # Replace home links
    $pattern = 'href="\/"'
    $homeLink = 'href="' + $homename + '.html"'
    $content = $content -replace $pattern, $homeLink

    # Write to the file
    Set-Content -Path $filePath -Value $content

    # Logging
    Write-Host "Processing complete: $filePath"
}