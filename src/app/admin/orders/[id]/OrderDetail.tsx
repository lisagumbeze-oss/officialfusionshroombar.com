'use client';

import { useState, useEffect } from 'react';
import { 
    Clock, Package, Truck, CheckCircle, AlertCircle, 
    User, Mail, Phone, MapPin, CreditCard, 
    FileText, ExternalLink, Save, ArrowRight
} from 'lucide-react';
import styles from '../../admin.module.css';
import { useToast } from '@/context/ToastContext';

interface OrderDetailProps {
    id: string;
}

export default function OrderDetail({ id }: OrderDetailProps) {
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [formData, setFormData] = useState({
        status: '',
        trackingNumber: '',
        trackingUrl: '',
        notes: ''
    });
    const { showToast } = useToast();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/admin/orders/${id}`);
                const data = await res.json();
                setOrder(data);
                setFormData({
                    status: data.status,
                    trackingNumber: data.trackingNumber || '',
                    trackingUrl: data.trackingUrl || '',
                    notes: data.notes || ''
                });
            } catch (error) {
                console.error('Failed to fetch order:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    const handleUpdate = async () => {
        setUpdating(true);
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                const updated = await res.json();
                setOrder(updated);
                showToast('Order updated successfully');
            }
        } catch (error) {
            showToast('Failed to update order', 'error');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading order details...</div>;
    if (!order) return <div className={styles.errorBanner}>Order not found</div>;

    const steps = [
        { key: 'PENDING', label: 'Order Placed', icon: <Clock /> },
        { key: 'PROCESSING', label: 'Processing', icon: <Package /> },
        { key: 'SHIPPED', label: 'Shipped', icon: <Truck /> },
        { key: 'COMPLETED', label: 'Delivered', icon: <CheckCircle /> }
    ];

    const currentStepIndex = steps.findIndex(s => s.key === order.status);

    return (
        <div className={styles.dashboardColumns}>
            {/* Left Column: Details & Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Fulfillment Timeline */}
                <div className={styles.card} style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '24px', left: '0', right: '0', height: '2px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }}></div>
                        <div style={{ position: 'absolute', top: '24px', left: '0', width: `${(currentStepIndex / (steps.length - 1)) * 100}%`, height: '2px', background: 'var(--primary)', zIndex: 0, transition: 'width 0.5s' }}></div>
                        
                        {steps.map((step, i) => (
                            <div key={step.key} style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ 
                                    width: '48px', 
                                    height: '48px', 
                                    borderRadius: '50%', 
                                    background: i <= currentStepIndex ? 'var(--primary)' : '#1a1a1a',
                                    color: i <= currentStepIndex ? 'white' : '#444',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    border: `4px solid ${i <= currentStepIndex ? 'rgba(168, 85, 247, 0.2)' : 'transparent'}`,
                                    transition: 'all 0.3s'
                                }}>
                                    {step.icon}
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: i <= currentStepIndex ? 'white' : '#666' }}>{step.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Items List */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}><h2>Order Items ({order.items.length})</h2></div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item: any) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden', background: '#222' }}>
                                                    {item.product?.image && <img src={item.product.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                                                </div>
                                                <div style={{ fontWeight: 600 }}>{item.productName}</div>
                                            </div>
                                        </td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>x{item.quantity}</td>
                                        <td style={{ fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#888' }}>Subtotal</span>
                                <span>${(order.totalAmount - order.shippingPrice).toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#888' }}>Shipping</span>
                                <span>${order.shippingPrice.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem', fontSize: '1.1rem', fontWeight: 800 }}>
                                <span>Total</span>
                                <span style={{ color: 'var(--primary)' }}>${order.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Internal Notes */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}><h2>Internal Admin Notes</h2></div>
                    <div style={{ padding: '1.25rem' }}>
                        <textarea 
                            className={styles.formInput} 
                            style={{ minHeight: '120px', resize: 'vertical' }}
                            placeholder="Add internal notes about this order..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Right Column: Customer & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Actions Card */}
                <div className={styles.card} style={{ padding: '1.5rem', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.1)' }}>
                    <h2 style={{ marginBottom: '1.25rem', fontSize: '1rem' }}>Order Management</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', display: 'block', marginBottom: '0.5rem' }}>STATUS</label>
                            <select 
                                className={styles.formInput}
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="PENDING">Pending</option>
                                <option value="PROCESSING">Processing</option>
                                <option value="SHIPPED">Shipped</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', display: 'block', marginBottom: '0.5rem' }}>TRACKING NUMBER</label>
                            <input 
                                type="text" 
                                className={styles.formInput} 
                                value={formData.trackingNumber}
                                placeholder="e.g. USPS123456789"
                                onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', display: 'block', marginBottom: '0.5rem' }}>TRACKING URL</label>
                            <input 
                                type="text" 
                                className={styles.formInput} 
                                value={formData.trackingUrl}
                                placeholder="https://..."
                                onChange={(e) => setFormData({ ...formData, trackingUrl: e.target.value })}
                            />
                        </div>
                        <button 
                            className={styles.btnPrimary} 
                            onClick={handleUpdate}
                            disabled={updating}
                            style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
                        >
                            <Save size={18} />
                            <span>{updating ? 'Updating...' : 'Save Changes'}</span>
                        </button>
                    </div>
                </div>

                {/* Customer Details */}
                <div className={styles.card} style={{ padding: '1.5rem' }}>
                    <h2 style={{ marginBottom: '1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={18} style={{ color: 'var(--primary)' }} />
                        Customer Info
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div className={styles.avatar}>{order.customerName.charAt(0).toUpperCase()}</div>
                            <div>
                                <div style={{ fontWeight: 700 }}>{order.customerName}</div>
                                <div style={{ fontSize: '0.75rem', color: '#888' }}>Customer ID: #{order.id.slice(0, 8)}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#ccc' }}>
                            <Mail size={16} />
                            <span>{order.customerEmail}</span>
                        </div>
                        {order.customerPhone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#ccc' }}>
                                <Phone size={16} />
                                <span>{order.customerPhone}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Shipping Details */}
                <div className={styles.card} style={{ padding: '1.5rem' }}>
                    <h2 style={{ marginBottom: '1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={18} style={{ color: '#ec4899' }} />
                        Shipping Details
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', marginBottom: '0.5rem' }}>ADDRESS</div>
                            <div style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#fff' }}>{order.shippingAddress}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: '#888' }}>Method</span>
                            <span style={{ fontWeight: 700 }}>{order.shippingMethod || 'Standard Shipping'}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Details */}
                <div className={styles.card} style={{ padding: '1.5rem' }}>
                    <h2 style={{ marginBottom: '1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CreditCard size={18} style={{ color: '#10b981' }} />
                        Payment
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: '#888' }}>Method</span>
                            <span style={{ fontWeight: 700 }}>{order.paymentMethod?.name || 'Manual Payment'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: '#888' }}>Status</span>
                            <span className={styles.statusPill} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>PAID</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
