export const revalidate = 3600; // Incrementally regenerate page every hour

import type { Metadata } from 'next';
import styles from './product.module.css';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductPurchase from './ProductPurchase';
import Link from 'next/link';
import RelatedProducts from '@/components/RelatedProducts';
import ProductTabs from './ProductTabs';
import ProductGallery from './ProductGallery';
import TrackRecentlyViewed from '@/components/TrackRecentlyViewed';
import RecentlyViewedList from '@/components/RecentlyViewedList';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = await (prisma as any).product.findUnique({ where: { slug: id } });
    if (!product) return { title: 'Product Not Found' };

    return {
        title: product.seoTitle || `${product.name} | Official Fusion Shroom Bars`,
        description: product.seoDescription || product.description.substring(0, 160),
        keywords: product.seoKeywords || undefined,
        alternates: {
            canonical: `https://officialfusionshroombar.com/shop/${product.slug}`,
        },
        openGraph: {
            title: product.seoTitle || `${product.name} | Official Fusion Shroom Bars`,
            description: product.seoDescription || product.description.substring(0, 160),
            images: product.image ? [product.image] : [],
            type: 'website',
            url: `https://officialfusionshroombar.com/shop/${product.slug}`,
            siteName: 'Official Fusion Shroom Bars',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.seoTitle || product.name,
            description: product.seoDescription || product.description.substring(0, 160),
            images: product.image ? [product.image] : [],
        },
    };
}

export default async function ProductPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    let product: any = null;
    let relatedProducts: any[] = [];

    try {
        product = await (prisma as any).product.findUnique({
            where: { slug: id },
            include: {
                reviews: {
                    orderBy: { createdAt: 'desc' },
                }
            }
        });

        if (product) {
            relatedProducts = await (prisma as any).product.findMany({
                where: {
                    category: product.category,
                    isActive: true,
                    NOT: { id: product.id }
                },
                take: 8
            });
        }
    } catch (error) {
        console.error('[ProductPage] Database error:', error);
    }

    if (!product) {
        notFound();
    }

    if (!product.isActive) {
        notFound();
    }

    const effects = product.effects ? JSON.parse(product.effects) : null;
    const ingredients = product.ingredients ? JSON.parse(product.ingredients) : null;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.image.startsWith('http') ? product.image : `https://officialfusionshroombar.com${product.image}`,
        "description": product.description,
        "sku": product.id.toString(),
        "brand": {
            "@type": "Brand",
            "name": "Fusion Shroom Bars"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "84"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://officialfusionshroombar.com/shop/${product.slug}`,
            "priceCurrency": "USD",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "priceValidUntil": new Date(new Date().getFullYear() + 1, 0, 1).toISOString().split('T')[0]
        }
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://officialfusionshroombar.com" },
            { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://officialfusionshroombar.com/shop" },
            { "@type": "ListItem", "position": 3, "name": product.category, "item": `https://officialfusionshroombar.com/shop?category=${encodeURIComponent(product.category)}` },
            { "@type": "ListItem", "position": 4, "name": product.name }
        ]
    };

    return (
        <div className={styles.productContainer}>
            <TrackRecentlyViewed product={product} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {/* Product Presentation */}
            <div className={styles.productGrid}>
                {/* Left: Images */}
                <ProductGallery 
                    mainImage={product.image} 
                    gallery={product.gallery ? JSON.parse(product.gallery) : null} 
                    name={product.name} 
                />

                {/* Right: Info */}
                <div className={styles.productInfo}>
                <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href="/shop">Shop</Link>
                    <span>/</span>
                    <Link href={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
                    <span>/</span>
                    <span>{product.name}</span>
                </nav>
                    <p className={styles.categoryLabel}>{product.category}</p>
                    <h1 className={styles.title}>{product.name}</h1>

                    <div className={styles.priceContainer}>
                        {product.regularPrice && (
                            <span className={styles.oldPrice}>${product.regularPrice.toFixed(2)}</span>
                        )}
                        <span className={styles.newPrice}>${product.price.toFixed(2)}</span>
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    <ProductPurchase product={product} />

                    <div className={styles.benefits}>
                        <div className={styles.benefitItem}>Fast delivery worldwide</div>
                        <div className={styles.benefitItem}>Premium extracted psilocybin</div>
                        {product.weight && (
                            <div className={styles.benefitItem}>{product.weight} potency</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Details Tabs */}
            <ProductTabs 
                description={product.description} 
                ingredients={ingredients} 
                effects={effects} 
            />

            <RelatedProducts products={relatedProducts} />

            <RecentlyViewedList excludeId={product.id} />

            {/* Customer Reviews */}
            <section className={styles.reviewsSection}>
                <h3>Customer reviews</h3>
                <div className={styles.reviewsGrid}>
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((r: any) => (
                            <div key={r.id} className={styles.reviewCard}>
                                <div className={styles.reviewStars}>
                                    {Array(r.rating).fill('★').join('')}
                                </div>
                                <p className={styles.reviewContent}>&ldquo;{r.content}&rdquo;</p>
                                <div className={styles.reviewMeta}>
                                    <strong>{r.name}</strong> · Verified buyer · {new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={styles.reviewMeta}>No reviews yet. Be the first to share your experience.</p>
                    )}
                </div>
            </section>

            <section className={styles.helpSection}>
                <h3>Need help with your order?</h3>
                <div className={styles.helpLinks}>
                    <Link href="/faq">FAQ</Link>
                    <Link href="/contact">Contact support</Link>
                    <Link href="/about">About us</Link>
                    <Link href="/shop">Browse all products</Link>
                </div>
                <p className={styles.helpNote}>
                    All Fusion products use{' '}
                    <a href="https://en.wikipedia.org/wiki/Psilocybin" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>psilocybin</a>{' '}
                    extract in premium Belgian chocolate. Lab-tested for purity and consistency.
                </p>
            </section>
        </div>
    );
}
