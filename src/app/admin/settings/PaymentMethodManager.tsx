'use client';
import { useState } from 'react';
import { Edit2, Trash2, X, Check, Power } from 'lucide-react';
import styles from '../admin.module.css';

export default function PaymentMethodManager({ 
    methods, 
    saveAction, 
    deleteAction, 
    toggleAction 
}: { 
    methods: any[],
    saveAction: (formData: FormData) => void,
    deleteAction: (formData: FormData) => void,
    toggleAction: (formData: FormData) => void
}) {
    const [editingMethod, setEditingMethod] = useState<any>(null);

    const handleEdit = (method: any) => {
        setEditingMethod(method);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingMethod(null);
    };

    return (
        <div className={styles.dashboardGrid}>
            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2>{editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}</h2>
                    {editingMethod && (
                        <button onClick={cancelEdit} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}>
                            <X size={14} /> CANCEL
                        </button>
                    )}
                </div>
                <form 
                    action={(formData) => {
                        saveAction(formData);
                        setEditingMethod(null);
                    }} 
                    className={styles.paymentForm}
                >
                    <input type="hidden" name="id" value={editingMethod?.id || ''} />
                    <div className={styles.inputGroup}>
                        <label>Method Name (e.g., Apple Cash, Zelle)</label>
                        <input 
                            type="text" 
                            name="name" 
                            required 
                            placeholder="Bitcoin" 
                            defaultValue={editingMethod?.name || ''} 
                            key={editingMethod?.id + '_name'}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Payment Details (Handle/Address)</label>
                        <input 
                            type="text" 
                            name="details" 
                            required 
                            placeholder="bc1qxy2kgdygjrsqtzq..." 
                            defaultValue={editingMethod?.details || ''}
                            key={editingMethod?.id + '_details'}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Extra Instructions (Optional)</label>
                        <textarea 
                            name="instructions" 
                            placeholder="Please send the exact amount."
                            defaultValue={editingMethod?.instructions || ''}
                            key={editingMethod?.id + '_instructions'}
                        ></textarea>
                    </div>
                    
                    {editingMethod && (
                        <div className={styles.inputGroup}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input 
                                    type="checkbox" 
                                    name="isActive" 
                                    defaultChecked={editingMethod.isActive} 
                                    style={{ width: 'auto' }} 
                                    key={editingMethod.id + '_active'}
                                />
                                <span>Method is Enabled</span>
                            </label>
                        </div>
                    )}

                    <button type="submit" className={`${styles.submitBtn} premium-gradient`}>
                        {editingMethod ? 'Update Method' : 'Save Method'}
                    </button>
                </form>
            </section>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2>Active Payment Methods</h2>
                </div>
                <div className={styles.methodList}>
                    {methods.length === 0 ? (
                        <p className={styles.emptyState}>No manual payment methods configured.</p>
                    ) : (
                        methods.map(method => (
                            <div key={method.id} className={styles.methodItem}>
                                <div className={styles.methodHeader}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <strong>{method.name}</strong>
                                        <span className={method.isActive ? styles.activeBadge : styles.inactiveBadge}>
                                            {method.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <div className={styles.actions} style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button 
                                            onClick={() => handleEdit(method)} 
                                            className={styles.editBtn}
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        
                                        <form action={toggleAction}>
                                            <input type="hidden" name="id" value={method.id} />
                                            <button 
                                                type="submit" 
                                                className={styles.editBtn}
                                                title={method.isActive ? "Disable" : "Enable"}
                                                style={{ color: method.isActive ? '#ff4444' : '#44ff44' }}
                                            >
                                                <Power size={16} />
                                            </button>
                                        </form>

                                        <form action={(formData) => {
                                            if (confirm(`Delete ${method.name}?`)) {
                                                deleteAction(formData);
                                            }
                                        }}>
                                            <input type="hidden" name="id" value={method.id} />
                                            <button 
                                                type="submit" 
                                                className={styles.deleteBtn}
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <p className={styles.methodDetails}>{method.details}</p>
                                {method.instructions && <p className={styles.methodInstructions}>{method.instructions}</p>}
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
