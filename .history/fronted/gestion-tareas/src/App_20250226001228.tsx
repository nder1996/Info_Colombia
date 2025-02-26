import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import useAuthStore from './store/auth/useAuthStore';
import './services/InterceptorAuth';
import { ToastProvider, useToast } from './context/ToastContext';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { LanguageProvider } from './context/LanguageContext';
import NavbarIdioma from './components/navbar-idioma/navbar-idioma';



function App() {
  return (

    <LoadingProvider>
      <ToastProvider>
        <LanguageProvider>
          <div className="App">
            <BrowserRouter>
            <NavbarIdioma></NavbarIdioma>
              <AppRoutes />
            </BrowserRouter>
          </div>
        </LanguageProvider>
      </ToastProvider>
    </LoadingProvider>

  );
}

export default App;