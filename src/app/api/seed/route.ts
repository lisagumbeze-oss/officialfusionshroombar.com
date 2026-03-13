import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { products } from '@/data/products';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        let count = 0;
        for (const product of products) {
            // Upsert by slug so we don't duplicate on multiple hits
            await prisma.product.upsert({
                where: { slug: product.id },
                update: {
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
                },
                create: {
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
            await prisma.blogPost.upsert({
                where: { slug: post.slug },
                update: post,
                create: post
            });
            blogCount++;
        }
        
        return NextResponse.json({ 
            message: `Successfully seeded ${count} products and ${blogCount} blog posts.` 
        });
    } catch (error: any) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
