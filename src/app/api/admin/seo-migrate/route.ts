import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateSEO } from '@/lib/seo-utils';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function checkAuth() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return !!session;
}

export async function GET() {
    if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        let productCount = 0;
        let blogCount = 0;

        // Migrate Products
        const products = await (prisma as any).product.findMany();
        for (const product of products) {
            const seo = generateSEO(product.name, product.description, product.category);
            await (prisma as any).product.update({
                where: { id: product.id },
                data: {
                    targetKeyword: product.targetKeyword || seo.targetKeyword,
                    seoKeywords: product.seoKeywords || seo.seoKeywords,
                    seoTitle: product.seoTitle || seo.seoTitle,
                    seoDescription: product.seoDescription || seo.seoDescription,
                    imageAlt: product.imageAlt || seo.imageAlt
                }
            });
            productCount++;
        }

        // Migrate Blog Posts
        const posts = await (prisma as any).blogPost.findMany();
        for (const post of posts) {
            const seo = generateSEO(post.title, post.excerpt || '', post.category);
            await (prisma as any).blogPost.update({
                where: { id: post.id },
                data: {
                    targetKeyword: post.targetKeyword || seo.targetKeyword,
                    seoKeywords: post.seoKeywords || seo.seoKeywords,
                    seoTitle: post.seoTitle || seo.seoTitle,
                    seoDescription: post.seoDescription || seo.seoDescription,
                    imageAlt: post.imageAlt || seo.imageAlt
                }
            });
            blogCount++;
        }

        return NextResponse.json({ 
            message: `Migration complete. Updated ${productCount} products and ${blogCount} blog posts.` 
        });
    } catch (error: any) {
        console.error('SEO Migration error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
