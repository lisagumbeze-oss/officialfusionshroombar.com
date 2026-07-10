import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { sendOrderEmails } from '@/lib/email/notifications';
import { isEmailConfigured } from '@/lib/email/resend';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Simple auth check for fetching orders
        const cookieStore = await cookies();
        const session = cookieStore.get('admin_session');
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const orders = await prisma.order.findMany({
            include: {
                items: true,
                paymentMethod: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            shippingMethod,
            shippingPrice,
            totalAmount,
            paymentMethodId,
            items, // Array of { productId, productName, quantity, price }
        } = body;

        if (!customerEmail || !shippingAddress || !paymentMethodId || !items.length) {
            return NextResponse.json({ error: 'Missing required order fields' }, { status: 400 });
        }

        const order = await prisma.order.create({
            data: {
                customerName,
                customerEmail,
                customerPhone,
                shippingAddress,
                shippingMethod,
                shippingPrice,
                totalAmount,
                paymentMethodId,
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        productName: item.productName,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: {
                items: true,
                paymentMethod: true,
            },
        });

        if (isEmailConfigured()) {
            try {
                await sendOrderEmails({
                    orderId: order.id,
                    customerName: customerName || 'Customer',
                    customerEmail,
                    shippingAddress,
                    totalAmount: order.totalAmount,
                    items: order.items.map((item) => ({
                        productName: item.productName,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    paymentMethod: {
                        name: order.paymentMethod?.name || 'Manual payment',
                        details: order.paymentMethod?.details || '',
                        instructions: order.paymentMethod?.instructions,
                    },
                });
            } catch (emailErr) {
                console.error('Failed to send emails:', emailErr);
            }
        }

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
