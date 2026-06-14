import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Phone, ArrowRight } from 'lucide-react';

export default function ContactCTA() {
  const navigate = useNavigate();

  return (
    <section className="section bg-white" aria-label="Contact call to action">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden bg-dental-gradient rounded-3xl p-10 md:p-16 text-center text-white"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full" />
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Accepting New Patients — Book Today!
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-balance">
              Ready to Transform<br />Your Smile?
            </h2>

            <p className="text-dental-100 text-lg max-w-xl mx-auto mb-8">
              Schedule your consultation today and take the first step towards the beautiful, healthy smile you deserve.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/book-appointment')}
                className="flex items-center gap-2 bg-white text-dental-700 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:bg-dental-50 transition-all"
                aria-label="Book an appointment"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:bg-emerald-600 transition-all"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 bg-white/20 text-white font-bold px-8 py-4 rounded-2xl backdrop-blur-sm hover:bg-white/30 transition-all"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>

            {/* Trust note */}
            <p className="mt-6 text-dental-200 text-sm">
              ✓ No waiting list &nbsp;·&nbsp; ✓ Same-day appointments available &nbsp;·&nbsp; ✓ Free initial consultation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
