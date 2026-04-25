'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, Download, ChevronRight, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import styles from '../admin.module.css';

interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    items: any[];
}

export default function OrdersList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/orders?status=${statusFilter}&q=${searchQuery}`);
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    }, [statusFilter, searchQuery]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING': return <Clock size={14} />;
            case 'PROCESSING': return <Package size={14} />;
            case 'SHIPPED': return <Truck size={14} />;
            case 'COMPLETED': return <CheckCircle size={14} />;
            default: return null;
        }
    };

    const handleExport = () => {
        const headers = ["Order ID", "Customer", "Email", "Status", "Total", "Date"];
        const rows = orders.map(o => `${o.id},${o.customerName},${o.customerEmail},${o.status},${o.totalAmount},${new Date(o.createdAt).toLocaleDateString()}`);
        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className={styles.card}>
            <div className={styles.toolbar} style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className={styles.searchContainer} style={{ maxWidth: '300px' }}>
                    <Search size={18} className={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder="Search orders..." 
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <select 
                        className={styles.filterSelect}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: 'white',
                            padding: '0 1rem',
                            fontSize: '0.85rem'
                        }}
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>

                    <button onClick={handleExport} className={styles.btnSecondary} style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Download size={16} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.dataTable}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '4rem' }}>Loading orders...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '4rem' }}>No orders found.</td></tr>
                        ) : orders.map(order => (
                            <tr key={order.id}>
                                <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#a855f7' }}>#{order.id.slice(-8).toUpperCase()}</td>
                                <td>
                                    <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#666' }}>{order.customerEmail}</div>
                                </td>
                                <td style={{ fontSize: '0.85rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>{order.items.length} items</td>
                                <td style={{ fontWeight: 700 }}>${order.totalAmount.toFixed(2)}</td>
                                <td>
                                    <span className={`${styles.statusPill} ${styles[order.status.toLowerCase()]}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', width: 'fit-content' }}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <Link href={`/admin/orders/${order.id}`} className={styles.actionBtn} style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                                        <Eye size={14} />
                                        <span>Details</span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
