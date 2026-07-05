/** Skip Next.js optimizer for inline or placeholder URLs only. */
export function shouldUnoptimizeImage(src: string): boolean {
  return src.startsWith('data:') || src.includes('placehold.co');
}
