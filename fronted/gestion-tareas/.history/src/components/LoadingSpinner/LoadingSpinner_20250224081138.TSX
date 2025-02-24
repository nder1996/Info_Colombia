
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner">
      <div></div>   
      <div></div>    
      <div></div>    
      <div></div>
    </div>
  );
};

export default LoadingSpinner;