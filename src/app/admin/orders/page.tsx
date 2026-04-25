export const dynamic = 'force-dynamic';

import styles from '../admin.module.css';
import OrdersList from './OrdersList';

export const metadata = { title: 'Orders | Fusion Admin' };

export default async function AdminOrdersPage() {
    return (
        <div className={styles.adminContainer}>
            <div className={styles.pageHeader}>
                <h1>Orders & Fulfillment</h1>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>Manage customer orders and shipping status.</p>
            </div>
            <OrdersList />
        </div>
    );
}
