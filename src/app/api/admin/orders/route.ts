import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const q = searchParams.get('q');
        
        const where: any = {};
        if (status && status !== 'ALL') {
            where.status = status;
        }
        
        if (q) {
            where.OR = [
                { id: { contains: q, mode: 'insensitive' } },
                { customerName: { contains: q, mode: 'insensitive' } },
                { customerEmail: { contains: q, mode: 'insensitive' } },
            ];
        }

        const orders = await prisma.order.findMany({
            where,
            include: {
                items: true,
                paymentMethod: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(orders);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
