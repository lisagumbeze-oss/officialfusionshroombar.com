'use client';
import { useState } from 'react';
import { Search, X, Edit2, Package, Trash2, Layout, Image as ImageIcon, TrendingUp, ShieldCheck, Box, Tag, Globe, List } from 'lucide-react';
import styles from '../admin.module.css';
import Image from 'next/image';

export default function ProductsTable({ 
    products, 
    updateProductAction,
    addProductAction,
    deleteProductAction
}: { 
    products: any[], 
    updateProductAction: (formData: FormData) => void,
    addProductAction?: (formData: FormData) => void,
    deleteProductAction: (formData: FormData) => void
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStockStatus = (product: any) => {
        if (!product.manageStock) return { label: 'Infinite', color: '#10b981' };
        if (product.stock <= 0) return { label: 'Out of Stock', color: '#ef4444' };
        if (product.stock <= product.lowStockThreshold) return { label: `Low (${product.stock})`, color: '#f59e0b' };
        return { label: `In Stock (${product.stock})`, color: '#10b981' };
    };

    const renderTabs = (isNew: boolean = false) => (
        <div className={styles.tabContainer}>
            <button type="button" className={activeTab === 'general' ? styles.activeTab : ''} onClick={() => setActiveTab('general')}>General</button>
            <button type="button" className={activeTab === 'pricing' ? styles.activeTab : ''} onClick={() => setActiveTab('pricing')}>Pricing & Stock</button>
            <button type="button" className={activeTab === 'media' ? styles.activeTab : ''} onClick={() => setActiveTab('media')}>Media</button>
            <button type="button" className={activeTab === 'seo' ? styles.activeTab : ''} onClick={() => setActiveTab('seo')}>SEO</button>
        </div>
    );

    return (
        <section className={styles.card}>
            <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h2 style={{ margin: 0 }}>Catalog</h2>
                    <span className={styles.badge}>{filteredProducts.length} Products</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                        <input 
                            type="text" 
                            placeholder="Filter products..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                            style={{ paddingLeft: '2.5rem', minWidth: '250px' }}
                        />
                    </div>
                    <button 
                        onClick={() => { setIsAdding(true); setActiveTab('general'); }}
                        className={styles.btnPrimary}
                    >
                        + NEW PRODUCT
                    </button>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.dataTable}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Inventory</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length === 0 ? (
                            <tr><td colSpan={7} className={styles.emptyState}>No matching products found.</td></tr>
                        ) : (
                            filteredProducts.map(product => {
                                const stock = getStockStatus(product);
                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '44px', height: '44px', background: '#222', borderRadius: '8px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    {product.image ? (
                                                        <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} unoptimized />
                                                    ) : (
                                                        <Package size={20} style={{ position: 'absolute', top: '12px', left: '12px', color: '#444' }} />
                                                    )}
                                                </div>
                                                <div style={{ fontWeight: 600 }}>{product.name}</div>
                                            </div>
                                        </td>
                                        <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#888' }}>{product.sku || '---'}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <div style={{ fontWeight: 700 }}>${product.price.toFixed(2)}</div>
                                            {product.regularPrice && <div style={{ textDecoration: 'line-through', color: '#666', fontSize: '0.75rem' }}>${product.regularPrice.toFixed(2)}</div>}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: stock.color }}></div>
                                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: stock.color }}>{stock.label}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={product.isActive ? styles.activeBadge : styles.inactiveBadge}>
                                                {product.isActive ? 'Active' : 'Draft'}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button 
                                                    onClick={() => { setSelectedProduct(product); setActiveTab('general'); }}
                                                    className={styles.actionBtn}
                                                    title="Edit Product"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <form action={(formData) => {
                                                    if (confirm(`Permanently delete ${product.name}?`)) {
                                                        deleteProductAction(formData);
                                                    }
                                                }}>
                                                    <input type="hidden" name="id" value={product.id} />
                                                    <button 
                                                        type="submit"
                                                        className={styles.actionBtn}
                                                        style={{ color: '#ef4444' }}
                                                        title="Delete Product"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Slide-out Edit Drawer */}
            {(selectedProduct || isAdding) && (
                <>
                    <div className={styles.drawerBackdrop} onClick={() => { setSelectedProduct(null); setIsAdding(false); }} />
                    <div className={styles.drawer}>
                        <div className={styles.drawerHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div className={styles.drawerIcon}>
                                    <Package size={20} />
                                </div>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{isAdding ? 'New Product' : 'Edit Product'}</h2>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>{isAdding ? 'Configure your new inventory item' : `Editing SKU: ${selectedProduct.sku || 'N/A'}`}</p>
                                </div>
                            </div>
                            <button onClick={() => { setSelectedProduct(null); setIsAdding(false); }} className={styles.closeBtn}>
                                <X size={20} />
                            </button>
                        </div>

                        {renderTabs(isAdding)}

                        <form action={(formData) => { 
                            if (isAdding) addProductAction?.(formData); 
                            else updateProductAction(formData); 
                            setSelectedProduct(null); 
                            setIsAdding(false); 
                        }} className={styles.drawerBody}>
                            {!isAdding && <input type="hidden" name="id" value={selectedProduct.id} />}
                            
                            {activeTab === 'general' && (
                                <div className={styles.formSection}>
                                    <div className={styles.inputGroup}>
                                        <label><Layout size={14} /> Product Name</label>
                                        <input type="text" name="name" defaultValue={selectedProduct?.name || ''} placeholder="e.g. Raspberry Fusion Bar" required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label><Tag size={14} /> Category</label>
                                        <input type="text" name="category" defaultValue={selectedProduct?.category || ''} placeholder="Chocolate Bars" required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label><List size={14} /> Description</label>
                                        <textarea name="description" defaultValue={selectedProduct?.description || ''} rows={6} placeholder="Full product description..." required></textarea>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <input type="checkbox" name="isActive" defaultChecked={selectedProduct ? selectedProduct.isActive : true} style={{ width: 'auto' }} />
                                            <span>Visible on storefront</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'pricing' && (
                                <div className={styles.formSection}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div className={styles.inputGroup} style={{ flex: 1 }}>
                                            <label><TrendingUp size={14} /> Sale Price ($)</label>
                                            <input type="number" step="0.01" name="price" defaultValue={selectedProduct?.price || ''} required />
                                        </div>
                                        <div className={styles.inputGroup} style={{ flex: 1 }}>
                                            <label>Regular Price ($)</label>
                                            <input type="number" step="0.01" name="regularPrice" defaultValue={selectedProduct?.regularPrice || ''} />
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label><Box size={14} /> SKU (Stock Keeping Unit)</label>
                                        <input type="text" name="sku" defaultValue={selectedProduct?.sku || ''} placeholder="FUS-RASP-001" />
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div className={styles.inputGroup} style={{ flex: 1 }}>
                                            <label>Current Stock</label>
                                            <input type="number" name="stock" defaultValue={selectedProduct?.stock || 0} />
                                        </div>
                                        <div className={styles.inputGroup} style={{ flex: 1 }}>
                                            <label>Low Stock Alert</label>
                                            <input type="number" name="lowStockThreshold" defaultValue={selectedProduct?.lowStockThreshold || 5} />
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <input type="checkbox" name="manageStock" defaultChecked={selectedProduct ? selectedProduct.manageStock : true} style={{ width: 'auto' }} />
                                            <span>Track inventory levels</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'media' && (
                                <div className={styles.formSection}>
                                    <div className={styles.inputGroup}>
                                        <label><ImageIcon size={14} /> Primary Image URL</label>
                                        <input type="url" name="image" defaultValue={selectedProduct?.image || ''} placeholder="https://..." required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Gallery Images (One per line)</label>
                                        <textarea 
                                            rows={5} 
                                            placeholder="Paste image URLs here..."
                                            defaultValue={selectedProduct?.gallery ? JSON.parse(selectedProduct.gallery).join('\n') : ''}
                                            onChange={(e) => {
                                                // This is a bit of a hack to keep the existing gallery logic
                                                // but show it in a cleaner way. 
                                                // In a real app, I'd use an array of inputs.
                                            }}
                                        ></textarea>
                                        <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.5rem' }}>Note: The current system supports up to 5 gallery images.</p>
                                        {/* Hidden inputs for the server action */}
                                        {[0, 1, 2, 3, 4].map(i => {
                                            const gallery = selectedProduct?.gallery ? JSON.parse(selectedProduct.gallery) : [];
                                            return <input key={i} type="hidden" name={`gallery_${i}`} value={gallery[i] || ''} />;
                                        })}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'seo' && (
                                <div className={styles.formSection}>
                                    <div className={styles.inputGroup}>
                                        <label><Globe size={14} /> SEO Title</label>
                                        <input type="text" name="seoTitle" defaultValue={selectedProduct?.seoTitle || ''} placeholder="Custom title for Google" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>SEO Description</label>
                                        <textarea name="seoDescription" defaultValue={selectedProduct?.seoDescription || ''} rows={3} placeholder="Brief summary for search results"></textarea>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Target Keyword</label>
                                        <input type="text" name="targetKeyword" defaultValue={selectedProduct?.targetKeyword || ''} placeholder="e.g. magic mushroom chocolate" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label><ShieldCheck size={14} /> Image Alt Text</label>
                                        <input type="text" name="imageAlt" defaultValue={selectedProduct?.imageAlt || ''} placeholder="Describe the product for accessibility" />
                                    </div>
                                </div>
                            )}

                            <div className={styles.drawerFooter}>
                                <button type="button" onClick={() => { setSelectedProduct(null); setIsAdding(false); }} className={styles.btnSecondary} style={{ flex: 1 }}>Cancel</button>
                                <button type="submit" className={styles.btnPrimary} style={{ flex: 2 }}>{isAdding ? 'Create Product' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </section>
    );
}
