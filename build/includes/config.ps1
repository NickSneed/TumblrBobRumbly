# Domain to download
[Diagnostics.CodeAnalysis.SuppressMessageAttribute("PSUseDeclaredVarsMoreThanAssignments", "")]
$domain = 'https://bobrumbly.com/'

# Regex for the post links
[Diagnostics.CodeAnalysis.SuppressMessageAttribute("PSUseDeclaredVarsMoreThanAssignments", "")]
$postLinksRegex = 'https:\/\/bobrumbly\.com\/post\/.*?"'

# Directory where files will be downloaded
[Diagnostics.CodeAnalysis.SuppressMessageAttribute("PSUseDeclaredVarsMoreThanAssignments", "")]
$maindir = 'local'

# Name of the home page file after download
[Diagnostics.CodeAnalysis.SuppressMessageAttribute("PSUseDeclaredVarsMoreThanAssignments", "")]
$homename = 'index'

# $prodCdnUrl gets replaced with $localStaticFilesPath
[Diagnostics.CodeAnalysis.SuppressMessageAttribute("PSUseDeclaredVarsMoreThanAssignments", "")]
$prodCdnUrl = 'https://tumblrbobrumbly.pages.dev/'
[Diagnostics.CodeAnalysis.SuppressMessageAttribute("PSUseDeclaredVarsMoreThanAssignments", "")]
$localStaticFilesPath = '../dist/'