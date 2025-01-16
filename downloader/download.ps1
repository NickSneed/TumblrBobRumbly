. "$PSScriptRoot/includes/config.ps1"
. "$PSScriptRoot/includes/posts.ps1"
. "$PSScriptRoot/includes/processhtml.ps1"

# Check if the folder exists
if (Test-Path $maindir) {
    Remove-Item "$maindir\*" -Recurse -Force
    Write-Host "Emptied the folder: $maindir"
} else {
    Write-Host "The folder does not exist: $maindir"
}

# Process main page
$localHomeFilePath = $maindir + '/' + $homename  + '.html'
ProcessHtmlContent $localHomeFilePath $domain

# Get an array of post links
$linkArr = GetPostLinksArr $localHomeFilePath

# Process post pages
foreach ($link in $linkArr) {
    $postID = GetPostID($link);
    $localFilePath = $maindir + '/' + $postID + '.html'
    ProcessHtmlContent $localFilePath $link
}

# Replace post links
ReplacePostLinks $localHomeFilePath

# Load the home page
$filePath = $maindir + '/' + $homename + '.html'
Start-Process $filePath