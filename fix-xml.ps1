# Fix corrupted XML tags in pom.xml files
Get-ChildItem -Path "backend" -Filter "pom.xml" -Recurse | ForEach-Object {
    Write-Host "Fixing $($_.FullName)"
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace '<n>', '<name>'
    $content = $content -replace '</n>', '</name>'
    Set-Content $_.FullName -Value $content -NoNewline
}
Write-Host "XML fixes complete"