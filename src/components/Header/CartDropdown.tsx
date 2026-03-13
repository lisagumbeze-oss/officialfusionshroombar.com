'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './CartDropdown.module.css';
import Image from 'next/image';
import { ShoppingCart, X, Trash2 } from 'lucide-react';

export default function CartDropdown() {
  const { cart, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.cartWrapper} ref={dropdownRef}>
      <button 
        className={styles.cartTrigger} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Cart"
      >
        <ShoppingCart size={20} />
        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
      </button>

      {isOpen && (
        <div className={`${styles.dropdown} glass-morphism`}>
          <div className={styles.header}>
            <h3>Your Cart ({cartCount})</h3>
            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
              <X size={18} />
            </button>
          </div>

          <div className={styles.itemList}>
            {cart.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Your cart is empty</p>
                <Link href="/shop" onClick={() => setIsOpen(false)} className={styles.shopLink}>
                  Start Shopping
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  </div>
                  <div className={styles.itemInfo}>
                    <Link href={`/shop/${item.slug}`} onClick={() => setIsOpen(false)} className={styles.itemName}>
                      {item.name}
                    </Link>
                    <div className={styles.itemMeta}>
                      <span>${item.price.toFixed(2)}</span>
                      <div className={styles.qtyControls}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn} title="Remove">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className={styles.footer}>
              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className={styles.actions}>
                <Link href="/cart" onClick={() => setIsOpen(false)} className={styles.viewCartBtn}>
                  VIEW CART
                </Link>
                <Link href="/checkout" onClick={() => setIsOpen(false)} className={`${styles.checkoutBtn} premium-gradient`}>
                  CHECKOUT
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
