import prisma from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Share2, Heart, Bookmark, ArrowRight, CheckCircle2, User, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await (prisma as any).blogPost.findUnique({
        where: { slug, isPublic: true }
    });

    if (!post) {
        return { title: 'Post Not Found | Fusion Shroom Bars' };
    }

    return {
        title: post.seoTitle || `${post.title} | Official Fusion Shroom Bars`,
        description: post.seoDescription || post.excerpt || post.content.substring(0, 160),
        keywords: post.seoKeywords || undefined,
        openGraph: {
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt || post.content.substring(0, 160),
            images: post.image ? [post.image] : [],
            type: 'article',
            publishedTime: post.createdAt.toISOString(),
            authors: ['Fusion Team'],
            tags: post.tags ? JSON.parse(post.tags) : []
        },
        twitter: {
            card: 'summary_large_image',
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt || post.content.substring(0, 160),
            images: post.image ? [post.image] : [],
        }
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post: any = null;

    try {
        post = await (prisma as any).blogPost.findUnique({
            where: { slug, isPublic: true }
        });
    } catch (error) {
        console.error('[BlogPost] Database error:', error);
    }

    if (!post) notFound();

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
        "headline": post.title,
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
    const purple = '#7c3aed';
    const bg = '#0a0510';

    return (
        <div style={{ minHeight: '100vh', background: bg, color: '#fff', fontFamily: "'Inter', sans-serif" }}>
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
                        className="object-cover"
                        priority
                        style={{ zIndex: 1 }}
                    />
                ) : (
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(10,5,16,0.8))',
                    }} />
                )}

                {/* Gradient overlays */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 2,
                    background: 'linear-gradient(to top, #0a0510 0%, rgba(10,5,16,0.5) 50%, rgba(10,5,16,0.15) 100%)',
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
                        {post.title}
                    </h1>

                    {/* Author + metadata row */}
                    <div style={{
                        display: 'flex', flexWrap: 'wrap',
                        alignItems: 'center', gap: '24px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: 'rgba(124,58,237,0.2)',
                                border: '2px solid rgba(124,58,237,0.3)',
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
                            <p style={{ fontSize: '10px', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Published</p>
                            <p style={{ fontSize: '12px', fontWeight: 700 }}>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '10px', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Read Time</p>
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
                {/* Floating sidebar */}
                <aside style={{
                    width: '48px', flexShrink: 0,
                    display: 'flex', flexDirection: 'column', gap: '12px',
                    position: 'sticky', top: '120px', alignSelf: 'flex-start',
                }}>
                    {[
                        { icon: <Share2 size={18} />, hoverColor: purple },
                        { icon: <Heart size={18} />, hoverColor: '#ec4899' },
                        { icon: <Bookmark size={18} />, hoverColor: '#eab308' },
                    ].map((item, i) => (
                        <button key={i} style={{
                            width: '44px', height: '44px', borderRadius: '12px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            color: '#666',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}>
                            {item.icon}
                        </button>
                    ))}
                </aside>

                {/* Main article */}
                <article style={{ flex: 1, maxWidth: '760px' }}>
                    {/* Blockquote / excerpt */}
                    {post.excerpt && (
                        <div style={{
                            padding: '28px 32px',
                            borderRadius: '16px',
                            background: 'rgba(255,255,255,0.03)',
                            borderLeft: `4px solid ${purple}`,
                            marginBottom: '40px',
                        }}>
                            <p style={{
                                fontSize: '16px', fontStyle: 'italic',
                                color: '#bbb', lineHeight: 1.7,
                            }}>
                                &ldquo;{post.excerpt}&rdquo;
                            </p>
                        </div>
                    )}

                    {/* Article content */}
                    <div 
                        className="blog-content-body"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share section at bottom */}
                    <div style={{
                        marginTop: '48px', paddingTop: '28px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex', flexWrap: 'wrap',
                        alignItems: 'center', gap: '12px',
                    }}>
                        <span style={{
                            fontSize: '10px', fontWeight: 800,
                            textTransform: 'uppercase', letterSpacing: '0.15em',
                            color: '#555',
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
                        <p style={{ color: '#666', fontSize: '13px' }}>
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
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
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
                                        color: '#fff',
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
