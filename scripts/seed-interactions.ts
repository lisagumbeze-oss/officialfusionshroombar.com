import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const firstNames = ["James", "Sarah", "Michael", "Elena", "David", "Chloe", "Robert", "Aria", "Kevin", "Monica", "Liam", "Emma", "Noah", "Olivia", "William", "Sophia", "Lucas", "Ava", "Mason", "Mia"];
const lastNames = ["S.", "T.", "W.", "M.", "R.", "G.", "P.", "L.", "K.", "B.", "C.", "D.", "F.", "H.", "J.", "N.", "V.", "Z."];

const getRandomName = () => {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${fn} ${ln}`;
};

const blogCommentTemplates = [
    "This guide on {topic} is exactly what I needed. Very well written!",
    "I appreciate the insights into {topic}. Fusion always delivers the best content.",
    "Finally, a clear explanation of {topic}. This has cleared up so many of my questions.",
    "Great read! The science behind {topic} is fascinating. Can't wait for the next post.",
    "As someone new to this, your breakdown of {topic} was incredibly helpful. Thank you!",
    "The branding and information here are top-tier. {topic} is such an important subject.",
    "I've been following the Fusion blog for a while, and this piece on {topic} is one of your best.",
    "Helpful, concise, and professional. This post on {topic} is a must-read for the community.",
    "The commitment to education here is impressive. Thanks for the deep dive into {topic}.",
    "Just shared this with my friends. We were just talking about {topic} yesterday!"
];

const productReviewTemplates = [
    "Absolutely love the {name}! The {category} quality is unmatched.",
    "Arrived fast and discreet. The {name} is my new favorite.",
    "Best {category} I've tried. The {name} tastes amazing and the effects are consistent.",
    "100% authentic {name}. Scanned and verified. Great customer support too.",
    "The {name} helps me so much with my wellness routine. Highly recommended.",
    "Impressed by the packaging and the quality of the {category}. {name} is a game changer.",
    "The Belgian chocolate in {name} is gourmet. You can't even tell it's {category}.",
    "Consistent dosage and great flavor. {name} is exactly what I was looking for.",
    "I've ordered multiple times now and the {name} always exceeds expectations.",
    "Fast delivery and premium {category}. {name} is definitely the gold standard."
];

async function seed() {
    console.log("Seeding interactions...");
    
    const blogPosts = await prisma.blogPost.findMany();
    const products = await prisma.product.findMany();

    // Clear existing interactions to avoid duplicates on re-run
    await prisma.comment.deleteMany();
    await prisma.review.deleteMany();

    for (const post of blogPosts) {
        const numComments = 5 + Math.floor(Math.random() * 6); // 5-10 comments
        const selectedTemplates = [...blogCommentTemplates].sort(() => 0.5 - Math.random()).slice(0, numComments);
        
        for (const template of selectedTemplates) {
            await prisma.comment.create({
                data: {
                    name: getRandomName(),
                    content: template.replace(/{topic}/g, post.category || "wellness"),
                    blogPostId: post.id,
                    createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)) // Random date in the past
                }
            });
        }
    }
    console.log(`Seeded comments for ${blogPosts.length} blog posts.`);

    for (const product of products) {
        const numReviews = 5 + Math.floor(Math.random() * 6); // 5-10 reviews
        const selectedTemplates = [...productReviewTemplates].sort(() => 0.5 - Math.random()).slice(0, numReviews);
        
        for (const template of selectedTemplates) {
            await prisma.review.create({
                data: {
                    name: getRandomName(),
                    content: template.replace(/{name}/g, product.name).replace(/{category}/g, product.category.toLowerCase()),
                    rating: 5,
                    productId: product.id,
                    createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000))
                }
            });
        }
    }
    console.log(`Seeded reviews for ${products.length} products.`);
    
    console.log("Seeding complete!");
}

seed().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
