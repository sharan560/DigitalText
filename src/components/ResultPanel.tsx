import React from 'react';
import { motion } from 'framer-motion';
import { MdContentCopy, MdDownload, MdDelete } from 'react-icons/md';
import { copyToClipboard, downloadAsPDF } from '../utils/pdfGenerator';
import toast from 'react-hot-toast';

interface ResultPanelProps {
  text: string;
  onTextChange: (text: string) => void;
  disabled: boolean;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ text, onTextChange, disabled }) => {
  const wordCount = text.trim().split(/\s+/).filter(w => w).length;
  const charCount = text.length;

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      toast.success('Copied to clipboard!');
    } else {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    downloadAsPDF(text, 'converted-text.txt');
    toast.success('Downloaded successfully!');
  };

  const handleClear = () => {
    onTextChange('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
        Converted Text
      </h2>

      <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl border border-purple-100 dark:border-purple-900/30 p-4 sm:p-6 mb-3 sm:mb-4 flex flex-col min-h-64 sm:min-h-96 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          disabled={disabled}
          placeholder="Your extracted text will appear here..."
          className="flex-1 w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none resize-none font-mono text-sm sm:text-base leading-relaxed focus:placeholder-gray-300 dark:focus:placeholder-gray-600 transition-all"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-2xl mb-3 sm:mb-4 text-xs sm:text-sm border border-purple-100 dark:border-purple-900/30">
        <div className="flex gap-3 sm:gap-4 text-gray-600 dark:text-gray-400 flex-wrap">
          <span>📝 Words: <strong className="text-gray-900 dark:text-white">{wordCount}</strong></span>
          <span>🔤 Characters: <strong className="text-gray-900 dark:text-white">{charCount}</strong></span>
        </div>
      </div>

      <div className="flex gap-2 flex-col xs:flex-row flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          disabled={!text || disabled}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm touch-none flex-1 xs:flex-none min-h-44px shadow-lg hover:shadow-xl"
        >
          <MdContentCopy className="text-lg flex-shrink-0" /> <span>Copy</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={!text || disabled}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm touch-none flex-1 xs:flex-none min-h-44px shadow-lg hover:shadow-xl"
        >
          <MdDownload className="text-lg flex-shrink-0" /> <span>Download</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClear}
          disabled={!text || disabled}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm touch-none flex-1 xs:flex-none min-h-44px shadow-lg hover:shadow-xl"
        >
          <MdDelete className="text-lg flex-shrink-0" /> <span>Clear</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
