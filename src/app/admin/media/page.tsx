export const dynamic = 'force-dynamic';

import styles from '../admin.module.css';
import MediaLibrary from './MediaLibrary';

export const metadata = { title: 'Media Library | Fusion Admin' };

export default async function MediaPage() {
    return (
        <div className={styles.adminContainer}>
            <div className={styles.pageHeader}>
                <h1>Media Library</h1>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>Manage and organize your store assets.</p>
            </div>
            <MediaLibrary />
        </div>
    );
}
