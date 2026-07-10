/** Skip Next.js optimizer for remote URLs (optimizer often 504s on external CDNs). */
export function shouldUnoptimizeImage(src: string): boolean {
  if (!src) return true;
  if (src.startsWith('data:') || src.includes('placehold.co')) return true;
  return src.startsWith('http://') || src.startsWith('https://');
}
