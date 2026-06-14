import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Share2, Tag } from 'lucide-react';

// Inline SVG brand icons
const FacebookIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const TwitterIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 5.772zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const LinkedinIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;

import { BLOG_POSTS } from '../data/blog';
import { truncate } from '../utils/helpers';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);
  const related = BLOG_POSTS.filter(p => p.id !== id).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-5xl mb-4">📰</p>
          <h1 className="text-xl font-bold text-slate-800 mb-4">Article not found</h1>
          <button onClick={() => navigate('/blog')} className="btn-primary">Back to Blog</button>
        </div>
      </div>
    );
  }

  // Parse simple markdown-like content
  const renderContent = (content) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) return <h2 key={i} className="text-2xl font-poppins font-bold text-slate-900 mt-8 mb-3">{block.slice(3)}</h2>;
      if (block.startsWith('**')) return <p key={i} className="font-semibold text-slate-800 my-3">{block.replace(/\*\*/g, '')}</p>;
      return <p key={i} className="text-slate-600 leading-relaxed my-3">{block}</p>;
    });
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 md:h-[420px] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-custom">
            <span className="badge bg-dental-100 text-dental-700 mb-3"><Tag className="w-3 h-3" /> {post.category}</span>
            <h1 className="text-2xl md:text-4xl font-poppins font-bold text-white mt-2">{post.title}</h1>
            <div className="flex items-center gap-4 mt-3 text-white/70 text-sm">
              <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-lg object-cover" />
              <span>{post.author}</span>
              <span>·</span>
              <span>{new Date(post.date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime} read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Article */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </button>

              <div className="prose max-w-none">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-100">
                {post.tags.map(tag => (
                  <span key={tag} className="badge bg-slate-100 text-slate-600 text-xs">#{tag}</span>
                ))}
              </div>

              {/* Share */}
              <div className="mt-8 flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share:
                </span>
                <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Share on Facebook">
                  <FacebookIcon />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Share on Twitter">
                  <TwitterIcon />
                </a>
                <a href={`https://linkedin.com/shareArticle?url=${shareUrl}&title=${shareTitle}`} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Share on LinkedIn">
                  <LinkedinIcon />
                </a>

              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Author card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6 text-center sticky top-24">
                <img src={post.authorAvatar} alt={post.author} className="w-16 h-16 rounded-2xl object-cover mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900">{post.author}</h3>
                <p className="text-xs text-slate-500 mt-1">Lead Prosthodontist & Dental Surgeon</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  15+ years of experience in prosthodontics, implantology, and cosmetic dentistry.
                </p>
              </div>
            </aside>
          </div>

          {/* Related */}
          <div className="mt-20 pt-12 border-t border-slate-100">
            <h2 className="text-2xl font-poppins font-bold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/blog/${p.id}`}
                    className="group block bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden hover:-translate-y-1 hover:shadow-card transition-all"
                  >
                    <div className="h-36 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <span className="badge bg-dental-100 text-dental-700 text-xs mb-2">{p.category}</span>
                      <h3 className="font-semibold text-slate-900 text-sm group-hover:text-dental-700 transition-colors">{truncate(p.title, 60)}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
