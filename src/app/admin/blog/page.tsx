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

    const insertMarkdown = (before: string, after: string = '') => {
        const textarea = document.getElementById('blog-content-editor') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);
        
        const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
        setFormData({ ...formData, content: newText });
        
        // Focus back and set selection
        setTimeout(() => {
            textarea.focus();
            const newPos = start + before.length + selectedText.length + after.length;
            textarea.setSelectionRange(newPos, newPos);
        }, 0);
    };

    if (view === 'editor') {
        return (
            <div className="flex flex-col min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-primary/20 px-6 py-4 lg:px-20 bg-background-light dark:bg-background-dark sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setView('list')} className="size-8 bg-primary rounded-lg flex items-center justify-center text-white hover:brightness-110 transition-all">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h2 className="text-xl font-bold tracking-tight">Fusion CMS</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-6 items-center">
                        <nav className="hidden md:flex items-center gap-8">
                            <button onClick={() => setView('list')} className="text-sm font-medium hover:text-primary transition-colors">Dashboard</button>
                            <span className="text-primary text-sm font-semibold border-b-2 border-primary pb-1">Editor</span>
                        </nav>
                        <div className="flex items-center gap-3 ml-4">
                            <button 
                                onClick={() => { setFormData({...formData, isPublic: false}); handleSubmit(); }}
                                className="hidden sm:flex items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary border border-primary/20 text-sm font-bold hover:bg-primary/20 transition-all"
                            >
                                <span>Save Draft</span>
                            </button>
                            <button 
                                onClick={() => { setFormData({...formData, isPublic: true}); handleSubmit(); }}
                                className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                            >
                                <span>{editingPost ? 'Update' : 'Publish'}</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 flex justify-center py-8 px-4 lg:px-20">
                    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Editor Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h1 className="text-3xl font-black tracking-tight mb-2">{editingPost ? 'Edit Post' : 'Create New Post'}</h1>
                                <p className="text-slate-500 dark:text-slate-400">Craft your latest experience and share it with the community.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Post Title</label>
                                    <input 
                                        className="w-full rounded-xl text-lg font-bold border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                                        placeholder="Enter a descriptive title..."
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Content</label>
                                    <div className="rounded-xl border border-primary/20 bg-white dark:bg-primary/5 overflow-hidden flex flex-col min-h-[500px]">
                                        <div className="flex items-center gap-1 p-2 border-b border-primary/10 bg-slate-50 dark:bg-primary/10">
                                            <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('**', '**')} title="Bold"><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
                                            <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('*', '*')} title="Italic"><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
                                            <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('<u>', '</u>')} title="Underline"><span className="material-symbols-outlined text-[20px]">format_underlined</span></button>
                                            <div className="w-px h-6 bg-primary/20 mx-1"></div>
                                            <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('\n- ')} title="Bullet List"><span className="material-symbols-outlined text-[20px]">format_list_bulleted</span></button>
                                            <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('\n1. ')} title="Numbered List"><span className="material-symbols-outlined text-[20px]">format_list_numbered</span></button>
                                            <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('\n> ')} title="Quote"><span className="material-symbols-outlined text-[20px]">format_quote</span></button>
                                            <div className="w-px h-6 bg-primary/20 mx-1"></div>
                                            <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('[', '](url)')} title="Link"><span className="material-symbols-outlined text-[20px]">link</span></button>
                                            <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => {
                                                const url = prompt('Enter Image URL:');
                                                if (url) insertMarkdown('![alt text](', url + ')');
                                            }} title="Image"><span className="material-symbols-outlined text-[20px]">image</span></button>
                                        </div>
                                        <textarea 
                                            id="blog-content-editor"
                                            className="flex-1 w-full p-6 bg-transparent border-none focus:ring-0 resize-none text-base leading-relaxed placeholder:text-slate-600" 
                                            placeholder="Start writing your magical story here..."
                                            value={formData.content}
                                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="p-6 rounded-xl border border-primary/20 bg-white dark:bg-primary/5 space-y-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Featured Image</h3>
                                <div 
                                    className="aspect-video w-full rounded-lg border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 transition-colors cursor-pointer group overflow-hidden relative"
                                    onClick={() => {
                                        const url = prompt('Enter Cover Image URL:');
                                        if (url) setFormData({...formData, image: url});
                                    }}
                                >
                                    {formData.image ? (
                                        <img src={formData.image} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-4xl text-primary/40 group-hover:text-primary transition-colors">add_photo_alternate</span>
                                            <p className="text-xs text-slate-500">Upload cover (1200x630px)</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 rounded-xl border border-primary/20 bg-white dark:bg-primary/5 space-y-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Category</h3>
                                <select 
                                    className="w-full rounded-lg border-primary/20 bg-transparent text-slate-800 dark:text-slate-100 focus:border-primary focus:ring-primary h-10 px-3"
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

                            <div className="p-6 rounded-xl border border-primary/20 bg-white dark:bg-primary/5 space-y-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center gap-1">
                                            {tag} <button onClick={() => removeTag(tag)} className="material-symbols-outlined text-[14px]">close</button>
                                        </span>
                                    ))}
                                </div>
                                <input 
                                    className="w-full text-sm rounded-lg border-primary/20 bg-transparent placeholder:text-slate-600 focus:border-primary focus:ring-primary h-10 px-3" 
                                    placeholder="Add a tag..."
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                                />
                            </div>

                            <div className="p-6 rounded-xl border border-primary/20 bg-white dark:bg-primary/5 space-y-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Settings</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-sm">Allow Comments</span>
                                        <div className="relative inline-flex items-center">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                checked={formData.allowComments}
                                                onChange={(e) => setFormData({...formData, allowComments: e.target.checked})}
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                        </div>
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-sm">Make Public</span>
                                        <div className="relative inline-flex items-center">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                checked={formData.isPublic}
                                                onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
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
