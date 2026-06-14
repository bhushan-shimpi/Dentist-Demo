import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Search } from 'lucide-react';
import { SERVICES, SERVICE_CATEGORIES } from '../data/services';
import ContactCTA from '../components/home/ContactCTA';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export default function Services() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = SERVICES.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
                        s.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || true; // Categories are decorative in this demo
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              What We Offer
            </span>
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-slate-900 mb-4">
              Our <span className="gradient-text">Dental Services</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              A full spectrum of dental care delivered with world-class expertise and the latest technology.
            </p>

            {/* Search bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="search"
                placeholder="Search services…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-soft text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-dental-400"
                aria-label="Search services"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories filter */}
      <section className="py-6 bg-white border-b border-slate-100 sticky top-16 lg:top-20 z-30">
        <div className="container-custom">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {SERVICE_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-dental-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-slate-50">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No services found</h3>
              <p className="text-slate-500">Try a different search term</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map(service => (
                <motion.div key={service.id} variants={cardVariants}>
                  <Link
                    to={`/services/${service.id}`}
                    className="group block bg-white rounded-2xl border border-slate-100 shadow-soft hover:-translate-y-1 hover:shadow-card transition-all duration-300 overflow-hidden h-full"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-3 left-3 text-3xl">{service.icon}</span>
                      {service.featured && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 bg-dental-600 text-white text-xs font-semibold rounded-lg">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col h-[calc(100%-176px)]">
                      <div className="flex items-start gap-2 mb-2">
                        <h2 className="font-poppins font-bold text-slate-900 flex-1">{service.title}</h2>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed flex-1">{service.shortDesc}</p>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          {service.duration}
                        </div>
                        <span className="text-dental-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Details <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
