import React, { /*ChangeEvent,*/ FormEvent, useState } from 'react';
import './InicioSession.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}
const InicioSession = () => {





 /* const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: keyof FormData, value: string) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} es requerido`;
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name as keyof FormData, value)
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name as keyof FormData, formData[name as keyof FormData])
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newErrors: FormErrors = {
      username: validateField('username', formData.username),
      password: validateField('password', formData.password)
    };
    setErrors(newErrors);
    setTouched({ username: true, password: true });
  };

  const header = (
    <div className="login-header">
      <h2>Bienvenido aL Sistema</h2>
      <p>GESTOR DE TAREAS</p>
    </div>
  );
*/
  return (
    {
      /*
        <div className="login-container">
    <Card className="login-card" header={header}>
      <form onSubmit={handleSubmit} className="p-fluid">
        <div className="field">
          <label htmlFor="username">Username</label>
          <span className="p-input-icon-left">
            <i className="pi pi-user" />
            <InputText
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classNames({ 'p-invalid': errors.username })}
              placeholder="Ingrese su usuario"
            />
          </span>
          {errors.username && <small className="p-error">{errors.username}</small>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <span className="p-input-icon-left">
            <i className="pi pi-lock" />
            <InputText
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classNames({ 'p-invalid': errors.password })}
              placeholder="Ingrese su contraseña"
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
      */
    }
  
  );
};

export default InicioSession;