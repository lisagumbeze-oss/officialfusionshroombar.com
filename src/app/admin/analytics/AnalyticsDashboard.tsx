'use client';

import styles from '../admin.module.css';
import { DollarSign, ShoppingBag, Users, TrendingUp, BarChart2, FileText } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface AnalyticsProps {
    data: {
        summary: {
            totalRevenue: number;
            totalOrders: number;
            uniqueCustomers: number;
            aov: number;
            conversionRate: number;
        };
        revenueChart: { date: string; revenue: number; orders: number }[];
        salesByCategory: { name: string; revenue: number }[];
        topProducts: { name: string; units: number; revenue: number }[];
        ordersByStatus: { name: string; value: number }[];
        couponUsage: { code: string; used: number; limit: number | null; discount: string }[];
    } | null;
    error: string | null;
}

export default function AnalyticsDashboard({ data, error }: AnalyticsProps) {
    const { showToast } = useToast();
    if (error || !data) {
        return (
            <div className={styles.adminContainer}>
                <div className={styles.pageHeader}><h1>Analytics & Reports</h1></div>
                <div className={styles.errorBanner}><strong>Error:</strong> {error || 'No data available'}</div>
            </div>
        );
    }

    const { summary, revenueChart, salesByCategory, topProducts, ordersByStatus, couponUsage } = data;

    // Find max revenue for scaling the bar chart
    const maxRevenue = Math.max(...revenueChart.map(d => d.revenue), 1);
    const totalCategoryRevenue = salesByCategory.reduce((s, c) => s + c.revenue, 0) || 1;

    const handleExport = () => {
        if (!data) return;
        const headers = ["Date", "Revenue", "Orders"];
        const rows = data.revenueChart.map(d => `${d.date},${d.revenue},${d.orders}`);
        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fusion-analytics-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        showToast('Report exported successfully!');
    };

    return (
        <div className={styles.adminContainer}>
            <div className={styles.pageHeader}>
                <div>
                    <h1>Analytics & Reports</h1>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Last 30 days</span>
                </div>
                <button onClick={handleExport} className={`${styles.btn} ${styles.btnPrimary}`}>
                    <FileText size={18} />
                    <span>Download Report</span>
                </button>
            </div>

            {/* KPI Row */}
            <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiCardIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><DollarSign size={20} /></div>
                    <div className={styles.kpiCardContent}>
                        <span className={styles.kpiCardLabel}>Total Revenue</span>
                        <span className={styles.kpiCardValue}>${summary.totalRevenue.toFixed(2)}</span>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiCardIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><ShoppingBag size={20} /></div>
                    <div className={styles.kpiCardContent}>
                        <span className={styles.kpiCardLabel}>Total Orders</span>
                        <span className={styles.kpiCardValue}>{summary.totalOrders}</span>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiCardIcon} style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}><Users size={20} /></div>
                    <div className={styles.kpiCardContent}>
                        <span className={styles.kpiCardLabel}>Customers</span>
                        <span className={styles.kpiCardValue}>{summary.uniqueCustomers}</span>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiCardIcon} style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}><TrendingUp size={20} /></div>
                    <div className={styles.kpiCardContent}>
                        <span className={styles.kpiCardLabel}>Avg. Order Value</span>
                        <span className={styles.kpiCardValue}>${summary.aov.toFixed(2)}</span>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiCardIcon} style={{ background: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6' }}><BarChart2 size={20} /></div>
                    <div className={styles.kpiCardContent}>
                        <span className={styles.kpiCardLabel}>Completion Rate</span>
                        <span className={styles.kpiCardValue}>{summary.conversionRate.toFixed(1)}%</span>
                    </div>
                </div>
            </div>

            {/* Revenue Chart (CSS bars) */}
            <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                <div className={styles.cardHeader}>
                    <h2>Revenue (Last 30 Days)</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '200px', padding: '0 0.5rem' }}>
                    {revenueChart.map((d, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                            <div
                                title={`${d.date}: $${d.revenue} (${d.orders} orders)`}
                                style={{
                                    width: '100%',
                                    maxWidth: '20px',
                                    height: `${Math.max((d.revenue / maxRevenue) * 100, 2)}%`,
                                    background: d.revenue > 0 ? 'linear-gradient(to top, #7c3aed, #a855f7)' : 'rgba(255,255,255,0.05)',
                                    borderRadius: '3px 3px 0 0',
                                    transition: 'height 0.3s',
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', padding: '0 0.5rem' }}>
                    <span style={{ fontSize: '0.65rem', color: '#666' }}>{revenueChart[0]?.date}</span>
                    <span style={{ fontSize: '0.65rem', color: '#666' }}>{revenueChart[revenueChart.length - 1]?.date}</span>
                </div>
            </section>

            <div className={styles.dashboardColumns}>
                {/* Top Products */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}><h2>Top Products by Revenue</h2></div>
                    <div className={styles.topProductsList}>
                        {topProducts.map((product, i) => (
                            <div key={product.name} className={styles.topProductItem}>
                                <div className={styles.topProductRank}>#{i + 1}</div>
                                <div className={styles.topProductInfo} style={{ flex: 1 }}>
                                    <div className={styles.topProductName}>{product.name}</div>
                                    <div className={styles.topProductMeta}>{product.units} units · ${product.revenue.toFixed(2)}</div>
                                </div>
                                <div style={{
                                    width: '80px',
                                    height: '6px',
                                    borderRadius: '3px',
                                    background: 'rgba(255,255,255,0.05)',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${(product.revenue / (topProducts[0]?.revenue || 1)) * 100}%`,
                                        background: 'linear-gradient(to right, #7c3aed, #a855f7)',
                                        borderRadius: '3px',
                                    }} />
                                </div>
                            </div>
                        ))}
                        {topProducts.length === 0 && (
                            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No sales data yet</p>
                        )}
                    </div>
                </section>

                {/* Sales by Category & Order Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Category Breakdown */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}><h2>Sales by Category</h2></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {salesByCategory.map(cat => (
                                <div key={cat.name}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#ccc' }}>{cat.name}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700 }}>${cat.revenue.toFixed(2)}</span>
                                    </div>
                                    <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${(cat.revenue / totalCategoryRevenue) * 100}%`,
                                            background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                                            borderRadius: '3px',
                                        }} />
                                    </div>
                                </div>
                            ))}
                            {salesByCategory.length === 0 && (
                                <p style={{ color: '#666', textAlign: 'center', padding: '1rem' }}>No data</p>
                            )}
                        </div>
                    </section>

                    {/* Order Status Breakdown */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}><h2>Order Status</h2></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {ordersByStatus.map(status => (
                                <div key={status.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                                    <span className={`${styles.statusPill} ${styles[status.name.toLowerCase()]}`}>{status.name}</span>
                                    <span style={{ fontWeight: 700, color: '#fff' }}>{status.value}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Coupon Performance */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}><h2>Coupon Usage</h2></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {couponUsage.map(c => (
                                <div key={c.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                    <div>
                                        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#fff', marginRight: '0.5rem' }}>{c.code}</span>
                                        <span style={{ fontSize: '0.75rem', color: '#a855f7' }}>{c.discount}</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>{c.used}{c.limit ? ` / ${c.limit}` : ''} used</span>
                                </div>
                            ))}
                            {couponUsage.length === 0 && (
                                <p style={{ color: '#666', textAlign: 'center', padding: '1rem' }}>No coupons created</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
