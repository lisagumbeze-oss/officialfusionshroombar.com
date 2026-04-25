'use client';

import { useState } from 'react';
import styles from '../admin.module.css';
import { Plus, X, Copy, Trash2, Tag } from 'lucide-react';

interface Coupon {
    id: string;
    code: string;
    discountType: string;
    discountValue: number;
    minOrderAmount: number;
    expiryDate: string | null;
    usageLimit: number | null;
    usageCount: number;
    isActive: boolean;
    createdAt: string;
}

export default function CouponsTable({ initialCoupons, error }: { initialCoupons: Coupon[]; error: string | null }) {
    const [coupons, setCoupons] = useState(initialCoupons);
    const [showCreate, setShowCreate] = useState(false);
    const [search, setSearch] = useState('');
    const [saving, setSaving] = useState(false);
    const [copied, setCopied] = useState('');
    const [form, setForm] = useState({
        code: '',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        minOrderAmount: 0,
        expiryDate: '',
        usageLimit: '',
        isActive: true,
    });

    const generateCode = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = 'FUSION';
        for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
        setForm({ ...form, code });
    };

    const handleCreate = async () => {
        if (!form.code) return;
        setSaving(true);
        try {
            const res = await fetch('/api/admin/coupons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    usageLimit: form.usageLimit ? parseInt(form.usageLimit) : null,
                    expiryDate: form.expiryDate || null,
                }),
            });
            if (res.ok) {
                const newCoupon = await res.json();
                setCoupons([newCoupon, ...coupons]);
                setShowCreate(false);
                setForm({ code: '', discountType: 'PERCENTAGE', discountValue: 10, minOrderAmount: 0, expiryDate: '', usageLimit: '', isActive: true });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this coupon?')) return;
        try {
            await fetch(`/api/admin/coupons?id=${id}`, { method: 'DELETE' });
            setCoupons(coupons.filter(c => c.id !== id));
        } catch (e) {
            console.error(e);
        }
    };

    const handleToggle = async (id: string, isActive: boolean) => {
        try {
            const res = await fetch('/api/admin/coupons', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isActive: !isActive }),
            });
            if (res.ok) {
                setCoupons(coupons.map(c => c.id === id ? { ...c, isActive: !isActive } : c));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(''), 2000);
    };

    const filtered = coupons.filter(c => c.code.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <div className={styles.pageHeader}>
                <h1>Coupons & Promotions</h1>
                <button className={styles.primaryBtn} onClick={() => setShowCreate(true)}>
                    <Plus size={16} /> Create Coupon
                </button>
            </div>

            {error && <div className={styles.errorBanner}><strong>Error:</strong> {error}</div>}

            <div className={styles.filtersBar}>
                <input 
                    className={styles.filterInput} 
                    placeholder="Search by coupon code..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>

            <div className={styles.card}>
                <div className={styles.tableWrapper}>
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Discount</th>
                                <th>Min. Order</th>
                                <th>Usage</th>
                                <th>Expiry</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(coupon => (
                                <tr key={coupon.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Tag size={14} style={{ color: '#a855f7' }} />
                                            <strong style={{ color: '#fff', fontFamily: 'monospace' }}>{coupon.code}</strong>
                                            <button 
                                                onClick={() => copyCode(coupon.code)} 
                                                style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: '2px' }}
                                                title="Copy code"
                                            >
                                                <Copy size={12} />
                                            </button>
                                            {copied === coupon.code && <span style={{ fontSize: '0.7rem', color: '#10b981' }}>Copied!</span>}
                                        </div>
                                    </td>
                                    <td style={{ color: '#fff', fontWeight: 700 }}>
                                        {coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}%` : `$${coupon.discountValue.toFixed(2)}`}
                                    </td>
                                    <td>${coupon.minOrderAmount.toFixed(2)}</td>
                                    <td>
                                        {coupon.usageCount}{coupon.usageLimit ? ` / ${coupon.usageLimit}` : ' / ∞'}
                                    </td>
                                    <td className={styles.dateCell}>
                                        {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : 'Never'}
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => handleToggle(coupon.id, coupon.isActive)}
                                            className={`${styles.statusPill} ${coupon.isActive ? styles.completed : styles.cancelled}`}
                                            style={{ cursor: 'pointer', border: 'none' }}
                                        >
                                            {coupon.isActive ? 'ACTIVE' : 'DISABLED'}
                                        </button>
                                    </td>
                                    <td>
                                        <button className={styles.deleteBtn} onClick={() => handleDelete(coupon.id)}>
                                            <Trash2 size={12} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={7} style={{ textAlign: 'center', color: '#666', padding: '3rem' }}>No coupons found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Coupon Drawer */}
            {showCreate && (
                <div className={styles.modalOverlay} onClick={() => setShowCreate(false)}>
                    <div className={styles.modalDrawer} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Create Coupon</h2>
                            <button className={styles.closeModalBtn} onClick={() => setShowCreate(false)}><X size={18} /></button>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Coupon Code</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input className={styles.formInput} style={{ flex: 1 }} value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} placeholder="e.g. SAVE20" />
                                <button className={styles.primaryBtn} onClick={generateCode} style={{ whiteSpace: 'nowrap' }}>Generate</button>
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Discount Type</label>
                                <select className={styles.filterSelect} value={form.discountType} onChange={e => setForm({...form, discountType: e.target.value})}>
                                    <option value="PERCENTAGE">Percentage (%)</option>
                                    <option value="FIXED">Fixed Amount ($)</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Discount Value</label>
                                <input className={styles.formInput} type="number" value={form.discountValue} onChange={e => setForm({...form, discountValue: parseFloat(e.target.value) || 0})} />
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Min. Order Amount</label>
                                <input className={styles.formInput} type="number" value={form.minOrderAmount} onChange={e => setForm({...form, minOrderAmount: parseFloat(e.target.value) || 0})} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Usage Limit</label>
                                <input className={styles.formInput} type="number" placeholder="Unlimited" value={form.usageLimit} onChange={e => setForm({...form, usageLimit: e.target.value})} />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Expiry Date</label>
                            <input className={styles.formInput} type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} />
                        </div>

                        {/* Preview */}
                        <div style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '12px', padding: '1rem', marginTop: '1rem' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#a855f7', letterSpacing: '1px', marginBottom: '0.5rem' }}>COUPON PREVIEW</div>
                            <p style={{ color: '#ccc', fontSize: '0.85rem', margin: 0 }}>
                                <strong style={{ color: '#fff' }}>{form.code || '...'}</strong> — {form.discountType === 'PERCENTAGE' ? `${form.discountValue}% off` : `$${form.discountValue.toFixed(2)} off`}
                                {form.minOrderAmount > 0 && ` orders over $${form.minOrderAmount.toFixed(2)}`}
                                {form.expiryDate && `, expires ${new Date(form.expiryDate).toLocaleDateString()}`}
                            </p>
                        </div>

                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setShowCreate(false)}>Cancel</button>
                            <button className={styles.saveBtn} onClick={handleCreate} disabled={saving || !form.code}>
                                {saving ? 'Creating...' : 'Create Coupon'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
