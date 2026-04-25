export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import CouponsTable from './CouponsTable';
import styles from '../admin.module.css';

export const metadata = { title: 'Coupons | Fusion Admin' };

export default async function CouponsPage() {
    let coupons: any[] = [];
    let error = null;

    try {
        coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    } catch (e: any) {
        error = e.message;
    }

    return (
        <div className={styles.adminContainer}>
            <CouponsTable initialCoupons={JSON.parse(JSON.stringify(coupons))} error={error} />
        </div>
    );
}
