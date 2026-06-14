import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '../data/gallery';

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose, onPrev, onNext]);

  const image = images[index];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Prev */}
        <button
          onClick={e => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Image */}
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl max-h-[85vh] relative"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={image.src.replace('w=600', 'w=1200')}
            alt={image.alt}
            className="max-w-full max-h-[80vh] object-contain rounded-xl"
          />
          <div className="mt-3 text-center">
            <p className="text-white/80 text-sm">{image.alt}</p>
            <span className="text-white/50 text-xs">{index + 1} / {images.length}</span>
          </div>
        </motion.div>

        {/* Next */}
        <button
          onClick={e => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length);
  const nextImage = () => setLightboxIndex(i => (i + 1) % filtered.length);

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero pt-24 pb-8 md:pt-32 md:pb-12" aria-label="Gallery header">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              Our Gallery
            </span>
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-slate-900 mb-4">
              Clinic <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              A glimpse into our world-class facility and the smiles we've transformed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white border-b border-slate-100 py-4">
        <div className="container-custom flex gap-2 overflow-x-auto hide-scrollbar">
          {GALLERY_CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-dental-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl cursor-pointer shadow-soft hover:shadow-card transition-all"
                  onClick={() => openLightbox(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${img.alt}`}
                  onKeyDown={e => e.key === 'Enter' && openLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 text-slate-700 rounded-lg text-xs font-semibold">
                      {img.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
