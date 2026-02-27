import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-t from-purple-50 via-blue-50 to-transparent dark:from-purple-950/20 dark:via-blue-950/20 dark:to-transparent border-t border-purple-100 dark:border-purple-900/30 mt-12 sm:mt-16 w-full"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            Built for students & digital note conversion ✨
          </p>

          <div className="flex gap-4 sm:gap-6">
            <motion.a
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xl sm:text-2xl transition-all duration-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-none"
              aria-label="GitHub"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl sm:text-2xl transition-all duration-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 touch-none"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </motion.a>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-500 text-center sm:text-right">
            © 2026 Text Converter
          </p>
        </div>
      </div>
    </motion.footer>
  );
};
