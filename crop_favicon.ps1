Add-Type -AssemblyName System.Drawing
$img = New-Object System.Drawing.Bitmap("C:\Users\Henna\Documents\frontend\public\favicon.png")

$minX = $img.Width
$minY = $img.Height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $img.Height; $y++) {
    for ($x = 0; $x -lt $img.Width; $x++) {
        $pixel = $img.GetPixel($x, $y)
        if ($pixel.A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$rect = New-Object System.Drawing.Rectangle($minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1))
$cropped = $img.Clone($rect, $img.PixelFormat)

$img.Dispose()
$cropped.Save("C:\Users\Henna\Documents\frontend\public\favicon_cropped.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()

Remove-Item "C:\Users\Henna\Documents\frontend\public\favicon.png" -Force
Rename-Item "C:\Users\Henna\Documents\frontend\public\favicon_cropped.png" "favicon.png"
