import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  User, Phone, Mail, Calendar, Clock, CheckCircle,
  ChevronLeft, ChevronRight, Stethoscope, FileText,
} from 'lucide-react';
import Input, { Select, Textarea } from '../components/ui/Input';
import Button from '../components/ui/Button';
import { SERVICES } from '../data/services';

// ─── Validation Schemas ─────────────────────────────────────────────────────
const patientSchema = z.object({
  patientName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email address'),
  age: z.string().min(1, 'Age is required'),
  gender: z.string().min(1, 'Please select gender'),
  service: z.string().min(1, 'Please select a service'),
  notes: z.string().optional(),
});

// ─── Time Slots ──────────────────────────────────────────────────────────────
const SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '14:00', '14:30', '15:00', '15:30', '16:00',
  '16:30', '17:00', '17:30', '18:00', '18:30',
];

const BOOKED_SLOTS = ['09:30', '11:00', '14:30', '17:00'];

// ─── Step indicators ─────────────────────────────────────────────────────────
const STEPS = [
  { num: 1, label: 'Patient Details',  icon: <User className="w-4 h-4" /> },
  { num: 2, label: 'Choose Date',      icon: <Calendar className="w-4 h-4" /> },
  { num: 3, label: 'Pick a Slot',      icon: <Clock className="w-4 h-4" /> },
  { num: 4, label: 'Review',           icon: <FileText className="w-4 h-4" /> },
  { num: 5, label: 'Confirmation',     icon: <CheckCircle className="w-4 h-4" /> },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className={`flex flex-col items-center gap-1.5`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              current === step.num
                ? 'bg-dental-gradient text-white shadow-glow scale-110'
                : current > step.num
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 text-slate-400'
            }`}>
              {current > step.num ? <CheckCircle className="w-5 h-5" /> : step.icon}
            </div>
            <span className={`hidden sm:block text-xs font-medium transition-colors ${
              current >= step.num ? 'text-dental-700' : 'text-slate-400'
            }`}>
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 w-8 sm:w-16 mx-1 transition-colors duration-300 ${
              current > i + 1 ? 'bg-emerald-400' : 'bg-slate-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Step 1: Patient Details ─────────────────────────────────────────────────
function Step1({ data, onNext }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: data,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          id="patientName"
          label="Full Name"
          placeholder="John Doe"
          required
          icon={<User className="w-4 h-4" />}
          error={errors.patientName?.message}
          {...register('patientName')}
        />
        <Input
          id="phone"
          label="Mobile Number"
          placeholder="98765 43210"
          required
          type="tel"
          icon={<Phone className="w-4 h-4" />}
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          id="email"
          label="Email Address"
          placeholder="john@example.com"
          type="email"
          required
          icon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          id="age"
          label="Age"
          placeholder="25"
          type="number"
          min="1"
          max="120"
          required
          error={errors.age?.message}
          {...register('age')}
        />
        <Select
          id="gender"
          label="Gender"
          required
          error={errors.gender?.message}
          {...register('gender')}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other / Prefer not to say</option>
        </Select>
        <Select
          id="service"
          label="Service Required"
          required
          error={errors.service?.message}
          {...register('service')}
        >
          <option value="">Select a service</option>
          {SERVICES.map(s => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </Select>
      </div>
      <Textarea
        id="notes"
        label="Additional Notes (optional)"
        placeholder="Any specific concerns, medical conditions, or questions…"
        rows={3}
        {...register('notes')}
      />
      <div className="flex justify-end pt-2">
        <Button type="submit" size="lg" iconRight={<ChevronRight className="w-5 h-5" />}>
          Continue to Date
        </Button>
      </div>
    </form>
  );
}

// ─── Step 2: Date Picker ─────────────────────────────────────────────────────
function Step2({ data, onNext, onBack }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(data.date || null);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const isDisabled = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < today || d.getDay() === 0; // Disable past dates and Sundays
  };

  const isSelected = (day) => {
    if (!selected) return false;
    const s = new Date(selected);
    return s.getFullYear() === viewYear && s.getMonth() === viewMonth && s.getDate() === day;
  };

  const isToday = (day) => {
    return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <div className="space-y-6">
      <div className="max-w-sm mx-auto">
        {/* Calendar header */}
        <div className="flex items-center justify-between mb-5">
          <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <span className="font-poppins font-semibold text-slate-900">
            {monthNames[viewMonth]} {viewYear}
          </span>
          <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 mb-2">
          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
            <div key={d} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const disabled = isDisabled(day);
            const sel = isSelected(day);
            const tod = isToday(day);
            return (
              <button
                key={day}
                disabled={disabled}
                onClick={() => setSelected(new Date(viewYear, viewMonth, day).toISOString())}
                className={`w-full aspect-square rounded-xl text-sm font-medium transition-all duration-150 ${
                  sel
                    ? 'bg-dental-gradient text-white shadow-md'
                    : disabled
                      ? 'text-slate-300 cursor-not-allowed'
                      : tod
                        ? 'border-2 border-dental-400 text-dental-700 hover:bg-dental-50'
                        : 'hover:bg-dental-50 text-slate-700'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-500 text-center mt-4">
          * Sundays are closed. Emergencies only on public holidays.
        </p>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="secondary" onClick={onBack} icon={<ChevronLeft className="w-4 h-4" />}>Back</Button>
        <Button
          onClick={() => selected && onNext({ date: selected })}
          disabled={!selected}
          iconRight={<ChevronRight className="w-5 h-5" />}
        >
          Choose Slot
        </Button>
      </div>
    </div>
  );
}

