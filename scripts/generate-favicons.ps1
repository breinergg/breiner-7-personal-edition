Add-Type -AssemblyName System.Drawing

function Draw-Tile {
    param(
        [System.Drawing.Graphics]$Graphics,
        [int]$X, [int]$Y, [int]$Size,
        [System.Drawing.Color]$TopColor,
        [System.Drawing.Color]$BottomColor,
        [string]$Text
    )

    $rect = New-Object System.Drawing.Rectangle $X, $Y, $Size, $Size
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $rect,
        $TopColor,
        $BottomColor,
        [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
    )
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $radius = [Math]::Max(1.0, $Size * 0.16)
    $path.AddArc($X, $Y, $radius * 2, $radius * 2, 180, 90)
    $path.AddArc($X + $Size - $radius * 2, $Y, $radius * 2, $radius * 2, 270, 90)
    $path.AddArc($X + $Size - $radius * 2, $Y + $Size - $radius * 2, $radius * 2, $radius * 2, 0, 90)
    $path.AddArc($X, $Y + $Size - $radius * 2, $radius * 2, $radius * 2, 90, 90)
    $path.CloseFigure()
    $Graphics.FillPath($brush, $path)

    $fontSize = [Math]::Max(5.0, $Size * 0.62)
    $font = [System.Drawing.Font]::new('Segoe UI', $fontSize, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $textRect = New-Object System.Drawing.RectangleF ($X), ($Y + 1), ($Size), ($Size)
    $Graphics.DrawString($Text, $font, [System.Drawing.Brushes]::White, $textRect, $format)

    $brush.Dispose()
    $path.Dispose()
    $font.Dispose()
    $format.Dispose()
}

function New-Bgm7Bitmap {
    param([int]$Size)

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.Clear([System.Drawing.Color]::Transparent)

    $gap = [Math]::Max(1, [int]($Size * 0.05))
    $tile = [int](($Size - $gap) / 2)

    Draw-Tile $g 0 0 $tile ([System.Drawing.Color]::FromArgb(255, 239, 56, 72)) ([System.Drawing.Color]::FromArgb(255, 200, 24, 40)) 'B'
    Draw-Tile $g ($tile + $gap) 0 $tile ([System.Drawing.Color]::FromArgb(255, 58, 158, 240)) ([System.Drawing.Color]::FromArgb(255, 16, 112, 200)) 'G'
    Draw-Tile $g 0 ($tile + $gap) $tile ([System.Drawing.Color]::FromArgb(255, 80, 80, 80)) ([System.Drawing.Color]::FromArgb(255, 44, 44, 44)) 'M'
    Draw-Tile $g ($tile + $gap) ($tile + $gap) $tile ([System.Drawing.Color]::FromArgb(255, 192, 192, 192)) ([System.Drawing.Color]::FromArgb(255, 138, 138, 138)) '7'

    $g.Dispose()
    return $bmp
}

function New-PdfFaviconBitmap {
    param([int]$Size)

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.Clear([System.Drawing.Color]::Transparent)

    $scale = $Size / 32.0
    function ToScale([double]$Value) { return [int][Math]::Round($Value * $scale) }

    $pagePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 176, 176, 176)), ([Math]::Max(1.0, 0.5 * $scale))
    $pageBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Rectangle (ToScale 7), (ToScale 4), (ToScale 17), (ToScale 24)),
        [System.Drawing.Color]::White,
        [System.Drawing.Color]::FromArgb(255, 236, 236, 236),
        [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
    )

    $pagePath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $pagePath.AddLine((ToScale 7), (ToScale 4), (ToScale 20), (ToScale 4))
    $pagePath.AddLine((ToScale 20), (ToScale 4), (ToScale 24), (ToScale 8))
    $pagePath.AddLine((ToScale 24), (ToScale 8), (ToScale 24), (ToScale 28))
    $pagePath.AddLine((ToScale 24), (ToScale 28), (ToScale 7), (ToScale 28))
    $pagePath.CloseFigure()
    $g.FillPath($pageBrush, $pagePath)
    $g.DrawPath($pagePen, $pagePath)

    $foldBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 200, 200, 200))
    $foldPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $foldPath.AddPolygon(@(
        (New-Object System.Drawing.Point (ToScale 20), (ToScale 4)),
        (New-Object System.Drawing.Point (ToScale 24), (ToScale 8)),
        (New-Object System.Drawing.Point (ToScale 20), (ToScale 8))
    ))
    $g.FillPath($foldBrush, $foldPath)
    $g.DrawLine($pagePen, (ToScale 20), (ToScale 4), (ToScale 24), (ToScale 8))
    $g.DrawLine($pagePen, (ToScale 20), (ToScale 4), (ToScale 20), (ToScale 8))

    $bannerRect = New-Object System.Drawing.Rectangle (ToScale 4.5), (ToScale 6), (ToScale 14), (ToScale 6)
    $bannerBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $bannerRect,
        [System.Drawing.Color]::FromArgb(255, 255, 85, 85),
        [System.Drawing.Color]::FromArgb(255, 196, 16, 16),
        [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
    )
    $g.FillRectangle($bannerBrush, $bannerRect)
    $g.DrawRectangle($pagePen, $bannerRect)

    $fontSize = [Math]::Max(4.5, 4.5 * $scale)
    $font = [System.Drawing.Font]::new('Segoe UI', $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $textRect = New-Object System.Drawing.RectangleF (ToScale 4.5), (ToScale 6), (ToScale 14), (ToScale 6)
    $g.DrawString('PDF', $font, [System.Drawing.Brushes]::White, $textRect, $format)

    $trianglePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 235, 6, 0)), ([Math]::Max(1.0, 1.0 * $scale))
    $trianglePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $triangle = @(
        (New-Object System.Drawing.Point (ToScale 15.5), (ToScale 13.5)),
        (New-Object System.Drawing.Point (ToScale 20.5), (ToScale 22.5)),
        (New-Object System.Drawing.Point (ToScale 10.5), (ToScale 22.5))
    )
    $g.DrawPolygon($trianglePen, $triangle)

    $pagePen.Dispose()
    $pageBrush.Dispose()
    $pagePath.Dispose()
    $foldBrush.Dispose()
    $foldPath.Dispose()
    $bannerBrush.Dispose()
    $font.Dispose()
    $format.Dispose()
    $trianglePen.Dispose()
    $g.Dispose()

    return $bmp
}

