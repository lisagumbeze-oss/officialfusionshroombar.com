import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Tag, Calendar, ArrowRight, Info } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Psychedelic Guide | Fusion Shroom Bars Blog',
    description: 'Insights, news, and education from the world of premium psilocybin. Discover the science and soul behind every official Fusion Shroom Bar.',
    openGraph: {
        title: 'The Psychedelic Guide | Fusion Shroom Bars',
        description: 'Explore our latest articles on wellness, microdosing, and the science of psilocybin.',
        images: ['/og-blog.jpg'], // Assuming a generic blog OG image exists or will be added
    }
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    let posts: any[] = [];
    let dbError = false;

    try {
        posts = await (prisma as any).blogPost.findMany({
            where: { isPublic: true },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error('[BlogPage] Database error:', error);
        dbError = true;
    }

    return (
        <div className="min-h-screen bg-[#1b1022] text-slate-100 font-sans transition-colors duration-300">
            {/* Header / Hero */}
            <header className="py-24 px-6 lg:px-20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/10 -skew-y-3 origin-top-left -z-10"></div>
                <div className="max-w-4xl mx-auto">
                    <p className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4">Fusion Latest Updates</p>
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        The Psychedelic Guide
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Insights, news, and education from the world of premium psilocybin. Discover the science and soul behind every bar.
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 lg:px-20 pb-32">
                {dbError ? (
                    <div className="flex flex-col items-center justify-center p-20 rounded-3xl bg-red-500/5 border border-red-500/10 text-center">
                        <div className="size-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
                            <Info size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Feed Temporarily Offline</h2>
                        <p className="text-slate-400">We're having trouble connecting to our update feed. Please try again soon.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {posts.map((post: any) => (
                                <article key={post.id} className="group relative flex flex-col bg-primary/5 rounded-3xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/10">
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        {post.image ? (
                                            <Image 
                                                src={post.image} 
                                                alt={post.title} 
                                                fill 
                                                className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-black italic group-hover:bg-primary/30 transition-colors">
                                                FUSION
                                            </div>
                                        )}
                                        <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-[#1b1022]/80 backdrop-blur shadow-sm text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                            {post.category || 'Mindfulness'}
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-4">
                                            <Calendar size={12} className="text-primary" />
                                            {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <h2 className="text-2xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-8 leading-relaxed">
                                            {post.excerpt || 'No summary provided...'}
                                        </p>
                                        <Link 
                                            href={`/blog/${post.slug}`} 
                                            className="mt-auto flex items-center gap-2 text-sm font-black text-primary group-hover:gap-4 transition-all"
                                        >
                                            READ FULL ARTICLE <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                        {posts.length === 0 && (
                            <div className="py-40 text-center">
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No stories published yet</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
