import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ToastContainer from '../ui/Toast';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function PageWrapper({ children }) {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative w-full">
      {!isAdmin && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex-1"
          role="main"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {!isAdmin && <Footer />}
      <ToastContainer />
    </div>
  );
}
