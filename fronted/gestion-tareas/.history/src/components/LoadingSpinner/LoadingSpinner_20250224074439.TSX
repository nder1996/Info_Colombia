import React, { useEffect, useState } from 'react';
import './LoadingSpinner.css';
import '/loadin';

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    private isLoading: boolean = false;
    private listeners: (() => void)[] = [];
  
    subscribe(listener: () => void) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  
    show() {
      this.isLoading = true;
      this.listeners.forEach(listener => listener());
    }
  
    hide() {
      this.isLoading = false;
      this.listeners.forEach(listener => listener());
    }
  
    getState() {
      return this.isLoading;
    }
  }

export default LoadingSpinner;