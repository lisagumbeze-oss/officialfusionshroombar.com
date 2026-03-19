import prisma from '@/lib/prisma';

export default async function DebugBlogPage() {
  try {
    const total = await (prisma as any).blogPost.count();
    const publicPosts = await (prisma as any).blogPost.count({ where: { isPublic: true } });
    const all = await (prisma as any).blogPost.findMany({
      select: { id: true, title: true, isPublic: true, category: true }
    });

    return (
      <div style={{ padding: '40px', color: 'white', background: '#000' }}>
        <h1>Blog Debug</h1>
        <p>Total Posts: {total}</p>
        <p>Public Posts: {publicPosts}</p>
        <pre>{JSON.stringify(all, null, 2)}</pre>
      </div>
    );
  } catch (err: any) {
    return <div style={{ color: 'red' }}>Error: {err.message}</div>;
  }
}
