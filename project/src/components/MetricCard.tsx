import { motion } from 'framer-motion';
import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  color: string;
  darkMode: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = React.memo(
  ({ icon: Icon, title, value, color, darkMode }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: darkMode 
            ? '0 0 20px rgba(59, 130, 246, 0.3)' 
            : '0 0 15px rgba(59, 130, 246, 0.2)'
        }}
        className={`
          metric-card p-4 rounded-lg glassmorphism
          ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}
          transition-all duration-300
        `}
      >
        <motion.div 
          className="flex items-center gap-2 mb-2"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Icon className={`w-5 h-5 ${color}`} />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {title}
          </span>
        </motion.div>
        <motion.div 
          className={`text-2xl font-bold ${color}`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {value}
        </motion.div>
      </motion.div>
    );
  }
);