import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center gap-3 sm:gap-4 px-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-purple-200 dark:border-purple-900 border-t-purple-600 rounded-full flex-shrink-0"
      />
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base text-center"
      >
        Extracting text using AI OCR…
      </motion.p>
    </motion.div>
  );
};
