import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { MdCloudUpload } from 'react-icons/md';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  loading: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, loading }) => {
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [preview, setPreview] = React.useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    onImageSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
        Upload Image
      </h2>

      {!preview ? (
        <motion.div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          animate={{ scale: isDragActive ? 1.02 : 1 }}
          className={`flex-1 border-2 border-dashed rounded-3xl p-4 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm shadow-lg
            ${isDragActive
              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 shadow-xl'
              : 'border-gray-300 dark:border-purple-800/40 bg-white/50 dark:bg-gray-800/50 hover:border-purple-400 dark:hover:border-purple-600'
            }`}
        >
          <MdCloudUpload className="text-5xl sm:text-6xl text-purple-400 dark:text-purple-500 mb-4 sm:mb-6 flex-shrink-0 animate-pulse" />
          <p className="text-gray-700 dark:text-gray-300 text-center mb-2 font-semibold text-base sm:text-lg">
            Drag and drop your image here
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 font-medium">
            or
          </p>
          <label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileInput}
              disabled={loading}
              className="hidden"
            />
            <span className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl cursor-pointer font-semibold transition-all duration-300 disabled:opacity-50 text-sm sm:text-base touch-none min-h-44px shadow-lg hover:shadow-xl transform hover:scale-105">
              Browse Files
            </span>
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-3 sm:mt-4 text-center">
            Supported: JPG, PNG (Max 5MB)
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-64 sm:min-h-96 shadow-xl border border-purple-100 dark:border-purple-900/30"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}

      {preview && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPreview('')}
          disabled={loading}
          className="mt-3 sm:mt-4 w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 text-sm sm:text-base touch-none min-h-44px shadow-lg hover:shadow-xl"
        >
          Clear Image
        </motion.button>
      )}
    </motion.div>
  );
};
