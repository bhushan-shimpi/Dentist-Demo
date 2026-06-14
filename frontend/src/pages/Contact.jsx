import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin, Phone, Mail, Clock, MessageCircle,
  Send, CheckCircle,
} from 'lucide-react';
import Input, { Textarea } from '../components/ui/Input';
import Button from '../components/ui/Button';

const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Enter a valid email address'),
  phone:   z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

const WORKING_HOURS = [
  { day: 'Monday – Friday',  hours: '9:00 AM – 7:00 PM', open: true },
  { day: 'Saturday',         hours: '9:00 AM – 5:00 PM', open: true },
  { day: 'Sunday',           hours: '10:00 AM – 2:00 PM', open: true },
  { day: 'Emergency Care',   hours: '24 / 7 Available', emergency: true },
];

const EMERGENCY_NUMBERS = [
  { label: 'Main Clinic',  number: '+91 98765 43210' },
  { label: 'Emergency',   number: '+91 98765 43211' },
  { label: 'WhatsApp',    number: '+91 98765 43210' },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 1500));
    setSubmitted(true);
    reset();
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-slate-900 mb-4">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              We're here to help with all your dental needs. Reach out by phone, WhatsApp, or fill in the form.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info + Form */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Info side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Address */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-dental-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-dental-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Address</h3>
                    <p className="text-sm text-slate-600 mt-1">123 Smile Street, Koregaon Park,<br />Pune, Maharashtra 411001</p>
                  </div>
                </div>
                {EMERGENCY_NUMBERS.map(({ label, number }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-dental-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-dental-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{label}</p>
                      <a href={`tel:${number.replace(/\s/g,'')}`} className="text-sm font-semibold text-slate-900 hover:text-dental-600">
                        {number}
                      </a>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-dental-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-dental-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <a href="mailto:hello@dentacarepro.in" className="text-sm font-semibold text-slate-900 hover:text-dental-600">
                      hello@dentacarepro.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-dental-600" /> Working Hours
                </h3>
                <ul className="space-y-3">
                  {WORKING_HOURS.map(({ day, hours, open, emergency }) => (
                    <li key={day} className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{day}</span>
                      <span className={`font-semibold ${emergency ? 'text-red-500' : open ? 'text-slate-900' : 'text-slate-400'}`}>
                        {hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20your%20dental%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-emerald-500 text-white rounded-2xl p-5 hover:bg-emerald-600 transition-colors shadow-emerald"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">Chat on WhatsApp</div>
                  <div className="text-emerald-100 text-sm">Typically replies within 5 minutes</div>
                </div>
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-8">
                <h2 className="text-2xl font-poppins font-bold text-slate-900 mb-6">Send Us a Message</h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Message Received!</h3>
                    <p className="text-slate-500 mb-6">We'll get back to you within 24 hours.</p>
                    <Button variant="secondary" onClick={() => setSubmitted(false)}>Send Another</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input id="name" label="Full Name" placeholder="John Doe" required error={errors.name?.message} {...register('name')} />
                      <Input id="email" label="Email" placeholder="john@example.com" type="email" required error={errors.email?.message} {...register('email')} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input id="phone" label="Phone (optional)" placeholder="+91 98765 43210" type="tel" icon={<Phone className="w-4 h-4" />} {...register('phone')} />
                      <Input id="subject" label="Subject" placeholder="I'd like to enquire about…" required error={errors.subject?.message} {...register('subject')} />
                    </div>
                    <Textarea
                      id="message"
                      label="Message"
                      placeholder="Tell us how we can help you…"
                      required
                      rows={5}
                      error={errors.message?.message}
                      {...register('message')}
                    />
                    <Button type="submit" loading={isSubmitting} size="lg" icon={<Send className="w-5 h-5" />} className="w-full justify-center">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-slate-50 py-12">
        <div className="container-custom">
          <div className="rounded-3xl overflow-hidden shadow-soft border border-slate-100 h-80">
            <iframe
              title="DentaCare Pro location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.218!2d73.8829!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0!2sDentaCare+Pro!5e0!3m2!1sen!2sin!4v1"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              aria-label="DentaCare Pro clinic location on Google Maps"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
