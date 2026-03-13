const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const samplePosts = [
  {
    title: "The Science of Microdosing: A Fusion Guide",
    slug: "science-of-microdosing",
    excerpt: "Explore the neurological and psychological benefits of microdosing with Fusion Shroom Bars. From enhanced focus to emotional balance.",
    content: `## What is Microdosing?
Microdosing is the practice of consuming very small, sub-perceptual amounts of a psychedelic substance. For many, this means a bite of a **Fusion Shroom Bar** every few days.

### Why Fusion Bars?
Unlike traditional dried mushrooms, Fusion Bars offer precise dosing and a gourmet flavor experience. 

### Benefits Reported by the Community:
- **Increased Focus**: Many users report an easier journey into "flow states".
- **Emotional Resilience**: A subtle lifting of mood and reduction in anxiety.
- **Creativity**: New perspectives on old problems.

*Disclaimer: Always consult with a professional and follow local regulations.*`,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1200&auto=format&fit=crop",
    category: "Wellness & Science",
    isPublic: true
  },
  {
    title: "Unlocking Creativity with Fusion Shroom Bars",
    slug: "unlocking-creativity",
    excerpt: "Discover how artists, writers, and thinkers use Fusion to break through creative blocks and find their muse.",
    content: `## The Creative Spark
Creativity isn't just about art; it's about problem-solving. Fusion Shroom Bars help quiet the "Default Mode Network" (DMN) in the brain, allowing for divergent thinking.

### Tips for a Creative Session
1. **Set an Intent**: What are you trying to solve?
2. **Comfortable Environment**: Minimize distractions.
3. **The Right Dose**: For creativity, a microdose or slightly above is often ideal.

### Real Stories
"Fusion changed my morning routine. Instead of just caffeine, I found a sense of wonder that made my design work feel like play again." - Anonymous Creator`,
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
    category: "Lifestyle",
    isPublic: true
  },
  {
    title: "Mindfulness and Psychedelics: The Path to Clarity",
    slug: "mindfulness-and-psychedelics",
    excerpt: "Integrating Fusion into your meditation practice for a deeper, more profound connection to the self.",
    content: `## Presence is Power
In a world of constant notification, finding silence is rare. Fusion Shroom Bars can act as a catalyst for deeper meditation.

### Integration Techniques
- **Breathwork**: Combine your Fusion experience with deep, rhythmic breathing.
- **Journaling**: Record any insights immediately after your session.
- **Nature**: There is no better teacher than the forest.

### Why it Works
Psilocybin can help lower the ego's defenses, making mindfulness practices feel more "real" and less like a chore.`,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    category: "Mindfulness",
    isPublic: true
  }
];

async function seed() {
  console.log('Seeding blog posts...');
  for (const post of samplePosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log('Seeding complete!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
