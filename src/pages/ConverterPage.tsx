import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdMenu } from 'react-icons/md';
import { ImageUploader } from '../components/ImageUploader';
import { ResultPanel } from '../components/ResultPanel';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { HistorySidebar } from '../components/HistorySidebar';
import { useHistory } from '../context/HistoryContext';
import type { HistoryItem } from '../context/HistoryContext';
import { ocrApi } from '../utils/api';
import toast from 'react-hot-toast';

export const ConverterPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const { addToHistory } = useHistory();

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setLoading(true);
    setProcessing(true);

    try {
      // Call the actual OCR API
      const response = await ocrApi.extractText(selectedFile);
      const extractedText = response.extracted_text;

      setText(extractedText);
      
      // Add to history
      addToHistory({
        fileName: selectedFile.name,
        text: extractedText,
        preview: extractedText.substring(0, 50) + '...',
      });

      toast.success('Text extracted successfully!');
    } catch (error) {
      console.error('OCR Error:', error);
      toast.error('Failed to extract text. Please try again.');
    } finally {
      setLoading(false);
      setProcessing(false);
    }
  };

  const handleSelectFromHistory = (item: HistoryItem) => {
    setText(item.text);
    setHistoryOpen(false);
    toast.success('Loaded from history');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-950/20 dark:to-blue-950/20 w-full"
    >
      {/* History Sidebar */}
      <HistorySidebar
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelectItem={handleSelectFromHistory}
      />

      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* History Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setHistoryOpen(!historyOpen)}
          className="mb-4 sm:mb-6 flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-purple-200 dark:border-purple-800/40 rounded-xl hover:shadow-lg transition-all duration-300 text-sm sm:text-base touch-none min-h-44px font-semibold text-gray-900 dark:text-white shadow-md"
        >
          <MdMenu className="text-lg flex-shrink-0" /> <span>History</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 auto-rows-max lg:auto-rows-auto">
          {/* Left Panel - Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-auto min-h-80 sm:min-h-96 lg:h-full lg:min-h-96"
          >
            <ImageUploader onImageSelect={handleImageSelect} loading={loading} />
          </motion.div>

          {/* Right Panel - Result */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-auto min-h-80 sm:min-h-96 lg:h-full lg:min-h-96 flex flex-col"
          >
            {processing ? (
              <div className="flex-1 flex items-center justify-center min-h-80 sm:min-h-96">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <ResultPanel
                  text={text}
                  onTextChange={setText}
                  disabled={loading}
                />

                {selectedFile && !text && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConvert}
                    disabled={loading || !selectedFile}
                    className="mt-3 sm:mt-4 w-full px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all duration-300 disabled:opacity-50 text-sm sm:text-base touch-none min-h-44px shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    Convert to Text
                  </motion.button>
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* Info Section */}
        {!text && !selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {[
              { icon: '📤', title: 'Upload', desc: 'Select or drag your image' },
              { icon: '⚙️', title: 'Process', desc: 'AI OCR extracts text' },
              { icon: '💾', title: 'Download', desc: 'Get your text or PDF' },
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-5 sm:p-7 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 dark:border-purple-900/30 group"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base sm:text-lg">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
