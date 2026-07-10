import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import styles from './success.module.css';

export const metadata = {
    title: 'Order Confirmed | Fusion Shroom Bars',
};

export default async function OrderSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedParams = await searchParams;
    const orderId = resolvedParams.orderId;
    const displayId = orderId?.toString().slice(-6).toUpperCase() || 'UNKNOWN';

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.icon} aria-hidden>
                    <CheckCircle2 size={32} />
                </div>
                <h1 className={styles.title}>Order confirmed</h1>
                <p className={styles.lead}>
                    Thank you for your order. Your order number is{' '}
                    <span className={styles.orderId}>#{displayId}</span>.
                </p>
                <p className={styles.note}>
                    Please follow the payment instructions provided during checkout to complete your transaction.
                    Your order will remain pending until payment is verified, then it will be prepared for shipment.
                </p>
                <Link href="/" className="btn btn-primary">Return to home</Link>
            </div>
        </div>
    );
}
