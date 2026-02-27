import React, { createContext, useContext, useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  timestamp: number;
  fileName: string;
  text: string;
  preview: string;
}

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('ocrHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ocrHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setHistory([newItem, ...history.slice(0, 9)]);
  };

  const clearHistory = () => setHistory([]);

  const removeFromHistory = (id: string) => {
    setHistory(history.filter(item => item.id !== id));
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory, removeFromHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within HistoryProvider');
  return context;
};
