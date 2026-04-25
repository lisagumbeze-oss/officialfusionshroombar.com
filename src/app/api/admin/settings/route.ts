import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        let settings = await prisma.storeSettings.findUnique({
            where: { id: 'global' }
        });

        if (!settings) {
            settings = await prisma.storeSettings.create({
                data: { id: 'global' }
            });
        }

        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        
        const settings = await prisma.storeSettings.upsert({
            where: { id: 'global' },
            update: data,
            create: { ...data, id: 'global' },
        });

        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
