import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const metadata = await prisma.pageMetadata.findMany();
        return NextResponse.json(metadata);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const metadata = await prisma.pageMetadata.upsert({
            where: { path: data.path },
            update: data,
            create: data,
        });
        return NextResponse.json(metadata);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
