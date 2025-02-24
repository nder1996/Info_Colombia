import React, { useEffect, useState } from 'react';
import './LoadingSpinner.css';
import '';

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      return loadingStore.subscribe(() => {
        setIsLoading(loadingStore.getState());
      });
    }, []);
  
    return (
      <>
        {children}
        {isLoading && <LoadingSpinner />}
      </>
    );
  };

export default LoadingSpinner;