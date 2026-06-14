import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

const initialState = {
  step: 1,
  patientName: '',
  phone: '',
  email: '',
  age: '',
  gender: '',
  service: '',
  date: null,
  slot: null,
  notes: '',
  bookingId: null,
};

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(initialState);

  const updateBooking = (data) => setBooking(prev => ({ ...prev, ...data }));
  const nextStep = () => setBooking(prev => ({ ...prev, step: Math.min(prev.step + 1, 5) }));
  const prevStep = () => setBooking(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  const resetBooking = () => setBooking(initialState);

  return (
    <BookingContext.Provider value={{ booking, updateBooking, nextStep, prevStep, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
