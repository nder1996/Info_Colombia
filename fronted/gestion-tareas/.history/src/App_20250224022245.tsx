import React, { useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import useAuthStore from './store/auth/useAuthStore';
import './services/InterceptorAuth';
import { ToastProvider } from './context/ToastContext';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { LanguageProvider } from './context/LanguageContext';



function App() {
  const auth = useAuthStore((state) => state.Auth)
  return (
    <ToastProvider>
      <LanguageProvider>
        <div className="App">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </LanguageProvider>
    </ToastProvider>
  );
}

export default App;