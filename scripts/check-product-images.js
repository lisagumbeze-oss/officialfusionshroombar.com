const https = require('https');

function getOgImage(slug) {
  return new Promise((resolve, reject) => {
    https
      .get(`https://www.officialfusionshroombars.com/shop/${slug}`, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          const og = data.match(/property="og:image" content="([^"]+)"/);
          resolve(og?.[1] || null);
        });
      })
      .on('error', reject);
  });
}

const slugs = [
  'fusion-cactus-cooler-gummies',
  'fusion-bar-pretzel-sea-salt',
  'fusion-x-whole-melt-50-stacks-box',
];

(async () => {
  for (const slug of slugs) {
    console.log(slug, '=>', await getOgImage(slug));
  }
})();
