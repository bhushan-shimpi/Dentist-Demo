import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

function AccordionItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between p-5 text-left transition-all duration-200',
          isOpen ? 'bg-dental-50' : 'bg-white hover:bg-slate-50',
        )}
        aria-expanded={isOpen}
        id={`faq-btn-${index}`}
        aria-controls={`faq-panel-${index}`}
      >
        <span className="font-semibold text-slate-800 pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown className={cn('w-5 h-5 transition-colors', isOpen ? 'text-dental-600' : 'text-slate-400')} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-btn-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState(new Set([0]));

  const toggle = (index) => {
    setOpenItems(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          index={i}
          question={item.q || item.question}
          answer={item.a || item.answer}
          isOpen={openItems.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
