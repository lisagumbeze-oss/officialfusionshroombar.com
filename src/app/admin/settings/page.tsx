export const dynamic = 'force-dynamic';

import styles from '../admin.module.css';
import SettingsForm from './SettingsForm';

export const metadata = { title: 'Store Settings | Fusion Admin' };

export default async function SettingsPage() {
    return (
        <div className={styles.adminContainer}>
            <div className={styles.pageHeader}>
                <h1>Store Settings</h1>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>Configure your store identity, SEO, and system preferences.</p>
            </div>
            <SettingsForm />
        </div>
    );
}
