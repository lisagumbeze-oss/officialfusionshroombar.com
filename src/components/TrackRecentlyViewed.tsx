'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';

export default function TrackRecentlyViewed({ product }: { product: any }) {
    const { addToRecentlyViewed } = useRecentlyViewed();

    useEffect(() => {
        if (product) {
            addToRecentlyViewed({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                slug: product.slug,
                category: product.category
            });
        }
    }, [product, addToRecentlyViewed]);

    return null;
}
