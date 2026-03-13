'use client';

import { useState, useEffect } from 'react';
import { 
    Plus, Trash2, Edit, Save, X, ArrowLeft, Bold, Italic, 
    Underline, List, ListOrdered, Quote, Link as LinkIcon, 
    Image as ImageIcon, Code, ChevronRight, LayoutDashboard,
    Eye, MoreVertical, Calendar, Tag, Layers, MessageSquare,
    CheckCircle2, Clock
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
            <div className="flex flex-col min-h-screen w-full bg-[#f8f9fc] dark:bg-[#0f0714] text-slate-900 dark:text-slate-100 p-4 lg:p-10 font-sans">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight flex items-center gap-3 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            Fusion Command <span className="text-slate-400">Posts</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-500 mt-2 font-medium">Manage and publish your latest community stories.</p>
                    </div>
                    <button 
                        onClick={() => openEditor()}
                        className="flex items-center justify-center gap-2 rounded-2xl h-12 px-8 bg-primary text-white font-bold hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/25"
                    >
                        <Plus size={20} strokeWidth={3} />
                        <span>New Post</span>
                    </button>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="p-2 rounded-xl bg-primary/10 text-primary"><Layers size={20} /></span>
                            <span className="text-xs font-bold text-slate-400">Total</span>
                        </div>
                        <div className="text-3xl font-black">{posts.length}</div>
                        <div className="text-sm text-slate-400 mt-1">Managed Posts</div>
                    </div>
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="p-2 rounded-xl bg-green-500/10 text-green-500"><CheckCircle2 size={20} /></span>
                            <span className="text-xs font-bold text-slate-400">Active</span>
                        </div>
                        <div className="text-3xl font-black text-green-500">{posts.filter(p => p.isPublic).length}</div>
                        <div className="text-sm text-slate-400 mt-1">Publicly Visible</div>
                    </div>
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500"><Clock size={20} /></span>
                            <span className="text-xs font-bold text-slate-400">Drafts</span>
                        </div>
                        <div className="text-3xl font-black text-amber-500">{posts.filter(p => !p.isPublic).length}</div>
                        <div className="text-sm text-slate-400 mt-1">Pending Review</div>
                    </div>
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-500"><MessageSquare size={20} /></span>
                            <span className="text-xs font-bold text-slate-400">Engage</span>
                        </div>
                        <div className="text-3xl font-black">Live</div>
                        <div className="text-sm text-slate-400 mt-1">Comments Enabled</div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-sm">
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
        );
    }

    // --- RENDER EDITOR VIEW ---
    return (
        <div className="flex flex-col min-h-screen w-full bg-[#f8f9fc] dark:bg-[#0f0714] text-slate-900 dark:text-slate-100 overflow-x-hidden font-sans">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-primary/20 px-6 py-4 lg:px-20 bg-white dark:bg-[#0f0714]/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm transition-all">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setView('list')} 
                        className="size-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-slate-600 dark:text-white hover:text-primary hover:border-primary active:scale-90 transition-all shadow-sm"
                    >
                        <ArrowLeft size={20} strokeWidth={3} />
                    </button>
                    <div>
                        <h2 className="text-lg font-black tracking-tighter uppercase text-primary">Fusion CMS</h2>
                        <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 leading-none">Creative Suite</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <button 
                        disabled={isSaving}
                        onClick={() => handleSubmit(false)}
                        className="hidden sm:flex items-center justify-center rounded-2xl h-11 px-6 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 text-sm font-black hover:bg-slate-200 dark:hover:bg-white/10 transition-all disabled:opacity-50"
                    >
                        <span>Save Draft</span>
                    </button>
                    <button 
                        disabled={isSaving}
                        onClick={() => handleSubmit(true)}
                        className="flex items-center justify-center rounded-2xl h-11 px-8 bg-primary text-white text-sm font-black hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/25 disabled:opacity-50 flex-shrink-0"
                    >
                        {isSaving ? (
                            <div className="size-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <span>{editingPost ? 'Update' : 'Publish'}</span>
                        )}
                    </button>
                </div>
            </header>

            <main className="flex-1 flex justify-center py-10 px-4 lg:px-20">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Editor Section */}
                    <div className="lg:col-span-8 space-y-8">
                        <div>
                            <span className="text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-2 block animate-pulse underline decoration-2 underline-offset-4">LIVE CONTENT</span>
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white">
                                {editingPost ? 'Refine Story' : 'Draft Experience'}
                            </h1>
                            <p className="text-slate-500 max-w-md font-medium text-lg leading-relaxed">Shape how the community sees Fusion. Content is key.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Headline</label>
                                <input 
                                    className="w-full rounded-[2rem] text-2xl font-black border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 focus:ring-4 focus:ring-primary/10 h-20 px-8 placeholder:text-slate-300 dark:placeholder:text-white/10 transition-all text-slate-900 dark:text-white" 
                                    placeholder="Enter your catch title..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Journal Content</label>
                                <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden flex flex-col min-h-[600px] shadow-sm transition-all focus-within:ring-4 focus-within:ring-primary/10">
                                    <div className="flex flex-wrap items-center gap-2 p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                                        <button className="p-3 hover:bg-primary/10 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-primary transition-all" onClick={() => insertMarkdown('**', '**')} title="Bold"><Bold size={18} strokeWidth={3} /></button>
                                        <button className="p-3 hover:bg-primary/10 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-primary transition-all" onClick={() => insertMarkdown('*', '*')} title="Italic"><Italic size={18} strokeWidth={3} /></button>
                                        <button className="p-3 hover:bg-primary/10 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-primary transition-all" onClick={() => insertMarkdown('<u>', '</u>')} title="Underline"><Underline size={18} strokeWidth={3} /></button>
                                        <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2"></div>
                                        <button className="p-3 hover:bg-primary/10 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-primary transition-all" onClick={() => insertMarkdown('\n- ')} title="Bullets"><List size={18} strokeWidth={3} /></button>
                                        <button className="p-3 hover:bg-primary/10 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-primary transition-all" onClick={() => insertMarkdown('\n1. ')} title="Numbers"><ListOrdered size={18} strokeWidth={3} /></button>
                                        <button className="p-3 hover:bg-primary/10 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-primary transition-all" onClick={() => insertMarkdown('\n> ')} title="Quote"><Quote size={18} strokeWidth={3} /></button>
                                        <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2"></div>
                                        <button className="p-3 hover:bg-primary/10 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-primary transition-all" onClick={() => insertMarkdown('[', '](url)')} title="Link"><LinkIcon size={18} strokeWidth={3} /></button>
                                        <button className="p-3 hover:bg-primary/10 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-primary transition-all" onClick={() => {
                                            const url = prompt('Enter Image URL:');
                                            if (url) insertMarkdown('![alt text](', url + ')');
                                        }} title="Media"><ImageIcon size={18} strokeWidth={3} /></button>
                                    </div>
                                    <textarea 
                                        id="blog-content-editor"
                                        className="flex-1 w-full p-10 bg-transparent border-none focus:ring-0 resize-none text-lg leading-relaxed placeholder:text-slate-200 dark:placeholder:text-white/5 font-medium text-slate-700 dark:text-slate-200" 
                                        placeholder="Start telling your story..."
                                        value={formData.content}
                                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Cover Asset</h3>
                            <div 
                                className="aspect-[4/3] w-full rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group overflow-hidden relative shadow-inner shadow-black/5"
                                onClick={() => {
                                    const url = prompt('Enter Cover Image URL:');
                                    if (url) setFormData({...formData, image: url});
                                }}
                            >
                                {formData.image ? (
                                    <img src={formData.image} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <>
                                        <div className="p-5 rounded-[2rem] bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <ImageIcon size={32} strokeWidth={2.5} />
                                        </div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Visual</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Classification</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                    <select 
                                        className="w-full rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-bold focus:ring-4 focus:ring-primary/10 h-12 px-4 appearance-none transition-all shadow-sm"
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
                                <div className="space-y-3 pt-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Taxonomy (Tags)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map(tag => (
                                            <span key={tag} className="px-4 py-2 rounded-2xl bg-primary/10 text-primary text-[10px] font-black uppercase border border-primary/20 flex items-center gap-2 group/tag">
                                                {tag} 
                                                <button onClick={() => removeTag(tag)} className="p-0.5 rounded-full hover:bg-red-500 hover:text-white transition-all opacity-60 group-hover/tag:opacity-100">
                                                    <X size={10} strokeWidth={4} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <input 
                                        className="w-full text-xs rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 placeholder:text-slate-300 font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/10 h-12 px-4 transition-all shadow-sm text-slate-900 dark:text-white" 
                                        placeholder="Add tag..."
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addTag()}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Preferences</h3>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between cursor-pointer p-4 rounded-3xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all group">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-primary">Allow Comments</span>
                                    <div className="relative inline-flex items-center">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={formData.allowComments}
                                            onChange={(e) => setFormData({...formData, allowComments: e.target.checked})}
                                        />
                                        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary rounded-full"></div>
                                    </div>
                                </label>
                                <label className="flex items-center justify-between cursor-pointer p-4 rounded-3xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all group">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-primary">Live Publicly</span>
                                    <div className="relative inline-flex items-center">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={formData.isPublic}
                                            onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                                        />
                                        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary rounded-full"></div>
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
