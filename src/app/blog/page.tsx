import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, ChevronLeft, ChevronRight, Mail, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Fusion Shroom Bars',
    description: 'Insights, news, and education from the world of premium psilocybin. Discover the science and soul behind every official Fusion Shroom Bar.',
    openGraph: {
        title: 'Blog | Fusion Shroom Bars',
        description: 'Explore our latest articles on wellness, microdosing, and the science of psilocybin.',
        images: ['/og-blog.jpg'],
    }
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    let posts: any[] = [];
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

    const featuredPost = posts[0];
    const remainingPosts = posts.slice(1);
    const categories = ['All Stories', 'Wellness', 'Lifestyle', 'Recipes', 'Science'];

    return (
        <div className="min-h-screen" style={{ background: '#0a0510', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 60px' }}>

                {/* =================== HERO FEATURED SECTION =================== */}
                {featuredPost && (
                    <section style={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        marginBottom: '48px',
                        minHeight: '420px',
                    }}>
                        <Image
                            src={featuredPost.image || '/blog-placeholder.jpg'}
                            alt={featuredPost.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient overlay */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, #0a0510 0%, rgba(10,5,16,0.7) 40%, rgba(10,5,16,0.3) 70%, transparent 100%)',
                        }} />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to right, rgba(10,5,16,0.6) 0%, transparent 60%)',
                        }} />

                        {/* Content */}
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0,
                            padding: '40px',
                            maxWidth: '600px',
                            zIndex: 10,
                        }}>
                            <span style={{
                                display: 'inline-block',
                                padding: '6px 16px',
                                borderRadius: '999px',
                                background: '#7c3aed',
                                fontSize: '10px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                marginBottom: '16px',
                            }}>
                                Featured Science
                            </span>
                            <h2 style={{
                                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                                fontWeight: 900,
                                lineHeight: 1.1,
                                marginBottom: '12px',
                                letterSpacing: '-0.02em',
                            }}>
                                {featuredPost.title}
                            </h2>
                            <p style={{
                                color: '#a0a0b0',
                                fontSize: '14px',
                                lineHeight: 1.6,
                                marginBottom: '20px',
                                maxWidth: '480px',
                            }}>
                                {featuredPost.excerpt || 'Discover how functional fungi are revolutionizing the world of mood-enhancing confections and what the latest research says about...'}
                            </p>
                            <Link
                                href={`/blog/${featuredPost.slug}`}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 28px',
                                    borderRadius: '999px',
                                    background: '#7c3aed',
                                    fontSize: '12px',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    transition: 'transform 0.2s',
                                }}
                            >
                                Read Featured Story <ArrowRight size={14} />
                            </Link>
                        </div>
                    </section>
                )}

                {/* =================== CATEGORY FILTERS & SEARCH =================== */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    marginBottom: '40px',
                }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {categories.map((cat, i) => (
                            <button
                                key={cat}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '999px',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    border: i === 0 ? '2px solid #7c3aed' : '2px solid rgba(255,255,255,0.12)',
                                    background: i === 0 ? '#7c3aed' : 'transparent',
                                    color: '#fff',
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div style={{ position: 'relative', width: '260px', maxWidth: '100%' }}>
                        <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#555' }} size={16} />
                        <input
                            type="text"
                            placeholder="Search insights..."
                            style={{
                                width: '100%',
                                padding: '10px 16px 10px 40px',
                                borderRadius: '999px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff',
                                fontSize: '13px',
                                outline: 'none',
                            }}
                        />
                    </div>
                </div>

                {/* =================== LATEST INSIGHTS GRID =================== */}
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                        <Sparkles size={20} style={{ color: '#7c3aed' }} />
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: 900,
                            letterSpacing: '-0.01em',
                        }}>
                            Latest Insights
                        </h3>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '24px',
                    }}>
                        {(remainingPosts.length > 0 ? remainingPosts : posts).map((post: any) => (
                            <article key={post.id} style={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                transition: 'transform 0.3s, border-color 0.3s',
                            }}>
                                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                                        <Image
                                            src={post.image || '/blog-placeholder.jpg'}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                        {post.category && (
                                            <span style={{
                                                position: 'absolute',
                                                top: '12px',
                                                left: '12px',
                                                padding: '4px 12px',
                                                borderRadius: '999px',
                                                background: '#7c3aed',
                                                fontSize: '9px',
                                                fontWeight: 800,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                            }}>
                                                {post.category}
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            fontSize: '10px',
                                            fontWeight: 600,
                                            color: '#666',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.06em',
                                            marginBottom: '10px',
                                        }}>
                                            <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#444' }} />
                                            <span>5 min read</span>
                                        </div>
                                        <h4 style={{
                                            fontSize: '17px',
                                            fontWeight: 800,
                                            lineHeight: 1.3,
                                            marginBottom: '8px',
                                        }}>
                                            {post.title}
                                        </h4>
                                        <p style={{
                                            color: '#888',
                                            fontSize: '13px',
                                            lineHeight: 1.6,
                                            marginBottom: '16px',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical' as const,
                                            overflow: 'hidden',
                                        }}>
                                            {post.excerpt}
                                        </p>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '11px',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em',
                                            color: '#fff',
                                        }}>
                                            Read More <ArrowRight size={12} style={{ color: '#7c3aed' }} />
                                        </span>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div style={{
                        marginTop: '48px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        <button style={{
                            width: '36px', height: '36px', borderRadius: '8px',
                            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                        }}>
                            <ChevronLeft size={16} />
                        </button>
                        {[1, 2, 3].map(n => (
                            <button key={n} style={{
                                width: '36px', height: '36px', borderRadius: '8px',
                                background: n === 1 ? '#7c3aed' : 'transparent',
                                border: n === 1 ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.1)',
                                color: '#fff', fontSize: '13px', fontWeight: 700,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer',
                            }}>
                                {n}
                            </button>
                        ))}
                        <span style={{ color: '#555', padding: '0 4px' }}>...</span>
                        <button style={{
                            width: '36px', height: '36px', borderRadius: '8px',
                            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff', fontSize: '13px', fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                        }}>
                            12
                        </button>
                        <button style={{
                            width: '36px', height: '36px', borderRadius: '8px',
                            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                        }}>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </section>

                {/* =================== NEWSLETTER SECTION =================== */}
                <section style={{
                    marginTop: '80px',
                    padding: '60px 32px',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.03) 100%)',
                    border: '1px solid rgba(124,58,237,0.1)',
                    textAlign: 'center',
                }}>
                    <h2 style={{
                        fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                        fontWeight: 900,
                        marginBottom: '12px',
                    }}>
                        Join the Fungi Revolution
                    </h2>
                    <p style={{
                        color: '#888',
                        maxWidth: '500px',
                        margin: '0 auto 28px',
                        fontSize: '14px',
                        lineHeight: 1.6,
                    }}>
                        Subscribe for exclusive insights into mushroom science, early access to new limited flavors, and wellness tips delivered to your inbox.
                    </p>
                    <form style={{
                        display: 'flex',
                        gap: '12px',
                        maxWidth: '440px',
                        margin: '0 auto',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={{
                                flex: 1,
                                minWidth: '200px',
                                padding: '12px 20px',
                                borderRadius: '999px',
                                background: 'rgba(0,0,0,0.4)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff',
                                fontSize: '13px',
                                outline: 'none',
                            }}
                        />
                        <button style={{
                            padding: '12px 28px',
                            borderRadius: '999px',
                            background: '#7c3aed',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            Subscribe <Mail size={14} />
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}
