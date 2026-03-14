import { Metadata } from 'next';
import prisma from './prisma';

export async function getPageMetadata(path: string, fallback: Metadata): Promise<Metadata> {
  try {
    const meta = await (prisma as any).pageMetadata.findUnique({
      where: { path }
    });

    if (!meta) return fallback;

    return {
      ...fallback,
      title: meta.title || fallback.title,
      description: meta.description || fallback.description,
      keywords: meta.seoKeywords || fallback.keywords,
      openGraph: {
        ...fallback.openGraph,
        title: meta.title || (fallback.openGraph as any)?.title,
        description: meta.description || (fallback.openGraph as any)?.description,
      },
    };
  } catch (e) {
    return fallback;
  }
}
