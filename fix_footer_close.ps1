$files = Get-ChildItem . -Filter *.html

foreach ($file in $files) {
    if ($file.Name -eq "index.html" -or $file.Name -eq "about.html" -or $file.Name -eq "service.html" -or $file.Name -eq "contact.html" -or $file.Name -eq "project.html") {
        Write-Host "Skipping $($file.Name) (Already done)"
        continue
    }

    $content = Get-Content $file.FullName -Raw
    
    # Regex to find the last div before back-to-top and replace with footer
    # looking for </div> followed by whitespace and then the back-to-top link
    $pattern = '</div>(\s*<a href="#" class="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top">)'
    
    if ($content -match $pattern) {
        $cleanName = $file.Name
        Write-Host "Fixing $cleanName..."
        $newContent = $content -replace $pattern, '</footer>
    <!-- Footer End -->$1'
        
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
    }
    else {
        Write-Host "Pattern not found in $($file.Name)"
    }
}
