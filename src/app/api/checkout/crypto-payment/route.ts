
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createPlisioInvoice } from '@/lib/plisio';

export async function POST(req: Request) {
    try {
        const { orderId } = await req.json();

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Create Plisio Invoice
        const plisioResponse = await createPlisioInvoice({
            id: order.id,
            totalAmount: order.totalAmount,
            customerEmail: order.customerEmail
        });

        return NextResponse.json({ 
            invoiceUrl: plisioResponse.data.invoice_url,
            txnId: plisioResponse.data.txn_id
        });

    } catch (error: any) {
        console.error('[CryptoPayment] Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
