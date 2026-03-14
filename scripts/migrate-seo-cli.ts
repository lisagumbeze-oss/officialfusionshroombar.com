
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock generateSEO since we can't easily import from lib in a standalone tsx script without complex setup
// We'll just do a basic version of it here
function generateSEO(name: string, description: string, category: string) {
    const cleanName = name.replace(/['"]/g, '');
    return {
        targetKeyword: cleanName,
        seoKeywords: `${cleanName}, ${category}, Official Fusion Bars, Shroom Bars USA`,
        seoTitle: `${cleanName} | Official Fusion Shroom Bars`,
        seoDescription: description.substring(0, 150) + '...',
        imageAlt: `${cleanName} - Authentic Fusion Shroom Bar ${category}`
    };
}

async function main() {
    console.log('Starting standalone SEO migration...');
    
    try {
        // Migrate Products
        const products = await prisma.product.findMany();
        console.log(`Found ${products.length} products to migrate.`);
        for (const product of products) {
            const seo = generateSEO(product.name, product.description, product.category);
            await prisma.product.update({
                where: { id: product.id },
                data: {
                    targetKeyword: product.targetKeyword || seo.targetKeyword,
                    seoKeywords: product.seoKeywords || seo.seoKeywords,
                    seoTitle: product.seoTitle || seo.seoTitle,
                    seoDescription: product.seoDescription || seo.seoDescription,
                    imageAlt: product.imageAlt || seo.imageAlt
                }
            });
        }
        console.log('Products migration complete.');

        // Migrate Blog Posts
        const posts = await prisma.blogPost.findMany();
        console.log(`Found ${posts.length} blog posts to migrate.`);
        for (const post of posts) {
            const seo = generateSEO(post.title, post.excerpt || '', post.category);
            await prisma.blogPost.update({
                where: { id: post.id },
                data: {
                    targetKeyword: post.targetKeyword || seo.targetKeyword,
                    seoKeywords: post.seoKeywords || seo.seoKeywords,
                    seoTitle: post.seoTitle || seo.seoTitle,
                    seoDescription: post.seoDescription || seo.seoDescription,
                    imageAlt: post.imageAlt || seo.imageAlt
                }
            });
        }
        console.log('Blog posts migration complete.');
        
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
