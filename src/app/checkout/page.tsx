export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import CheckoutForm from './CheckoutForm';
import styles from './checkout.module.css';

export const metadata = {
  title: 'Secure Checkout | Fusion Shroom Bars',
};

export default async function CheckoutPage() {
  let paymentMethods: Awaited<ReturnType<typeof prisma.manualPaymentMethod.findMany>> = [];
  let shippingSettings: unknown[] = [];

  try {
    paymentMethods = await prisma.manualPaymentMethod.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    shippingSettings = await (prisma as any).shippingSetting.findMany();
  } catch (error) {
    console.error('[Checkout] Failed to load checkout settings:', error);
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span className="section-label">Checkout</span>
        <h1>Secure checkout</h1>
        <p>Complete your order using our trusted payment methods.</p>
      </header>

      <CheckoutForm
        dbPaymentMethods={paymentMethods}
        shippingSettings={shippingSettings}
      />
    </div>
  );
}
