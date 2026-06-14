import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoPlayRef = useRef(null);

  const prev = () => {
    setDirection(-1);
    setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent(c => (c + 1) % TESTIMONIALS.length);
  };

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(next, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, []);

  const resetAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(next, 5000);
  };

  const handlePrev = () => { prev(); resetAutoPlay(); };
  const handleNext = () => { next(); resetAutoPlay(); };

  const variants = {
    enter: (d) => ({ x: d > 0 ? 100 : -100, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:  (d) => ({ x: d > 0 ? -100 : 100, opacity: 0, scale: 0.96 }),
  };

  const t = TESTIMONIALS[current];

  return (
    <section className="section bg-slate-50 overflow-hidden" aria-label="Patient testimonials">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
            Patient Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="mt-3 text-slate-500">Real stories from real patients who trusted us with their smiles.</p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full"
              >
                <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8 md:p-10 relative">
                  {/* Quote icon */}
                  <Quote className="w-10 h-10 text-dental-100 absolute top-6 right-8" aria-hidden="true" />

                  {/* Stars */}
                  <StarRating rating={t.rating} />

                  {/* Text */}
                  <blockquote className="mt-5 text-slate-700 text-lg leading-relaxed italic">
                    "{t.text}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-7 pt-6 border-t border-slate-100">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-dental-100"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{t.name}</div>
                      <div className="text-sm text-slate-500">{t.role}</div>
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-dental-50 text-dental-600 rounded-full font-medium">
                        {t.service}
                      </span>
                    </div>
                    {t.verified && (
                      <div className="ml-auto text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <span className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[8px]">✓</span>
                        Verified Patient
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-dental-300 hover:bg-dental-50 flex items-center justify-center transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); resetAutoPlay(); }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-8 h-2.5 bg-dental-600' : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                  aria-current={i === current}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-dental-300 hover:bg-dental-50 flex items-center justify-center transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