// ─── Step 3: Time Slot ───────────────────────────────────────────────────────
function Step3({ data, onNext, onBack }) {
  const [selected, setSelected] = useState(data.slot || null);

  const formatSlot = (time) => {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const display = hour > 12 ? hour - 12 : (hour || 12);
    return `${display}:${m} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-slate-800 mb-4">
          Available slots for{' '}
          <span className="text-dental-600">
            {data.date ? new Date(data.date).toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' }) : '—'}
          </span>
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {SLOTS.map(slot => {
            const booked = BOOKED_SLOTS.includes(slot);
            const sel = selected === slot;
            return (
              <button
                key={slot}
                disabled={booked}
                onClick={() => setSelected(slot)}
                className={`py-3 px-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  sel
                    ? 'bg-dental-gradient text-white shadow-md scale-105'
                    : booked
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-dental-400 hover:bg-dental-50'
                }`}
              >
                {formatSlot(slot)}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-dental-600 rounded" /> Selected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-slate-200 rounded" /> Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-slate-100 border border-slate-200 rounded line-through" />  Booked
          </span>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="secondary" onClick={onBack} icon={<ChevronLeft className="w-4 h-4" />}>Back</Button>
        <Button
          onClick={() => selected && onNext({ slot: selected })}
          disabled={!selected}
          iconRight={<ChevronRight className="w-5 h-5" />}
        >
          Review Booking
        </Button>
      </div>
    </div>
  );
}

// ─── Step 4: Review ──────────────────────────────────────────────────────────
function Step4({ data, onNext, onBack, loading }) {
  const service = SERVICES.find(s => s.id === data.service);
  const formatSlot = (t) => {
    if (!t) return '—';
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    return `${hour > 12 ? hour - 12 : (hour || 12)}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const rows = [
    { label: 'Patient Name', value: data.patientName },
    { label: 'Mobile',       value: data.phone },
    { label: 'Email',        value: data.email },
    { label: 'Age / Gender', value: `${data.age} / ${data.gender}` },
    { label: 'Service',      value: service?.title || '—' },
    { label: 'Date',         value: data.date ? new Date(data.date).toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' }) : '—' },
    { label: 'Time Slot',    value: formatSlot(data.slot) },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
        <div className="bg-dental-gradient px-6 py-4 flex items-center gap-3">
          <Stethoscope className="w-5 h-5 text-white" />
          <h3 className="font-poppins font-semibold text-white">Appointment Summary</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center px-6 py-3.5">
              <span className="text-sm text-slate-500">{label}</span>
              <span className="text-sm font-semibold text-slate-800">{value}</span>
            </div>
          ))}
        </div>
        {data.notes && (
          <div className="px-6 py-4 border-t border-slate-100 bg-amber-50">
            <p className="text-xs font-semibold text-amber-700 mb-1">Notes</p>
            <p className="text-sm text-slate-600">{data.notes}</p>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 text-center">
        By confirming, you agree to our appointment policy. A confirmation will be sent to your email and WhatsApp.
      </p>

      <div className="flex justify-between pt-2">
        <Button variant="secondary" onClick={onBack} icon={<ChevronLeft className="w-4 h-4" />} disabled={loading}>
          Back
        </Button>
        <Button onClick={onNext} loading={loading} iconRight={<CheckCircle className="w-5 h-5" />}>
          Confirm Appointment
        </Button>
      </div>
    </div>
  );
}

