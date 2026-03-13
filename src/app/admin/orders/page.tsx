export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import styles from '../admin.module.css';
import { revalidatePath } from 'next/cache';
import OrdersTable from './OrdersTable';

export const metadata = {
    title: 'Orders Management | Fusion Shroom Bars',
};

export default async function OrdersPage() {
    const orders = await prisma.order.findMany({
        include: {
            items: true,
            paymentMethod: true,
        },
        orderBy: { createdAt: 'desc' },
    });

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

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader} style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <h1>Orders Management</h1>
                <p>View, track, and update customer orders.</p>
            </header>

            <OrdersTable orders={orders} updateStatusAction={updateOrderStatus} />
        </div>
    );
}
