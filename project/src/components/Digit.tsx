import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';

interface DigitProps {
  value: string;
  darkMode: boolean;
}

const Digit = forwardRef<HTMLDivElement, DigitProps>(({ value, darkMode }, ref) => {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={{ scale: 1.1, boxShadow: darkMode ? '0 0 25px rgba(59, 130, 246, 0.5)' : '0 0 15px rgba(59, 130, 246, 0.3)' }}
      className={`
        digit-container aspect-square flex items-center justify-center text-3xl font-mono font-bold rounded-lg
        ${darkMode ? 'bg-gray-800 text-blue-400' : 'bg-white text-blue-600'}
        glassmorphism neon-glow transition-all duration-300 transform
      `}
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
});

Digit.displayName = 'Digit';

export { Digit }