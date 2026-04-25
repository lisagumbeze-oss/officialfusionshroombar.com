export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import styles from './admin.module.css';
import Link from 'next/link';
import { DollarSign, Clock, Package, Users, TrendingUp, ShoppingBag, Plus, Tag, FileText } from 'lucide-react';

export const metadata = {
    title: 'Admin Dashboard | Fusion Shroom Bars',
};

async function getDashboardData() {
    try {
        const [orders, products, coupons] = await Promise.all([
            prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } }),
            prisma.product.findMany(),
            prisma.coupon.findMany(),
        ]);

        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
        const totalOrders = orders.length;
        const totalProducts = products.length;
        const activeCoupons = coupons.filter(c => c.isActive).length;

        // Unique customer emails
        const uniqueEmails = new Set(orders.map(o => o.customerEmail));
        const totalCustomers = uniqueEmails.size;

        // AOV
        const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Low stock products
        const lowStockProducts = products.filter(p => p.stock <= 10);

        // Recent 5 orders
        const recentOrders = orders.slice(0, 7);

        // Top products by units sold
        const productSales: Record<string, { name: string; units: number; revenue: number }> = {};
        for (const order of orders) {
            for (const item of order.items) {
                const key = item.productName;
                if (!productSales[key]) productSales[key] = { name: key, units: 0, revenue: 0 };
                productSales[key].units += item.quantity;
                productSales[key].revenue += item.price * item.quantity;
            }
        }
        const topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

        return {
            totalRevenue, pendingOrders, totalOrders, totalProducts, totalCustomers, activeCoupons,
            aov, lowStockProducts, recentOrders, topProducts, error: null
        };
    } catch (error: any) {
        console.error('[AdminDashboard] Failed:', error);
        return {
            totalRevenue: 0, pendingOrders: 0, totalOrders: 0, totalProducts: 0,
            totalCustomers: 0, activeCoupons: 0, aov: 0,
            lowStockProducts: [], recentOrders: [], topProducts: [], error: 'Database connection failed'
        };
    }
}

export default async function AdminDashboard() {
    const data = await getDashboardData();

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader}>
                <h1>Overview Dashboard</h1>
                <p>Welcome back. Here's what's happening with your store.</p>
            </header>

            {data.error && (
                <div className={styles.errorBanner}>
                    <strong>Database Error:</strong> {data.error}
                </div>
            )}

            {/* KPI Row */}
            <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiCardIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><DollarSign size={20} /></div>
                    <div className={styles.kpiCardContent}>
                        <span className={styles.kpiCardLabel}>Total Revenue</span>
                        <span className={styles.kpiCardValue}>${data.totalRevenue.toFixed(2)}</span>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiCardIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><ShoppingBag size={20} /></div>
                    <div className={styles.kpiCardContent}>
                        <span className={styles.kpiCardLabel}>Total Orders</span>
                        <span className={styles.kpiCardValue}>{data.totalOrders}</span>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiCardIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}><Clock size={20} /></div>
                    <div className={styles.kpiCardContent}>
                        <span className={styles.kpiCardLabel}>Pending Orders</span>
                        <span className={styles.kpiCardValue}>{data.pendingOrders}</span>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiCardIcon} style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}><Users size={20} /></div>
                    <div className={styles.kpiCardContent}>
                        <span className={styles.kpiCardLabel}>Customers</span>
                        <span className={styles.kpiCardValue}>{data.totalCustomers}</span>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiCardIcon} style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}><TrendingUp size={20} /></div>
                    <div className={styles.kpiCardContent}>
                        <span className={styles.kpiCardLabel}>Avg. Order Value</span>
                        <span className={styles.kpiCardValue}>${data.aov.toFixed(2)}</span>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiCardIcon} style={{ background: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6' }}><Package size={20} /></div>
                    <div className={styles.kpiCardContent}>
                        <span className={styles.kpiCardLabel}>Active Products</span>
                        <span className={styles.kpiCardValue}>{data.totalProducts}</span>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className={styles.dashboardColumns}>
                {/* Recent Orders */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Recent Orders</h2>
                        <Link href="/admin/orders" className={styles.viewAllLink}>View All →</Link>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>
                                            <div className={styles.customerCell}>
                                                <div className={styles.avatar}>{order.customerName.charAt(0).toUpperCase()}</div>
                                                <div>
                                                    <div className={styles.customerName}>{order.customerName}</div>
                                                    <div className={styles.customerEmail}>{order.customerEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={styles.amountCell}>${order.totalAmount.toFixed(2)}</td>
                                        <td>
                                            <span className={`${styles.statusPill} ${styles[order.status.toLowerCase()]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className={styles.dateCell}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {data.recentOrders.length === 0 && (
                                    <tr><td colSpan={4} style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>No orders yet</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Top Products */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Top Products</h2>
                        <Link href="/admin/products" className={styles.viewAllLink}>Manage →</Link>
                    </div>
                    <div className={styles.topProductsList}>
                        {data.topProducts.map((product, i) => (
                            <div key={product.name} className={styles.topProductItem}>
                                <div className={styles.topProductRank}>#{i + 1}</div>
                                <div className={styles.topProductInfo}>
                                    <div className={styles.topProductName}>{product.name}</div>
                                    <div className={styles.topProductMeta}>{product.units} sold · ${product.revenue.toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                        {data.topProducts.length === 0 && (
                            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No sales data yet</p>
                        )}
                    </div>
                </section>
            </div>

            {/* Quick Actions */}
            <section className={styles.quickActions}>
                <Link href="/admin/products" className={styles.quickActionBtn}>
                    <Plus size={16} /> New Product
                </Link>
                <Link href="/admin/coupons" className={styles.quickActionBtn}>
                    <Tag size={16} /> Create Coupon
                </Link>
                <Link href="/admin/blog" className={styles.quickActionBtn}>
                    <FileText size={16} /> Write Post
                </Link>
                <Link href="/admin/orders" className={styles.quickActionBtn}>
                    <ShoppingBag size={16} /> View Orders
                </Link>
            </section>

            {/* Low Stock Alert */}
            {data.lowStockProducts.length > 0 && (
                <section className={styles.card} style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                    <div className={styles.cardHeader}>
                        <h2 style={{ color: '#f59e0b' }}>⚠️ Low Stock Alert</h2>
                    </div>
                    <div className={styles.lowStockList}>
                        {data.lowStockProducts.map(p => (
                            <div key={p.id} className={styles.lowStockItem}>
                                <span>{p.name}</span>
                                <span className={styles.lowStockCount}>{p.stock} left</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
