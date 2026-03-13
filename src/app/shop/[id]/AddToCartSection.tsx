'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './product.module.css';

export default function AddToCartSection({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
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
    );
}
