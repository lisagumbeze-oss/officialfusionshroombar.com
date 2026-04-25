'use client';

import { useState, useEffect, useCallback } from 'react';
import { Upload, Trash2, Copy, Search, Grid, List as ListIcon, FileText, Image as ImageIcon } from 'lucide-react';
import styles from '../admin.module.css';
import { useToast } from '@/context/ToastContext';

interface MediaAsset {
    id: string;
    filename: string;
    originalFilename: string;
    mimeType: string;
    size: number;
    url: string;
    altText?: string;
    createdAt: string;
}

export default function MediaLibrary() {
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const { showToast } = useToast();

    const fetchAssets = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/media');
            const data = await res.json();
            setAssets(data);
        } catch (error) {
            console.error('Failed to fetch media:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAssets();
    }, [fetchAssets]);

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        showToast('URL copied to clipboard!');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this asset?')) return;
        try {
            const res = await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setAssets(prev => prev.filter(a => a.id !== id));
                showToast('Asset deleted successfully');
            }
        } catch (error) {
            showToast('Failed to delete asset', 'error');
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const filteredAssets = assets.filter(a => 
        a.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.originalFilename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.mediaContainer}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
                <div className={styles.searchContainer} style={{ flex: 1, maxWidth: '400px' }}>
                    <Search size={18} className={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder="Search assets..." 
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div className={styles.viewToggle}>
                        <button 
                            className={viewMode === 'grid' ? styles.active : ''} 
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid size={18} />
                        </button>
                        <button 
                            className={viewMode === 'list' ? styles.active : ''} 
                            onClick={() => setViewMode('list')}
                        >
                            <ListIcon size={18} />
                        </button>
                    </div>
                    
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        <Upload size={18} />
                        <span>Upload Media</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className={styles.emptyState}>Loading assets...</div>
            ) : filteredAssets.length === 0 ? (
                <div className={styles.emptyState}>
                    <ImageIcon size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                    <h3>No assets found</h3>
                    <p>Start by uploading some images or documents.</p>
                </div>
            ) : viewMode === 'grid' ? (
                <div className={styles.mediaGrid}>
                    {filteredAssets.map(asset => (
                        <div key={asset.id} className={styles.mediaItem}>
                            <div className={styles.mediaPreview}>
                                {asset.mimeType.startsWith('image/') ? (
                                    <img src={asset.url} alt={asset.altText || asset.filename} />
                                ) : (
                                    <div className={styles.fileIcon}><FileText size={48} /></div>
                                )}
                                <div className={styles.mediaOverlay}>
                                    <button onClick={() => handleCopyUrl(asset.url)} title="Copy URL"><Copy size={16} /></button>
                                    <button onClick={() => handleDelete(asset.id)} title="Delete"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            <div className={styles.mediaInfo}>
                                <span className={styles.mediaName}>{asset.filename}</span>
                                <span className={styles.mediaMeta}>{formatSize(asset.size)} · {asset.mimeType.split('/')[1].toUpperCase()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.card}>
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th>Preview</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Size</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssets.map(asset => (
                                <tr key={asset.id}>
                                    <td>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden', background: '#222' }}>
                                            {asset.mimeType.startsWith('image/') ? (
                                                <img src={asset.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><FileText size={20} /></div>
                                            )}
                                        </div>
                                    </td>
                                    <td>{asset.filename}</td>
                                    <td>{asset.mimeType.split('/')[1].toUpperCase()}</td>
                                    <td>{formatSize(asset.size)}</td>
                                    <td>{new Date(asset.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => handleCopyUrl(asset.url)} className={styles.actionBtn}><Copy size={14} /></button>
                                            <button onClick={() => handleDelete(asset.id)} className={styles.actionBtn} style={{ color: '#ef4444' }}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
