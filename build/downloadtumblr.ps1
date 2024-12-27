. "$PSScriptRoot/includes/config.ps1"
. "$PSScriptRoot/includes/posts.ps1"
. "$PSScriptRoot/includes/processhtml.ps1"

$ProgressPreference='SilentlyContinue'

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