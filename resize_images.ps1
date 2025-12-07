
# Image Resizing Script
$images = @(
    "img\centralAC.jpg",
    "img\dustable_ac.jpg",
    "img\cold_water.jpg",
    "img\cold_storage.jpg",
    "img\ventilation.jpg",
    "img\pressuriation.jpg",
    "img\lift.jpg"
)

Add-Type -AssemblyName System.Drawing

foreach ($imgName in $images) {
    $path = Join-Path (Get-Location) $imgName
    if (Test-Path $path) {
        Write-Host "Processing $imgName..."
        try {
            $image = [System.Drawing.Image]::FromFile($path)
            
            # Target width 800px (sufficient for service cards)
            $newWidth = 800
            $newHeight = [int]($image.Height * ($newWidth / $image.Width))
            
            $bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $graph = [System.Drawing.Graphics]::FromImage($bitmap)
            $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graph.DrawImage($image, 0, 0, $newWidth, $newHeight)
            
            $image.Dispose() # Release original file handle
            
            # Encoder parameters for JPEG quality
            $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]75)
            
            $bitmap.Save($path, $codec, $encoderParams)
            $bitmap.Dispose()
            $graph.Dispose()
            
            Write-Host "Resized $imgName"
        }
        catch {
            Write-Error "Failed to resize $imgName : $_"
        }
    } else {
        Write-Warning "File not found: $imgName"
    }
}
