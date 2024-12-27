$ProgressPreference='SilentlyContinue'
curl -o tumblr/local.html https://bobrumbly.com/

# Remap the cdn files to dist folder
$content = Get-Content tumblr/local.html -Raw
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

Set-Content -Path tumblr/local.html -Value $content


curl -o tumblr/local-post.html https://bobrumbly.com/post/770964072259895296/mario

# Remap the cdn files to dist folder
$content = Get-Content tumblr/local-post.html -Raw
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

Set-Content -Path tumblr/local-post.html -Value $content
