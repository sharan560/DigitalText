import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/30 dark:to-blue-900/20 w-full relative overflow-hidden"
    >
      <div className="max-w-4xl w-full text-center">
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <div className="flex justify-center gap-2 sm:gap-3 text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✍️
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl sm:text-4xl lg:text-5xl"
            >
              ➡️
            </motion.span>
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💻
            </motion.span>
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Convert Handwritten Notes to Digital Text
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Upload your handwritten notes and instantly convert them into editable text and downloadable files using advanced AI OCR technology.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold text-sm sm:text-lg hover:shadow-lg transition touch-none min-h-44px flex-1 xs:flex-none"
          >
            Try Now
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-lg font-bold text-sm sm:text-lg hover:shadow-lg transition touch-none min-h-44px flex-1 xs:flex-none"
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Process your notes in seconds' },
            { icon: '🎯', title: 'Highly Accurate', desc: 'AI-powered text extraction' },
            { icon: '📱', title: 'Fully Responsive', desc: 'Works on all devices' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative p-6 sm:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100 dark:border-purple-900/30 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
