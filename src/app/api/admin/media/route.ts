import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const media = await prisma.mediaAsset.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(media);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        
        const asset = await prisma.mediaAsset.create({
            data: {
                filename: data.filename,
                originalFilename: data.originalFilename,
                mimeType: data.mimeType,
                size: data.size,
                url: data.url,
                altText: data.altText,
                caption: data.caption,
                uploadedBy: "Admin",
            }
        });

        return NextResponse.json(asset);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await prisma.mediaAsset.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
