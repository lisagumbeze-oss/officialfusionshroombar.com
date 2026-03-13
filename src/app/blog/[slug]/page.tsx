import prisma from '@/lib/prisma';
import styles from '../page.module.css';
import Image from 'next/image';
export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post = null;

    try {
        post = await (prisma as any).blogPost.findUnique({
            where: { 
                slug,
                isPublic: true
            }
        });
    } catch (error) {
        console.error('[BlogPost] Database error:', error);
    }

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
                    {post.content.split('\n').map((para: string, i: number) => {
                        if (!para.trim()) return <br key={i} />;
                        
                        // Simple header check
                        if (para.startsWith('# ')) return <h1 key={i}>{para.substring(2)}</h1>;
                        if (para.startsWith('## ')) return <h2 key={i}>{para.substring(3)}</h2>;
                        if (para.startsWith('### ')) return <h3 key={i}>{para.substring(4)}</h3>;
                        
                        // Simple quote check
                        if (para.startsWith('> ')) return <blockquote key={i} className={styles.quote}>{para.substring(2)}</blockquote>;

                        // Support for basic tags like **bold**, *italic*, <u>underline</u>
                        let formattedText: any = para;
                        
                        // Note: This is a very simple parser. In a real app, use a markdown library.
                        const renderFormatted = (text: string) => {
                            // Bold
                            let parts = text.split(/(\*\*.*?\*\*)/g);
                            return parts.map((part, index) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                    return <strong key={index}>{part.slice(2, -2)}</strong>;
                                }
                                // Italic
                                let iParts = part.split(/(\*.*?\*)/g);
                                return iParts.map((iPart, iIndex) => {
                                    if (iPart.startsWith('*') && iPart.endsWith('*')) {
                                        return <em key={`${index}-${iIndex}`}>{iPart.slice(1, -1)}</em>;
                                    }
                                    return iPart;
                                });
                            });
                        };

                        return <p key={i}>{renderFormatted(para)}</p>;
                    })}
                </div>
            </div>
        </article>
    );
}
