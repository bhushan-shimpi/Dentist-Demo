import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Phone,
  Stethoscope, Calendar,
} from 'lucide-react';
import { useScrollPosition } from '../../hooks/useAnimations';
import { cn } from '../../utils/helpers';

const NAV_LINKS = [
  { label: 'Home',              path: '/' },
  { label: 'About',             path: '/about' },
  { label: 'Services',          path: '/services' },
  { label: 'Contact',           path: '/contact' },
  { label: 'Patient History',   path: '/patient-history' },
];

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 28 } },
  exit:   { x: '100%', opacity: 0, transition: { duration: 0.22 } },
};

const linkVariants = {
  hidden:  { x: 20, opacity: 0 },
  visible: (i) => ({ x: 0, opacity: 1, transition: { delay: i * 0.06, type: 'spring', stiffness: 300 } }),
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const navigate = useNavigate();

  const scrolled = scrollY > 20;

  // Close drawer on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Lock body on mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-white/60 shadow-soft py-1.5'
            : 'bg-transparent py-2.5',
        )}
        role="banner"
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            aria-label="DentaCare Pro — Home"
          >
            <div className="w-10 h-10 bg-dental-gradient rounded-xl flex items-center justify-center shadow-dental group-hover:shadow-glow transition-all duration-300">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block text-lg font-poppins font-bold gradient-text leading-none">
                DentaCare Pro
              </span>
              <span className="block text-[10px] text-slate-500 tracking-wide uppercase">
                Premium Dental Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  cn(
                    'nav-link px-3 py-2 rounded-lg text-sm',
                    isActive && 'nav-link-active bg-dental-50',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Book CTA */}
            <button
              onClick={() => navigate('/book-appointment')}
              className="btn-primary text-sm px-5 py-2.5"
              aria-label="Book appointment"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-nav"
          >
            <motion.span
              key={mobileOpen ? 'x' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.nav
              id="mobile-nav"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-2xl flex flex-col lg:hidden"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-dental-gradient rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-poppins font-bold gradient-text">DentaCare Pro</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto p-5 space-y-1">
                {NAV_LINKS.map(({ label, path }, i) => (
                  <motion.div
                    key={path}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <NavLink
                      to={path}
                      end={path === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                          isActive
                            ? 'bg-dental-50 text-dental-700'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                        )
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Drawer footer CTAs */}
              <div className="p-5 border-t border-slate-100 space-y-3">
                <button
                  onClick={() => { setMobileOpen(false); navigate('/book-appointment'); }}
                  className="btn-primary w-full justify-center"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </button>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 text-white rounded-xl font-semibold text-sm hover:bg-emerald-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
