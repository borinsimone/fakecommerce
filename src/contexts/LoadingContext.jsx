import { useState, createContext, useContext } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  const startLoading = (message = 'Loading...') => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const stopLoading = () => {
    // Aggiungi un piccolo delay per evitare flash rapidi
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const value = {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

// Hook per simulare il loading tra pagine
export const usePageLoading = () => {
  const { startLoading, stopLoading } = useLoading();

  const startPageTransition = (message = 'Loading page...') => {
    startLoading(message);
  };

  const finishPageTransition = () => {
    // Simula un loading minimo per UX migliore
    setTimeout(() => {
      stopLoading();
    }, 800);
  };

  return {
    startPageTransition,
    finishPageTransition,
  };
};