function Save-Icon {
    param(
        [System.Drawing.Bitmap]$Bitmap32,
        [string]$IcoPath
    )

    $iconHandle = $Bitmap32.GetHicon()
    $icon = [System.Drawing.Icon]::FromHandle($iconHandle)
    $stream = New-Object System.IO.FileStream $IcoPath, ([System.IO.FileMode]::Create)
    $icon.Save($stream)
    $stream.Close()
    $icon.Dispose()
}

$root = Split-Path -Parent $PSScriptRoot
$public = Join-Path $root 'public'
$hv = Join-Path $public 'hv'

if (-not (Test-Path $hv)) {
    New-Item -ItemType Directory -Path $hv | Out-Null
}

$bgm7_32 = New-Bgm7Bitmap 32
$bgm7_32.Save((Join-Path $public 'favicon-32.png'), [System.Drawing.Imaging.ImageFormat]::Png)
Save-Icon $bgm7_32 (Join-Path $public 'favicon.ico')

$bgm7_180 = New-Bgm7Bitmap 180
$bgm7_180.Save((Join-Path $public 'apple-touch-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)

$pdf_32 = New-PdfFaviconBitmap 32
$pdf_32.Save((Join-Path $hv 'favicon-32.png'), [System.Drawing.Imaging.ImageFormat]::Png)
Save-Icon $pdf_32 (Join-Path $hv 'favicon.ico')

$bgm7_32.Dispose()
$bgm7_180.Dispose()
$pdf_32.Dispose()

Write-Host 'Breiner 7 favicons restored in public/; PDF favicons kept in public/hv/'
