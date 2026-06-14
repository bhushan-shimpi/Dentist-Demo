import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { cn } from '../../utils/helpers';

const icons = {
  success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
  error:   <XCircle    className="w-5 h-5 text-red-500" />,
  warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
  info:    <Info        className="w-5 h-5 text-dental-500" />,
};

const styles = {
  success: 'border-l-4 border-emerald-500',
  error:   'border-l-4 border-red-500',
  warning: 'border-l-4 border-amber-500',
  info:    'border-l-4 border-dental-500',
};

function ToastItem({ id, type = 'info', title, message }) {
  const { removeToast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'flex items-start gap-3 p-4 bg-white rounded-2xl shadow-xl min-w-[300px] max-w-sm',
        styles[type],
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold text-slate-800">{title}</p>}
        {message && <p className="text-sm text-slate-600 mt-0.5">{message}</p>}
      </div>
      <button
        onClick={() => removeToast(id)}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4 text-slate-400" />
      </button>
    </motion.div>
  );
}

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div
      aria-label="Notifications"
      className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem {...toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
