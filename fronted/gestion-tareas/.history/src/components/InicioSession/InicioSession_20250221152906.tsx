import React, { ChangeEvent, FormEvent, useState } from 'react';
import './InicioSession.css';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AuthService } from 'services/AuthService';
import { useNavigate } from 'react-router-dom';
import GestionTareas from 'components/gestion-tareas/GestionTareas';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsuarioService } from 'services/UsuarioService';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';




interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}
const InicioSession = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
  };




  const header = (
    <div className="login-header">
      <h2>Welcome Back</h2>
      <p>Please sign in to your account</p>
    </div>
  );

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <div className="input-container">
              <UserIcon className="input-icon" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className={errors.username ? 'error' : ''}
                placeholder="Enter your username"
              />
            </div>
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <LockIcon className="input-icon" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-button">Sign in</button>
        </form>

        <div className="signup-container">
          <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default InicioSession;