'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import cmsStyles from './blog.module.css';
import { Plus, Trash2, Edit, Save, X, ArrowLeft, Bold, Italic, Underline, List, ListOrdered, Quote, Link as LinkIcon, Image as ImageIcon, Code, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function BlogManagement() {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingPost, setEditingPost] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        category: 'Wellness & Microdosing',
        tags: ['Fusion Bars'],
        isPublic: true,
        allowComments: true
    });
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/admin/blog');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const method = editingPost ? 'PUT' : 'POST';
        const body = editingPost ? { ...formData, id: editingPost.id } : formData;

        try {
            const res = await fetch('/api/admin/blog', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                fetchPosts();
                setView('list');
            } else {
                alert('Failed to save post');
            }
        } catch (error) {
            alert('Failed to save post');
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            const res = await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchPosts();
            }
        } catch (error) {
            alert('Failed to delete post');
        }
    };

    const openEditor = (post: any = null) => {
        if (post) {
            setEditingPost(post);
            setFormData({
                title: post.title,
                excerpt: post.excerpt || '',
                content: post.content,
                image: post.image || '',
                category: post.category || 'Wellness & Microdosing',
                tags: post.tags || ['Fusion Bars'],
                isPublic: post.isPublic ?? true,
                allowComments: post.allowComments ?? true
            });
        } else {
            setEditingPost(null);
            setFormData({ 
                title: '', 
                excerpt: '', 
                content: '', 
                image: '',
                category: 'Wellness & Microdosing',
                tags: ['Fusion Bars'],
                isPublic: true,
                allowComments: true
            });
        }
        setView('editor');
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
    };

    if (view === 'editor') {
        return (
            <div className={cmsStyles.cmsContainer}>
                <div className={cmsStyles.mainContent}>
                    <button onClick={() => setView('list')} className={cmsStyles.backBtn}>
                        <ArrowLeft size={18} /> BACK TO POSTS
                    </button>
                    
                    <div className={cmsStyles.pageHeader}>
                        <h1>{editingPost ? 'Edit Post' : 'Create New Post'}</h1>
                        <p>Craft your latest experience and share it with the community.</p>
                    </div>

                    <div className={cmsStyles.inputGroup}>
                        <label className={cmsStyles.label}>Post Title</label>
                        <input 
                            className={cmsStyles.titleInput}
                            placeholder="Enter a descriptive title..."
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    <div className={cmsStyles.inputGroup}>
                        <label className={cmsStyles.label}>Content</label>
                        <div className={cmsStyles.editorContainer}>
                            <div className={cmsStyles.editorToolbar}>
                                <button className={cmsStyles.toolbarBtn}><Bold size={18} /></button>
                                <button className={cmsStyles.toolbarBtn}><Italic size={18} /></button>
                                <button className={cmsStyles.toolbarBtn}><Underline size={18} /></button>
                                <div className={cmsStyles.divider}></div>
                                <button className={cmsStyles.toolbarBtn}><List size={18} /></button>
                                <button className={cmsStyles.toolbarBtn}><ListOrdered size={18} /></button>
                                <button className={cmsStyles.toolbarBtn}><Quote size={18} /></button>
                                <div className={cmsStyles.divider}></div>
                                <button className={cmsStyles.toolbarBtn}><LinkIcon size={18} /></button>
                                <button className={cmsStyles.toolbarBtn}><ImageIcon size={18} /></button>
                                <button className={cmsStyles.toolbarBtn}><Code size={18} /></button>
                            </div>
                            <textarea 
                                className={cmsStyles.textarea}
                                placeholder="Start writing your magical story here..."
                                value={formData.content}
                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className={cmsStyles.sidebar}>
                    <div className={cmsStyles.widget}>
                        <button onClick={() => handleSubmit()} className={`${cmsStyles.publishBtn} premium-gradient`}>
                            {editingPost ? 'UPDATE POST' : 'PUBLISH'}
                        </button>
                    </div>

                    <div className={cmsStyles.widget}>
                        <h3 className={cmsStyles.widgetTitle}>Featured Image</h3>
                        <div className={cmsStyles.imageUpload} onClick={() => {
                            const url = prompt('Enter Image URL:');
                            if (url) setFormData({...formData, image: url});
                        }}>
                           {formData.image ? (
                               <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                           ) : (
                               <>
                                   <ImageIcon size={40} />
                                   <p className={cmsStyles.uploadText}>Set cover image</p>
                               </>
                           )}
                        </div>
                    </div>

                    <div className={cmsStyles.widget}>
                        <h3 className={cmsStyles.widgetTitle}>Category</h3>
                        <select 
                            className={cmsStyles.select}
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option>Wellness & Microdosing</option>
                            <option>Product Launch</option>
                            <option>Science & Research</option>
                            <option>Community Stories</option>
                            <option>Lifestyle</option>
                        </select>
                    </div>

                    <div className={cmsStyles.widget}>
                        <h3 className={cmsStyles.widgetTitle}>Tags</h3>
                        <div className={cmsStyles.tagsContainer}>
                            {formData.tags.map(tag => (
                                <span key={tag} className={cmsStyles.tag}>
                                    {tag} <button onClick={() => removeTag(tag)}><X size={12} /></button>
                                </span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input 
                                className={cmsStyles.tagInput} 
                                placeholder="Add tag..." 
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                            />
                        </div>
                    </div>

                    <div className={cmsStyles.widget}>
                        <h3 className={cmsStyles.widgetTitle}>Settings</h3>
                        <div className={cmsStyles.settingRow}>
                            <span className={cmsStyles.settingLabel}>Allow Comments</span>
                            <label className={cmsStyles.switch}>
                                <input 
                                    type="checkbox" 
                                    checked={formData.allowComments}
                                    onChange={(e) => setFormData({...formData, allowComments: e.target.checked})}
                                />
                                <span className={cmsStyles.slider}></span>
                            </label>
                        </div>
                        <div className={cmsStyles.settingRow}>
                            <span className={cmsStyles.settingLabel}>Make Public</span>
                            <label className={cmsStyles.switch}>
                                <input 
                                    type="checkbox" 
                                    checked={formData.isPublic}
                                    onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                                />
                                <span className={cmsStyles.slider}></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.adminPage}>
            <div className={styles.header}>
                <h1>Daily Blog Posts</h1>
                <button onClick={() => openEditor()} className={`${styles.addBtn} premium-gradient`}>
                    <Plus size={20} /> NEW POST
                </button>
            </div>

            {isLoading ? (
                <div className={styles.loading}>Loading posts...</div>
            ) : (
                <div className={styles.tableCard}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} onClick={() => openEditor(post)} style={{ cursor: 'pointer' }}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{post.title}</div>
                                    </td>
                                    <td>{post.category || 'General'}</td>
                                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${post.isPublic ? styles.completed : styles.pending}`}>
                                            {post.isPublic ? 'Public' : 'Draft'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button onClick={(e) => { e.stopPropagation(); openEditor(post); }} className={styles.editBtn}>
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={(e) => handleDelete(post.id, e)} className={styles.deleteBtn}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No blog posts yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
