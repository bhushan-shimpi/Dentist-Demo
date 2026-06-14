import { motion } from 'framer-motion';
import { Phone, Calendar, Stethoscope, Smile, CheckCircle } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: <Phone className="w-5 h-5" />,
    title: 'Book an Appointment',
    desc: 'Schedule online, via WhatsApp, or call us. Choose your preferred date, time, and treatment.',
    color: 'dental',
  },
  {
    num: '02',
    icon: <Stethoscope className="w-5 h-5" />,
    title: 'Initial Consultation',
    desc: 'Meet Dr. Sharma for a thorough examination, digital X-rays, and personalised treatment planning.',
    color: 'cyan',
  },
  {
    num: '03',
    icon: <Calendar className="w-5 h-5" />,
    title: 'Customised Treatment',
    desc: 'Receive world-class treatment using the latest technology in our state-of-the-art facility.',
    color: 'emerald',
  },
  {
    num: '04',
    icon: <CheckCircle className="w-5 h-5" />,
    title: 'Follow-up & Care',
    desc: 'Post-treatment support, digital prescriptions, and scheduled follow-ups for lasting results.',
    color: 'dental',
  },
  {
    num: '05',
    icon: <Smile className="w-5 h-5" />,
    title: 'Enjoy Your New Smile',
    desc: 'Walk out with confidence and the brilliant, healthy smile you\'ve always deserved.',
    color: 'emerald',
  },
];

const colorMap = {
  dental:  { dot: 'bg-dental-gradient', line: 'bg-dental-200',  badge: 'bg-dental-100 text-dental-700', num: 'text-dental-300' },
  emerald: { dot: 'bg-emerald-gradient', line: 'bg-emerald-200', badge: 'bg-emerald-100 text-emerald-700', num: 'text-emerald-300' },
  cyan:    { dot: 'bg-cyan-500',         line: 'bg-cyan-200',    badge: 'bg-cyan-100 text-cyan-700', num: 'text-cyan-300' },
};

export default function TreatmentProcess() {
  return (
    <section className="section bg-white" aria-label="Treatment process">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900">
            Your Journey to a <span className="gradient-text">Perfect Smile</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Five simple steps from first contact to a radiant, confident smile.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2" aria-hidden="true" />

          <div className="space-y-8 md:space-y-12">
            {STEPS.map((step, i) => {
              const colors = colorMap[step.color];
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`relative flex items-center gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-14 md:pl-0 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                    <div className={`inline-block mb-3 ${isEven ? 'md:float-right' : 'md:float-left'} clear-both`}>
                      <span className={`badge ${colors.badge} text-xs`}>
                        {step.icon} Step {step.num}
                      </span>
                    </div>
                    <div className="clear-both">
                      <h3 className="font-poppins font-bold text-slate-900 text-xl mb-2">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-0 md:left-1/2 translate-x-0 md:-translate-x-1/2 flex-shrink-0 z-10">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`w-12 h-12 ${colors.dot} rounded-2xl flex items-center justify-center text-white font-bold shadow-lg`}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Empty spacer for opposite side (desktop) */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
