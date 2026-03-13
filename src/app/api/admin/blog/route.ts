import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// Helper to check admin session (simplified)
async function checkAuth() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return !!session;
}

export async function GET() {
    try {
        const posts = await (prisma as any).blogPost.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        const { title, content, excerpt, image } = body;
        
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        
        const post = await (prisma as any).blogPost.create({
            data: { 
                title, 
                slug, 
                content, 
                excerpt, 
                image,
                category: body.category || 'Wellness & Microdosing',
                tags: JSON.stringify(body.tags || []),
                isPublic: body.isPublic ?? true,
                allowComments: body.allowComments ?? true
            }
        });
        
        return NextResponse.json(post);
    } catch (error: any) {
        console.error('Blog POST error details:', error);
        return NextResponse.json({ 
            error: 'Failed to create post', 
            details: error.message,
            stack: error.stack 
        }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        const { id, title, content, excerpt, image } = body;
        
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        
        const post = await (prisma as any).blogPost.update({
            where: { id },
            data: { 
                title, 
                slug, 
                content, 
                excerpt, 
                image,
                category: body.category,
                tags: JSON.stringify(body.tags),
                isPublic: body.isPublic,
                allowComments: body.allowComments
            }
        });
        
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    try {
        await (prisma as any).blogPost.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
