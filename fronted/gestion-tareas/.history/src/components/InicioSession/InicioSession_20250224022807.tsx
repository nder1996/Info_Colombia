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
import NavbarIdioma from '../navbar-idioma/navbar-idioma';
import { useLanguage } from 'src/context/LanguageContext';
import { traducciones } from 'src/i18n/traducciones';



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

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormInputs>({
    resolver: yupResolver(schema)
  });
  const { language } = useLanguage();
  const t = traducciones[language];

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
      <NavbarIdioma></NavbarIdioma>
      <Card className="login-card">
        <div className="login-header">
          <h2>{t.autenticacion.bienvenido}</h2>
          <p>{t.autenticacion.iniciarSesion}</p>
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
            <Password
              {...register('password')}
              className={errors.password ? 'p-invalid' : ''}
              onChange={(e) => setValue('password', e.target.value)}
              feedback={false}
              toggleMask
            />
              {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>
          <Button
            type="submit"
            label={isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            icon={isLoading ? 'pi pi-spinner pi-spin' : 'pi pi-sign-in'}
          />
        </form>
        <div className="register-section">
          <p className="register-text">¿No tienes una cuenta?</p>
          <a className="register-link" onClick={() => navigate('/registro')}>
            <i className="pi pi-user-plus register-icon" />
            <span>Crear cuenta</span>
          </a>
        </div>
      </Card>

    </div>
  );
};

export default InicioSession;