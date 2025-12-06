#!/bin/bash
echo "=== Checking Favicon Files ==="
cd public
echo ""
echo "1. Favicon.ico:"
ls -lh favicon.ico 2>/dev/null && file favicon.ico || echo "❌ favicon.ico not found"

echo ""
echo "2. Favicon PNG files:"
for size in 16 32 48 192 512; do
  file="favicon-${size}x${size}-optimized.png"
  if [ -f "$file" ]; then
    echo "✅ $file exists"
    sips -g pixelWidth -g pixelHeight "$file" 2>/dev/null | grep -E "pixelWidth|pixelHeight"
  else
    echo "❌ $file not found"
  fi
done

echo ""
echo "3. Apple Touch Icon:"
ls -lh apple-touch-icon.png 2>/dev/null && echo "✅ apple-touch-icon.png exists" || echo "❌ apple-touch-icon.png not found"

echo ""
echo "=== To test in browser ==="
echo "1. Start dev server: npm run dev"
echo "2. Open: http://localhost:5173"
echo "3. Check favicon on browser tab"
echo "4. Or visit directly: http://localhost:5173/favicon.ico"
