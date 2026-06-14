import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, ArrowLeft, Calendar, ChevronRight } from 'lucide-react';
import { SERVICES } from '../data/services';
import Accordion from '../components/ui/Accordion';
import Button from '../components/ui/Button';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🦷</p>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Service Not Found</h1>
          <p className="text-slate-500 mb-6">The service you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/services')}>Browse All Services</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-72 md:h-96 overflow-hidden" aria-label={`${service.title} hero`}>
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          <div className="container-custom">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-white/70">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li><Link to="/services" className="hover:text-white">Services</Link></li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li className="text-white font-medium">{service.title}</li>
              </ol>
            </nav>
            <span className="text-4xl">{service.icon}</span>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white mt-2">
              {service.title}
            </h1>
            <div className="flex items-center gap-4 mt-3 text-white/80 text-sm">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {service.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </button>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-poppins font-bold text-slate-900 mb-4">About This Treatment</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{service.description}</p>
              </motion.div>

              {/* Benefits */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-2xl font-poppins font-bold text-slate-900 mb-5">Key Benefits</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.benefits.map(benefit => (
                    <li key={benefit} className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-800">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Procedure Steps */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-2xl font-poppins font-bold text-slate-900 mb-6">The Procedure</h2>
                <div className="space-y-4">
                  {service.procedures.map((proc, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-dental-gradient rounded-xl text-white font-bold text-sm flex items-center justify-center shadow-md">
                          {proc.step}
                        </div>
                      </div>
                      <div className="flex-1 pb-4 border-l-2 border-slate-100 pl-5 last:border-0">
                        <h3 className="font-semibold text-slate-900 mb-1">{proc.title}</h3>
                        <p className="text-sm text-slate-500">{proc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* FAQ */}
              {service.faq && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-2xl font-poppins font-bold text-slate-900 mb-5">Frequently Asked Questions</h2>
                  <Accordion items={service.faq} />
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:sticky lg:top-32 bg-dental-gradient text-white rounded-3xl p-7 shadow-glow"
              >
                <h3 className="text-xl font-poppins font-bold mb-2">Book This Treatment</h3>
                <p className="text-dental-100 text-sm mb-6">
                  Schedule your appointment today and take the first step towards a healthier smile.
                </p>
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full justify-center"
                    onClick={() => navigate('/book-appointment')}
                    icon={<Calendar className="w-5 h-5" />}
                  >
                    Book Appointment
                  </Button>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 text-white font-semibold rounded-2xl hover:bg-emerald-600 transition-colors"
                  >
                    WhatsApp Enquiry
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-white/20">
                  <div className="flex items-center gap-2 text-sm text-dental-100">
                    <Clock className="w-4 h-4" />
                    Duration: {service.duration}
                  </div>
                </div>
              </motion.div>

              {/* Related services */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Other Services</h3>
                <ul className="space-y-3">
                  {SERVICES.filter(s => s.id !== service.id).slice(0, 4).map(s => (
                    <li key={s.id}>
                      <Link
                        to={`/services/${s.id}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <span className="text-xl">{s.icon}</span>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-dental-600 transition-colors flex-1">
                          {s.title}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-dental-400 transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
