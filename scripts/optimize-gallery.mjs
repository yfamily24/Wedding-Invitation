// One-off: optimize all gallery photos for web (read -> temp -> replace).
import sharp from 'sharp'
import { rename, unlink, readdir } from 'node:fs/promises'

const dir = 'public/assets'
const files = (await readdir(dir)).filter((f) => /_gallery\.jpg$/i.test(f)).sort()

for (const name of files) {
  const file = `${dir}/${name}`
  const tmp = `${dir}/${name}.tmp.jpg`
  const info = await sharp(file)
    .rotate()
    .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(tmp)
  await unlink(file)
  await rename(tmp, file)
  console.log(`${name}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`)
}
