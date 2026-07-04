'use client';

import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';
import styles from './wishlist.module.css';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const itemCount = wishlist.length;

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <span className="section-label">Saved items</span>
        <h1 className={styles.pageTitle}>
          Wishlist{itemCount > 0 && <span className={styles.itemCount}> ({itemCount})</span>}
        </h1>
        <p className={styles.subtitle}>Tap the heart on any card to remove an item.</p>
      </header>

      {wishlist.length > 0 ? (
        <>
          <ul className={styles.productGrid}>
            {wishlist.map((product) => (
              <li key={product.id}>
                <ProductCard
                  product={{
                    id: String(product.id),
                    slug: product.slug,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    category: product.category,
                  }}
                />
              </li>
            ))}
          </ul>

          <Link href="/shop" className={styles.continueLink}>
            ← Continue shopping
          </Link>
        </>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Heart size={40} strokeWidth={1.25} />
          </div>
          <h2>Your wishlist is empty</h2>
          <p>Save fusion shroom bars you love — click the heart on any product while browsing.</p>
          <Link href="/shop" className="btn btn-primary">
            Shop collection
            <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}
