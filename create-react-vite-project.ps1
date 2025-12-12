
$projectName = Read-Host "React+Vite project name: "

Write-Output "Project Name: $projectName"

# npm 7+, extra double-dash is needed:
npm create vite@latest $projectName -- --template react