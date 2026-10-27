// Shrinks phone photos for the web (about 5-10 MB down to about 200-300 KB each).
// Usage:
//   npm install sharp
//   node scripts/optimize-images.mjs path/to/raw-photos
// Output goes to images/jobs/ as .webp (1600px wide). Then add each file to js/photos.js.
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const src = process.argv[2];
if (!src) { console.error("Usage: node scripts/optimize-images.mjs <folder-of-photos>"); process.exit(1); }
const out = "images/jobs";
await mkdir(out, { recursive: true });

for (const f of await readdir(src)) {
  if (!/\.(jpe?g|png|heic|webp)$/i.test(f)) continue;
  const name = path.parse(f).name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  await sharp(path.join(src, f)).rotate().resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 }).toFile(path.join(out, name + ".webp"));
  console.log("✔", name + ".webp");
}
