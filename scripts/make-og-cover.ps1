# ---------------------------------------------------------------------------
# Builds the social preview card used by the Open Graph / Twitter Card tags in
# index.html.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\make-og-cover.ps1
#
# Source art : public/assets/images/bm_new_logo.png  (1968x517, transparent)
# Output     : public/assets/images/og-cover.png     (1200x630, opaque)
#
# 1200x630 is the 1.91:1 slot every platform crops previews to. The canvas is
# light because the logo's ink is red and dark navy — on the dark token canvas
# the navy half of the mark disappears.
#
# No text is drawn: the brand fonts (Inter Tight / Inter / JetBrains Mono) are
# loaded from Google Fonts and are not installed locally, so anything typeset
# here would fall back to Segoe UI and read off-brand. The headline and
# description come from the meta tags, which each platform renders in its own UI.
# ---------------------------------------------------------------------------

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$logoPath = Join-Path $root 'public\assets\images\bm_new_logo.png'
$outPath = Join-Path $root 'public\assets\images\og-cover.png'

$W = 1200
$H = 630

$bmp = New-Object System.Drawing.Bitmap($W, $H, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Canvas — light theme --bm-bg. Opaque, so no platform paints its own colour
# through the logo's transparency.
$g.Clear([System.Drawing.ColorTranslator]::FromHtml('#ffffff'))

# Dot field — matches --bm-grid / --bm-grid-size (22px pitch, --bm-grid-dot).
$dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#d4d4d4'))
for ($y = 11; $y -lt $H; $y += 22) {
    for ($x = 11; $x -lt $W; $x += 22) {
        $g.FillEllipse($dotBrush, $x, $y, 2.2, 2.2)
    }
}
$dotBrush.Dispose()

# Accent hairline on the top edge — --bm-accent.
$accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#ec362e'))
$g.FillRectangle($accentBrush, 0, 0, $W, 6)
$accentBrush.Dispose()

# Logo, centred. Width-led: the mark is ~3.8:1, so the height follows.
$logo = [System.Drawing.Image]::FromFile($logoPath)
$logoW = 900
$logoH = [int]($logoW * $logo.Height / $logo.Width)
$logoX = [int](($W - $logoW) / 2)
$logoY = [int](($H - $logoH) / 2)
$g.DrawImage($logo, $logoX, $logoY, $logoW, $logoH)
$logo.Dispose()

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

Write-Output ("wrote {0} ({1}x{2}, {3} KB)" -f $outPath, $W, $H, [int]((Get-Item $outPath).Length / 1024))
