// One-off: optimize the groom & bride portraits for web.
// Resizes in place (read -> temp -> replace) to ~700px wide JPEG.
import sharp from 'sharp'
import { rename, unlink } from 'node:fs/promises'

const files = ['public/assets/groom.jpg', 'public/assets/bride.jpg']

for (const file of files) {
  const tmp = file.replace('.jpg', '.tmp.jpg')
  const info = await sharp(file)
    .rotate() // honor EXIF orientation
    .resize({ width: 700, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(tmp)
  await unlink(file)
  await rename(tmp, file)
  console.log(`${file}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`)
}
