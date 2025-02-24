import React, { useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import useAuthStore from './store/auth/useAuthStore';
import './services/InterceptorAuth';
import { ToastProvider } from './context/ToastContext';

function App() {
  const auth = useAuthStore((state) => state.Auth)
  return (
    <ToastProvider>
        <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
    </ToastProvider>
  );
}

export default App;