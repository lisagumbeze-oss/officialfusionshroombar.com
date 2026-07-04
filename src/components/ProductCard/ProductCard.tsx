'use client';

import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';
import WishlistButton from '@/components/WishlistButton';
import styles from './ProductCard.module.css';

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  regularPrice?: number | null;
  category?: string;
  stock?: number;
  createdAt?: Date | string;
}

interface ProductCardProps {
  product: ProductCardData;
  variant?: 'default' | 'compact';
}

function isNew(createdAt?: Date | string) {
  if (!createdAt) return false;
  return new Date(createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const onSale = product.regularPrice != null && product.regularPrice > product.price;
  const stock = product.stock ?? 99;
  const outOfStock = stock <= 0;
  const lowStock = stock > 0 && stock <= 10;

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <Link href={`/shop/${product.slug}`} className={styles.imageLink}>
        <div className={styles.imageWrap}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 280px"
            className={styles.image}
            unoptimized={product.image.includes('data:image')}
          />
          <div className={styles.badges}>
            {onSale && <span className={styles.badgeSale}>Sale</span>}
            {isNew(product.createdAt) && <span className={styles.badgeNew}>New</span>}
          </div>
          <WishlistButton product={product} />
          <div className={styles.quickAdd}>
            <AddToCartButton
              product={product}
              className={styles.addBtn}
            />
          </div>
        </div>
      </Link>

      <div className={styles.body}>
        {product.category && (
          <span className={styles.category}>{product.category}</span>
        )}
        <Link href={`/shop/${product.slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>

        {variant === 'default' && (
          <p className={`${styles.stock} ${outOfStock ? styles.stockOut : lowStock ? styles.stockLow : styles.stockIn}`}>
            {outOfStock ? 'Out of stock' : lowStock ? `Only ${stock} left` : 'In stock'}
          </p>
        )}

        <div className={styles.footer}>
          <div className={styles.price}>
            {onSale && (
              <span className={styles.oldPrice}>${product.regularPrice!.toFixed(2)}</span>
            )}
            <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
          </div>
          {variant === 'compact' && (
            <Link href={`/shop/${product.slug}`} className={styles.viewLink}>
              View
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
