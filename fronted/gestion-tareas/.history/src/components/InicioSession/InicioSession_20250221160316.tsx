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

  const onSubmit = (data: any) => {
    console.log(data);
  };

  
  return (
    <div className="login-container">
    <Card className="login-card">
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="field">
          <label>Email</label>
          <InputText
            {...register('username')}
            className={errors.username ? 'p-invalid' : ''}
            onChange={(e) => {
              register('username').onChange(e);
            }}
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
            onChange={(e) => {
              register('password').onChange(e);
            }}
          />
          {errors.password && (
            <small className="p-error">{errors.password.message}</small>
          )}
        </div>

        <Button 
          type="submit" 
          label="Iniciar Sesión"
          disabled={Object.keys(errors).length > 0} 
        />
      </form>
    </Card>
  </div>

  
  );
};

export default InicioSession;