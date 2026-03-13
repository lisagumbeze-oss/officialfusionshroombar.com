export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './product.module.css';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import AddToCartSection from './AddToCartSection';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = await (prisma as any).product.findUnique({ where: { slug: id } });
    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.name} | Fusion Shroom Bars`,
        description: product.description,
    };
}

export default async function ProductPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    let product = null;

    try {
        product = await (prisma as any).product.findUnique({
            where: { slug: id }
        });
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
        "image": `https://officialfusionshroombar.com${product.image}`, // Fallback to reference if local missing
        "description": product.description,
        "offers": {
            "@type": "Offer",
            "url": `https://officialfusionshroombar.com/shop/${product.slug}`,
            "priceCurrency": "USD",
            "price": product.price,
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <div className={styles.productContainer}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Product Presentation */}
            <div className={styles.productGrid}>
                {/* Left: Images */}
                <div className={styles.imageGallery}>
                    <div className={styles.mainImagePlaceholder}>
                        <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} priority />
                        {product.regularPrice && product.regularPrice > product.price && (
                            <span className={styles.saleTag}>SALE</span>
                        )}
                    </div>
                </div>

                {/* Right: Info */}
                <div className={styles.productInfo}>
                    <p className={styles.breadcrumbs}>Home / Shop / {product.category} / {product.name}</p>
                    <h1 className={styles.title}>{product.name}</h1>

                    <div className={styles.priceContainer}>
                        {product.regularPrice && (
                            <span className={styles.oldPrice}>${product.regularPrice.toFixed(2)}</span>
                        )}
                        <span className={styles.newPrice}>${product.price.toFixed(2)}</span>
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    <AddToCartSection product={product} />

                    <div className={styles.benefits}>
                        <div className={styles.benefitItem}>✓ Fast Delivery Worldwide</div>
                        <div className={styles.benefitItem}>✓ Premium Extracted Psilocybin</div>
                        {product.weight && (
                            <div className={styles.benefitItem}>✓ {product.weight} Potency</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Details Tabs */}
            <div className={styles.detailsTabs}>
                <div className={styles.tabHeaders}>
                    <button className={styles.activeTab}>Description</button>
                    {ingredients && <button>Ingredients</button>}
                    {effects && <button>Effects</button>}
                </div>
                <div className={styles.tabContent}>
                    <h3>Product Overview</h3>
                    <p>{product.description}</p>

                    {effects && (
                        <>
                            <h4>Potential Effects:</h4>
                            <ul>
                                {effects.map((effect: string) => <li key={effect}>{effect}</li>)}
                            </ul>
                        </>
                    )}

                    {ingredients && (
                        <>
                            <h4>Ingredients:</h4>
                            <ul>
                                {ingredients.map((ing: string) => <li key={ing}>{ing}</li>)}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
