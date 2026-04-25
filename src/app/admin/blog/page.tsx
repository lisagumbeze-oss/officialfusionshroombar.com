export const dynamic = 'force-dynamic';
import styles from '../admin.module.css';
import BlogManager from './BlogManager';

export const metadata = { title: 'Blog & CMS | Fusion Admin' };

export default function BlogPage() {
    return (
        <div className={styles.adminContainer}>
            <div className={styles.pageHeader}>
                <h1>Blog & CMS</h1>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>Write articles, manage categories, and optimize for SEO.</p>
            </div>
            <BlogManager />
        </div>
    );
}
