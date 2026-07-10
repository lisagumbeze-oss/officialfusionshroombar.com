'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './shop.module.css';
import DosageCalculator from '@/components/DosageCalculator';

export default function ShopFilters({ categories }: { categories: string[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get('category') || 'All Products';
    const currentSort = searchParams.get('sort') || 'default';
    const currentQuery = searchParams.get('q') || '';
    const currentMaxPrice = searchParams.get('max') || '500';

    const [searchValue, setSearchValue] = useState(currentQuery);
    const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const categoryPills = ['All Products', ...categories];

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== currentQuery) {
                const params = new URLSearchParams(searchParams.toString());
                params.delete('page');
                if (searchValue) params.set('q', searchValue);
                else params.delete('q');
                router.push(`/shop?${params.toString()}`);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchValue, currentQuery, router, searchParams]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (maxPrice !== currentMaxPrice) {
                const params = new URLSearchParams(searchParams.toString());
                params.delete('page');
                params.set('min', '0');
                params.set('max', maxPrice);
                router.push(`/shop?${params.toString()}`);
            }
        }, 800);
        return () => clearTimeout(timer);
    }, [maxPrice, currentMaxPrice, router, searchParams]);

    const setCategory = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        if (category === 'All Products') params.delete('category');
        else params.set('category', category);
        router.push(`/shop?${params.toString()}`);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        if (e.target.value === 'default') params.delete('sort');
        else params.set('sort', e.target.value);
        router.push(`/shop?${params.toString()}`);
    };

    const removeFilter = (key: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        params.delete(key);
        if (key === 'q') setSearchValue('');
        router.push(`/shop?${params.toString()}`);
    };

    const clearAll = () => {
        setSearchValue('');
        setMaxPrice('500');
        router.push('/shop');
    };

    const hasFilters =
        currentCategory !== 'All Products' ||
        currentQuery ||
        currentSort !== 'default' ||
        currentMaxPrice !== '500';

    return (
        <div className={styles.filtersWrap}>
            <div className={styles.categoryPills} role="tablist" aria-label="Product categories">
                {categoryPills.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={currentCategory === cat}
                        className={`${styles.categoryPill} ${currentCategory === cat ? styles.categoryPillActive : ''}`}
                        onClick={() => setCategory(cat)}
                    >
                        {cat === 'All Products' ? 'All' : cat}
                    </button>
                ))}
            </div>

            <div className={styles.filterToolbar}>
                <div className={styles.searchContainer}>
                    <Search className={styles.searchIcon} size={18} aria-hidden />
                    <input
                        type="search"
                        placeholder="Search products"
                        className={styles.searchInput}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        aria-label="Search products"
                    />
                </div>

                <select
                    id="sort-select"
                    className={styles.sortSelect}
                    value={currentSort}
                    onChange={handleSortChange}
                    aria-label="Sort products"
                >
                    <option value="default">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                </select>

                <button
                    type="button"
                    className={styles.advancedToggle}
                    onClick={() => setShowAdvanced((v) => !v)}
                    aria-expanded={showAdvanced}
                >
                    <SlidersHorizontal size={16} aria-hidden />
                    Filters
                </button>
            </div>

            {showAdvanced && (
                <div className={styles.advancedPanel}>
                    <DosageCalculator />
                    <div className={styles.priceFilter}>
                        <label htmlFor="max-price">
                            Max price <span>${maxPrice}</span>
                        </label>
                        <input
                            id="max-price"
                            type="range"
                            min="0"
                            max="500"
                            step="10"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className={styles.rangeInput}
                        />
                    </div>
                </div>
            )}

            {hasFilters && (
                <div className={styles.activeChips} role="list" aria-label="Active filters">
                    {currentCategory !== 'All Products' && (
                        <div className={styles.chip} role="listitem">
                            <span>{currentCategory}</span>
                            <button
                                type="button"
                                onClick={() => removeFilter('category')}
                                className={styles.removeChip}
                                aria-label={`Remove category filter: ${currentCategory}`}
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}
                    {currentQuery && (
                        <div className={styles.chip} role="listitem">
                            <span>&ldquo;{currentQuery}&rdquo;</span>
                            <button
                                type="button"
                                onClick={() => removeFilter('q')}
                                className={styles.removeChip}
                                aria-label={`Remove search: ${currentQuery}`}
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}
                    {currentSort !== 'default' && (
                        <div className={styles.chip} role="listitem">
                            <span>Sort: {currentSort}</span>
                            <button
                                type="button"
                                onClick={() => removeFilter('sort')}
                                className={styles.removeChip}
                                aria-label="Remove sort filter"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}
                    <button type="button" onClick={clearAll} className={styles.clearAll}>
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );
}
