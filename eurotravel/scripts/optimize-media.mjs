// One-shot media optimizer (dev machine only — never bundled/shipped).
//   node scripts/optimize-media.mjs [images|video|all]
// Reads untouched originals from originals-backup/, writes web-ready derivatives.
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const kb = (p) => (statSync(p).size / 1024).toFixed(0).padStart(7) + ' KB';
const ff = (args) => execFileSync(ffmpegPath, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });

const BACKUP_IMG = join(root, 'originals-backup/images');
const BACKUP_VID = join(root, 'originals-backup/videos');
const OUT_IMG = join(root, 'src/assets/images/optimized');
const OUT_VID = join(root, 'public/videos');

const WIDTHS = [1600, 800];

async function images() {
  mkdirSync(OUT_IMG, { recursive: true });
  const files = readdirSync(BACKUP_IMG).filter((f) => /\.jpe?g$/i.test(f));
  console.log(`\n=== IMAGES (${files.length}) ===`);
  for (const file of files) {
    const src = join(BACKUP_IMG, file);
    const base = basename(file).replace(/\.jpe?g$/i, '');
    process.stdout.write(`${base}  (orig ${kb(src)})\n`);
    for (const w of WIDTHS) {
      const pipeline = sharp(src).resize({ width: w, withoutEnlargement: true });
      const avif = join(OUT_IMG, `${base}-${w}.avif`);
      const webp = join(OUT_IMG, `${base}-${w}.webp`);
      const jpg = join(OUT_IMG, `${base}-${w}.jpg`);
      await pipeline.clone().avif({ quality: 50 }).toFile(avif);
      await pipeline.clone().webp({ quality: 75 }).toFile(webp);
      await pipeline.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(jpg);
      console.log(`   ${w}w  avif ${kb(avif)} | webp ${kb(webp)} | jpg ${kb(jpg)}`);
    }
  }
}

function video() {
  mkdirSync(OUT_VID, { recursive: true });
  const src = join(BACKUP_VID, 'hero-van.mp4');
  const mp4 = join(OUT_VID, 'hero-van.mp4');
  const webm = join(OUT_VID, 'hero-van.webm');
  const posterJpg = join(OUT_VID, 'hero-van-poster.jpg');
  const posterWebp = join(OUT_VID, 'hero-van-poster.webp');
  const scale = 'scale=1280:-2'; // cap to 720p; -2 keeps even height for yuv420p

  console.log(`\n=== VIDEO (orig ${kb(src)}) ===`);

  console.log('-> H.264 MP4 (CRF 23, preset slow, audio stripped, faststart)…');
  ff(['-i', src, '-an', '-c:v', 'libx264', '-crf', '23', '-preset', 'slow',
      '-pix_fmt', 'yuv420p', '-vf', scale, '-movflags', '+faststart', mp4]);
  console.log(`   mp4  ${kb(mp4)}`);

  console.log('-> VP9 WebM (CRF 33, audio stripped)…');
  ff(['-i', src, '-an', '-c:v', 'libvpx-vp9', '-crf', '33', '-b:v', '0',
      '-row-mt', '1', '-vf', scale, webm]);
  console.log(`   webm ${kb(webm)}`);

  console.log('-> Poster (frame @1s)…');
  ff(['-ss', '1', '-i', src, '-frames:v', '1', '-vf', scale, '-q:v', '3', posterJpg]);
  ff(['-ss', '1', '-i', src, '-frames:v', '1', '-vf', scale, posterWebp]);
  console.log(`   poster jpg ${kb(posterJpg)} | webp ${kb(posterWebp)}`);
}

const mode = process.argv[2] || 'all';
if (mode === 'images' || mode === 'all') await images();
if (mode === 'video' || mode === 'all') video();
console.log('\nDone.');
