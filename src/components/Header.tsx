import { motion } from 'framer-motion';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-purple-100 dark:border-purple-900/30 w-full"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 cursor-pointer min-w-0 flex-1 sm:flex-none"
        >
          <span className="text-xl sm:text-2xl flex-shrink-0">✍️</span>
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent truncate">
            Text Converter
          </h1>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2.5 sm:p-2 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 hover:from-purple-200 hover:to-blue-200 dark:hover:from-purple-800/50 dark:hover:to-blue-800/50 transition-all duration-300 flex-shrink-0 touch-none shadow-md hover:shadow-lg"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <MdLightMode className="text-lg sm:text-xl text-yellow-500" />
          ) : (
            <MdDarkMode className="text-lg sm:text-xl text-gray-700" />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
};
