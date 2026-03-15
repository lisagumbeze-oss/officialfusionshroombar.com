import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { products } from '@/data/products';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        let count = 0;
        for (const product of products) {
            // Additive only: Check if slug exists, skip if it does
            const existing = await prisma.product.findUnique({
                where: { slug: product.id }
            });

            if (!existing) {
                await prisma.product.create({
                    data: {
                        slug: product.id,
                        name: product.name,
                        price: product.price,
                        regularPrice: product.regularPrice || null,
                        category: product.category,
                        description: product.description,
                        image: product.image,
                        weight: product.attributes?.weight || null,
                        effects: product.attributes?.effects ? JSON.stringify(product.attributes.effects) : null,
                        ingredients: product.attributes?.ingredients ? JSON.stringify(product.attributes.ingredients) : null,
                        dosage: product.attributes?.dosage || null,
                    }
                });
                count++;
            }
        }
        
        // --- BLOG POST SEEDING ---
        const samplePosts = [
            {
                title: "The Science of Microdosing: A Fusion Guide",
                slug: "science-of-microdosing",
                excerpt: "Explore the neurological and psychological benefits of microdosing with Fusion Shroom Bars.",
                content: "Exploring the benefits of microdosing with precision-dosed Fusion Bars...",
                image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1200",
                category: "Wellness & Science"
            },
            {
                title: "Unlocking Creativity with Fusion Shroom Bars",
                slug: "unlocking-creativity",
                excerpt: "Discover how artists and thinkers use Fusion to break through creative blocks.",
                content: "How psilocybin catalysts divergent thinking for modern creators...",
                image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
                category: "Lifestyle"
            }
        ];

        let blogCount = 0;
        for (const post of samplePosts) {
            const existingBlog = await prisma.blogPost.findUnique({
                where: { slug: post.slug }
            });

            if (!existingBlog) {
                await prisma.blogPost.create({
                    data: post
                });
                blogCount++;
            }
        }
        
        // --- PAYMENT METHOD SEEDING ---
        const cryptoMethod = await prisma.manualPaymentMethod.findUnique({
            where: { id: 'CRYPTO' }
        });

        if (!cryptoMethod) {
            await prisma.manualPaymentMethod.create({
                data: {
                    id: 'CRYPTO',
                    name: 'Cryptocurrency',
                    details: 'Automated via Plisio',
                    instructions: 'Pay with BTC, ETH, LTC, USDT and more.',
                    isActive: true
                }
            });
        }
        
        return NextResponse.json({ 
            message: `Successfully seeded ${count} products, ${blogCount} blog posts, and ensured Crypto payment method exists.` 
        });
    } catch (error: any) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
