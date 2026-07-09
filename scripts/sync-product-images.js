/**
 * Sync product.image in DB from src/data/products.ts (by slug).
 * Run: node scripts/sync-product-images.js
 */
const fs = require('fs');
const path = require('path');

async function main() {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  const productsPath = path.join(__dirname, '../src/data/products.ts');
  const source = fs.readFileSync(productsPath, 'utf8');

  const entries = [...source.matchAll(/"id": "([^"]+)"[\s\S]*?"image": "([^"]+)"/g)].map((m) => ({
    slug: m[1],
    image: m[2],
  }));

  let updated = 0;
  let missing = 0;

  for (const { slug, image } of entries) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      missing++;
      continue;
    }
    if (product.image !== image) {
      await prisma.product.update({ where: { slug }, data: { image } });
      updated++;
      console.log(`Updated ${slug}`);
    }
  }

  // Fix any DB rows still pointing at missing local paths
  const broken = await prisma.product.findMany({
    where: {
      OR: [
        { image: { startsWith: '/images/' } },
        { image: { contains: 'placehold.co' } },
      ],
    },
  });

  for (const row of broken) {
    const match = entries.find((e) => e.slug === row.slug);
    if (match && match.image !== row.image) {
      await prisma.product.update({ where: { id: row.id }, data: { image: match.image } });
      updated++;
      console.log(`Fixed broken ${row.slug}`);
    }
  }

  console.log(`Done. Updated ${updated}, missing slugs ${missing}.`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
