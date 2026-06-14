import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date(date));
}

export function formatTime(time) {
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const display = hour > 12 ? hour - 12 : hour || 12;
  return `${display}:${m} ${ampm}`;
}

export function formatPhone(phone) {
  return phone.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3');
}

export function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}
