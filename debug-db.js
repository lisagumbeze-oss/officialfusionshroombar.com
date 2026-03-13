const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const products = await prisma.product.findMany();
        console.log('Products:', JSON.stringify(products, null, 2));
        
        try {
            const blogPosts = await prisma.blogPost.findMany();
            console.log('BlogPosts:', JSON.stringify(blogPosts, null, 2));
        } catch (e) {
            console.log('BlogPost fetch failed (missing columns likely):', e.message);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
