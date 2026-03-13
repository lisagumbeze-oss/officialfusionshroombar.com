import prisma from '@/lib/prisma';
import styles from '../page.module.css';
import Image from 'next/image';
export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    const post = await (prisma as any).blogPost.findUnique({
        where: { slug }
    });

    if (!post) notFound();

    return (
        <article className={styles.postPage}>
            <header className={styles.postHeader}>
                <div className={styles.container}>
                    <div className={styles.postDate}>{new Date(post.createdAt).toLocaleDateString()}</div>
                    <h1>{post.title}</h1>
                </div>
            </header>

            <div className={styles.container}>
                {post.image && (
                    <div className={styles.mainImage}>
                        <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                )}
                
                <div className={styles.content}>
                    {post.content.split('\n').map((para: string, i: number) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </div>
        </article>
    );
}
