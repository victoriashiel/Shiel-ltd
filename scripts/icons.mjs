// Rasterises the Shiel mark into the PNG icons the manifest and iOS need.
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';

const svg = await readFile('public/icon.svg');
const mark = (await readFile('public/icon.svg', 'utf8')).replace(/<rect[^>]*\/>/, '');
await mkdir('public/icons', { recursive: true });

for (const size of [192, 512]) await sharp(svg, { density: 600 }).resize(size, size).png().toFile(`public/icons/icon-${size}.png`);

// Maskable and Apple icons need a full-bleed background with the mark in the safe zone.
const padded = (size, inset) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0b1718"/><g transform="translate(${inset} ${inset}) scale(${(64 - inset * 2) / 64})">${mark.replace(/<\/?svg[^>]*>/g, '')}</g></svg>`);
await sharp(padded(512, 9), { density: 600 }).resize(512, 512).png().toFile('public/icons/maskable-512.png');
await sharp(padded(180, 4), { density: 600 }).resize(180, 180).png().toFile('public/icons/apple-touch-icon.png');
console.log('icons written');
