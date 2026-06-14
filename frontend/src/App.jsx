import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastProvider } from './context/ToastContext';
import { BookingProvider } from './context/BookingContext';
import PageWrapper from './components/layout/PageWrapper';
import { Skeleton } from './components/ui/Skeleton';

// ─── Eager-loaded pages ──────────────────────────────────────────────────────
import Home from './pages/Home';
import Appointment from './pages/Appointment';

// ─── Lazy-loaded pages ───────────────────────────────────────────────────────
const About          = lazy(() => import('./pages/About'));
const Services       = lazy(() => import('./pages/Services'));
const ServiceDetail  = lazy(() => import('./pages/ServiceDetail'));
const PatientHistory = lazy(() => import('./pages/PatientHistory'));
const Gallery        = lazy(() => import('./pages/Gallery'));
const Testimonials   = lazy(() => import('./pages/Testimonials'));

const Contact        = lazy(() => import('./pages/Contact'));

// ─── Admin pages ─────────────────────────────────────────────────────────────
const AdminLayout    = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminPatients = lazy(() => import('./pages/admin/AdminPatients'));
const AdminAppointments = lazy(() => import('./pages/admin/AdminAppointments'));
const AdminWhatsApp = lazy(() => import('./pages/admin/AdminWhatsApp'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

// ─── Page loading fallback ───────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="space-y-4 w-full max-w-xl px-4">
        <Skeleton className="h-8 w-2/3 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <BookingProvider>
        <BrowserRouter>
          <PageWrapper>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* ── Public routes ── */}
                <Route path="/"                  element={<Home />} />
                <Route path="/about"             element={<About />} />
                <Route path="/services"          element={<Services />} />
                <Route path="/services/:id"      element={<ServiceDetail />} />
                <Route path="/book-appointment"  element={<Appointment />} />
                <Route path="/patient-history"   element={<PatientHistory />} />
                <Route path="/gallery"           element={<Gallery />} />
                <Route path="/testimonials"      element={<Testimonials />} />

                <Route path="/contact"           element={<Contact />} />

                {/* ── Admin routes ── */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="patients" element={<AdminPatients />} />
                  <Route path="appointments" element={<AdminAppointments />} />
                  <Route path="whatsapp" element={<AdminWhatsApp />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="*" element={<AdminDashboard />} />
                </Route>

                {/* ── Fallback ── */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageWrapper>
        </BrowserRouter>
      </BookingProvider>
    </ToastProvider>
  );
}

// 404 Not Found page
function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center text-center px-4">
      <div>
        <div className="text-8xl mb-6">🦷</div>
        <h1 className="text-4xl font-poppins font-bold text-slate-900 mb-3">404 — Page Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn-primary inline-flex">Back to Home</a>
      </div>
    </div>
  );
}
