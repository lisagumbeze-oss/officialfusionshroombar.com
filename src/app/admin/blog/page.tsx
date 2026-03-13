'use client';

import { useState, useEffect } from 'react';
import { 
    Plus, Trash2, Edit, Save, X, ArrowLeft, Bold, Italic, 
    Underline, List, ListOrdered, Quote, Link as LinkIcon, 
    Image as ImageIcon, Code, ChevronRight, LayoutDashboard,
    Eye, MoreVertical, Calendar, Tag, Layers, MessageSquare,
    CheckCircle2, Clock, Brain
} from 'lucide-react';
import Image from 'next/image';

export default function BlogManagement() {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingPost, setEditingPost] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    
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
        setIsLoading(true);
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

    /**
     * Handles submission with a stable publish state to avoid race conditions
     */
    const handleSubmit = async (publishOverride?: boolean) => {
        if (!formData.title || !formData.content) {
            alert('Title and Content are required.');
            return;
        }

        setIsSaving(true);
        // Use the override if provided, otherwise default to formData state
        const targetIsPublic = publishOverride !== undefined ? publishOverride : formData.isPublic;
        
        const method = editingPost ? 'PUT' : 'POST';
        const body = {
            ...formData,
            isPublic: targetIsPublic,
            id: editingPost?.id
        };

        try {
            const res = await fetch('/api/admin/blog', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            
            if (res.ok) {
                await fetchPosts();
                setView('list');
                setEditingPost(null);
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.error || 'Failed to save post'}`);
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('Failed to save post. Please check your connection.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to permanently delete this post?')) return;
        
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
            // Handle tags which might be stringified JSON or array
            let parsedTags = ['Fusion Bars'];
            try {
                if (typeof post.tags === 'string') parsedTags = JSON.parse(post.tags);
                else if (Array.isArray(post.tags)) parsedTags = post.tags;
            } catch (e) {}

            setFormData({
                title: post.title,
                excerpt: post.excerpt || '',
                content: post.content,
                image: post.image || '',
                category: post.category || 'Wellness & Microdosing',
                tags: parsedTags,
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
        
        setTimeout(() => {
            textarea.focus();
            const newPos = start + before.length + selectedText.length + after.length;
            textarea.setSelectionRange(newPos, newPos);
        }, 0);
    };

    // --- RENDER DASHBOARD (LIST VIEW) ---
    if (view === 'list') {
        return (
            <div className="flex flex-col min-h-screen w-full bg-[#f7f5f8] dark:bg-[#1b1022] text-slate-900 dark:text-slate-100 font-sans">
                {/* Unified Header */}
                <header className="flex items-center justify-between border-b border-primary/20 px-6 py-4 lg:px-20 bg-[#f7f5f8] dark:bg-[#1b1022] sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <Brain size={18} />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Fusion CMS</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-6 items-center">
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Dashboard</a>
                            <a className="text-primary text-sm font-semibold border-b-2 border-primary pb-1" href="#">Posts</a>
                            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Analytics</a>
                        </nav>
                        <div className="flex items-center gap-3 ml-4">
                            <button 
                                onClick={() => openEditor()}
                                className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                            >
                                <span>New Post</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-6 lg:p-20">
                    {/* Welcome Section */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-black tracking-tight mb-2">Manage Your Stories</h1>
                        <p className="text-slate-500 dark:text-slate-400">Craft your latest experience and share it with the community.</p>
                    </div>
                {/* Content wrapper continued... */}

                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white dark:bg-primary/5 border border-primary/20 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="p-2 rounded-lg bg-primary/10 text-primary"><Layers size={20} /></span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Total</span>
                            </div>
                            <div className="text-3xl font-black">{posts.length}</div>
                            <div className="text-xs text-slate-400 mt-2 font-medium">Stories Recorded</div>
                        </div>
                        <div className="bg-white dark:bg-primary/5 border border-primary/20 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="p-2 rounded-lg bg-green-500/10 text-green-500"><CheckCircle2 size={20} /></span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Active</span>
                            </div>
                            <div className="text-3xl font-black text-green-500">{posts.filter(p => p.isPublic).length}</div>
                            <div className="text-xs text-slate-400 mt-2 font-medium">Publicly Visible</div>
                        </div>
                        <div className="bg-white dark:bg-primary/5 border border-primary/20 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-500"><Clock size={20} /></span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Drafts</span>
                            </div>
                            <div className="text-3xl font-black text-amber-500">{posts.filter(p => !p.isPublic).length}</div>
                            <div className="text-xs text-slate-400 mt-2 font-medium">Pending Review</div>
                        </div>
                        <div className="bg-white dark:bg-primary/5 border border-primary/20 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><MessageSquare size={20} /></span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Engage</span>
                            </div>
                            <div className="text-3xl font-black">Live</div>
                            <div className="text-xs text-slate-400 mt-2 font-medium">Comments Active</div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white dark:bg-primary/5 border border-primary/20 rounded-xl overflow-hidden shadow-sm">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Database</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-white/10">
                                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-slate-400">Post Detail</th>
                                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-slate-400">Category</th>
                                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-slate-400">Date</th>
                                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post) => (
                                        <tr 
                                            key={post.id} 
                                            onClick={() => openEditor(post)}
                                            className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer border-b border-slate-100 dark:border-white/5 last:border-0"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-12 rounded-2xl bg-slate-200 dark:bg-white/10 overflow-hidden relative border border-white/10">
                                                        {post.image ? <Image src={post.image} alt="" fill className="object-cover" /> : <div className="size-full flex items-center justify-center text-slate-400"><ImageIcon size={20} /></div>}
                                                    </div>
                                                    <div className="flex flex-col max-w-xs xl:max-w-md">
                                                        <span className="font-bold text-slate-900 dark:text-white truncate text-lg">{post.title}</span>
                                                        <span className="text-sm text-slate-400 truncate mt-1">{post.excerpt || 'No summary provided...'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl w-fit">
                                                    <Tag size={14} className="text-primary" />
                                                    {post.category || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                                                    <Calendar size={14} />
                                                    {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                {post.isPublic ? (
                                                    <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-500 text-[10px] uppercase font-black border border-green-500/20">Public</span>
                                                ) : (
                                                    <span className="px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] uppercase font-black border border-amber-500/20">Draft</span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={(e) => { e.stopPropagation(); openEditor(post); }} className="p-3 rounded-2xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white hover:text-primary hover:border-primary transition-all shadow-sm">
                                                        <Edit size={18} />
                                                    </button>
                                                    <button onClick={(e) => handleDelete(post.id, e)} className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {posts.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="size-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                                                        <Plus size={40} />
                                                    </div>
                                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No stories found</p>
                                                    <button onClick={() => openEditor()} className="text-primary font-bold hover:underline">Start writing now</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
                
                {/* Footer from code.html */}
                <footer className="mt-12 py-10 border-t border-primary/10 text-center">
                    <p className="text-xs text-slate-500 font-medium tracking-wide">© 2026 Fusion Shroom Bars. All rights reserved. Designed for mindful content creation.</p>
                </footer>
            </div>
        );
    }

    // --- RENDER EDITOR VIEW ---
    return (
        <div className="flex flex-col min-h-screen w-full bg-[#f7f5f8] dark:bg-[#1b1022] text-slate-900 dark:text-slate-100 font-sans">
            {/* Unified Header */}
            <header className="flex items-center justify-between border-b border-primary/20 px-6 py-4 lg:px-20 bg-[#f7f5f8] dark:bg-[#1b1022] sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setView('list')} 
                        className="p-2 hover:bg-primary/10 rounded-lg text-slate-600 dark:text-slate-300 transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <Brain size={18} />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Fusion CMS</h2>
                </div>
                <div className="flex flex-1 justify-end gap-3 items-center">
                    <button 
                        disabled={isSaving}
                        onClick={() => handleSubmit(false)}
                        className="hidden sm:flex items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary border border-primary/20 text-sm font-bold hover:bg-primary/20 transition-all disabled:opacity-50"
                    >
                        <span>Save Draft</span>
                    </button>
                    <button 
                        disabled={isSaving}
                        onClick={() => handleSubmit(true)}
                        className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        {isSaving ? <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <span>Publish</span>}
                    </button>
                </div>
            </header>

            <main className="flex-1 flex justify-center py-8 px-4 lg:px-20">
                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight mb-2">{editingPost ? 'Edit Post' : 'Create New Post'}</h1>
                            <p className="text-slate-500 dark:text-slate-400">Craft your latest experience and share it with the community.</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Post Title</label>
                                <input 
                                    className="w-full rounded-xl text-lg font-bold border border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                                    placeholder="Enter a descriptive title..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Content</label>
                                <div className="rounded-xl border border-primary/20 bg-white dark:bg-primary/5 overflow-hidden flex flex-col min-h-[500px]">
                                    <div className="flex items-center gap-1 p-2 border-b border-primary/10 bg-slate-50 dark:bg-primary/10">
                                        <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('**', '**')}><Bold size={18} /></button>
                                        <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('*', '*')}><Italic size={18} /></button>
                                        <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('<u>', '</u>')}><Underline size={18} /></button>
                                        <div className="w-px h-6 bg-primary/20 mx-1"></div>
                                        <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('\n- ')}><List size={18} /></button>
                                        <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('\n1. ')}><ListOrdered size={18} /></button>
                                        <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('\n> ')}><Quote size={18} /></button>
                                        <div className="w-px h-6 bg-primary/20 mx-1"></div>
                                        <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('[', '](url)')}><LinkIcon size={18} /></button>
                                        <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => {
                                            const url = prompt('Enter Image URL:');
                                            if (url) insertMarkdown('![alt text](', url + ')');
                                        }}><ImageIcon size={18} /></button>
                                        <button className="p-2 hover:bg-primary/10 rounded text-slate-600 dark:text-slate-300" onClick={() => insertMarkdown('`', '`')}><Code size={18} /></button>
                                    </div>
                                    <textarea 
                                        id="blog-content-editor"
                                        className="flex-1 w-full p-6 bg-transparent border-none focus:ring-0 resize-none text-base leading-relaxed placeholder:text-slate-600 text-slate-800 dark:text-slate-100" 
                                        placeholder="Start writing your magical story here..."
                                        value={formData.content}
                                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-xl border border-primary/20 bg-white dark:bg-primary/5 space-y-4 shadow-sm">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Featured Image</h3>
                            <div 
                                className="aspect-video w-full rounded-lg border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 transition-colors cursor-pointer group relative overflow-hidden"
                                onClick={() => {
                                    const url = prompt('Cover Image URL:');
                                    if (url) setFormData({...formData, image: url});
                                }}
                            >
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <ImageIcon size={32} className="text-primary/40 group-hover:text-primary transition-colors" />
                                        <p className="text-xs text-slate-500">Upload cover (1200x630px)</p>
                                    </>
                                )}
                            </div>
                            <input 
                                className="w-full text-xs rounded-lg border-primary/20 bg-transparent placeholder:text-slate-600 focus:border-primary focus:ring-primary h-10 px-3" 
                                placeholder="Image URL..."
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                            />
                        </div>

                        <div className="p-6 rounded-xl border border-primary/20 bg-white dark:bg-primary/5 space-y-4 shadow-sm">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Category</h3>
                            <select 
                                className="w-full rounded-lg border-primary/20 bg-transparent text-slate-800 dark:text-slate-200 focus:border-primary focus:ring-primary h-12 px-3 appearance-none"
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

                        <div className="p-6 rounded-xl border border-primary/20 bg-white dark:bg-primary/5 space-y-4 shadow-sm">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center gap-1 group/tag transition-all">
                                        {tag} 
                                        <button onClick={() => removeTag(tag)} className="opacity-60 hover:opacity-100 hover:text-red-500 transition-all"><X size={12} /></button>
                                    </span>
                                ))}
                            </div>
                            <input 
                                className="w-full text-sm rounded-lg border-primary/20 bg-transparent placeholder:text-slate-600 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm" 
                                placeholder="Add a tag and press Enter..."
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                            />
                        </div>

                        <div className="p-6 rounded-xl border border-primary/20 bg-white dark:bg-primary/5 space-y-4 shadow-sm">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Settings</h3>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">Allow Comments</span>
                                    <div className="relative inline-flex items-center">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={formData.allowComments}
                                            onChange={(e) => setFormData({...formData, allowComments: e.target.checked})}
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary rounded-full"></div>
                                    </div>
                                </label>
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">Make Public</span>
                                    <div className="relative inline-flex items-center">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={formData.isPublic}
                                            onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary rounded-full"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-10 px-6 lg:px-20 border-t border-primary/10 text-center">
                <p className="text-xs text-slate-500 font-medium font-sans">© 2026 Fusion Shroom Bars. All rights reserved. Designed for mindful content creation.</p>
            </footer>
        </div>
    );
}
