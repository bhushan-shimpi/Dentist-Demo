import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Search, ArrowRight, Tag } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blog';
import { truncate } from '../utils/helpers';

export default function Blog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const featured = BLOG_POSTS.find(p => p.featured);
  const rest = BLOG_POSTS.filter(p => !p.featured);

  const filtered = rest.filter(p => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              Dental Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-slate-900 mb-4">
              Expert <span className="gradient-text">Dental Insights</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
              Tips, guides, and expert advice from our dental team to keep your smile healthy and bright.
            </p>
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="search"
                placeholder="Search articles…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-soft text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-dental-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="section bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/blog/${featured.id}`}
                className="group grid md:grid-cols-2 gap-8 bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-card transition-all duration-300"
              >
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-dental-600 text-white text-xs font-bold rounded-xl">
                    Featured Article
                  </span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="px-3 py-1 bg-dental-100 text-dental-700 text-xs font-semibold rounded-full w-fit mb-4">
                    {featured.category}
                  </span>
                  <h2 className="text-2xl font-poppins font-bold text-slate-900 mb-3 group-hover:text-dental-700 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-5 text-sm">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <img src={featured.authorAvatar} alt={featured.author} className="w-8 h-8 rounded-lg object-cover" />
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime} read</span>
                  </div>
                  <div className="flex items-center gap-2 mt-5 text-dental-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category filters */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white border-b border-slate-100 py-4">
        <div className="container-custom flex gap-2 overflow-x-auto hide-scrollbar">
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-dental-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="section bg-slate-50">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">📝</p>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No articles found</h3>
              <p className="text-slate-500">Try a different search term or category</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <Link
                    to={`/blog/${post.id}`}
                    className="group block bg-white rounded-2xl border border-slate-100 shadow-soft hover:-translate-y-1 hover:shadow-card transition-all duration-300 overflow-hidden h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="badge bg-dental-100 text-dental-700"><Tag className="w-3 h-3" /> {post.category}</span>
                        <span className="text-xs text-slate-400 ml-auto flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      </div>
                      <h3 className="font-poppins font-bold text-slate-900 mb-2 group-hover:text-dental-700 transition-colors leading-snug">
                        {truncate(post.title, 65)}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{truncate(post.excerpt, 100)}</p>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                        <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-lg object-cover" />
                        {post.author}
                        <span className="ml-auto">{new Date(post.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
