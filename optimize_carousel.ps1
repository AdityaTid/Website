
# Carousel Resizing Script
$images = @(
    "img\carousel-1.jpg",
    "img\carousel-2.jpg",
    "img\carousel-3.jpg"
)

Add-Type -AssemblyName System.Drawing

foreach ($imgName in $images) {
    $path = Join-Path (Get-Location) $imgName
    if (Test-Path $path) {
        Write-Host "Processing $imgName..."
        try {
            $image = [System.Drawing.Image]::FromFile($path)
            
            # Target width 1920px for HD banners
            $newWidth = 1920
            
            # Retrieve dimensions before calculation to avoid access error if we dispose too early
            $origW = $image.Width
            $origH = $image.Height
            
            if ($origW -gt $newWidth) {
                $newHeight = [int]($origH * ($newWidth / $origW))
            }
            else {
                # Don't upscale if smaller, but we might want to standardize
                # For this task, we mainly want to shrink the big one.
                # Let's just keep original if it's smaller than 1920
                $newWidth = $origW
                $newHeight = $origH
            }

            $bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $graph = [System.Drawing.Graphics]::FromImage($bitmap)
            $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graph.DrawImage($image, 0, 0, $newWidth, $newHeight)
            
            $image.Dispose() # Release original file handle
            
            # Encoder parameters for JPEG quality
            $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]80)
            
            $bitmap.Save($path, $codec, $encoderParams)
            $bitmap.Dispose()
            $graph.Dispose()
            
            Write-Host "Optimized $imgName ($newWidth x $newHeight)"
        }
        catch {
            Write-Error "Failed to resize $imgName : $_"
        }
    }
    else {
        Write-Warning "File not found: $imgName"
    }
}
