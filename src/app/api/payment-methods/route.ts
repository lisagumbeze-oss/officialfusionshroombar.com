import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const methods = await prisma.manualPaymentMethod.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(methods);
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        return NextResponse.json({ error: 'Failed to fetch payment methods' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, details, instructions } = body;

        if (!name || !details) {
            return NextResponse.json({ error: 'Name and details are required' }, { status: 400 });
        }

        const method = await prisma.manualPaymentMethod.create({
            data: { name, details, instructions },
        });

        return NextResponse.json(method, { status: 201 });
    } catch (error) {
        console.error('Error creating payment method:', error);
        return NextResponse.json({ error: 'Failed to create payment method' }, { status: 500 });
    }
}
