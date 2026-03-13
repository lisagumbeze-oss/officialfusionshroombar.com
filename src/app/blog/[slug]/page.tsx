import prisma from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Share2, Heart, Bookmark, ArrowRight, CheckCircle2, User, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post: any = null;

    try {
        post = await (prisma as any).blogPost.findUnique({
            where: { 
                slug,
                isPublic: true
            }
        });
    } catch (error) {
        console.error('[BlogPost] Database error:', error);
    }

    if (!post) notFound();

    // Mock related posts for the "Recommended" section
    const relatedPosts = [
        { id: 1, title: 'The Science of Lion\'s Mane', category: 'Science', image: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?q=80&w=1000&auto=format&fit=crop', excerpt: 'How this powerful fungus helps with neurogenesis and cognitive performance.' },
        { id: 2, title: 'Microdosing Rituals', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop', excerpt: 'A beginner\'s guide to creating a morning ritual that sets the tone for your day.' },
        { id: 3, title: 'Inside the Mint Crunch Release', category: 'Product', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1000&auto=format&fit=crop', excerpt: 'An exclusive look behind the scenes of our newest flavor profile.' },
    ];

    return (
        <main className="min-h-screen bg-[#f7f5f8] dark:bg-[#1b1022] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1022] via-[#1b1022]/40 to-transparent z-10"></div>
                {post.image ? (
                    <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover" 
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary opacity-20 italic">FUSION</span>
                    </div>
                )}
                
                <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 sm:pb-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                            {post.category || 'Wellness Guide'}
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-8">
                            {post.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6 text-slate-400">
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
                                    <User size={24} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Fusion Team</p>
                                    <p className="text-xs">Expert Mycologist</p>
                                </div>
                            </div>
                            <div className="h-10 w-px bg-primary/20 hidden sm:block"></div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-tighter flex items-center gap-1"><Calendar size={10} /> Published</span>
                                <span className="text-slate-200 text-sm font-medium">{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-tighter flex items-center gap-1"><Clock size={10} /> Read Time</span>
                                <span className="text-slate-200 text-sm font-medium">5 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Share Sidebar */}
                    <aside className="lg:w-16 flex lg:flex-col gap-4 order-2 lg:order-1 justify-center lg:justify-start">
                        <button className="size-12 rounded-full border border-primary/20 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                            <Share2 size={20} />
                        </button>
                        <button className="size-12 rounded-full border border-primary/20 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                            <Heart size={20} />
                        </button>
                        <button className="size-12 rounded-full border border-primary/20 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                            <Bookmark size={20} />
                        </button>
                        <div className="hidden lg:block h-20 w-px bg-primary/10 mx-auto my-4"></div>
                    </aside>

                    {/* Body Text */}
                    <div className="flex-1 order-1 lg:order-2">
                        {post.excerpt && (
                            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-10 italic border-l-4 border-primary pl-6 py-2">
                                {post.excerpt}
                            </p>
                        )}
                        
                        <div className="prose prose-invert prose-primary max-w-none text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            {post.content.split('\n').map((para: string, i: number) => {
                                if (!para.trim()) return <br key={i} />;
                                
                                if (para.startsWith('# ')) return <h1 key={i} className="text-4xl font-bold text-slate-900 dark:text-white mt-12 mb-6">{para.substring(2)}</h1>;
                                if (para.startsWith('## ')) return <h2 key={i} className="text-3xl font-bold text-slate-900 dark:text-white mt-10 mb-5">{para.substring(3)}</h2>;
                                if (para.startsWith('### ')) return <h3 key={i} className="text-2xl font-semibold text-primary mt-8 mb-4">{para.substring(4)}</h3>;
                                
                                if (para.startsWith('> ')) return (
                                    <blockquote key={i} className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-xl my-8 text-xl italic text-slate-700 dark:text-slate-200">
                                        {para.substring(2)}
                                    </blockquote>
                                );

                                if (para.startsWith('- ')) return (
                                    <div key={i} className="flex items-start gap-4 my-4">
                                        <CheckCircle2 size={20} className="text-primary mt-1 shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">{para.substring(2)}</span>
                                    </div>
                                );

                                return <p key={i} className="mb-6">{para}</p>;
                            })}
                        </div>

                        {/* Social Share Bottom */}
                        <div className="mt-16 pt-8 border-t border-primary/10">
                            <div className="flex flex-wrap items-center gap-4">
                                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Share this guide:</p>
                                <div className="flex gap-2">
                                    {['Facebook', 'Twitter', 'LinkedIn'].map((platform) => (
                                        <button key={platform} className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary hover:text-white transition-colors text-sm">
                                            {platform}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts Section */}
            <section className="bg-primary/5 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Recommended for You</h2>
                            <p className="text-slate-400">Continue your journey into functional wellness.</p>
                        </div>
                        <Link href="/blog" className="hidden sm:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                            View All Posts <ArrowRight size={20} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map((rPost) => (
                            <div key={rPost.id} className="group cursor-pointer">
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-primary/10">
                                    <Image 
                                        src={rPost.image} 
                                        alt={rPost.title} 
                                        fill 
                                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                    <div className="absolute top-4 left-4 bg-[#1b1022]/80 backdrop-blur px-3 py-1 rounded text-xs text-primary font-bold">
                                        {rPost.category}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">
                                    {rPost.title}
                                </h3>
                                <p className="text-slate-400 text-sm line-clamp-2">
                                    {rPost.excerpt}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
