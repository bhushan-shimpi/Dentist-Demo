import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, MessageCircle, Shield, Award, Star, ArrowRight,
  CheckCircle, Zap, Clock,
} from 'lucide-react';
import Button from '../ui/Button';

const TRUST_BADGES = [
  { icon: <Shield className="w-4 h-4" />,  text: 'ISO Certified Clinic' },
  { icon: <Award  className="w-4 h-4" />,  text: '15+ Awards Won' },
  { icon: <Star   className="w-4 h-4" />,  text: '4.9★ Google Rating' },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative pt-20 pb-14 md:pt-20 md:pb-24 overflow-hidden bg-hero"
      aria-label="Hero section"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-dental-200/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dental-100/20 rounded-full blur-3xl" />
        {/* Floating crosses / dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-dental-300 rounded-full opacity-50"
            style={{
              top:  `${15 + i * 14}%`,
              left: `${5  + i * 16}%`,
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-8 items-center">

          {/* Left — Text content */}
          <div className="space-y-5">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-dental-100 text-dental-700 rounded-full text-sm font-semibold border border-dental-200">
                <Zap className="w-3.5 h-3.5 text-dental-500" />
                Pune's #1 Premium Dental Clinic
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-poppins font-bold text-slate-900 leading-[1.05]"
            >
              Your Perfect{' '}
              <span className="gradient-text">Smile</span>
              <br />
              Starts Here
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 max-w-2xl leading-relaxed"
            >
              Experience world-class dental care with cutting-edge technology and a compassionate team.
              From routine check-ups to complete smile transformations — we do it all.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {TRUST_BADGES.map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 border border-slate-100 rounded-full text-xs font-medium text-slate-700 shadow-soft"
                >
                  <span className="text-dental-500">{icon}</span>
                  {text}
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-row gap-3 w-full sm:w-auto"
            >
              <Button
                size="lg"
                onClick={() => navigate('/book-appointment')}
                icon={<Calendar className="w-5 h-5 sm:w-5 sm:h-5" />}
                className="flex-1 px-2 sm:px-8 text-sm sm:text-base"
                aria-label="Book an appointment"
              >
                <span className="hidden sm:inline">Book Appointment</span>
                <span className="sm:hidden">Book Now</span>
              </Button>

              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-emerald flex-1 justify-center px-2 sm:px-8 text-sm sm:text-base rounded-2xl flex items-center gap-2"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">WhatsApp Us</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </motion.div>

            {/* Quick stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2"
            >
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/40?img=${i * 3}`}
                    alt={`Happy patient ${i}`}
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm font-bold text-slate-800 ml-1">4.9</span>
                </div>
                <p className="text-xs text-slate-500">from 2,847 verified reviews</p>
              </div>
            </motion.div>
          </div>

          <div className="relative hidden md:flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 80 }}
              className="relative"
            >
              {/* Main doctor image */}
              <div className="relative w-72 h-[420px] sm:w-80 sm:h-[480px] lg:w-[360px] lg:h-[520px]">
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-dental-gradient">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=85"
                    alt="Dr. Rahul Sharma — Lead Dentist at DentaCare Pro"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>

                {/* Floating card — Experience */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-10 top-16 glass rounded-2xl p-4 shadow-xl min-w-[140px] hidden md:block"
                >
                  <div className="text-3xl font-poppins font-bold gradient-text">15+</div>
                  <div className="text-xs text-slate-600 font-medium">Years of Experience</div>
                </motion.div>

                {/* Floating card — Today's appointments */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -right-8 bottom-24 glass rounded-2xl p-4 shadow-xl hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-dental-500" />
                    <span className="text-xs text-slate-500 font-medium">Next Available</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-800">Today 2:00 PM</div>
                  <button
                    onClick={() => navigate('/book-appointment')}
                    className="mt-2 flex items-center gap-1 text-xs text-dental-600 font-semibold hover:text-dental-700"
                  >
                    Book now <ArrowRight className="w-3 h-3" />
                  </button>
                </motion.div>

                {/* Floating card — Treatments */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -right-6 top-10 glass rounded-2xl p-3 shadow-xl hidden md:block"
                >
                  <div className="text-2xl font-poppins font-bold text-emerald-600">50K+</div>
                  <div className="text-xs text-slate-600">Treatments Done</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
