import { cn } from '../../utils/helpers';
import { motion } from 'framer-motion';

export function Card({ children, className, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 4px 24px -4px rgba(59,130,246,0.18)' } : {}}
      transition={{ duration: 0.25 }}
      className={cn(
        'bg-white rounded-2xl border border-slate-100 shadow-soft',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function GlassCard({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'glass rounded-2xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return <div className={cn('p-6 pb-0', className)}>{children}</div>;
}

export function CardBody({ children, className }) {
  return <div className={cn('p-6', className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn('px-6 pb-6 pt-0 flex items-center gap-3', className)}>
      {children}
    </div>
  );
}

// Badge
export function Badge({ children, variant = 'default', className }) {
  const variantClasses = {
    default:  'bg-dental-100 text-dental-700',
    emerald:  'bg-emerald-100 text-emerald-700',
    cyan:     'bg-cyan-100 text-cyan-700',
    warning:  'bg-amber-100 text-amber-700',
    danger:   'bg-red-100 text-red-700',
    dark:     'bg-slate-800 text-white',
  };
  return (
    <span className={cn('badge text-xs font-semibold', variantClasses[variant], className)}>
      {children}
    </span>
  );
}

// Divider
export function Divider({ className }) {
  return <hr className={cn('border-slate-100', className)} />;
}
