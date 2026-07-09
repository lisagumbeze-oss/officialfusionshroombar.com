/**
 * Downloads missing static images from officialfusionshroombars.com
 * and builds a slug -> image URL map from shop pages.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const TMP = path.join(ROOT, '.tmp');
const PUBLIC = path.join(ROOT, 'public');

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchBuffer(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

function fetchText(url) {
  return fetchBuffer(url).then((b) => b.toString('utf8'));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function downloadAsset(url, dest) {
  ensureDir(path.dirname(dest));
  const buf = await fetchBuffer(url);
  fs.writeFileSync(dest, buf);
  console.log(`Saved ${dest} (${buf.length} bytes)`);
}

async function getProductImage(slug) {
  const html = await fetchText(`https://www.officialfusionshroombars.com/shop/${slug}`);
  const og = html.match(/property="og:image" content="([^"]+)"/);
  if (og?.[1]) return og[1];
  const next = html.match(/"image":"(https?:[^"]+)"/);
  if (next?.[1]) return next[1].replace(/\\u002F/g, '/');
  const wp = html.match(/(https:\/\/i\d\.wp\.com\/[^"'\s]+)/);
  return wp?.[1] || null;
}

async function main() {
  ensureDir(TMP);

  const staticAssets = [
    {
      url: 'https://www.officialfusionshroombars.com/images/hero-fusion.png',
      dest: 'public/images/hero-fusion.png',
    },
    {
      url: 'https://www.officialfusionshroombars.com/images/fusion-bars-hand.jpg',
      dest: 'public/images/fusion-bars-hand.jpg',
    },
    {
      url: 'https://www.officialfusionshroombars.com/images/fusion-boxes.jpg',
      dest: 'public/images/fusion-boxes.jpg',
    },
    {
      url: 'https://www.officialfusionshroombars.com/images_transparent.png',
      dest: 'public/images.png',
    },
    {
      url: 'https://www.officialfusionshroombars.com/images_transparent.png',
      dest: 'public/logo.png',
    },
    {
      url: 'https://www.officialfusionshroombars.com/images/hero-fusion.png',
      dest: 'public/og-image.jpg',
    },
    {
      url: 'https://www.officialfusionshroombars.com/images/art-fusion.png',
      dest: 'public/images/art-fusion.png',
    },
    {
      url: 'https://www.officialfusionshroombars.com/images/hero-fusion.png',
      dest: 'public/blog-placeholder.jpg',
    },
  ];

  for (const asset of staticAssets) {
    try {
      await downloadAsset(asset.url, path.join(ROOT, asset.dest));
    } catch (err) {
      console.warn(`Skip ${asset.dest}: ${err.message}`);
    }
  }

  const productsPath = path.join(ROOT, 'src/data/products.ts');
  let productsSource = fs.readFileSync(productsPath, 'utf8');
  const localSlugs = [...productsSource.matchAll(/"id": "([^"]+)"[\s\S]*?"image": "\/images\/products\/[^"]+"/g)].map(
    (m) => m[1]
  );

  const imageMap = {};
  for (const slug of [...new Set(localSlugs)]) {
    try {
      const image = await getProductImage(slug);
      if (image) {
        imageMap[slug] = image;
        console.log(`${slug} => ${image}`);
      } else {
        console.warn(`No image found for ${slug}`);
      }
    } catch (err) {
      console.warn(`Failed ${slug}: ${err.message}`);
    }
  }

  fs.writeFileSync(path.join(TMP, 'product-image-map.json'), JSON.stringify(imageMap, null, 2));

  // Patch products.ts: replace local /images/products/* with scraped URLs per slug block
  for (const [slug, imageUrl] of Object.entries(imageMap)) {
    const blockRegex = new RegExp(
      `("id": "${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"image": )"\\/images\\/products\\/[^"]+"`,
      'm'
    );
    productsSource = productsSource.replace(blockRegex, `$1"${imageUrl}"`);
  }

  fs.writeFileSync(productsPath, productsSource);
  console.log('Updated src/data/products.ts');

  // Download product images that were mapped (optional local cache for fallbacks)
  ensureDir(path.join(PUBLIC, 'images/products'));
  for (const [slug, imageUrl] of Object.entries(imageMap)) {
    try {
      const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
      await downloadAsset(imageUrl, path.join(PUBLIC, 'images/products', `${slug}${ext}`));
    } catch {
      // external URL in products.ts is enough
    }
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