// ─── Main Appointment Page ────────────────────────────────────────────────────
export default function Appointment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '', phone: '', email: '', age: '', gender: '',
    service: '', date: null, slot: null, notes: '',
    bookingId: null,
  });

  const merge = (data) => setFormData(prev => ({ ...prev, ...data }));

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000)); // Simulate API call
    const bookingId = 'DCP-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setFormData(prev => ({ ...prev, bookingId }));
    setLoading(false);
    setStep(5);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-hero pt-24 pb-8 md:pt-32 md:pb-12" aria-label="Book appointment header">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
              Easy Online Booking
            </span>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-slate-900">
              Book an <span className="gradient-text">Appointment</span>
            </h1>
            <p className="text-slate-500 mt-3">Complete the form below to secure your spot.</p>
          </motion.div>
        </div>
      </section>

      {/* Wizard card */}
      <section className="section pt-10">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8 md:p-10">
            {step < 5 && <StepIndicator current={step} />}

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <Step1
                    data={formData}
                    onNext={(d) => { merge(d); setStep(2); }}
                  />
                )}
                {step === 2 && (
                  <Step2
                    data={formData}
                    onNext={(d) => { merge(d); setStep(3); }}
                    onBack={() => setStep(1)}
                  />
                )}
                {step === 3 && (
                  <Step3
                    data={formData}
                    onNext={(d) => { merge(d); setStep(4); }}
                    onBack={() => setStep(2)}
                  />
                )}
                {step === 4 && (
                  <Step4
                    data={formData}
                    onNext={handleConfirm}
                    onBack={() => setStep(3)}
                    loading={loading}
                  />
                )}
                {step === 5 && <SuccessStep data={formData} navigate={navigate} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Inline Success Step ──────────────────────────────────────────────────────
function SuccessStep({ data, navigate }) {
  const service = SERVICES.find(s => s.id === data.service);
  const dateStr = data.date
    ? new Date(data.date).toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
    : '—';
  const formatSlot = (t) => {
    if (!t) return '—';
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    return `${hour > 12 ? hour - 12 : (hour || 12)}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className="text-center space-y-6">
      {/* Animated check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="w-24 h-24 bg-emerald-gradient rounded-full flex items-center justify-center mx-auto shadow-emerald"
      >
        <CheckCircle className="w-12 h-12 text-white" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-3xl font-poppins font-bold text-slate-900">Appointment Confirmed!</h2>
        <p className="text-slate-500 mt-2">
          Your booking ID is <span className="font-bold text-dental-600">{data.bookingId}</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-left"
      >
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-slate-500">Patient</span><p className="font-semibold mt-0.5">{data.patientName}</p></div>
          <div><span className="text-slate-500">Service</span><p className="font-semibold mt-0.5">{service?.title}</p></div>
          <div><span className="text-slate-500">Date</span><p className="font-semibold mt-0.5">{dateStr}</p></div>
          <div><span className="text-slate-500">Time</span><p className="font-semibold mt-0.5">{formatSlot(data.slot)}</p></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <a
          href={`https://wa.me/919876543210?text=Hi%2C%20my%20appointment%20ID%20is%20${data.bookingId}%20for%20${dateStr}%20at%20${formatSlot(data.slot)}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-emerald"
        >
          WhatsApp Confirmation
        </a>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
}
