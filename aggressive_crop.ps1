Add-Type -AssemblyName System.Drawing
$srcImg = New-Object System.Drawing.Bitmap("C:\Users\Henna\Documents\frontend\public\logo.png")

$minX = $srcImg.Width; $minY = $srcImg.Height; $maxX = 0; $maxY = 0;

for ($y = 0; $y -lt $srcImg.Height; $y++) {
    for ($x = 0; $x -lt $srcImg.Width; $x++) {
        $p = $srcImg.GetPixel($x, $y)
        if ($p.R -lt 235 -or $p.G -lt 235 -or $p.B -lt 235) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$w = $maxX - $minX + 1
$h = $maxY - $minY + 1
$size = [math]::Max($w, $h)
$offsetX = [math]::Floor(($size - $w) / 2)
$offsetY = [math]::Floor(($size - $h) / 2)

$destImg = New-Object System.Drawing.Bitmap($size, $size)

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $p = $srcImg.GetPixel($minX + $x, $minY + $y)
        if ($p.R -gt 240 -and $p.G -gt 240 -and $p.B -gt 240) {
            $destImg.SetPixel($offsetX + $x, $offsetY + $y, [System.Drawing.Color]::Transparent)
        } else {
            # Make the anti-aliased edge slightly semi-transparent based on lightness to prevent jagged edges
            if ($p.R -gt 210 -and $p.G -gt 210 -and $p.B -gt 210) {
                $alpha = 255 - ($p.R)
                $newColor = [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B)
                $destImg.SetPixel($offsetX + $x, $offsetY + $y, $newColor)
            } else {
                $destImg.SetPixel($offsetX + $x, $offsetY + $y, $p)
            }
        }
    }
}

$srcImg.Dispose()
$destImg.Save("C:\Users\Henna\Documents\frontend\public\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$destImg.Dispose()
