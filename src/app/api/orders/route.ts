import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { cookies } from 'next/headers';

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

        // Initialize Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
            const resend = new Resend(resendApiKey);
            try {
                // 1. Email to Customer
                await resend.emails.send({
                    from: 'Fusion Shroom Bars <support@officialfusionshroombar.com>', 
                    to: customerEmail,
                    subject: `Order Confirmation #${order.id.slice(-6).toUpperCase()} - Fusion Shroom Bars`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                            <h1 style="color: #9d3bea;">Order Confirmed!</h1>
                            <p>Hi ${customerName},</p>
                            <p>Thank you for your order. We have received it and it is currently marked as <strong>PENDING</strong>.</p>
                            
                            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                 <h3>Payment Instructions</h3>
                                 <p><strong>Method:</strong> ${(order as any).paymentMethod?.name}</p>
                                 <p><strong>Pay To:</strong> ${(order as any).paymentMethod?.details}</p>
                                 <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
                                 ${(order as any).paymentMethod?.instructions ? `<p><em>${(order as any).paymentMethod.instructions}</em></p>` : ''}
                             </div>
                            
                            <p>Once you send the payment, we will process your order and prepare it for shipping to:</p>
                            <p><em>${shippingAddress}</em></p>
                            
                            <br/>
                            <p>Thank you,<br/>Fusion Shroom Bars Team</p>
                        </div>
                    `,
                });

                // 2. Notification to Admin
                const adminEmail = process.env.ADMIN_EMAIL || 'order@officialfusionshroombar.com';
                await resend.emails.send({
                    from: 'System <support@officialfusionshroombar.com>', 
                    to: adminEmail,
                    subject: `New Order Received! 💰 $${totalAmount.toFixed(2)}`,
                    html: `
                        <div style="font-family: Arial, sans-serif;">
                             <h2>New Order #${order.id.slice(-6).toUpperCase()}</h2>
                             <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
                             <p><strong>Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
                             <p><strong>Payment Method:</strong> ${(order as any).paymentMethod?.name}</p>
                             <p>Login to your admin dashboard to view full details.</p>
                        </div>
                    `,
                });
            } catch (emailErr) {
                console.error('Failed to send emails:', emailErr);
                // We don't fail the order API just because email failed
            }
        }

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
