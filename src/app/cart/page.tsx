'use client';

import styles from './cart.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
    const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();
    const shipping: number = cartTotal > 300 ? 0 : 15; // Example shipping logic
    const total = cartTotal + (cart.length > 0 ? shipping : 0);

    return (
        <div className={styles.cartContainer}>
            <h1 className={styles.pageTitle}>Your Cart</h1>

            {cart.length > 0 ? (
                <div className={styles.cartLayout}>
                    {/* Left: Cart Items */}
                    <div className={styles.cartItems}>
                        <div className={styles.cartHeader}>
                            <span>Product</span>
                            <span>Quantity</span>
                            <span>Subtotal</span>
                        </div>
                        {cart.map((item) => (
                            <div key={item.id} className={styles.cartRow}>
                                <div className={styles.productCell}>
                                    <div className={styles.imageWrapper}>
                                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} unoptimized />
                                    </div>
                                    <div>
                                        <Link href={`/shop/${item.slug}`} className={styles.productName}>{item.name}</Link>
                                        <div className={styles.productPrice}>${item.price.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className={styles.quantityCell}>
                                    <div className={styles.quantityControl}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <input type="number" value={item.quantity} min={1} readOnly />
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <div className={styles.subtotalCell}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Order Summary */}
                    <div className={styles.orderSummary}>
                        <h2>Order Summary</h2>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        {shipping > 0 && (
                            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '-0.5rem' }}>
                                Free shipping on orders over $300!
                            </p>
                        )}
                        <div className={styles.divider}></div>
                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" className={`${styles.checkoutBtn} premium-gradient`}>
                            PROCEED TO CHECKOUT
                        </Link>

                        <div className={styles.secureCheckout}>
                            <span>🔒 Secure Checkout</span>
                            <div className={styles.paymentIcons}>
                                <span>BTC</span> <span>APPLE CASH</span> <span>ZELLE</span> <span>CASHAPP</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.emptyCart}>
                    <div className={styles.emptyIcon}>
                        <ShoppingBag size={64} />
                    </div>
                    <p>Your cart is currently empty.</p>
                    <Link href="/shop" className={styles.returnBtn}>RETURN TO SHOP</Link>
                </div>
            )}
        </div>
    );
}
