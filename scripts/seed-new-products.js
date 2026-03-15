const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

// Mirroring seo-utils.ts logic since we are in a node script
function generateSEO(name, description, category) {
    const cleanName = name.replace(/Official|Fusion|Shroom|Bar|Chocolate/gi, '').trim();
    const targetKeyword = `${name} Fusion Bar`.trim();
    
    const keywordSet = new Set([
        name.toLowerCase(),
        category.toLowerCase(),
        "fusion bars",
        "fusion shroom bars",
        "fusion mushroom bars",
        "neau tropics",
        "fusion chocolate bar",
        "magic mushroom chocolate",
        "psilocybin edibles"
    ]);

    if (cleanName) {
        keywordSet.add(`${cleanName.toLowerCase()} fusion`);
        keywordSet.add(`buy ${cleanName.toLowerCase()}`);
    }

    const seoTitle = `${name} | Official Fusion Shroom Bars`;
    const seoDescription = description.length > 155 
        ? description.substring(0, 152) + "..." 
        : description;
        
    const imageAlt = `${name} - Official Fusion Shroom Bar ${category} Image`;

    return {
        targetKeyword,
        seoKeywords: Array.from(keywordSet).join(', '),
        seoTitle,
        seoDescription,
        imageAlt
    };
}

async function seed() {
    try {
        const products = JSON.parse(fs.readFileSync('scripts/scraped-products.json', 'utf-8'));
        console.log(`Seeding ${products.length} products...`);

        for (const p of products) {
            // Check if product exists by slug
            const exists = await prisma.product.findUnique({ where: { slug: p.slug } });
            if (exists) {
                console.log(`Skipping existing product: ${p.name}`);
                continue;
            }

            const seo = generateSEO(p.name, p.description, p.category);

            await prisma.product.create({
                data: {
                    name: p.name,
                    slug: p.slug,
                    price: p.price,
                    description: p.description,
                    image: p.image,
                    category: p.category,
                    isActive: true,
                    ...seo
                }
            });
            console.log(`Added product: ${p.name}`);
        }

        console.log('Seeding complete.');
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
