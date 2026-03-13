import styles from './page.module.css';
import prisma from '@/lib/prisma';
import Image from 'next/image';
export const dynamic = 'force-dynamic';

import Link from 'next/link';

export default async function BlogPage() {
    let posts = [];
    let dbError = false;

    try {
        posts = await (prisma as any).blogPost.findMany({
            where: { isPublic: true },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error('[BlogPage] Database error:', error);
        dbError = true;
    }

    return (
        <div className={styles.blogPage}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <p className={styles.subtitle}>FUSION LATEST UPDATES</p>
                    <h1 className={styles.title}>The Psychedelic Guide</h1>
                    <p className={styles.lead}>Insights, news, and education from the world of premium psilocybin.</p>
                </div>
            </header>

            <div className={styles.container}>
                {dbError ? (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,100,100,0.05)', borderRadius: '12px', border: '1px solid rgba(255,100,100,0.1)', margin: '2rem 0' }}>
                        <h2 style={{ color: '#ff6b6b' }}>Blog Temporarily Unavailable</h2>
                        <p>We're having trouble connecting to our update feed. Please try again in a few moments.</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.grid}>
                            {posts.map((post: any) => (
                                <article key={post.id} className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        {post.image ? (
                                            <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
                                        ) : (
                                            <div className={styles.placeholder}>FUSION</div>
                                        )}
                                    </div>
                                    <div className={styles.cardContent}>
                                        <div className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</div>
                                        <h2>{post.title}</h2>
                                        <p>{post.excerpt}</p>
                                        <Link href={`/blog/${post.slug}`} className={styles.readMore}>READ ARTICLE &rarr;</Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                        {posts.length === 0 && (
                            <div className={styles.empty}>
                                <p>No blog posts yet. Check back daily!</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
