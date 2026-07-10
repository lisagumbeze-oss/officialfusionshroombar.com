import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { PAGE_SEO } from '@/lib/keywords';
import { Reveal } from '@/components/Reveal';
import NewsletterForm from '@/components/NewsletterForm';
import styles from './page.module.css';

const seo = PAGE_SEO['/blog'];

export const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
        canonical: 'https://officialfusionshroombar.com/blog',
    },
    openGraph: {
        title: seo.title,
        description:
            'Guides on microdosing chocolate, mushroom chocolate dosage, psychedelic mushroom edibles, and fusion shroom bars wellness.',
        images: ['/og-blog.jpg'],
    },
};

export const revalidate = 3600;

const CATEGORIES = [
    'All Stories',
    'Wellness & Microdosing',
    'Product Launch',
    'Science & Research',
    'Community Stories',
    'Lifestyle',
];

function buildBlogUrl({
    page = 1,
    search = '',
    category = 'All Stories',
}: {
    page?: number;
    search?: string;
    category?: string;
}) {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', String(page));
    if (search) params.set('search', search);
    if (category !== 'All Stories') params.set('category', category);
    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ''}`;
}

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const search = typeof params.search === 'string' ? params.search : '';
    const category = typeof params.category === 'string' ? params.category : 'All Stories';
    const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    let posts: any[] = [];
    let totalPosts = 0;

    try {
        const where: any = { isPublic: true };

        if (category !== 'All Stories') {
            where.category = category;
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
                { excerpt: { contains: search, mode: 'insensitive' } },
            ];
        }

        [posts, totalPosts] = await Promise.all([
            (prisma as any).blogPost.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            (prisma as any).blogPost.count({ where }),
        ]);
    } catch (error) {
        console.error('[BlogPage] Database error:', error);
    }

    const totalPages = Math.ceil(totalPosts / limit);
    const featuredPost = page === 1 && !search && category === 'All Stories' ? posts[0] : null;
    const displayPosts = featuredPost ? posts.slice(1) : posts;

    const sectionHeading = search
        ? `Search results for "${search}"`
        : category !== 'All Stories'
          ? `${category}`
          : 'Latest insights';

    return (
        <div className={styles.guidePage}>
            <div className={styles.container}>
                {/* Hero */}
                <section className={styles.hero}>
                    <Reveal delay={0.1}>
                        <span className="section-label">Insights &amp; research</span>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h1>Psilocybin science, wellness &amp; microdosing</h1>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className={styles.lead}>
                            Guides on microdosing chocolate, mushroom chocolate dosage, psychedelic
                            edibles, and fusion shroom bars wellness.
                        </p>
                    </Reveal>
                </section>

                {/* Quick answer */}
                <section id="answer" aria-label="Quick answer" className={styles.answerCapsule}>
                    <div className={styles.answerInner}>
                        <strong>Fusion Blog:</strong> Expert articles on psilocybin science,
                        microdosing protocols, product launches, and community stories — written for
                        both newcomers and experienced psychonauts.
                    </div>
                </section>

                {/* Featured post */}
                {featuredPost && (
                    <Reveal delay={0.15}>
                        <section className={styles.featured}>
                            <Image
                                src={featuredPost.image || '/images/art-fusion.png'}
                                alt={featuredPost.title}
                                fill
                                className={styles.featuredImage}
                                priority
                            />
                            <div className={styles.featuredOverlay} />
                            <div className={styles.featuredOverlaySide} />
                            <div className={styles.featuredContent}>
                                <span className={styles.featuredBadge}>Featured story</span>
                                <h2>{featuredPost.title}</h2>
                                <p className={styles.featuredExcerpt}>
                                    {featuredPost.excerpt ||
                                        'Discover the latest insights and research on functional mushroom bars.'}
                                </p>
                                <Link
                                    href={`/blog/${featuredPost.slug}`}
                                    className="btn btn-primary"
                                >
                                    Read featured story <ArrowRight size={14} />
                                </Link>
                            </div>
                        </section>
                    </Reveal>
                )}

                {/* Filters & search */}
                <div className={styles.toolbar}>
                    <div className={styles.categoryPills}>
                        {CATEGORIES.map((cat) => (
                            <Link
                                key={cat}
                                href={buildBlogUrl({ search, category: cat })}
                                className={`${styles.categoryPill} ${category === cat ? styles.categoryPillActive : ''}`}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                    <form action="/blog" method="GET" className={styles.searchForm}>
                        {category !== 'All Stories' && (
                            <input type="hidden" name="category" value={category} />
                        )}
                        <Search className={styles.searchIcon} size={16} />
                        <input
                            type="text"
                            name="search"
                            defaultValue={search}
                            placeholder="Search insights..."
                            className={styles.searchInput}
                        />
                    </form>
                </div>

                {/* Posts grid */}
                <section>
                    <div className={styles.sectionTitle}>
                        <Sparkles size={18} />
                        <h2>{sectionHeading}</h2>
                    </div>

                    {displayPosts.length > 0 ? (
                        <div className={styles.postGrid}>
                            {displayPosts.map((post: any, i: number) => (
                                <Reveal key={post.id} delay={i * 0.06}>
                                    <article className={styles.postCard}>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className={styles.postLink}
                                        >
                                            <div className={styles.postImageWrap}>
                                                <Image
                                                    src={post.image || '/images/art-fusion.png'}
                                                    alt={post.title}
                                                    fill
                                                    className={styles.postImage}
                                                />
                                                {post.category && (
                                                    <span className={styles.postCategory}>
                                                        {post.category}
                                                    </span>
                                                )}
                                            </div>
                                            <div className={styles.postBody}>
                                                <div className={styles.postMeta}>
                                                    <span>{formatDate(post.createdAt)}</span>
                                                    <span className={styles.postMetaDot} />
                                                    <span>5 min read</span>
                                                </div>
                                                <h3>{post.title}</h3>
                                                <p className={styles.postExcerpt}>{post.excerpt}</p>
                                                <span className={styles.readMore}>
                                                    Read more <ArrowRight size={12} />
                                                </span>
                                            </div>
                                        </Link>
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>No stories found matching your criteria.</p>
                            <Link href="/blog">Clear all filters</Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <nav className={styles.pagination} aria-label="Blog pagination">
                            {page > 1 && (
                                <Link
                                    href={buildBlogUrl({ page: page - 1, search, category })}
                                    className={styles.pageBtn}
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft size={16} />
                                </Link>
                            )}

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                <Link
                                    key={n}
                                    href={buildBlogUrl({ page: n, search, category })}
                                    className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ''}`}
                                    aria-current={n === page ? 'page' : undefined}
                                >
                                    {n}
                                </Link>
                            ))}

                            {page < totalPages && (
                                <Link
                                    href={buildBlogUrl({ page: page + 1, search, category })}
                                    className={styles.pageBtn}
                                    aria-label="Next page"
                                >
                                    <ChevronRight size={16} />
                                </Link>
                            )}
                        </nav>
                    )}
                </section>

                {/* Newsletter */}
                <Reveal>
                    <section className={styles.newsletter}>
                        <h2>Join the fungi revolution</h2>
                        <p>
                            Subscribe for exclusive insights into mushroom science, early access to
                            new limited flavors, and wellness tips delivered to your inbox.
                        </p>
                        <NewsletterForm />
                    </section>
                </Reveal>

                {/* Cross-links */}
                <section className={`cross-links ${styles.crossLinksWrap}`}>
                    <h3>Explore more</h3>
                    <p>Helpful guides and resources from Fusion.</p>
                    <div className="link-pills">
                        <Link href="/shop" className="link-pill">
                            Shop products
                        </Link>
                        <Link href="/microdosing-chocolate" className="link-pill">
                            Dosing guide
                        </Link>
                        <Link href="/mushroom-chocolate-bars" className="link-pill">
                            Product guide
                        </Link>
                        <Link href="/faq" className="link-pill">
                            FAQ
                        </Link>
                        <Link href="/about" className="link-pill">
                            About Fusion
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
