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
import { Navigate, useNavigate } from 'react-router-dom';
import { setTimeout } from 'timers/promises';
import { AuthService } from 'src/services/AuthService';
import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';
import { useToast } from 'src/context/ToastContext';



interface FormInputs {
  username: string;
  password: string;
 }
 

const schema = yup.object({
  username: yup
    .string()
    .required('El email es requerido')
    .email('Ingrese un email válido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
 });
 
 const InicioSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setUseAuthState = useAuthStore((state) => state.setAuth);
  const Auth = useAuthStore((state) => state.Auth);
  const navigate = useNavigate();
  const { mostrarExito, mostrarError } = useToast();
 
  const { register, handleSubmit, formState: { errors } , setValue} = useForm<FormInputs>({
    resolver: yupResolver(schema)
  });


  const onSubmit = async (data: FormInputs) => {
    try {
      setIsLoading(true);
      await SesionServices.login(data.username, data.password);
      const token = AuthService.getToken();
      if (!token || token.trim() === "") {
        mostrarError('Error', 'Usuario o contraseña inválidos');
        return;
      }
      setIsLoading(false);
      setUseAuthState({
        token: token,
        isAuthenticated: true,
        username: data.username
      });
      mostrarExito('¡Bienvenido!', `Bienvenido ${data.username}`);
    } catch (error: any) {
      mostrarError('Error', 'Error al procesar el inicio de sesión');
    }
  };



  if (Auth.isAuthenticated) {
    return <Navigate to="/GestionTareas" />;
  }

  return (
    <div className="login-container">
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
              onChange={(e) => setValue('username', e.target.value)}
            />
            {errors.username && (
              <p className="p-error">{errors.username.message}</p>
            )}
          </div>

          <div className="field">
            <label>Contraseña</label>
            <Password toggleMask
              type="password"
              {...register('password')}
              className={errors.password ? 'p-invalid' : ''}
              onChange={(e) => setValue('password', e.target.value)}
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
        <div className="text-align" style={{ marginTop: '1rem' ,border:'1px solid red'}}>
          <a
            className="register-link flex items-center gap-2 group"
            onClick={() => navigate('/registro')}
          >
            <i className="pi pi-user-plus register-icon" />
            <span>Crear cuenta</span>
          </a>
        </div>
      </Card>

    </div>
  );
};

export default InicioSession;