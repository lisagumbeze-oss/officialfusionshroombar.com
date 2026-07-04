'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import styles from './CartLineItem.module.css';

export interface CartLineItemData {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartLineItemProps {
  item: CartLineItemData;
  variant?: 'cart' | 'checkout';
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

export default function CartLineItem({
  item,
  variant = 'cart',
  onUpdateQuantity,
  onRemove,
}: CartLineItemProps) {
  const lineTotal = item.price * item.quantity;
  const isCart = variant === 'cart';

  return (
    <article className={`${styles.item} ${styles[variant]}`}>
      <Link href={`/shop/${item.slug}`} className={styles.thumbLink}>
        <div className={styles.thumb}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            style={{ objectFit: 'cover' }}
            unoptimized={item.image.includes('data:image')}
          />
          {!isCart && item.quantity > 1 && (
            <span className={styles.qtyBadge}>{item.quantity}</span>
          )}
        </div>
      </Link>

      <div className={styles.details}>
        <div className={styles.topRow}>
          <Link href={`/shop/${item.slug}`} className={styles.name}>
            {item.name}
          </Link>
          {isCart && onRemove && (
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        <p className={styles.unitPrice}>${item.price.toFixed(2)} each</p>

        {isCart && onUpdateQuantity ? (
          <div className={styles.footer}>
            <div className={styles.quantity}>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className={styles.qtyValue}>{item.quantity}</span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className={styles.lineTotal}>${lineTotal.toFixed(2)}</span>
          </div>
        ) : (
          <div className={styles.checkoutMeta}>
            <span className={styles.checkoutQty}>Qty {item.quantity}</span>
            <span className={styles.lineTotal}>${lineTotal.toFixed(2)}</span>
          </div>
        )}
      </div>
    </article>
  );
}
