import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Award, GraduationCap,
  Target, Eye, Calendar, CheckCircle,
} from 'lucide-react';
import Button from '../components/ui/Button';
import ContactCTA from '../components/home/ContactCTA';

const EDUCATION = [
  { year: '2005', degree: 'BDS', college: 'Armed Forces Medical College, Pune', type: 'Education' },
  { year: '2008', degree: 'MDS – Prosthodontics', college: 'AFMC Pune (Gold Medallist)', type: 'Education' },
  { year: '2010', degree: 'Fellowship – Implantology', college: 'NYU College of Dentistry, USA', type: 'Education' },
  { year: '2012', degree: 'Cert. – Clear Aligner Therapy', college: 'Invisalign University', type: 'Certification' },
];

const AWARDS = [
  { year: '2024', title: 'Best Dental Clinic — Pune', org: 'Times Health Excellence Awards' },
  { year: '2023', title: 'Top Implantologist — India', org: 'Indian Dental Association' },
  { year: '2022', title: 'Patient Choice Award', org: 'Practo Health Awards' },
  { year: '2021', title: 'Innovation in Dentistry', org: 'Dental Tribune India' },
];

const CERTIFICATIONS = [
  'FICD — Fellow, International College of Dentists',
  'FAAID — Fellow, American Academy of Implant Dentistry',
  'FADI — Fellow, Academy of Dentistry International',
  'Invisalign Diamond Provider',
  'CEREC Certified Clinician',
  'ISO 9001:2015 Certified Practice',
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-hero pt-24 pb-8 md:pt-32 md:pb-12" aria-label="About page header">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-slate-900 mb-4">
              Pioneers of <span className="gradient-text">Dental Excellence</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              15 years of trust, innovation, and transformative smiles. Meet the team and discover our story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <div className="relative max-w-md mx-auto">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=85"
                    alt="Dr. Rahul Sharma — Founder and Lead Dentist"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute bottom-0 left-0 right-0 glass rounded-b-3xl p-6">
                  <h2 className="text-2xl font-poppins font-bold text-slate-900">Dr. Rahul Sharma</h2>
                  <p className="text-dental-600 font-medium">MDS, FICD, FAAID</p>
                  <p className="text-sm text-slate-600 mt-1">Founder & Lead Prosthodontist</p>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-poppins font-bold text-slate-900 mb-3">Our Story</h3>
                <p className="text-slate-600 leading-relaxed">
                  DentaCare Pro was founded in 2010 by Dr. Rahul Sharma with a singular vision: to bring world-class dental care to Pune in a warm, welcoming environment where patients feel valued, heard, and cared for.
                </p>
                <p className="text-slate-600 leading-relaxed mt-3">
                  After graduating with distinction from AFMC and completing a fellowship in implantology at NYU, Dr. Sharma returned to India with the mission to democratise premium dental care. Today, DentaCare Pro serves over 10,000 patients annually.
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-dental-50 rounded-2xl border border-dental-100">
                  <div className="w-10 h-10 bg-dental-600 rounded-xl flex items-center justify-center mb-3">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-poppins font-semibold text-slate-900 mb-1.5">Our Mission</h4>
                  <p className="text-sm text-slate-600">
                    To deliver exceptional dental care that transforms lives and builds confidence through compassionate, technology-driven treatment.
                  </p>
                </div>
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center mb-3">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-poppins font-semibold text-slate-900 mb-1.5">Our Vision</h4>
                  <p className="text-sm text-slate-600">
                    To be India's most trusted dental brand — where every patient leaves with a smile they're proud to show the world.
                  </p>
                </div>
              </div>

              {/* Education timeline */}
              <div>
                <h3 className="text-xl font-poppins font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-dental-600" /> Education & Training
                </h3>
                <div className="space-y-4">
                  {EDUCATION.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 text-right">
                        <span className="inline-block w-14 text-xs font-bold text-dental-600 bg-dental-100 px-2 py-1 rounded-lg">{item.year}</span>
                      </div>
                      <div className="flex-1 pb-4 border-l-2 border-slate-100 pl-4 last:border-0">
                        <div className="font-semibold text-slate-900">{item.degree}</div>
                        <div className="text-sm text-slate-500">{item.college}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-xl font-poppins font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-dental-600" /> Certifications
                </h3>
                <ul className="grid grid-cols-1 gap-2">
                  {CERTIFICATIONS.map((cert) => (
                    <li key={cert} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => navigate('/book-appointment')}
                icon={<Calendar className="w-4 h-4" />}
                size="lg"
              >
                Book a Consultation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section bg-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-poppins font-bold text-slate-900">
              Awards & <span className="gradient-text">Recognition</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AWARDS.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6 text-center card-hover"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-amber-500" />
                </div>
                <div className="text-xs font-bold text-dental-600 mb-1">{award.year}</div>
                <div className="font-semibold text-slate-900 text-sm">{award.title}</div>
                <div className="text-xs text-slate-500 mt-1">{award.org}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
