import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Phone, ArrowRight } from 'lucide-react';
import Accordion from '../ui/Accordion';
import Button from '../ui/Button';

const FAQ_ITEMS = [
  {
    q: 'How often should I visit the dentist?',
    a: 'We recommend a check-up and cleaning every 6 months for most adults. If you have gum disease or other conditions, more frequent visits may be necessary.',
  },
  {
    q: 'Do you offer dental treatment for children?',
    a: 'Absolutely! We have a dedicated pediatric dentistry team that specialises in creating a fun, comfortable, and anxiety-free experience for children of all ages.',
  },
  {
    q: 'What payment options are available?',
    a: 'We accept cash, all major credit/debit cards, UPI, and net banking. We also offer zero-cost EMI on treatments above ₹10,000 and assist with cashless insurance claims.',
  },
  {
    q: 'How do I manage dental anxiety?',
    a: 'We offer several options including nitrous oxide sedation, oral sedatives, and a gentle step-by-step approach. Please tell us about your anxiety and we will tailor the experience for your comfort.',
  },
  {
    q: 'Is teeth whitening safe?',
    a: 'Yes, professional teeth whitening performed under dental supervision is very safe. Our whitening systems are approved and tested for enamel safety, producing results of up to 8 shades in a single session.',
  },
  {
    q: 'How long do dental implants last?',
    a: 'With proper care and hygiene, dental implants can last a lifetime. The crown on top typically lasts 15–25 years before needing replacement.',
  },
  {
    q: 'Do you handle dental emergencies?',
    a: 'Yes! We provide 24/7 emergency dental care. Call our emergency line at +91 98765 43210 and we will get you seen as quickly as possible.',
  },
];

export default function FAQSection() {
  const navigate = useNavigate();

  return (
    <section className="section bg-slate-50" aria-label="Frequently asked questions">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
                FAQs
              </span>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900">
                Got <span className="gradient-text">Questions?</span>
                <br />We've Got Answers.
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Can't find what you're looking for? Reach out to our team directly — we're always happy to help.
              </p>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/book-appointment')}
                icon={<Calendar className="w-4 h-4" />}
              >
                Book an Appointment
              </Button>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-dental-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-dental-500" />
                Call +91 98765 43210
              </a>
            </div>

            {/* Still have questions card */}
            <div className="bg-dental-gradient rounded-2xl p-6 text-white">
              <h3 className="font-poppins font-semibold mb-2">Still have questions?</h3>
              <p className="text-dental-100 text-sm mb-4">Our team is available 7 days a week to assist you.</p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-dental-700 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-dental-50 transition-colors w-fit"
              >
                Chat on WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Accordion items={FAQ_ITEMS} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
