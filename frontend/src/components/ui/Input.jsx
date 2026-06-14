import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Input = forwardRef(function Input(
  { label, error, hint, icon, iconRight, className, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'input-field',
            icon && '!pl-10',
            iconRight && '!pr-10',
            error && 'border-red-400 focus:ring-red-400 focus:border-red-400',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {iconRight}
          </div>
        )}
      </div>
      {error && (
        <p id={`${props.id}-error`} className="mt-1 text-xs text-red-500 flex items-center gap-1">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${props.id}-hint`} className="mt-1 text-xs text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Input;

// Textarea
export const Textarea = forwardRef(function Textarea(
  { label, error, hint, className, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          'input-field resize-none',
          error && 'border-red-400 focus:ring-red-400',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
});

// Select
export const Select = forwardRef(function Select(
  { label, error, children, className, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'input-field appearance-none cursor-pointer',
          error && 'border-red-400',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});
