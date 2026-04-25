'use client';

import { useState, useEffect } from 'react';
import { 
    Search, Plus, Edit2, Trash2, X, FileText, 
    Globe, Image as ImageIcon, MessageSquare, 
    User, Calendar, ChevronRight, Save
} from 'lucide-react';
import styles from '../admin.module.css';
import Image from 'next/image';
import { useToast } from '@/context/ToastContext';

export default function BlogManager() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('content');
    const { showToast } = useToast();

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/admin/blog');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = selectedPost.id ? 'PATCH' : 'POST';
        const url = selectedPost.id ? `/api/admin/blog/${selectedPost.id}` : '/api/admin/blog';

        try {
            const res = await fetch(url, {
                method,
                body: JSON.stringify(selectedPost),
            });
            if (res.ok) {
                showToast(`Post ${selectedPost.id ? 'updated' : 'created'} successfully`);
                setIsEditing(false);
                fetchPosts();
            }
        } catch (error) {
            showToast('Failed to save post', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Post deleted');
                fetchPosts();
            }
        } catch (error) {
            showToast('Delete failed', 'error');
        }
    };

    const filteredPosts = posts.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading CMS...</div>;

    return (
        <section className={styles.card}>
            <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h2 style={{ margin: 0 }}>Articles</h2>
                    <span className={styles.badge}>{filteredPosts.length} Posts</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                        <input 
                            type="text" 
                            placeholder="Search articles..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                            style={{ paddingLeft: '2.5rem' }}
                        />
                    </div>
                    <button 
                        onClick={() => { setSelectedPost({ title: '', content: '', excerpt: '', status: 'DRAFT', category: 'Uncategorized' }); setIsEditing(true); setActiveTab('content'); }}
                        className={styles.btnPrimary}
                    >
                        <Plus size={16} />
                        <span>NEW POST</span>
                    </button>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.dataTable}>
                    <thead>
                        <tr>
                            <th>Article</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Engagement</th>
                            <th>Date</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map(post => (
                            <tr key={post.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '44px', height: '44px', background: '#222', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                                            {post.image ? (
                                                <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} unoptimized />
                                            ) : (
                                                <FileText size={20} style={{ position: 'absolute', top: '12px', left: '12px', color: '#444' }} />
                                            )}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{post.title}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#666' }}>/{post.slug}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{post.category}</td>
                                <td>
                                    <span className={post.status === 'PUBLISHED' ? styles.activeBadge : styles.inactiveBadge}>
                                        {post.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#888' }}>
                                        <MessageSquare size={14} />
                                        {post._count?.comments || 0}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.85rem' }}>{new Date(post.createdAt).toLocaleDateString()}</div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button 
                                            onClick={() => { setSelectedPost(post); setIsEditing(true); setActiveTab('content'); }}
                                            className={styles.actionBtn}
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(post.id)}
                                            className={styles.actionBtn}
                                            style={{ color: '#ef4444' }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CMS Drawer */}
            {isEditing && (
                <>
                    <div className={styles.drawerBackdrop} onClick={() => setIsEditing(false)} />
                    <div className={styles.drawer} style={{ width: '700px' }}>
                        <div className={styles.drawerHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div className={styles.drawerIcon}><FileText size={20} /></div>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{selectedPost.id ? 'Edit Article' : 'New Article'}</h2>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>Drafting for Fusion CMS</p>
                                </div>
                            </div>
                            <button onClick={() => setIsEditing(false)} className={styles.closeBtn}><X size={20} /></button>
                        </div>

                        <div className={styles.tabContainer}>
                            <button className={activeTab === 'content' ? styles.activeTab : ''} onClick={() => setActiveTab('content')}>Content</button>
                            <button className={activeTab === 'settings' ? styles.activeTab : ''} onClick={() => setActiveTab('settings')}>Settings & Media</button>
                            <button className={activeTab === 'seo' ? styles.activeTab : ''} onClick={() => setActiveTab('seo')}>SEO</button>
                        </div>

                        <form onSubmit={handleSave} className={styles.drawerBody}>
                            {activeTab === 'content' && (
                                <div className={styles.formSection}>
                                    <div className={styles.inputGroup}>
                                        <label>Title</label>
                                        <input 
                                            type="text" 
                                            value={selectedPost.title} 
                                            onChange={(e) => setSelectedPost({...selectedPost, title: e.target.value})} 
                                            placeholder="The benefits of Psilocybin..."
                                            required 
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Excerpt</label>
                                        <textarea 
                                            rows={2} 
                                            value={selectedPost.excerpt} 
                                            onChange={(e) => setSelectedPost({...selectedPost, excerpt: e.target.value})} 
                                            placeholder="Short summary for list views..."
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Body Content (HTML supported)</label>
                                        <textarea 
                                            rows={12} 
                                            value={selectedPost.content} 
                                            onChange={(e) => setSelectedPost({...selectedPost, content: e.target.value})} 
                                            style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                                            placeholder="Write your story here..."
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className={styles.formSection}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div className={styles.inputGroup} style={{ flex: 1 }}>
                                            <label>Status</label>
                                            <select value={selectedPost.status} onChange={(e) => setSelectedPost({...selectedPost, status: e.target.value})}>
                                                <option value="DRAFT">Draft</option>
                                                <option value="PUBLISHED">Published</option>
                                                <option value="ARCHIVED">Archived</option>
                                            </select>
                                        </div>
                                        <div className={styles.inputGroup} style={{ flex: 1 }}>
                                            <label>Category</label>
                                            <input type="text" value={selectedPost.category} onChange={(e) => setSelectedPost({...selectedPost, category: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label><User size={14} /> Author Name</label>
                                        <input type="text" value={selectedPost.author} onChange={(e) => setSelectedPost({...selectedPost, author: e.target.value})} />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label><ImageIcon size={14} /> Featured Image URL</label>
                                        <input type="url" value={selectedPost.image || ''} onChange={(e) => setSelectedPost({...selectedPost, image: e.target.value})} placeholder="https://..." />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'seo' && (
                                <div className={styles.formSection}>
                                    <div className={styles.inputGroup}>
                                        <label><Globe size={14} /> SEO Title</label>
                                        <input type="text" value={selectedPost.seoTitle || ''} onChange={(e) => setSelectedPost({...selectedPost, seoTitle: e.target.value})} />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>SEO Description</label>
                                        <textarea rows={3} value={selectedPost.seoDescription || ''} onChange={(e) => setSelectedPost({...selectedPost, seoDescription: e.target.value})} />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Target Keyword</label>
                                        <input type="text" value={selectedPost.targetKeyword || ''} onChange={(e) => setSelectedPost({...selectedPost, targetKeyword: e.target.value})} placeholder="e.g. magic mushroom benefits" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Slug (URL Path)</label>
                                        <input type="text" value={selectedPost.slug || ''} onChange={(e) => setSelectedPost({...selectedPost, slug: e.target.value})} placeholder="benefits-of-shrooms" />
                                    </div>
                                </div>
                            )}

                            <div className={styles.drawerFooter}>
                                <button type="button" onClick={() => setIsEditing(false)} className={styles.btnSecondary} style={{ flex: 1 }}>Cancel</button>
                                <button type="submit" className={styles.btnPrimary} style={{ flex: 2 }}>
                                    <Save size={18} />
                                    <span>{selectedPost.id ? 'Update Article' : 'Publish Article'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </section>
    );
}
