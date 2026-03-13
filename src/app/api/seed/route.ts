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
                update: {},
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
        
        return NextResponse.json({ message: `Successfully seeded ${count} products.` });
    } catch (error: any) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
