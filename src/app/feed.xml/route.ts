import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

function escapeXml(unsafe: string) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                slug: true,
                name: true,
                price: true,
                description: true,
                image: true,
                category: true
            }
        });

        // We use the primary domain or a default
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officialfusionshroombar.com';

        const itemsXml = products.map((product) => {
            const productUrl = `${baseUrl}/shop/${product.slug}`;
            
            // Format price: e.g. "25.00 USD"
            const formattedPrice = `${product.price.toFixed(2)} USD`;
            
            // Stock logic (defaulting to in_stock since stock fields are missing in current DB)
            const availability = 'in_stock';

            // Make sure the image is an absolute URL
            let imageUrl = product.image || '';
            if (imageUrl && imageUrl.startsWith('/')) {
                imageUrl = `${baseUrl}${imageUrl}`;
            }

            return `
        <item>
            <g:id>${escapeXml(product.id)}</g:id>
            <g:title>${escapeXml(product.name)}</g:title>
            <g:description>${escapeXml(product.description || product.name)}</g:description>
            <g:link>${escapeXml(productUrl)}</g:link>
            <g:image_link>${escapeXml(imageUrl)}</g:image_link>
            <g:condition>new</g:condition>
            <g:availability>${availability}</g:availability>
            <g:price>${formattedPrice}</g:price>
            <g:product_type>${escapeXml(product.category)}</g:product_type>
        </item>`;
        }).join('');

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
    <channel>
        <title>Fusion Shroom Bars</title>
        <link>${baseUrl}</link>
        <description>Official Fusion Shroom Bars Product Feed</description>
        ${itemsXml}
    </channel>
</rss>`;

        return new NextResponse(xml, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate',
            },
        });
    } catch (error) {
        console.error('Error generating product feed:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
