$ProgressPreference='SilentlyContinue'

function GetPostLinks($filePath) {
    $content = Get-Content $filePath -Raw
    $hrefSet = New-Object System.Collections.Generic.HashSet[string]

    $pattern = 'https:\/\/bobrumbly\.com\/post\/(.*?)"'
    $matches = [regex]::Matches($content, $pattern)
    foreach ($match in $matches) {
        $href = $match.Value -replace '"', ''
        $hrefSet.Add($href) | Out-Null
    }
    return @($hrefSet)
}

function GetPostID($url) {
    $pattern = '\d+.*?';
    if ($url -match $pattern) {
        return $($matches[0])
    } else {
        return ''
    }
}

function ReplacePostLinks($content) {
    $pattern = 'https:\/\/bobrumbly\.com\/post\/.*?"'
    $matches = [regex]::Matches($content, $pattern)
    foreach ($match in $matches) {
        $oldlink = $match.Value -replace '"', ''
        $newlink = GetPostID $match.Value
        $newlink = $newlink + '.html'
        $content = $content -replace $oldlink, $newlink
    }
    return $content
}

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

    # Re-add app scripts
    $content = $content -replace '<!-- script -->', '<script src="../dist/app.js"></script>'

    # Replace home links
    $pattern = 'href="\/"'
    $content = $content -replace $pattern, 'href="home.html"'

    Set-Content -Path $filePath -Value $content
}

# Define the path to the local folder
$localFolderPath = "local"

# Check if the folder exists
if (Test-Path $localFolderPath) {
    # Remove all files and subdirectories within the folder
    Remove-Item "$localFolderPath\*" -Recurse -Force
    Write-Host "Emptied the local folder: $localFolderPath"
} else {
    Write-Host "The folder does not exist: $localFolderPath"
}

# Process main page
ProcessHtmlContent 'local/home.html' 'https://bobrumbly.com/'

# Process post pages
$linkArr = GetPostLinks 'local/home.html'
foreach ($link in $linkArr) {
    $postID = GetPostID($link);
    $localFilePath = 'local/' + $postID + '.html'
    ProcessHtmlContent $localFilePath $link
}

# Replace post links
ReplacePostLinks 'local/home.html'