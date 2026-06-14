import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Stethoscope, Phone, Mail, MapPin,
  Clock, Heart, ArrowRight, Send,
} from 'lucide-react';

// Inline SVG social icons (brand icons removed from lucide-react)
const SocialIcons = {
  Facebook: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  Instagram: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  Twitter: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 5.772zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  Youtube: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
};


const FOOTER_LINKS = {
  'Quick Links': [
    { label: 'Home',         path: '/' },
    { label: 'About Us',     path: '/about' },
    { label: 'Gallery',      path: '/gallery' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact',      path: '/contact' },
  ],
  'Our Services': [
    { label: 'General Dentistry',   path: '/services/general-dentistry' },
    { label: 'Teeth Whitening',     path: '/services/teeth-whitening' },
    { label: 'Dental Implants',     path: '/services/dental-implants' },
    { label: 'Orthodontics',        path: '/services/orthodontics' },
    { label: 'Root Canal',          path: '/services/root-canal' },
    { label: 'Cosmetic Dentistry',  path: '/services/cosmetic-dentistry' },
  ],
};

const WORKING_HOURS = [
  { day: 'Monday – Friday',  hours: '9:00 AM – 7:00 PM' },
  { day: 'Saturday',         hours: '9:00 AM – 5:00 PM' },
  { day: 'Sunday',           hours: '10:00 AM – 2:00 PM' },
  { day: 'Emergency',        hours: '24 / 7 Available' },
];

const SOCIALS = [
  { Icon: SocialIcons.Facebook,  href: '#', label: 'Facebook' },
  { Icon: SocialIcons.Instagram, href: '#', label: 'Instagram' },
  { Icon: SocialIcons.Twitter,   href: '#', label: 'Twitter / X' },
  { Icon: SocialIcons.Youtube,   href: '#', label: 'YouTube' },
];


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300" role="contentinfo">
      {/* Top gradient bar */}
      <div className="h-1 bg-dental-gradient" />

      <div className="container-custom pt-8 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="DentaCare Pro">
              <div className="w-10 h-10 bg-dental-gradient rounded-xl flex items-center justify-center shadow-glow">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block text-lg font-poppins font-bold text-white leading-none">DentaCare Pro</span>
                <span className="block text-[10px] text-slate-400 tracking-wide uppercase">Premium Dental Clinic</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400">
              Delivering world-class dental care with cutting-edge technology and a compassionate team. Your perfect smile is our mission.
            </p>

            {/* Contact info */}
            <div className="space-y-3 text-sm">
              <a href="tel:+919876543210" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-dental-400 flex-shrink-0" />
                +91 98765 43210
              </a>
              <a href="mailto:hello@dentacarepro.in" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-dental-400 flex-shrink-0" />
                hello@dentacarepro.in
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-dental-400 flex-shrink-0 mt-0.5" />
                <span>123 Smile Street, Koregaon Park,<br />Pune, Maharashtra 411001</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-dental-600 transition-colors"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

          </div>

          {/* Links columns */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-8">
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{heading}</h3>
                <ul className="space-y-3">
                  {links.map(({ label, path }) => (
                    <li key={path}>
                      <Link
                        to={path}
                        className="flex items-center gap-1.5 text-sm hover:text-dental-400 hover:gap-2.5 transition-all duration-200"
                      >
                        <ArrowRight className="w-3 h-3 text-dental-500" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Hours + Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-dental-400" />
                Working Hours
              </h3>
              <ul className="space-y-2.5">
                {WORKING_HOURS.map(({ day, hours }) => (
                  <li key={day} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{day}</span>
                    <span className={`font-medium ${day === 'Emergency' ? 'text-red-400' : 'text-white'}`}>
                      {hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>


          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {year} DentaCare Pro. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for healthier smiles
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
