'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { shouldUnoptimizeImage } from '@/lib/image';
import styles from './product.module.css';

interface ProductGalleryProps {
  mainImage: string;
  gallery: string[] | null;
  name: string;
}

export default function ProductGallery({ mainImage, gallery, name }: ProductGalleryProps) {
  const images = [mainImage, ...(gallery || [])].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImage = images[activeIndex];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  }, []);

  const goTo = useCallback(
    (dir: -1 | 1) => {
      setActiveIndex((i) => (i + dir + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') goTo(-1);
      if (e.key === 'ArrowRight') goTo(1);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen, goTo]);

  return (
    <>
      <div className={styles.imageGallery}>
        <div
          className={`${styles.mainImageWrapper} ${isZooming ? styles.mainImageZooming : ''}`}
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
          aria-label={`Zoom ${name}`}
        >
          <Image
            src={activeImage}
            alt={name}
            fill
            className={styles.mainImage}
            style={
              isZooming
                ? {
                    transform: 'scale(2)',
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }
                : undefined
            }
            priority
            unoptimized={shouldUnoptimizeImage(activeImage)}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <span className={styles.zoomHint}>
            <ZoomIn size={14} />
            Click to enlarge
          </span>
        </div>

        {images.length > 1 && (
          <div className={styles.thumbnails} role="group" aria-label="Product image thumbnails">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.thumbnail} ${idx === activeIndex ? styles.activeThumbnail : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View image ${idx + 1}`}
                aria-pressed={idx === activeIndex}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized={shouldUnoptimizeImage(img)}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} image gallery`}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setLightboxOpen(false)}
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={(e) => { e.stopPropagation(); goTo(-1); }}
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={(e) => { e.stopPropagation(); goTo(1); }}
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImageWrap}>
              <Image
                src={activeImage}
                alt={name}
                fill
                style={{ objectFit: 'contain' }}
                unoptimized={shouldUnoptimizeImage(activeImage)}
                sizes="100vw"
              />
            </div>
            {images.length > 1 && (
              <p className={styles.lightboxCounter}>
                {activeIndex + 1} / {images.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
