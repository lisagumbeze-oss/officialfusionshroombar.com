import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { code, subtotal } = await request.json();

        if (!code) {
            return NextResponse.json({ error: 'Promo code is required' }, { status: 400 });
        }

        const coupon = await prisma.coupon.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (!coupon || !coupon.isActive) {
            return NextResponse.json({ error: 'Invalid or expired promo code' }, { status: 400 });
        }

        // Check expiry
        if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
            return NextResponse.json({ error: 'This promo code has expired' }, { status: 400 });
        }

        // Check usage limit
        if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
            return NextResponse.json({ error: 'This promo code has reached its usage limit' }, { status: 400 });
        }

        // Check minimum order amount
        if (subtotal < coupon.minOrderAmount) {
            return NextResponse.json({ 
                error: `This promo code requires a minimum order of $${coupon.minOrderAmount.toFixed(2)}` 
            }, { status: 400 });
        }

        let discountAmount = 0;
        if (coupon.discountType === 'PERCENTAGE') {
            discountAmount = subtotal * (coupon.discountValue / 100);
        } else {
            discountAmount = coupon.discountValue;
        }

        return NextResponse.json({
            code: coupon.code,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            discountAmount: Math.min(discountAmount, subtotal) // Cannot discount more than subtotal
        });

    } catch (error) {
        console.error('[CouponValidate] Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
