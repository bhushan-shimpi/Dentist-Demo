import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, BookOpen, Stethoscope, GraduationCap, Star, Calendar } from 'lucide-react';
import Button from '../ui/Button';

const CREDENTIALS = [
  { icon: <GraduationCap className="w-4 h-4" />, label: 'BDS, MDS – Prosthodontics, AFMC Pune' },
  { icon: <Award className="w-4 h-4" />,         label: 'Fellowship – American Dental Association' },
  { icon: <BookOpen className="w-4 h-4" />,      label: 'Certified in Implantology & Clear Aligners' },
  { icon: <Stethoscope className="w-4 h-4" />,   label: '15+ Years Clinical Experience' },
];

export default function DoctorSection() {
  const navigate = useNavigate();

  return (
    <section className="section bg-white" aria-label="Meet our dentist">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Background shape */}
            <div className="absolute -top-6 -left-6 w-72 h-72 bg-dental-gradient rounded-3xl opacity-10 blur-xl" aria-hidden="true" />

            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=85"
                alt="Dr. Rahul Sharma — Lead Dentist and Founder of DentaCare Pro"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay card */}
              <div className="absolute bottom-0 left-0 right-0 glass border-t border-white/30 p-5">
                <div className="font-poppins font-bold text-slate-900 text-xl">Dr. Rahul Sharma</div>
                <div className="text-dental-600 font-medium text-sm">MDS Prosthodontics & Implantologist</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600">4.9 · 1,200+ patient reviews</span>
                </div>
              </div>
            </div>

            {/* Experience badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-4 top-16 glass rounded-2xl p-4 shadow-xl text-center"
            >
              <div className="text-3xl font-poppins font-bold gradient-text">15+</div>
              <div className="text-xs text-slate-600 font-medium">Years<br />Experience</div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
                Meet the Expert
              </span>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900">
                Dr. Rahul Sharma
                <span className="block gradient-text text-2xl mt-1">MDS, FICD, FAAID</span>
              </h2>
            </div>

            <p className="text-slate-600 leading-relaxed">
              With over 15 years of dedicated practice in prosthodontics and implantology, Dr. Rahul Sharma is one of Pune's most trusted dental specialists. Having trained at AFMC Pune and completed fellowship programs in the USA, he brings world-class expertise to every patient's smile journey.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Dr. Sharma's philosophy is simple: every patient deserves exceptional care, delivered with compassion and precision. He specialises in complex full-mouth rehabilitations, dental implants, and cosmetic smile design.
            </p>

            {/* Credentials */}
            <ul className="space-y-3">
              {CREDENTIALS.map(({ icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-7 h-7 bg-dental-100 text-dental-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    {icon}
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                onClick={() => navigate('/about')}
                variant="secondary"
                icon={<BookOpen className="w-4 h-4" />}
              >
                Full Profile
              </Button>
              <Button
                onClick={() => navigate('/book-appointment')}
                icon={<Calendar className="w-4 h-4" />}
              >
                Book a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
