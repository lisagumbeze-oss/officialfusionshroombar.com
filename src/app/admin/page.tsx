import prisma from '@/lib/prisma';
import styles from './admin.module.css';
import { TrendingUp, DollarSign, Clock, Package } from 'lucide-react';

export const metadata = {
    title: 'Admin Dashboard | Fusion Shroom Bars',
};

async function getAnalyticsData() {
    const orders = await prisma.order.findMany();
    
    // Calculate KPIs
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
    const totalSales = orders.length;

    return { totalRevenue, pendingOrders, totalSales, recentOrders: orders.slice(0, 5) };
}

export default async function AdminDashboard() {
    const { totalRevenue, pendingOrders, totalSales } = await getAnalyticsData();

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader} style={{ textAlign: 'left' }}>
                <h1>Overview Dashboard</h1>
                <p>Welcome back, here's what's happening today.</p>
            </header>

            <div className={styles.dashboardGrid}>
                {/* KPI Card 1 */}
                <div className={styles.card}>
                    <div className={styles.kpiLabel}>
                        Total Revenue <DollarSign size={18} />
                    </div>
                    <div className={styles.kpiValue}>${totalRevenue.toFixed(2)}</div>
                    <div className={styles.trendUp}>+12.5% from last month</div>
                </div>

                {/* KPI Card 2 */}
                <div className={styles.card}>
                    <div className={styles.kpiLabel}>
                        Pending Orders <Clock size={18} />
                    </div>
                    <div className={styles.kpiValue}>{pendingOrders}</div>
                    <div style={{ fontSize: '0.8rem', color: '#aaa' }}>Awaiting payment confirmation</div>
                </div>

                {/* KPI Card 3 */}
                <div className={styles.card}>
                    <div className={styles.kpiLabel}>
                        Total Sales <Package size={18} />
                    </div>
                    <div className={styles.kpiValue}>{totalSales}</div>
                    <div className={styles.trendUp}>+5.2% from last month</div>
                </div>
            </div>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2>Recent Activity</h2>
                </div>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Navigate to the Orders tab to view and manage all transactions.</p>
            </section>
        </div>
    );
}
