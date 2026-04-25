'use client';

import { useState } from 'react';
import { Search, Package, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import styles from './track.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId) return;
        
        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const res = await fetch(`/api/orders/track?id=${orderId}`);
            const data = await res.json();
            if (res.ok) {
                setOrder(data);
            } else {
                setError(data.error || 'Order not found. Please check your ID.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { status: 'PENDING', label: 'Order Received', icon: <Clock size={20} />, desc: 'We have received your order request.' },
        { status: 'PROCESSING', label: 'Processing', icon: <Package size={20} />, desc: 'Payment confirmed. Preparing your items.' },
        { status: 'SHIPPED', label: 'Shipped', icon: <Truck size={20} />, desc: 'Your order is on its way to you.' },
        { status: 'COMPLETED', label: 'Delivered', icon: <CheckCircle2 size={20} />, desc: 'Order successfully delivered.' }
    ];

    const currentStepIndex = order ? steps.findIndex(s => s.status === order.status) : -1;

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1>Track Your Order</h1>
                        <p>Enter your Order ID to see live status updates</p>
                    </div>

                    <form onSubmit={handleTrack} className={styles.searchBox}>
                        <input 
                            type="text" 
                            placeholder="Enter Order ID (e.g. clx...)" 
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Searching...' : 'TRACK ORDER'}
                        </button>
                    </form>

                    {error && (
                        <div className={styles.errorCard}>
                            <AlertCircle size={20} />
                            <p>{error}</p>
                        </div>
                    )}

                    {order && (
                        <div className={styles.resultCard}>
                            <div className={styles.orderMeta}>
                                <div>
                                    <span className={styles.label}>Order ID:</span>
                                    <strong>#{order.id}</strong>
                                </div>
                                <div>
                                    <span className={styles.label}>Placed on:</span>
                                    <strong>{new Date(order.createdAt).toLocaleDateString()}</strong>
                                </div>
                            </div>

                            <div className={styles.trackingTimeline}>
                                {steps.map((step, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`${styles.timelineStep} ${idx <= currentStepIndex ? styles.active : ''}`}
                                    >
                                        <div className={styles.stepIconWrapper}>
                                            {step.icon}
                                        </div>
                                        <div className={styles.stepInfo}>
                                            <h3>{step.label}</h3>
                                            <p>{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.orderSummary}>
                                <h3>Order Summary</h3>
                                {order.items.map((item: any, i: number) => (
                                    <div key={i} className={styles.summaryRow}>
                                        <span>{item.quantity}x {item.productName}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className={styles.totalRow}>
                                    <span>Total Amount</span>
                                    <span>${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
