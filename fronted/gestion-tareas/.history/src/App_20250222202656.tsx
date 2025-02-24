import React, { useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Toast } from 'primereact/toast';
import AppRoutes from './routes/AppRoutes';
import useAuthStore from './store/auth/useAuthStore';
import './services/InterceptorAuth';

function App() {
  const auth = useAuthStore((state) => state.Auth)
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;