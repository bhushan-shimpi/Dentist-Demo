import { motion } from 'framer-motion';
import {
  Shield, Zap, HeartPulse, Clock, Microscope, Award,
  CreditCard, PhoneCall,
} from 'lucide-react';

const FEATURES = [
  {
    icon: <Microscope className="w-6 h-6" />,
    title: 'Advanced Technology',
    desc: 'Digital X-rays, CEREC CAD/CAM, 3D scanning, laser dentistry, and state-of-the-art sterilisation.',
    color: 'dental',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'ISO Certified Safety',
    desc: 'ISO 9001 certified with hospital-grade sterilisation protocols and single-use instruments.',
    color: 'emerald',
  },
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Pain-Free Experience',
    desc: 'Topical anaesthesia, needle-free injections, and sedation options for anxiety-free treatment.',
    color: 'cyan',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Flexible Hours',
    desc: 'Open 7 days a week with extended evening hours. Emergency dental care available 24/7.',
    color: 'dental',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Award-Winning Team',
    desc: 'Our specialists have won 15+ national awards and are recognised as top dentists in India.',
    color: 'emerald',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Easy EMI & Insurance',
    desc: 'Zero-cost EMI options, cashless insurance processing, and transparent pricing with no surprises.',
    color: 'cyan',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Same-Day Treatment',
    desc: 'CEREC technology lets us create dental crowns, veneers, and bridges in a single visit.',
    color: 'dental',
  },
  {
    icon: <PhoneCall className="w-6 h-6" />,
    title: '24/7 Support',
    desc: 'WhatsApp, phone, and online support for all your queries, follow-ups, and emergencies.',
    color: 'emerald',
  },
];

const colorMap = {
  dental:  { bg: 'bg-dental-50',  icon: 'bg-dental-600',  border: 'hover:border-dental-200' },
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-600', border: 'hover:border-emerald-200' },
  cyan:    { bg: 'bg-cyan-50',    icon: 'bg-cyan-600',    border: 'hover:border-cyan-200' },
};

export default function WhyChooseUs() {
  return (
    <section className="section bg-slate-50" aria-label="Why choose DentaCare Pro">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
            Our Difference
          </span>
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900">
            Why Patients <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            We combine cutting-edge technology with genuine care to deliver an exceptional dental experience every single time.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, i) => {
            const colors = colorMap[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className={`p-6 bg-white rounded-2xl border border-slate-100 ${colors.border} shadow-soft transition-all duration-300 cursor-default`}
              >
                <div className={`w-12 h-12 ${colors.icon} text-white rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                  {feature.icon}
                </div>
                <h3 className="font-poppins font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
