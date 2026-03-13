export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import styles from './shop.module.css';
import prisma from '@/lib/prisma';
import ShopFilters from './ShopFilters';
import AddToCartButton from '@/components/AddToCartButton';

export default async function Shop({ 
    searchParams 
}: { 
    searchParams: Promise<{ category?: string, sort?: string }> 
}) {
    const { category, sort } = await searchParams;

    // Build query
    const where: any = { isActive: true };
    if (category && category !== 'All Products') {
        where.category = category;
    }

    let orderBy: any = { name: 'asc' };
    if (sort === 'price-low') orderBy = { price: 'asc' };
    if (sort === 'price-high') orderBy = { price: 'desc' };
    if (sort === 'newest') orderBy = { createdAt: 'desc' };

    const products = await (prisma as any).product.findMany({
        where,
        orderBy,
    });

    const categories = Array.from(new Set((await (prisma as any).product.findMany({
        select: { category: true }
    })).map((p: any) => p.category)));

    return (
        <div className={styles.shopContainer}>
            <header className={styles.shopHeader}>
                <h1>Premium Shop</h1>
                <p>Explore our exclusive collection of gourmet mushroom-infused edibles.</p>
            </header>

            <ShopFilters categories={categories as string[]} />

            <div className={styles.productGrid}>
                {products.map((product: any) => (
                    <div key={product.id} className={styles.productCard}>
                        <div className={styles.productImagePlaceholder}>
                            <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                            {product.regularPrice && product.regularPrice > product.price && (
                                <span className={styles.saleTag}>SALE</span>
                            )}
                        </div>
                        <h3 className={styles.productTitle}>{product.name}</h3>
                        <div className={styles.categoryTag}>{product.category}</div>
                        <div className={styles.price}>
                            {product.regularPrice && (
                                <span className={styles.oldPrice}>${product.regularPrice.toFixed(2)}</span>
                            )}
                            <span className={styles.newPrice}>${product.price.toFixed(2)}</span>
                        </div>
                        <div className={styles.buttonGroup}>
                            <Link href={`/shop/${product.slug}`} className={`${styles.viewBtn} premium-gradient`}>
                                VIEW PRODUCT
                            </Link>
                            <AddToCartButton product={product} className={styles.cartBtn} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
