import styles from './shop.module.css';

export default function ShopLoading() {
    return (
        <div className={styles.shopContainer}>
            <div className={styles.shopHeader}>
                <div className={styles.skeleton} style={{ height: '3rem', width: '300px', margin: '0 auto 1rem' }}></div>
                <div className={styles.skeleton} style={{ height: '1rem', width: '500px', margin: '0 auto' }}></div>
            </div>

            <div className={styles.filtersWrap}>
                <div className={styles.skeleton} style={{ height: '2.5rem', width: '100%', maxWidth: '480px', borderRadius: '999px', marginBottom: '1rem' }} />
                <div className={styles.filterToolbar}>
                    <div className={styles.skeleton} style={{ flex: 1, height: '2.75rem', borderRadius: '999px' }} />
                    <div className={styles.skeleton} style={{ width: '140px', height: '2.75rem', borderRadius: '999px' }} />
                    <div className={styles.skeleton} style={{ width: '100px', height: '2.75rem', borderRadius: '999px' }} />
                </div>
            </div>

            <div className={styles.productGrid}>
                {[...Array(8)].map((_, i) => (
                    <div key={i} className={styles.productCard} style={{ pointerEvents: 'none' }}>
                        <div className={styles.skeleton} style={{ width: '100%', aspectRatio: '1', borderRadius: '16px', marginBottom: '1.25rem' }}></div>
                        <div className={styles.skeleton} style={{ height: '1.2rem', width: '80%', marginBottom: '0.5rem' }}></div>
                        <div className={styles.skeleton} style={{ height: '0.8rem', width: '40%', marginBottom: '1rem' }}></div>
                        <div className={styles.skeleton} style={{ height: '1rem', width: '30%', marginBottom: '1.5rem' }}></div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <div className={styles.skeleton} style={{ flex: 2, height: '2.5rem', borderRadius: '12px' }}></div>
                            <div className={styles.skeleton} style={{ flex: 1, height: '2.5rem', borderRadius: '12px' }}></div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
