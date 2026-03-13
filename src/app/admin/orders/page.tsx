export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import styles from '../admin.module.css';
import { revalidatePath } from 'next/cache';
import OrdersTable from './OrdersTable';

export const metadata = {
    title: 'Orders Management | Fusion Shroom Bars',
};

export default async function OrdersPage() {
    let orders: any[] = [];
    let error: string | null = null;

    try {
        orders = await prisma.order.findMany({
            include: {
                items: true,
                paymentMethod: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    } catch (e: any) {
        console.error('[OrdersPage] DB Error:', e);
        error = 'Failed to load orders database.';
    }

    async function updateOrderStatus(formData: FormData) {
        'use server';
        const orderId = formData.get('orderId') as string;
        const newStatus = formData.get('status') as string;
        await prisma.order.update({
            where: { id: orderId },
            data: { status: newStatus },
        });
        revalidatePath('/admin/orders');
    }
    async function deleteOrder(formData: FormData) {
        'use server';
        const orderId = formData.get('orderId') as string;
        await prisma.order.delete({
            where: { id: orderId },
        });
        revalidatePath('/admin/orders');
    }

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader} style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <h1>Orders Management</h1>
                <p>View, track, and update customer orders.</p>
            </header>

            {error ? (
                <div className={styles.card} style={{ padding: '2rem', textAlign: 'center', border: '1px solid #ff4444' }}>
                    <p style={{ color: '#ff4444' }}>{error}</p>
                    <p style={{ fontSize: '0.9rem', color: '#888' }}>Database connection interrupted.</p>
                </div>
            ) : (
                <OrdersTable 
                    orders={orders} 
                    updateStatusAction={updateOrderStatus} 
                    deleteOrderAction={deleteOrder} 
                />
            )}
        </div>
    );
}
