// One-off: optimize the welcome photo for web.
// Input  : public/assets/welcome_photo.png  (huge, ~37MB)
// Output : public/assets/welcome_photo.jpg  (web-sized, ~200KB)
import sharp from 'sharp'

const input = 'public/assets/welcome_photo.png'
const output = 'public/assets/welcome_photo.jpg'

const info = await sharp(input)
  .rotate() // honor EXIF orientation
  .resize({ width: 900, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(output)

console.log(`Done -> ${output}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`)
