$ProgressPreference='SilentlyContinue'

function ProcessHtmlContent($filePath, $url) {
    curl -o $filePath $url

    # Remap the cdn files to dist folder
    $content = Get-Content $filePath -Raw
    $content = $content -replace 'https://tumblrbobrumbly.pages.dev/', '../dist/'

    # Remove all script tags
    $pattern = '<script\b[^>]*>((?s).*?)<\/script>'
    $content = $content -replace $pattern, ''

    # Remove all noscript tags
    $pattern = '<noscript\b[^>]*>((?s).*?)<\/noscript>'
    $content = $content -replace $pattern, ''

    ## Remove all iframes
    $pattern = '<iframe\b[^>]*>((?s).*?)<\/iframe>'
    $content = $content -replace $pattern, ''

    # Readd app scripts
    $content = $content -replace '<!-- script -->', '<script src="../dist/app.js"></script>'

    Set-Content -Path $filePath -Value $content
}

# Process main page
ProcessHtmlContent 'tumblr/local.html' 'https://bobrumbly.com/'

# Process post page
ProcessHtmlContent 'tumblr/local-post.html' 'https://bobrumbly.com/post/770964072259895296/mario'