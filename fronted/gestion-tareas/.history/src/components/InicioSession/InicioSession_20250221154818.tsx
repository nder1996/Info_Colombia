import React, { /*ChangeEvent,*/ FormEvent, useState } from 'react';
import './InicioSession.css';
//import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
/*import { AuthService } from 'services/AuthService';
import { useNavigate } from 'react-router-dom';
import GestionTareas from 'components/gestion-tareas/GestionTareas';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsuarioService } from 'services/UsuarioService';
*/

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
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newErrors: FormErrors = {};
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
      <Card className="login-card" header={header}>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field">
           {
            /*
             <label htmlFor="username">Username</label>
            <span className="p-input-icon-left">
              <i className="pi pi-user" />
              <InputText
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className={classNames({ 'p-invalid': errors.username })}
                placeholder="Enter your username"
              />
            </span>
            {errors.username && <small className="p-error">{errors.username}</small>}
            */
           }
           
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <span className="p-input-icon-left">
              <i className="pi pi-lock" />
              <InputText
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={classNames({ 'p-invalid': errors.password })}
                placeholder="Enter your password"
              />
            </span>
            {errors.password && <small className="p-error">{errors.password}</small>}
          </div>

          <Button 
            type="submit" 
            label="Sign in"
            icon="pi pi-sign-in"
          />
        </form>

        <div className="signup-container">
          <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
        </div>
      </Card>
    </div>
  );
};

export default InicioSession;