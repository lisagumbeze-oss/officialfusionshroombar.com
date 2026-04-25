import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - List all coupons
export async function GET() {
    try {
        const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
        return NextResponse.json(coupons);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
    }
}

// POST - Create a coupon
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const coupon = await prisma.coupon.create({
            data: {
                code: body.code.toUpperCase(),
                discountType: body.discountType,
                discountValue: body.discountValue,
                minOrderAmount: body.minOrderAmount || 0,
                expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
                usageLimit: body.usageLimit || null,
                isActive: body.isActive ?? true,
            }
        });
        return NextResponse.json(coupon);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Coupon code already exists' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
    }
}

// PATCH - Update coupon (toggle active, etc.)
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const coupon = await prisma.coupon.update({
            where: { id: body.id },
            data: { isActive: body.isActive },
        });
        return NextResponse.json(coupon);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 });
    }
}

// DELETE - Delete a coupon
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await prisma.coupon.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 });
    }
}
