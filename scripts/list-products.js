const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function listProducts() {
  try {
    const products = await prisma.product.findMany({
      select: {
          name: true,
          slug: true,
          category: true
      }
    });
    fs.writeFileSync('scripts/local-products-utf8.json', JSON.stringify(products, null, 2), 'utf-8');
    console.log(`Successfully wrote ${products.length} products to scripts/local-products-utf8.json`);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

listProducts();
