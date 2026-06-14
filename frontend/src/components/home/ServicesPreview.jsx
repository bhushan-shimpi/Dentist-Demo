import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { FEATURED_SERVICES } from '../../data/services';

const colorMap = {
  dental:  { bg: 'bg-dental-50',  icon: 'bg-dental-600',  badge: 'bg-dental-100 text-dental-700',  border: 'border-dental-100',  hover: 'group-hover:bg-dental-600' },
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-600', badge: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-100', hover: 'group-hover:bg-emerald-600' },
  cyan:    { bg: 'bg-cyan-50',    icon: 'bg-cyan-600',    badge: 'bg-cyan-100 text-cyan-700',       border: 'border-cyan-100',    hover: 'group-hover:bg-cyan-600' },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ServiceCard({ service }) {
  const colors = colorMap[service.color] || colorMap.dental;

  return (
    <motion.div variants={cardVariants}>
      <Link
        to={`/services/${service.id}`}
        className="group block bg-white rounded-2xl border border-slate-100 shadow-soft hover:-translate-y-1 hover:shadow-card transition-all duration-300 overflow-hidden"
        aria-label={`Learn about ${service.title}`}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className={`absolute bottom-3 left-3 text-3xl`} aria-hidden="true">{service.icon}</span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-poppins font-bold text-slate-900 text-lg leading-snug">{service.title}</h3>
            <span className={`badge ${colors.badge} flex-shrink-0 mt-0.5`}>
              <Clock className="w-3 h-3" />
              {service.duration}
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">{service.shortDesc}</p>

          <div className="flex items-center gap-1.5 mt-4 text-dental-600 font-semibold text-sm group-hover:gap-2.5 transition-all">
            Learn more <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesPreview() {
  return (
    <section className="section bg-slate-50" aria-label="Our services">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900">
              Comprehensive <span className="gradient-text">Dental Services</span>
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl">
              From preventive care to complete smile makeovers — we offer a full spectrum of dental treatments under one roof.
            </p>
          </div>
          <Link
            to="/services"
            className="flex items-center gap-2 text-dental-600 font-semibold text-sm hover:gap-3 transition-all whitespace-nowrap"
          >
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURED_SERVICES.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
