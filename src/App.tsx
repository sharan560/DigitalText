import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { ConverterPage } from './pages/ConverterPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'converter'>('landing');

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Toaster position="top-right" />
      <Header />

      <main className="flex-1">
        {currentPage === 'landing' ? (
          <LandingPage onGetStarted={() => setCurrentPage('converter')} />
        ) : (
          <ConverterPage />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
