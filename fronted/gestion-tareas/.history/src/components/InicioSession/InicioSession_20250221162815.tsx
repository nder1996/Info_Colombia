import React, { /*ChangeEvent,*/ FormEvent, useRef, useState } from 'react';
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
import { Toast } from 'primereact/toast';




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
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const watchAllFields = watch();
  const toastRef = useRef<Toast>(null);

  
  const onSubmit = (data: any) => {
    toastRef.current?.show({
      severity: 'success',
      summary: '¡Bienvenido a la App de Gestión de Tareas!',
      detail: `Bienvenido * ${data.username} *`,
      life: 3000
    });
    console.log(data);
  };

  return (
    <div className="login-container">
      <Toast ref={toastRef} />
      <Card className="login-card">
        <div className="login-header">
          <h2>¡Bienvenido!</h2>
          <p>Inicia sesión para continuar</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid form-inicio">
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
              <p className="p-error">{errors.username.message}</p>
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
              <p className="p-error">{errors.password.message}</p>
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