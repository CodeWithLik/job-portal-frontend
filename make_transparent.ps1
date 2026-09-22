Add-Type -AssemblyName System.Drawing
$img = New-Object System.Drawing.Bitmap("C:\Users\Henna\Documents\frontend\public\logo.png")
$white = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
$img.MakeTransparent($white)
$img.Save("C:\Users\Henna\Documents\frontend\public\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
