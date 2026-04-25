'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ViewedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
}

interface RecentlyViewedContextType {
  recentlyViewed: ViewedProduct[];
  addToRecentlyViewed: (product: ViewedProduct) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<ViewedProduct[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fusion_recently_viewed');
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recently viewed', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('fusion_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecentlyViewed = (product: ViewedProduct) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists to move to top
      const filtered = prev.filter((item) => item.id !== product.id);
      // Keep only last 10
      return [product, ...filtered].slice(0, 10);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
