export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import styles from '../admin.module.css';
import { Users } from 'lucide-react';

export const metadata = { title: 'Customers | Fusion Admin' };

interface CustomerData {
    email: string;
    name: string;
    totalOrders: number;
    totalSpent: number;
    lastOrder: Date | null;
    phone: string;
    city: string;
}

export default async function CustomersPage() {
    let customers: CustomerData[] = [];
    let error = null;

    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
        });

        // Aggregate by email
        const map = new Map<string, CustomerData>();
        for (const order of orders) {
            const existing = map.get(order.customerEmail);
            if (existing) {
                existing.totalOrders += 1;
                existing.totalSpent += order.totalAmount;
                if (!existing.lastOrder || new Date(order.createdAt) > new Date(existing.lastOrder)) {
                    existing.lastOrder = order.createdAt;
                }
            } else {
                map.set(order.customerEmail, {
                    email: order.customerEmail,
                    name: order.customerName,
                    totalOrders: 1,
                    totalSpent: order.totalAmount,
                    lastOrder: order.createdAt,
                    phone: order.customerPhone || '—',
                    city: order.shippingAddress?.split(',').pop()?.trim() || '—',
                });
            }
        }
        customers = Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);
    } catch (e: any) {
        error = e.message;
    }

    const getTier = (spent: number) => {
        if (spent >= 500) return { label: 'Gold', color: '#f59e0b' };
        if (spent >= 200) return { label: 'Silver', color: '#94a3b8' };
        return { label: 'Bronze', color: '#b45309' };
    };

    return (
        <div className={styles.adminContainer}>
            <div className={styles.pageHeader}>
                <h1>Customers</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className={styles.kpiCard} style={{ padding: '0.75rem 1rem' }}>
                        <Users size={16} style={{ color: '#a855f7' }} />
                        <span style={{ fontWeight: 800 }}>{customers.length} total</span>
                    </div>
                </div>
            </div>

            {error && <div className={styles.errorBanner}><strong>Error:</strong> {error}</div>}

            <div className={styles.card}>
                <div className={styles.tableWrapper}>
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Tier</th>
                                <th>Orders</th>
                                <th>Total Spent</th>
                                <th>Last Order</th>
                                <th>Phone</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => {
                                const tier = getTier(customer.totalSpent);
                                return (
                                    <tr key={customer.email}>
                                        <td>
                                            <div className={styles.customerCell}>
                                                <div className={styles.avatar}>{customer.name.charAt(0).toUpperCase()}</div>
                                                <div>
                                                    <div className={styles.customerName}>{customer.name}</div>
                                                    <div className={styles.customerEmail}>{customer.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '20px',
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                background: `${tier.color}22`,
                                                color: tier.color,
                                                letterSpacing: '0.5px',
                                            }}>
                                                {tier.label}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: 700, color: '#fff' }}>{customer.totalOrders}</td>
                                        <td className={styles.amountCell}>${customer.totalSpent.toFixed(2)}</td>
                                        <td className={styles.dateCell}>
                                            {customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : '—'}
                                        </td>
                                        <td style={{ color: '#888' }}>{customer.phone}</td>
                                        <td style={{ color: '#888' }}>{customer.city}</td>
                                    </tr>
                                );
                            })}
                            {customers.length === 0 && (
                                <tr>
                                    <td colSpan={7}>
                                        <div className={styles.emptyState}>
                                            <Users size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                            <h3>No customers yet</h3>
                                            <p>Customers will appear here once orders are placed.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
