const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const postsCount = await prisma.blogPost.count();
    const publicPostsCount = await prisma.blogPost.count({ where: { isPublic: true } });
    const allPosts = await prisma.blogPost.findMany({
      select: { id: true, title: true, isPublic: true, category: true }
    });
    
    console.log('--- BLOG STATUS ---');
    console.log('Total Blog Posts:', postsCount);
    console.log('Public Blog Posts:', publicPostsCount);
    console.log('Posts:', JSON.stringify(allPosts, null, 2));
  } catch (err) {
    console.error('Error checking DB:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
