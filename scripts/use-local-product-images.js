/**
 * Prefer local /images/products/* files when a slug-specific or flavor-named asset exists.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const productsPath = path.join(ROOT, 'src/data/products.ts');
const productsDir = path.join(ROOT, 'public/images/products');

const FLAVOR_MAP = {
  'fusion-cherry-lime-gummies': 'cherry-lime-gummies.webp',
  'fusion-cactus-cooler-gummies': 'cactus-cooler.webp',
  'fusion-gummies-berry-citrus': 'berry-citrus-gummies.jpg',
  'fusion-gummies-grape-slushe': 'grape-slushe.webp',
  'fusion-gummies-hawaiian-punch': 'hawaiian-punch.webp',
  'fusion-gummies-lavender-lemonade': 'lavender-lemonade.webp',
  'fusion-gummies-raspberry-goji': 'raspberry-goji.webp',
  'fusion-gummies-sour-apple': 'sour-apple.webp',
  'fusion-gummies-watermelon': 'watermelon.webp',
  'fusion-passion-fruit-gummies': 'passion-fruit.webp',
  'mimosa-haze-fusion-x-whole-melt': 'mimosa-haze-fusion-x-whole-melt.webp',
  'almond-crush-fusion-magic-mushroom-bar': 'almond-crush.png',
  'birthday-cake-fusion-magic-mushroom-bar': 'birthday-cake.webp',
  'a-box-of-fusion-gummies': 'gummies.png',
  'a-box-of-10-fusion-gummies': 'gummies.png',
};

function localPath(filename) {
  return `/images/products/${filename}`;
}

function fileExists(filename) {
  return fs.existsSync(path.join(productsDir, filename));
}

let source = fs.readFileSync(productsPath, 'utf8');
let updates = 0;

for (const [slug, filename] of Object.entries(FLAVOR_MAP)) {
  if (!fileExists(filename)) continue;
  const next = localPath(filename);
  const blockRegex = new RegExp(
    `("id": "${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"image": )"[^"]+"`,
    'm'
  );
  const before = source;
  source = source.replace(blockRegex, `$1"${next}"`);
  if (source !== before) {
    updates++;
    console.log(`${slug} -> ${next}`);
  }
}

// Slug-named files: {slug}.png|webp|jpg
const slugFiles = fs.readdirSync(productsDir);
for (const file of slugFiles) {
  const ext = path.extname(file);
  const slug = path.basename(file, ext);
  if (!slug.includes('-')) continue;
  const blockRegex = new RegExp(
    `("id": "${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"image": )"[^"]+"`,
    'm'
  );
  const next = localPath(file);
  const before = source;
  source = source.replace(blockRegex, `$1"${next}"`);
  if (source !== before) {
    updates++;
    console.log(`${slug} -> ${next}`);
  }
}

fs.writeFileSync(productsPath, source);
console.log(`Updated ${updates} product images to local paths.`);
