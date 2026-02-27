import React from 'react';
import { motion } from 'framer-motion';
import { MdClose, MdDelete } from 'react-icons/md';
import { useHistory } from '../context/HistoryContext';
import type { HistoryItem } from '../context/HistoryContext';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: HistoryItem) => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onClose, onSelectItem }) => {
  const { history, clearHistory, removeFromHistory } = useHistory();

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 touch-none"
        />
      )}

      <motion.div
        initial={{ x: -360 }}
        animate={{ x: isOpen ? 0 : -360 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-72 sm:w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto flex flex-col border-r border-purple-200 dark:border-purple-900/30"
      >
        <div className="p-4 sm:p-5 border-b border-purple-200 dark:border-purple-900/30 flex justify-between items-center flex-shrink-0 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">History</h3>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2.5 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg touch-none min-h-44px transition-colors duration-300"
            aria-label="Close history"
          >
            <MdClose className="text-lg" />
          </motion.button>
        </div>

        <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <div className="text-4xl mb-3 opacity-50">📄</div>
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No history yet</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Your conversions will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 4, scale: 1.02 }}
                  onClick={() => onSelectItem(item)}
                  className="p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl cursor-pointer hover:from-purple-100 hover:to-blue-100 dark:hover:from-gray-700 dark:hover:to-gray-700/50 transition-all duration-300 group active:scale-95 shadow-sm hover:shadow-md border border-transparent hover:border-purple-200 dark:hover:border-purple-800/40"
                >
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                    {item.fileName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5 sm:mt-1">
                    {item.preview}
                  </p>
                  <div className="flex justify-between items-center mt-1 sm:mt-1.5">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(item.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition text-red-600 hover:text-red-700 flex items-center gap-1 text-xs px-2 py-1 hover:bg-red-50 dark:hover:bg-gray-600 rounded touch-none"
                    >
                      <MdDelete className="text-sm" /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearHistory}
            className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-t-none rounded-b-xl font-semibold transition-all duration-300 border-t border-red-700 flex-shrink-0 touch-none min-h-44px shadow-lg"
          >
            Clear All
          </motion.button>
        )}
      </motion.div>
    </>
  );
};
