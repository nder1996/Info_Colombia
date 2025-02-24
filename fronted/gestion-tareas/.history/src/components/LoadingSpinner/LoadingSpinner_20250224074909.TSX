import React, { useEffect, useState } from 'react';
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return loadingSt.subscribe(() => {
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