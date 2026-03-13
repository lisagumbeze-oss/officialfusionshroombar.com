import styles from './page.module.css';
import prisma from '@/lib/prisma';
import Image from 'next/image';
export const dynamic = 'force-dynamic';

import Link from 'next/link';

export default async function BlogPage() {
    const posts = await (prisma as any).blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    });

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
            </div>
        </div>
    );
}
