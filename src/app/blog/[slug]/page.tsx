import prisma from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Share2, Heart, Bookmark, ArrowRight, CheckCircle2, User, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BLOG_POST_SEO } from '@/lib/keywords';
import CommentForm from '@/components/CommentForm';

export const revalidate = 3600; // Incrementally regenerate page every hour

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await (prisma as any).blogPost.findUnique({
        where: { slug, isPublic: true }
    });

    if (!post) {
        return { title: 'Post Not Found | Fusion Shroom Bars' };
    }

    const tuned = BLOG_POST_SEO[slug];
    const title = tuned?.title || post.seoTitle || `${post.title} | Official Fusion Shroom Bars`;
    const description = tuned?.description || post.seoDescription || post.excerpt || post.content.substring(0, 160);
    const keywords = tuned?.keywords || (post.seoKeywords ? post.seoKeywords.split(',').map((k: string) => k.trim()) : undefined);

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: `https://officialfusionshroombar.com/blog/${slug}`,
        },
        openGraph: {
            title: tuned?.title || post.seoTitle || post.title,
            description,
            images: post.image ? [post.image] : [],
            type: 'article',
            publishedTime: post.createdAt.toISOString(),
            authors: ['Fusion Team'],
            tags: post.tags ? JSON.parse(post.tags) : []
        },
        twitter: {
            card: 'summary_large_image',
            title: tuned?.title || post.seoTitle || post.title,
            description,
            images: post.image ? [post.image] : [],
        }
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post: any = null;

    try {
        post = await (prisma as any).blogPost.findUnique({
            where: { slug, isPublic: true },
            include: {
                comments: {
                    orderBy: { createdAt: 'desc' },
                }
            }
        });
    } catch (error) {
        console.error('[BlogPost] Database error:', error);
    }

    if (!post) notFound();

    const tuned = BLOG_POST_SEO[slug];
    const displayTitle = tuned?.h1 || post.title;

    // Fetch related posts from DB
    let relatedPosts: any[] = [];
    try {
        relatedPosts = await (prisma as any).blogPost.findMany({
            where: { isPublic: true, slug: { not: slug } },
            take: 3,
            orderBy: { createdAt: 'desc' },
        });
    } catch (e) {}

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": displayTitle,
        "image": post.image,
        "datePublished": post.createdAt.toISOString(),
        "dateModified": post.updatedAt.toISOString(),
        "author": [{
            "@type": "Organization",
            "name": "Fusion Shroom Bars",
            "url": "https://officialfusionshroombar.com"
        }],
        "description": post.excerpt || post.content.substring(0, 160),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://officialfusionshroombar.com/blog/${post.slug}`
        }
    };

    // Styles constants
    const purple = 'var(--primary)';
    const bg = 'var(--background)';

    return (
        <div style={{ minHeight: '100vh', background: bg, color: 'var(--foreground)' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* =================== HERO =================== */}
            <header style={{
                position: 'relative',
                width: '100%',
                minHeight: '550px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}>
                {/* Background image */}
                {post.image ? (
                    <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        priority
                        style={{ 
                            zIndex: 1,
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                ) : (
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        background: 'linear-gradient(135deg, rgba(0,113,227,0.12), rgba(250,248,245,0.95))',
                    }} />
                )}

                {/* Gradient overlays */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 2,
                    background: 'linear-gradient(to top, #faf8f5 0%, rgba(250,248,245,0.9) 50%, rgba(250,248,245,0.45) 100%)',
                    pointerEvents: 'none'
                }} />

                {/* Hero content */}
                <div style={{
                    position: 'relative', zIndex: 10,
                    maxWidth: '1200px', width: '100%',
                    margin: '0 auto',
                    padding: '0 24px 48px',
                }}>
                    {/* Back link */}
                    <Link href="/blog" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        color: purple, fontSize: '10px', fontWeight: 800,
                        textTransform: 'uppercase', letterSpacing: '0.15em',
                        marginBottom: '20px', textDecoration: 'none',
                    }}>
                        <ChevronLeft size={14} /> Back to Insights
                    </Link>

                    {/* Category tag */}
                    <div style={{ marginBottom: '16px' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '5px 14px',
                            borderRadius: '999px',
                            background: purple,
                            fontSize: '9px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                        }}>
                            {post.category || 'Wellness & Science'}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 900,
                        lineHeight: 1.05,
                        marginBottom: '24px',
                        maxWidth: '700px',
                        fontStyle: 'italic',
                    }}>
                        {displayTitle}
                    </h1>

                    {/* Author + metadata row */}
                    <div style={{
                        display: 'flex', flexWrap: 'wrap',
                        alignItems: 'center', gap: '24px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: 'rgba(41,151,255,0.2)',
                                border: '2px solid rgba(41,151,255,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <User size={18} style={{ color: purple }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '13px', fontWeight: 700 }}>Julien Sterling</p>
                                <p style={{ fontSize: '10px', fontWeight: 600, color: purple }}>Fusion Nutritionist</p>
                            </div>
                        </div>
                        <div>
                            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Published</p>
                            <p style={{ fontSize: '12px', fontWeight: 700 }}>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Read Time</p>
                            <p style={{ fontSize: '12px', fontWeight: 700 }}>8 min read</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* =================== CONTENT AREA =================== */}
            <div style={{
                maxWidth: '1200px', margin: '0 auto',
                padding: '48px 24px',
                display: 'flex', gap: '48px',
            }}>
                <article style={{ 
                    flex: 1, 
                    maxWidth: '800px', 
                    margin: '0 auto',
                    width: '100%',
                }}>
                    {/* Blockquote / excerpt */}
                    {post.excerpt && (
                        <div style={{
                            padding: '28px 32px',
                            borderRadius: '16px',
                            background: 'var(--surface-elevated)',
                            borderLeft: `4px solid ${purple}`,
                            marginBottom: '40px',
                        }}>
                            <p style={{
                                fontSize: '16px', fontStyle: 'italic',
                                color: 'var(--text-muted)', lineHeight: 1.7,
                            }}>
                                &ldquo;{post.excerpt}&rdquo;
                            </p>
                        </div>
                    )}

                    {tuned?.answerCapsule && (
                        <section
                            id="answer"
                            aria-label="Quick Answer"
                            style={{
                                marginBottom: '2rem',
                                padding: '1.25rem 1.5rem',
                                background: 'var(--surface-elevated)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                            }}
                        >
                            <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                                <strong style={{ color: 'var(--foreground)' }}>Quick Answer:</strong>{' '}
                                {tuned.answerCapsule}
                            </p>
                        </section>
                    )}

                    {/* Article content */}
                    <div 
                        className="blog-content-body"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share section at bottom */}
                    <div style={{
                        marginTop: '48px', paddingTop: '28px',
                        borderTop: '1px solid var(--border)',
                        display: 'flex', flexWrap: 'wrap',
                        alignItems: 'center', gap: '12px',
                    }}>
                        <span style={{
                            fontSize: '10px', fontWeight: 800,
                            textTransform: 'uppercase', letterSpacing: '0.15em',
                            color: 'var(--text-subtle)',
                        }}>
                            Share This Guide:
                        </span>
                        {['Facebook', 'Twitter', 'LinkedIn'].map(platform => (
                            <button key={platform} style={{
                                padding: '8px 20px', borderRadius: '999px',
                                background: 'transparent',
                                border: `1px solid ${purple}`,
                                color: purple,
                                fontSize: '11px', fontWeight: 700,
                                cursor: 'pointer', transition: 'all 0.2s',
                            }}>
                                {platform}
                            </button>
                        ))}
                    </div>

                    {/* =================== COMMENTS SECTION =================== */}
                    <section style={{ marginTop: '80px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '32px', borderBottom: `2px solid ${purple}`, paddingBottom: '12px', display: 'inline-block' }}>
                            Community Discussion
                        </h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {post.comments && post.comments.length > 0 ? (
                                post.comments.map((c: any) => (
                                    <div key={c.id} style={{ 
                                        padding: '20px', 
                                        background: 'var(--surface-elevated)', 
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontWeight: 700, fontSize: '14px', color: purple }}>{c.name}</span>
                                            <span style={{ fontSize: '11px', color: '#555' }}>
                                                {new Date(c.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{c.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: '#555', fontSize: '14px', fontStyle: 'italic' }}>No discussion yet. Be the first to share your thoughts!</p>
                            )}
                        </div>

                        {post && <CommentForm blogPostId={post.id} />}
                    </section>
                </article>
            </div>

            {/* =================== RECOMMENDED FOR YOU =================== */}
            <section style={{
                maxWidth: '1200px', margin: '0 auto',
                padding: '48px 24px 96px',
            }}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-end', marginBottom: '32px',
                    flexWrap: 'wrap', gap: '16px',
                }}>
                    <div>
                        <h2 style={{
                            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                            fontWeight: 800, marginBottom: '6px',
                        }}>
                            Recommended for You
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                            Continue your journey into functional wellness.
                        </p>
                    </div>
                    <Link href="/blog" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        color: purple, fontSize: '12px', fontWeight: 700,
                        textDecoration: 'none',
                    }}>
                        View All Posts <ArrowRight size={14} />
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                }}>
                    {relatedPosts.map((rPost: any) => (
                        <Link href={`/blog/${rPost.slug}`} key={rPost.id} style={{
                            textDecoration: 'none', color: 'inherit',
                            borderRadius: '16px', overflow: 'hidden',
                            background: 'var(--surface-elevated)',
                            border: '1px solid var(--border)',
                            transition: 'transform 0.3s',
                        }}>
                            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                                <Image
                                    src={rPost.image || '/blog-placeholder.jpg'}
                                    alt={rPost.title}
                                    fill
                                    className="object-cover"
                                />
                                {rPost.category && (
                                    <span style={{
                                        position: 'absolute', top: '10px', left: '10px',
                                        padding: '4px 10px', borderRadius: '999px',
                                        background: purple,
                                        fontSize: '8px', fontWeight: 800,
                                        textTransform: 'uppercase', letterSpacing: '0.1em',
                                        color: 'var(--on-primary)',
                                    }}>
                                        {rPost.category}
                                    </span>
                                )}
                            </div>
                            <div style={{ padding: '16px 20px' }}>
                                <h3 style={{
                                    fontSize: '15px', fontWeight: 800,
                                    lineHeight: 1.3, marginBottom: '6px',
                                }}>
                                    {rPost.title}
                                </h3>
                                <p style={{
                                    fontSize: '12px', color: '#777', lineHeight: 1.5,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical' as const,
                                    overflow: 'hidden',
                                }}>
                                    {rPost.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
