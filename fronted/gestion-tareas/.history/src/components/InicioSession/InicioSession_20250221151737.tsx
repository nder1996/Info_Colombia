import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Ingreso.css';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
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

  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Login:', formData);
    } else {
      setErrors(newErrors);
    }
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const header = (
    <div className="text-center mb-5">
      <h2 className="text-2xl font-bold m-0">Sign In</h2>
      <p className="text-600">Enter your credentials</p>
    </div>
  );


  return (
    <div className="flex justify-content-center">
      <Card className="w-full md:w-25rem" header={header}>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field mb-4">
            <label htmlFor="username" className="block font-medium mb-2">Username</label>
            <span className="p-input-icon-left w-full">
              <i className="pi pi-user" />
              <InputText
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className={classNames({ 'p-invalid': errors.username })}
              />
            </span>
            {errors.username && <small className="p-error block mt-2">{errors.username}</small>}
          </div>

          <div className="field mb-4">
            <label htmlFor="password" className="block font-medium mb-2">Password</label>
            <span className="p-input-icon-left w-full">
              <i className="pi pi-lock" />
              <InputText
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={classNames({ 'p-invalid': errors.password })}
              />
            </span>
            {errors.password && <small className="p-error block mt-2">{errors.password}</small>}
          </div>

          <Button 
            type="submit" 
            label="Sign In"
            icon="pi pi-sign-in"
            className="w-full"
          />
        </form>
      </Card>
    </div>
  );
};

export default InicioSession;