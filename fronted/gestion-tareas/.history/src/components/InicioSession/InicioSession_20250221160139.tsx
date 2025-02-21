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
import { useForm } from 'react-hook-form';


interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

const schema = yup.object({
  username: yup
    .string()
    .required('El email es requerido')
    .email('Ingrese un email válido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[0-9]/, 'Debe contener un número')
    .matches(/[A-Z]/, 'Debe contener una mayúscula')
    .matches(/[a-z]/, 'Debe contener una minúscula')
    .matches(/[!@#$%^&*]/, 'Debe contener un carácter especial')
});

const InicioSession = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  





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
    <div className="login-container">
    <Card className="login-card">
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="field">
          <label>Email</label>
          <InputText
            {...register('username')}
            className={errors.username ? 'p-invalid' : ''}
          />
          {errors.username && (
            <small className="p-error">{errors.username.message}</small>
          )}
        </div>

        <div className="field">
          <label>Contraseña</label>
          <InputText
            type="password"
            {...register('password')}
            className={errors.password ? 'p-invalid' : ''}
          />
          {errors.password && (
            <small className="p-error">{errors.password.message}</small>
          )}
        </div>

        <Button type="submit" label="Iniciar Sesión" />
      </form>
    </Card>
  </div>

  
  );
};

export default InicioSession;