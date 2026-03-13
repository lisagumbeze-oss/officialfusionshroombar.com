'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function AddToCartButton({ 
    product, 
    className = "", 
    iconOnly = false 
}: { 
    product: any, 
    className?: string,
    iconOnly?: boolean
}) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button 
            onClick={handleAdd}
            className={`${className} ${added ? 'added' : ''}`}
            disabled={added}
        >
            {added ? (
                <span>✓ ADDED</span>
            ) : (
                iconOnly ? <span>🛒</span> : <span>ADD TO CART</span>
            )}
        </button>
    );
}
