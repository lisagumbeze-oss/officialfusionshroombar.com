export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import CheckoutForm from './CheckoutForm';

export const metadata = {
    title: 'Secure Checkout | Fusion Shroom Bars',
};

export default async function CheckoutPage() {
    // Fetch active manual payment methods directly from DB on the server
    const paymentMethods = await prisma.manualPaymentMethod.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
    });

    const shippingSettings = await (prisma as any).shippingSetting.findMany();

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem 4rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Secure Checkout
                </h1>
                <p>Complete your order using our trusted manual payment methods.</p>
            </header>

            <CheckoutForm 
                dbPaymentMethods={paymentMethods} 
                shippingSettings={shippingSettings}
            />
        </div>
    );
}
