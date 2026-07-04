'use client';

import styles from './cart.module.css';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Lock, ArrowRight } from 'lucide-react';
import CartLineItem from '@/components/CartLineItem/CartLineItem';

const FREE_SHIPPING_THRESHOLD = 300;
const SHIPPING_COST = 15;

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = cartTotal + (cart.length > 0 ? shipping : 0);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal;

  return (
    <div className={styles.cartContainer}>
      <header className={styles.pageHeader}>
        <span className="section-label">Your bag</span>
        <h1 className={styles.pageTitle}>
          Cart{itemCount > 0 && <span className={styles.itemCount}> ({itemCount})</span>}
        </h1>
      </header>

      {cart.length > 0 ? (
        <div className={styles.cartLayout}>
          <div className={styles.cartItems}>
            <ul className={styles.itemList}>
              {cart.map((item) => (
                <li key={item.id}>
                  <CartLineItem
                    item={item}
                    variant="cart"
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                </li>
              ))}
            </ul>

            <Link href="/shop" className={styles.continueLink}>
              ← Continue shopping
            </Link>
          </div>

          <aside className={styles.orderSummary}>
            <h2>Order summary</h2>

            {shipping > 0 && amountToFreeShipping > 0 && (
              <div className={styles.shippingBanner}>
                <p>
                  Add <strong>${amountToFreeShipping.toFixed(2)}</strong> more for free shipping
                </p>
                <div className={styles.shippingProgress}>
                  <div
                    className={styles.shippingProgressFill}
                    style={{ width: `${Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.totalRow}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className={styles.checkoutBtn}>
              Proceed to checkout
              <ArrowRight size={18} />
            </Link>

            <div className={styles.secureCheckout}>
              <Lock size={14} />
              <span>Secure checkout</span>
            </div>

            <div className={styles.paymentMethods}>
              <span>BTC</span>
              <span>Apple Cash</span>
              <span>Zelle</span>
              <span>Cash App</span>
            </div>
          </aside>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>
            <ShoppingBag size={48} strokeWidth={1.25} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Browse our fusion shroom bars and add something to your bag.</p>
          <Link href="/shop" className="btn btn-primary">Shop collection</Link>
        </div>
      )}
    </div>
  );
}
