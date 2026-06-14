import { cn } from '../../utils/helpers';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-dental-600 text-white hover:bg-dental-700 shadow-md hover:shadow-lg',
  secondary: 'bg-white text-dental-700 border border-dental-200 hover:bg-dental-50 hover:border-dental-300 shadow-soft',
  emerald: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg',
  ghost: 'text-dental-700 hover:bg-dental-50',
  danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md',
  outline: 'border-2 border-dental-600 text-dental-600 hover:bg-dental-600 hover:text-white',
};

const sizes = {
  sm:  'px-4 py-2 text-sm rounded-xl gap-1.5',
  md:  'px-6 py-3 text-sm rounded-2xl gap-2',
  lg:  'px-8 py-4 text-base rounded-2xl gap-2.5',
  xl:  'px-10 py-5 text-lg rounded-3xl gap-3',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  loading = false,
  disabled = false,
  icon,
  iconRight,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02, y: disabled || loading ? 0 : -1 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98, y: 0 }}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dental-500',
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && (
        <span className="flex-shrink-0">{iconRight}</span>
      )}
    </motion.button>
  );
}
