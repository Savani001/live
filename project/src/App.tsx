import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, BarChart3, History, Power } from 'lucide-react';
import { useStore } from './store';
import { StatusIndicator } from './components/StatusIndicator';
import { MetricCard } from './components/MetricCard';
import { Digit } from './components/Digit';

const getRandomDigits = () => {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
};

function App() {
  const {
    displayData,
    isConnected,
    darkMode,
    showHistory,
    history,
    latency,
    systemHealth,
    anomalies,
    transmissionRate,
    setDisplayData,
    addToHistory,
    setLatency,
    toggleDarkMode,
    toggleHistory,
  } = useStore();

  const updateData = useCallback(() => {
    const newData = getRandomDigits();
    setDisplayData(newData);
    addToHistory(newData);
    setLatency(Math.random() * 50 + 10);
  }, [setDisplayData, addToHistory, setLatency]);

  useEffect(() => {
    const interval = setInterval(updateData, 2000);
    return () => clearInterval(interval);
  }, [updateData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${darkMode ? 'gradient-bg' : 'bg-gray-50'} transition-colors duration-500`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <Activity className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Live Data Transmission
            </h1>
          </motion.div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`
                p-2 rounded-lg glassmorphism
                ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}
                transition-colors
              `}
            >
              <Power className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleHistory}
              className={`
                p-2 rounded-lg glassmorphism
                ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}
                transition-colors
              `}
            >
              <History className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Main Display */}
        <motion.div
          layout
          className={`p-8 rounded-2xl glassmorphism ${
            darkMode ? 'bg-gray-800/30' : 'bg-white/70'
          } shadow-xl mb-8 transition-colors duration-300`}
        >
          <StatusIndicator
            isConnected={isConnected}
            latency={latency}
            darkMode={darkMode}
          />
          
          <motion.div 
            className="grid grid-cols-12 gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AnimatePresence mode="popLayout">
              {displayData.split('').map((digit, index) => (
                <Digit
                  key={`${index}-${digit}`}
                  value={digit}
                  darkMode={darkMode}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Analytics */}
          <div className="grid grid-cols-3 gap-4">
            <MetricCard
              icon={BarChart3}
              title="Transmission Rate"
              value={`${transmissionRate} Hz`}
              color={darkMode ? 'text-blue-400' : 'text-blue-600'}
              darkMode={darkMode}
            />
            <MetricCard
              icon={AlertTriangle}
              title="Anomalies"
              value={anomalies}
              color={darkMode ? 'text-red-400' : 'text-red-600'}
              darkMode={darkMode}
            />
            <MetricCard
              icon={Activity}
              title="System Health"
              value={`${systemHealth}%`}
              color={darkMode ? 'text-green-400' : 'text-green-600'}
              darkMode={darkMode}
            />
          </div>
        </motion.div>

        {/* History Panel */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-6 rounded-xl glassmorphism ${
                darkMode ? 'bg-gray-800/30' : 'bg-white/70'
              } shadow-lg overflow-hidden`}
            >
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                History Log
              </h2>
              <motion.div className="space-y-2">
                {history.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg glassmorphism ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default App;