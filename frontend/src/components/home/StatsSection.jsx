import { motion } from 'framer-motion';
import { Users, Smile, Trophy, Star } from 'lucide-react';
import { useCounter, useInView } from '../../hooks/useAnimations';

const STATS = [
  {
    icon: <Trophy className="w-8 h-8" />,
    value: 15,
    suffix: '+',
    label: 'Years of Excellence',
    color: 'from-dental-500 to-dental-700',
    bg: 'bg-dental-50',
    iconColor: 'text-dental-600',
  },
  {
    icon: <Smile className="w-8 h-8" />,
    value: 10000,
    suffix: '+',
    label: 'Happy Patients',
    color: 'from-emerald-500 to-emerald-700',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: <Users className="w-8 h-8" />,
    value: 50000,
    suffix: '+',
    label: 'Successful Treatments',
    color: 'from-cyan-500 to-cyan-700',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
  {
    icon: <Star className="w-8 h-8" />,
    value: 4.9,
    suffix: '★',
    label: 'Google Rating',
    color: 'from-amber-400 to-amber-600',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    isDecimal: true,
  },
];

function StatItem({ icon, value, suffix, label, bg, iconColor, isDecimal, started }) {
  const count = useCounter(isDecimal ? Math.floor(value * 10) : value, 2000, started);
  const display = isDecimal ? (count / 10).toFixed(1) : count.toLocaleString('en-IN');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-soft p-2 sm:p-6 text-center group hover:-translate-y-1 hover:shadow-card transition-all duration-300"
    >
      <div className={`w-10 h-10 sm:w-16 sm:h-16 ${bg} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <span className={`${iconColor} flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-8 sm:[&>svg]:h-8`}>{icon}</span>
      </div>
      <div className="text-lg sm:text-4xl lg:text-5xl font-poppins font-bold text-slate-900 tabular-nums leading-none">
        {display}<span className="text-dental-500">{suffix}</span>
      </div>
      <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-sm font-medium text-slate-500 leading-tight">{label}</p>
    </motion.div>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView();

  return (
    <section className="section bg-white" aria-label="Clinic statistics" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Numbers that reflect our commitment to excellence and patient satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} started={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
