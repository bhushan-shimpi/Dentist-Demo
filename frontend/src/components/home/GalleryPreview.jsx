import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GALLERY_IMAGES } from '../../data/gallery';

const PREVIEW = GALLERY_IMAGES.slice(0, 6);

export default function GalleryPreview() {
  return (
    <section className="section bg-white" aria-label="Gallery preview">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900">
              Clinic <span className="gradient-text">Gallery</span>
            </h2>
            <p className="mt-2 text-slate-500">A glimpse into our state-of-the-art clinic and transformative results.</p>
          </div>
          <Link
            to="/gallery"
            className="flex items-center gap-2 text-dental-600 font-semibold text-sm hover:gap-3 transition-all whitespace-nowrap"
          >
            View full gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {PREVIEW.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer
                ${i === 0 ? 'md:col-span-1 md:row-span-2' : ''}
              `}
              style={{ aspectRatio: i === 0 ? '3/4' : '4/3' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dental-900/0 group-hover:bg-dental-900/40 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white font-semibold text-sm transition-opacity duration-300 text-center px-4">
                  {img.alt}
                </span>
              </div>
              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-white/90 text-slate-700 rounded-lg text-xs font-semibold backdrop-blur-sm">
                  {img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
