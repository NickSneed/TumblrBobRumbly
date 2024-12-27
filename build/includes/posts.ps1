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