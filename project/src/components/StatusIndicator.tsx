import { motion } from 'framer-motion';
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface StatusIndicatorProps {
  isConnected: boolean;
  latency: number;
  darkMode: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = React.memo(
  ({ isConnected, latency, darkMode }) => {
    return (
      <motion.div 
        className={`flex items-center justify-between mb-4 p-3 rounded-lg glassmorphism ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className={`w-3 h-3 rounded-full status-pulse ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
            animate={{
              scale: isConnected ? [1, 1.2, 1] : 1,
              opacity: isConnected ? [0.5, 1, 0.5] : 0.5,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.span 
            className="text-sm font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isConnected ? 'Connected' : 'Disconnected'}
          </motion.span>
        </div>
        <div className="flex items-center gap-3">
          <RefreshCw 
            className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
          />
          <motion.span 
            className="text-sm font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {latency.toFixed(1)}ms
          </motion.span>
        </div>
      </motion.div>
    );
  }
);