$basePath = "$PSScriptRoot/public/images"

# Create image directory if it doesn't exist
$directories = @("before-after", "services", "hero")
foreach ($dir in $directories) {
    $fullPath = Join-Path $basePath $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Force -Path $fullPath | Out-Null
    }
}

# Download hero image
$heroUrl = "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg"
$heroPath = Join-Path $basePath "hero/cleaning-hero.jpg"
Invoke-WebRequest -Uri $heroUrl -OutFile $heroPath

# Download before/after images
$images = @(
    @{
        url = "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg"
        name = "kitchen-before.jpg"
        type = "before-after"
    },
    @{
        url = "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg"
        name = "kitchen-after.jpg"
        type = "before-after"
    },
    @{
        url = "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg"
        name = "carpet-before.jpg"
        type = "before-after"
    },
    @{
        url = "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg"
        name = "carpet-after.jpg"
        type = "before-after"
    }
)

foreach ($img in $images) {
    $savePath = Join-Path $basePath "$($img.type)\$($img.name)"
    Invoke-WebRequest -Uri $img.url -OutFile $savePath
    Write-Host "Downloaded $($img.name)"
}

Write-Host "\nAll images downloaded successfully!"
