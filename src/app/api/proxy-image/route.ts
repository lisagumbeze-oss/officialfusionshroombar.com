import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return new NextResponse('Missing URL', { status: 400 });
    }

    try {
        console.log(`[Proxy] Fetching image: ${imageUrl}`);
        const response = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Referer': 'https://officialfusionshroombars.com/'
            },
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!response.ok) {
            console.error(`[Proxy] Failed to fetch image: ${response.status} ${response.statusText}`);
            return new NextResponse('Failed to fetch image', { status: response.status });
        }

        const contentType = response.headers.get('Content-Type');
        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': contentType || 'image/jpeg',
                'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
            }
        });
    } catch (error) {
        console.error('[Proxy] Internal error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
