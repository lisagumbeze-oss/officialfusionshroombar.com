export const dynamic = 'force-dynamic';

import styles from '../../admin.module.css';
import OrderDetail from './OrderDetail';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = { title: 'Order Details | Fusion Admin' };

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className={styles.adminContainer}>
            <div className={styles.pageHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/orders" className={styles.btnSecondary} style={{ padding: '0.5rem', borderRadius: '8px' }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1>Order Details</h1>
                        <p style={{ color: '#888', fontSize: '0.8rem' }}>Order #{id.slice(-8).toUpperCase()}</p>
                    </div>
                </div>
            </div>

            <OrderDetail id={id} />
        </div>
    );
}
