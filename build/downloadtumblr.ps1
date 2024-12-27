$ProgressPreference='SilentlyContinue'
curl -o tumblr/local.html https://bobrumbly.com/
(Get-Content tumblr/local.html) -replace 'https://tumblrbobrumbly.pages.dev/', '../dist/' | Set-Content tumblr/local.html