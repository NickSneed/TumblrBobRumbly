$ProgressPreference='SilentlyContinue'

$domain = 'https://bobrumbly.com/'
$postLinksRegex = 'https:\/\/bobrumbly\.com\/post\/.*?"'
$cdnUrl = 'https://tumblrbobrumbly.pages.dev/'
$distPath = '../dist/'

function GetPostLinksArr($filePath) {

    # Get the content of the file
    $content = Get-Content $filePath -Raw

    # Find all the post links and return it as an array
    $hrefSet = New-Object System.Collections.Generic.HashSet[string]
    $matches = [regex]::Matches($content, $postLinksRegex)
    foreach ($match in $matches) {
        $href = $match.Value -replace '"', ''
        $hrefSet.Add($href) | Out-Null
    }
    return @($hrefSet)
}

function GetPostID($url) {

    # Regex pattern to match the post id
    $pattern = '\d+.*?';

    # If there is a match return the post id
    if ($url -match $pattern) {
        return $($matches[0])
    } else {
        return ''
    }
}

function ReplacePostLinks($filePath) {

    # Get the content of the file
    $content = Get-Content $filePath -Raw

    # Find all the post links and replace it with the new link
    $matches = [regex]::Matches($content, $postLinksRegex)
    foreach ($match in $matches) {
        $oldlink = $match.Value -replace '"', ''
        $newlink = GetPostID $match.Value
        $newlink = $newlink + '.html'
        $content = $content -replace $oldlink, $newlink
    }

    # Write to the file
    Set-Content -Path $filePath -Value $content
}

function ProcessHtmlContent($filePath, $url) {
    curl -o $filePath $url

    # Remap the cdn files to dist folder
    $content = Get-Content $filePath -Raw
    $content = $content -replace $cdnUrl, $distPath

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

    # Write to the file
    Set-Content -Path $filePath -Value $content

    # Logging
    Write-Host "Processing complete: $filePath"
}

# Define the path to the local folder
$localFolderPath = "local"

# Check if the folder exists
if (Test-Path $localFolderPath) {
    Remove-Item "$localFolderPath\*" -Recurse -Force
    Write-Host "Emptied the folder: $localFolderPath"
} else {
    Write-Host "The folder does not exist: $localFolderPath"
}

# Process main page
ProcessHtmlContent 'local/home.html' $domain

# Get an array of post links
$linkArr = GetPostLinksArr 'local/home.html'

# Process post pages
foreach ($link in $linkArr) {
    $postID = GetPostID($link);
    $localFilePath = 'local/' + $postID + '.html'
    ProcessHtmlContent $localFilePath $link
}

# Replace post links
ReplacePostLinks 'local/home.html'