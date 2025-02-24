import React, { useRef, useState } from 'react';
import './InicioSession.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SesionServices } from 'src/services/SesionServices';
import useAuthStore from 'src/store/auth/useAuthStore';
import { Navigate } from 'react-router-dom';
import { setTimeout } from 'timers/promises';





const schema = yup.object({
  username: yup
    .string()
    .required('El email es requerido')
    .email('Ingrese un email válido'),
  password: yup
    .string()
    .required('La contraseña es requerida')

});

interface FormInputs {
  username: string;
  password: string;
}

const InicioSession = () => {
  const toastRef = useRef<Toast>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setUseAuthState = useAuthStore((state) => state.setAuth)
  const Auth = useAuthStore((state) => state.Auth)




  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });


  const onSubmit = async (data: FormInputs) => {
    try {
      setIsLoading(true);
      await SesionServices.login(data.username, data.password);
      await this.AA
      const token = ";"
      if (token) {
        //console.log("token string:", token);

        toastRef.current?.show({
          severity: 'success',
          summary: '¡Bienvenido a la App de Gestión de Tareas!',
          detail: `Bienvenido ${data.username}`,
          life: 3000
        });
        setIsLoading(false);
        //setTimeout(() => {
        setUseAuthState({ token: token, isAuthenticated: true, username: data.username })
        // }, 2000);

      }
    } catch (error) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error instanceof Error ? error.message : 'Error al iniciar sesión',
        life: 3000
      });
    }
  };

  if (Auth.isAuthenticated) {
    return <Navigate to="/GestionTareas" />;
  }

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

            />
            {errors.password && (
              <p className="p-error">{errors.password.message}</p>
            )}
          </div>

          {true && <p className="p-error">{true}</p>}

          <Button
            type="submit"
            label={isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            icon={isLoading ? 'pi pi-spinner pi-spin' : 'pi pi-sign-in'}
          />
        </form>
      </Card>
    </div>
  );
};

export default InicioSession;