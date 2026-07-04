'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import Image from 'next/image';
import styles from './product.module.css';

interface ProductPurchaseProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    stock?: number;
    [key: string]: unknown;
  };
}

export default function ProductPurchase({ product }: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'once' | 'subscription'>('once');
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const purchaseRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const unitPrice = purchaseType === 'subscription' ? product.price * 0.9 : product.price;
  const outOfStock = (product.stock ?? 99) <= 0;

  useEffect(() => {
    const el = purchaseRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = useCallback(() => {
    if (outOfStock) return;
    addToCart(
      { ...product, price: unitPrice, isSubscription: purchaseType === 'subscription' },
      quantity
    );
    showToast(`Added ${product.name} to cart!`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [addToCart, product, unitPrice, purchaseType, quantity, outOfStock, showToast]);

  const qtyControls = (
    <div className={styles.quantity}>
      <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
        min={1}
        aria-label="Quantity"
      />
      <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
    </div>
  );

  return (
    <>
      <div ref={purchaseRef} className={styles.productPurchaseFlow}>
        <div className={styles.purchaseOptions}>
          <div className={styles.optionTitle}>Purchase options</div>
          <div className={styles.optionGroup}>
            <label
              className={`${styles.optionItem} ${purchaseType === 'once' ? styles.activeOption : ''}`}
              onClick={() => setPurchaseType('once')}
            >
              <input type="radio" name="purchase_type" checked={purchaseType === 'once'} readOnly />
              <div className={styles.optionInfo}>
                <span className={styles.optionLabel}>One-time purchase</span>
                <span className={styles.optionPrice}>${product.price.toFixed(2)}</span>
              </div>
            </label>
            <label
              className={`${styles.optionItem} ${purchaseType === 'subscription' ? styles.activeOption : ''}`}
              onClick={() => setPurchaseType('subscription')}
            >
              <input type="radio" name="purchase_type" checked={purchaseType === 'subscription'} readOnly />
              <div className={styles.optionInfo}>
                <span className={styles.optionLabel}>Subscribe &amp; save (10%)</span>
                <span className={styles.optionPrice}>${(product.price * 0.9).toFixed(2)} / month</span>
              </div>
              <div className={styles.optionBadge}>Best value</div>
            </label>
          </div>
        </div>

        <div className={styles.addToCartSection}>
          {qtyControls}
          <button
            type="button"
            className={`${styles.addToCartBtn} ${added ? styles.added : ''}`}
            onClick={handleAddToCart}
            disabled={outOfStock}
          >
            {added ? 'Added to cart ✓' : outOfStock ? 'Out of stock' : 'Add to cart'}
          </button>
        </div>
      </div>

      <div
        className={`${styles.stickyBar} ${stickyVisible ? styles.stickyBarVisible : ''}`}
        aria-hidden={!stickyVisible}
      >
        <div className={styles.stickyInner}>
          <div className={styles.stickyProduct}>
            <div className={styles.stickyThumb}>
              <Image
                src={product.image}
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                unoptimized={product.image.includes('data:image')}
              />
            </div>
            <div className={styles.stickyMeta}>
              <span className={styles.stickyName}>{product.name}</span>
              <span className={styles.stickyPrice}>${(unitPrice * quantity).toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.stickyActions}>
            <div className={styles.stickyQty}>{qtyControls}</div>
            <button
              type="button"
              className={styles.stickyAddBtn}
              onClick={handleAddToCart}
              disabled={outOfStock}
            >
              {added ? 'Added ✓' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
