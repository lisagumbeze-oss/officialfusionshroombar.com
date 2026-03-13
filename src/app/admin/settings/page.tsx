export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import styles from '../admin.module.css';
import { revalidatePath } from 'next/cache';

export const metadata = {
    title: 'Admin Settings | Fusion Shroom Bars',
};

export default async function SettingsPage() {
    const paymentMethods = await prisma.manualPaymentMethod.findMany({
        orderBy: { createdAt: 'desc' },
    });

    const shippingSettings = await (prisma as any).shippingSetting.findMany();
    
    // Ensure both types exist
    const localShipping = shippingSettings.find((s: any) => s.type === 'LOCAL') || {
        type: 'LOCAL',
        category1Name: 'Standard',
        category1Price: 15,
        category2Name: 'Express',
        category2Price: 35
    };

    const internationalShipping = shippingSettings.find((s: any) => s.type === 'INTERNATIONAL') || {
        type: 'INTERNATIONAL',
        category1Name: 'Global Standard',
        category1Price: 45,
        category2Name: 'Priority Express',
        category2Price: 85
    };

    async function addPaymentMethod(formData: FormData) {
        'use server';
        const name = formData.get('name') as string;
        const details = formData.get('details') as string;
        const instructions = formData.get('instructions') as string;

        if (name && details) {
            await prisma.manualPaymentMethod.create({
                data: { name, details, instructions },
            });
            revalidatePath('/admin/settings');
        }
    }

    async function updateShipping(formData: FormData) {
        'use server';
        const type = formData.get('type') as string;
        const c1n = formData.get('category1Name') as string;
        const c1p = parseFloat(formData.get('category1Price') as string);
        const c2n = formData.get('category2Name') as string;
        const c2p = parseFloat(formData.get('category2Price') as string);

        await (prisma as any).shippingSetting.upsert({
            where: { id: (formData.get('id') as string) || 'temp' },
            update: {
                category1Name: c1n,
                category1Price: c1p,
                category2Name: c2n,
                category2Price: c2p
            },
            create: {
                type,
                category1Name: c1n,
                category1Price: c1p,
                category2Name: c2n,
                category2Price: c2p
            }
        });
        revalidatePath('/admin/settings');
    }

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader} style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <h1>Settings</h1>
                <p>Configure shipping rates, payment methods, and store preferences.</p>
            </header>

            <div className={styles.dashboardGrid}>
                {/* Shipping Settings */}
                <section className={styles.card} style={{ gridColumn: 'span 2' }}>
                    <div className={styles.cardHeader}>
                        <h2>Shipping Rates</h2>
                    </div>
                    <div className={styles.shippingGrid} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '1.5rem' }}>
                        {/* Local Shipping */}
                        <form action={updateShipping} className={styles.paymentForm}>
                            <input type="hidden" name="type" value="LOCAL" />
                            <input type="hidden" name="id" value={(localShipping as any).id || ''} />
                            <h3>Local Shipping</h3>
                            <div className={styles.inputGroup}>
                                <label>Category 1 Name</label>
                                <input type="text" name="category1Name" defaultValue={localShipping.category1Name} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Category 1 Price ($)</label>
                                <input type="number" step="0.01" name="category1Price" defaultValue={localShipping.category1Price} required />
                            </div>
                            <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                                <label>Category 2 Name</label>
                                <input type="text" name="category2Name" defaultValue={localShipping.category2Name} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Category 2 Price ($)</label>
                                <input type="number" step="0.01" name="category2Price" defaultValue={localShipping.category2Price} required />
                            </div>
                            <button type="submit" className={`${styles.submitBtn} premium-gradient`}>Update Local Rates</button>
                        </form>

                        {/* International Shipping */}
                        <form action={updateShipping} className={styles.paymentForm}>
                            <input type="hidden" name="type" value="INTERNATIONAL" />
                            <input type="hidden" name="id" value={(internationalShipping as any).id || ''} />
                            <h3>International Shipping</h3>
                            <div className={styles.inputGroup}>
                                <label>Category 1 Name</label>
                                <input type="text" name="category1Name" defaultValue={internationalShipping.category1Name} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Category 1 Price ($)</label>
                                <input type="number" step="0.01" name="category1Price" defaultValue={internationalShipping.category1Price} required />
                            </div>
                            <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                                <label>Category 2 Name</label>
                                <input type="text" name="category2Name" defaultValue={internationalShipping.category2Name} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Category 2 Price ($)</label>
                                <input type="number" step="0.01" name="category2Price" defaultValue={internationalShipping.category2Price} required />
                            </div>
                            <button type="submit" className={`${styles.submitBtn} premium-gradient`}>Update International Rates</button>
                        </form>
                    </div>
                </section>

                {/* Payment Methods */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Add Payment Method</h2>
                    </div>
                    <form action={addPaymentMethod} className={styles.paymentForm}>
                        <div className={styles.inputGroup}>
                            <label>Method Name (e.g., Apple Cash, Zelle)</label>
                            <input type="text" name="name" required placeholder="Bitcoin" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Payment Details (Handle/Address)</label>
                            <input type="text" name="details" required placeholder="bc1qxy2kgdygjrsqtzq..." />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Extra Instructions (Optional)</label>
                            <textarea name="instructions" placeholder="Please send the exact amount."></textarea>
                        </div>
                        <button type="submit" className={`${styles.submitBtn} premium-gradient`}>Save Method</button>
                    </form>
                </section>

                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Active Payment Methods</h2>
                    </div>
                    <div className={styles.methodList}>
                        {paymentMethods.length === 0 ? (
                            <p className={styles.emptyState}>No manual payment methods configured.</p>
                        ) : (
                            paymentMethods.map(method => (
                                <div key={method.id} className={styles.methodItem}>
                                    <div className={styles.methodHeader}>
                                        <strong>{method.name}</strong>
                                        <span className={method.isActive ? styles.activeBadge : styles.inactiveBadge}>
                                            {method.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className={styles.methodDetails}>{method.details}</p>
                                    {method.instructions && <p className={styles.methodInstructions}>{method.instructions}</p>}
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
