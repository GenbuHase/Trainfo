const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate() {
  const svgPath = path.resolve(__dirname, '../public/logo.svg');
  const svgBuffer = fs.readFileSync(svgPath);
  const outDir = path.resolve(__dirname, '../public/icons');

  // 1. 標準アイコン 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outDir, 'icon-192x192.png'));
  console.log('✓ Generated icon-192x192.png');

  // 2. 標準アイコン 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outDir, 'icon-512x512.png'));
  console.log('✓ Generated icon-512x512.png');

  // 3. Apple Touch Icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(outDir, 'apple-touch-icon-180x180.png'));
  console.log('✓ Generated apple-touch-icon-180x180.png');

  // 4. Favicon 32x32 & 48x48
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(outDir, 'favicon-32x32.png'));
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(outDir, 'favicon-48x48.png'));
  console.log('✓ Generated favicons');

  // 5. Maskable Icon 512x512 (Safe area: central 80% = 410px, surrounded by background #004B97)
  const innerSize = Math.round(512 * 0.76); // 389px
  const innerIconBuffer = await sharp(svgBuffer)
    .resize(innerSize, innerSize)
    .png()
    .toBuffer();

  const topOffset = Math.round((512 - innerSize) / 2);
  const leftOffset = Math.round((512 - innerSize) / 2);

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 75, b: 151, alpha: 1 }, // #004B97
    },
  })
    .composite([
      {
        input: innerIconBuffer,
        top: topOffset,
        left: leftOffset,
      },
    ])
    .png()
    .toFile(path.join(outDir, 'icon-maskable-512x512.png'));
  console.log('✓ Generated icon-maskable-512x512.png');
}

generate().catch(console.error);
