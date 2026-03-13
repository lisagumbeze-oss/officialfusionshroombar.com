import Link from 'next/link';
import { Suspense } from 'react';

export const metadata = {
    title: 'Order Confirmed | Fusion Shroom Bars',
};

// Next.js 13+ requires search params components to be wrapped in a suspense boundary if they use useSearchParams, 
// but since this is a server component, we can access searchParams directly.
export default async function OrderSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedParams = await searchParams;
    const orderId = resolvedParams.orderId;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '8rem 2rem 4rem', textAlign: 'center', minHeight: '60vh' }}>
            <div style={{ background: 'rgba(40, 167, 69, 0.1)', padding: '3rem', borderRadius: '12px', border: '1px solid rgba(40, 167, 69, 0.2)' }}>
                <h1 style={{ color: '#28a745', marginBottom: '1rem', fontSize: '2.5rem' }}>Order Confirmed!</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                    Thank you for your order. Your order number is <strong>#{orderId?.toString().slice(-6).toUpperCase() || 'UNKNOWN'}</strong>.
                </p>
                <p style={{ color: '#ccc', marginBottom: '3rem' }}>
                    Please follow the payment instructions provided during checkout to complete your transaction.
                    Your order will remain in a "Pending" state and will be shipped once payment is verified.
                </p>

                <Link
                    href="/"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        background: 'var(--primary)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold'
                    }}
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
}
