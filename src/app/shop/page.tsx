import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/metadata-utils';
import { PAGE_SEO } from '@/lib/keywords';
export const revalidate = 3600; // Incrementally regenerate page every hour

import styles from './shop.module.css';
import ShopFilters from './ShopFilters';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard/ProductCard';
import Pagination from './Pagination';

export async function generateMetadata(): Promise<Metadata> {
    const seo = PAGE_SEO['/shop'];
    const fallback: Metadata = {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
    };
    return await getPageMetadata("/shop", fallback);
}

export default async function Shop({ 
    searchParams 
}: { 
    searchParams: Promise<{ category?: string, sort?: string, page?: string, q?: string, min?: string, max?: string }> 
}) {
    const { category, sort, page, q, min, max } = await searchParams;
    const currentPage = parseInt(page || '1', 10);
    const pageSize = 24;

    // Build query
    const where: any = { isActive: true };
    if (category && category !== 'All Products') {
        where.category = category;
    }
    
    // Price filtering
    const minP = parseFloat(min || '0');
    const maxP = parseFloat(max || '1000');
    where.price = {
        gte: minP,
        lte: maxP
    };
    if (q) {
        where.OR = [
            { name: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
            { category: { contains: q, mode: 'insensitive' } }
        ];
    }

    let orderBy: any = { name: 'asc' };
    if (sort === 'price-low') orderBy = { price: 'asc' };
    if (sort === 'price-high') orderBy = { price: 'desc' };
    if (sort === 'newest') orderBy = { createdAt: 'desc' };

    let products: any[] = [];
    let categories: string[] = [];
    let totalProducts = 0;
    let dbError = false;

    try {
        const skip = (currentPage - 1) * pageSize;
        
        const [fetchedProducts, totalCount] = await Promise.all([
            (prisma as any).product.findMany({
                where,
                orderBy,
                skip: skip >= 0 ? skip : 0,
                take: pageSize,
            }),
            (prisma as any).product.count({ where })
        ]);

        products = fetchedProducts;
        totalProducts = totalCount;

        const catData = await (prisma as any).product.findMany({
            select: { category: true }
        });
        categories = Array.from(new Set(catData.map((p: any) => p.category as string)));
    } catch (error) {
        console.error('[Shop] Database error:', error);
        dbError = true;
    }

    return (
        <div className={styles.shopContainer}>
            <header className={styles.shopHeader}>
                <span className="section-label">Official store</span>
                <h1>Fusion mushroom bars &amp; mushroom chocolate</h1>
                <p>Lab-tested fusion shroom bars, Neau Tropics, and psilocybin gummies — discreet worldwide shipping.</p>
            </header>

            <ShopFilters categories={categories as string[]} />

            <div className={styles.resultsInfo}>
                <p>{totalProducts} product{totalProducts !== 1 ? 's' : ''}</p>
            </div>

            {dbError ? (
                <div className={styles.errorState}>
                    <h2>Store temporarily unavailable</h2>
                    <p>We&apos;re experiencing a connection issue. Please try refreshing or check back shortly.</p>
                </div>
            ) : (
                <>
                    <div className={styles.productGrid}>
                        {products.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <Pagination 
                        totalItems={totalProducts} 
                        pageSize={pageSize} 
                        currentPage={currentPage} 
                    />

                    {products.length === 0 && !dbError && (
                        <div className={styles.noResults}>
                            <h3>No products found in this category.</h3>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
