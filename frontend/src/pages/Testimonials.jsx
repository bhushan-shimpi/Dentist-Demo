import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { TESTIMONIALS, GOOGLE_RATING } from '../data/testimonials';
import ContactCTA from '../components/home/ContactCTA';

function StarRating({ rating, size = 'w-4 h-4' }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${size} ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
      ))}
    </div>
  );
}

function RatingBreakdown({ breakdown }) {
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map(n => (
        <div key={n} className="flex items-center gap-3 text-sm">
          <span className="text-slate-500 w-4">{n}</span>
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${breakdown[n]}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (5 - n) * 0.1 }}
              className="h-full bg-amber-400 rounded-full"
            />
          </div>
          <span className="text-slate-500 w-8 text-right">{breakdown[n]}%</span>
        </div>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-hero pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              Patient Stories
            </span>
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-slate-900 mb-4">
              Real <span className="gradient-text">Reviews</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Don't take our word for it — hear from the thousands of patients who've trusted us with their smiles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Google Rating card */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-sm mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-slate-100 shadow-card p-8 text-center"
            >
              <div className="flex justify-center mb-3">
                <span className="text-4xl font-poppins font-bold gradient-text">{GOOGLE_RATING.overall}</span>
                <span className="text-2xl text-amber-400 ml-2">★</span>
              </div>
              <StarRating rating={5} size="w-6 h-6" />
              <p className="text-slate-500 text-sm mt-2">{GOOGLE_RATING.totalReviews.toLocaleString()} Google Reviews</p>
              <div className="mt-5">
                <RatingBreakdown breakdown={GOOGLE_RATING.breakdown} />
              </div>
            </motion.div>
          </div>

          {/* Reviews grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6 flex flex-col"
              >
                <StarRating rating={t.rating} />
                <blockquote className="flex-1 mt-4 text-slate-700 text-sm leading-relaxed italic">
                  "{t.text}"
                </blockquote>
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role} · {t.service}</p>
                  </div>
                  {t.verified && (
                    <span className="ml-auto text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[8px]">✓</span>
                      Verified
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
