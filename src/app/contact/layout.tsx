import type { Metadata } from 'next';

import { getPageMetadata } from '@/lib/metadata-utils';

export async function generateMetadata(): Promise<Metadata> {
    const fallback: Metadata = {
        title: 'Contact Us | 24/7 Support | Official Fusion Shroom Bars',
        description: 'Have questions about Fusion Shroom Bars? Our support team is available 24/7 to help with orders, product information, and more.',
    };
    return await getPageMetadata("/contact", fallback);
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
