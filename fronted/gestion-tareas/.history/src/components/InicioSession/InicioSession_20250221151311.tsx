import React, { useState } from 'react';
import './Ingreso.css';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AuthService } from 'services/AuthService';
import { useNavigate } from 'react-router-dom';
import GestionTareas from 'components/gestion-tareas/GestionTareas';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsuarioService } from 'services/UsuarioService';


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


  


  return (
    <div className="login-wrapper">
      <h1>hola mundo</h1>
    </div>
  );
};

export default InicioSession;