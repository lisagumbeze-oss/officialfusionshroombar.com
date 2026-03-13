const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clean() {
    try {
        // Update Products
        const products = await prisma.product.findMany({
            where: { image: { contains: 'example.com' } }
        });
        for (const p of products) {
            await prisma.product.update({
                where: { id: p.id },
                data: { image: 'https://placehold.co/600x400/9d3bea/ffffff?text=Fusion+Product' }
            });
        }
        console.log(`Cleaned ${products.length} products.`);

        // Update BlogPosts
        const posts = await prisma.blogPost.findMany({
            where: { image: { contains: 'example.com' } }
        });
        for (const p of posts) {
            await prisma.blogPost.update({
                where: { id: p.id },
                data: { image: 'https://placehold.co/1200x800/9d3bea/ffffff?text=Fusion+Blog' }
            });
        }
        console.log(`Cleaned ${posts.length} posts.`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

clean();
