import Sidebar from '@/components/admin/Sidebar';
import styles from './admin.module.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.adminLayout}>
            <Sidebar />
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
