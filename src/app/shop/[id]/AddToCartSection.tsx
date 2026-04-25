'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './product.module.css';

export default function AddToCartSection({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);
    const [purchaseType, setPurchaseType] = useState<'once' | 'subscription'>('once');
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const price = purchaseType === 'subscription' ? product.price * 0.9 : product.price;

    const handleAddToCart = () => {
        addToCart({ ...product, price, isSubscription: purchaseType === 'subscription' }, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className={styles.productPurchaseFlow}>
            <div className={styles.purchaseOptions}>
                <div className={styles.optionTitle}>PURCHASE OPTIONS</div>
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
                            <span className={styles.optionLabel}>Subscribe & Save (10%)</span>
                            <span className={styles.optionPrice}>${(product.price * 0.9).toFixed(2)} / month</span>
                        </div>
                        <div className={styles.optionBadge}>BEST VALUE</div>
                    </label>
                </div>
            </div>

            <div className={styles.addToCartSection}>
                <div className={styles.quantity}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} 
                        min={1} 
                    />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button 
                    className={`${styles.addToCartBtn} premium-gradient ${added ? styles.added : ''}`}
                    onClick={handleAddToCart}
                >
                    {added ? 'ADDED TO CART! ✓' : 'ADD TO CART'}
                </button>
            </div>
        </div>
    );
}
