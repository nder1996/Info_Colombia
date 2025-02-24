import React, { useRef } from 'react';
import './Registrarse.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { SesionServices, usuarioRegister } from 'src/services/SesionServices';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/context/ToastContext';
import { traducciones } from 'src/i18n/traducciones';
import { Language } from 'src/i18n/types';
import { useLanguage } from 'src/context/LanguageContext';
import NavbarIdioma from '../navbar-idioma/navbar-idioma';

type FormData = {
  fullName: string;
  email: string;
  password: string;
};
const createValidationSchema = (t: typeof traducciones, language: Language) => yup.object({
  fullName: yup
    .string()
    .required(t[language].validaciones.requerido)
    .min(3, t[language].validaciones.longitudMinima.replace('{0}', '3'))
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, t[language].validaciones.soloLetras),
  email: yup
    .string()
    .required(t[language].validaciones.correoRequerido)
    .email(t[language].validaciones.correoInvalido),
  password: yup
    .string()
    .required(t[language].validaciones.contrasena.requerida)
    .min(8, t[language].validaciones.contrasena.longitudMinima)
    .matches(/[A-Z]/, t[language].validaciones.contrasena.mayuscula)
    .matches(/[a-z]/, t[language].validaciones.contrasena.minuscula)
    .matches(/[0-9]/, t[language].validaciones.contrasena.numero)
    .matches(/[^A-Za-z0-9]/, t[language].validaciones.contrasena.caracterEspecial)
});

const Registrarse = () => {
  const toastRef = useRef<Toast>(null);
  const navigate = useNavigate();
  const { mostrarExito, mostrarError, mostrarAdvertencia } = useToast();
  const { language } = useLanguage();
  const { autenticacion: texts } = traducciones[language];
  const schema = createValidationSchema(traducciones, language);
  const validationSchema = createValidationSchema(traducciones, language);
  const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      const user: usuarioRegister = {
        id: -1,
        nombre: data.fullName,
        email: data.email,
        password: data.password
      }
      const response = await SesionServices.registre(user);
      if (response && response.meta?.statusCode == 200) {
        mostrarExito('Nuevo Usuario Registrado', 'El usuario se ha guardado exitosamente');
        reset();
        navigate('/login');
        return
      }
      mostrarAdvertencia('Advertencia', 'Hubo un problema con el registro del usuario');
    } catch (error) {
      mostrarError('Error', 'Hubo un error al registrar el usuario');
    }
  };

  return (
    <div className="auth-container">
      <NavbarIdioma></NavbarIdioma>
      <Toast ref={toastRef} />
      <div className="auth-card">
        <div className="auth-header">
          <h2>{texts.registrarse}</h2>
          <p>{texts.comenzarViaje}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <span className="p-float-label">
              <InputText
                id="fullName"
                className={`form-input ${errors.fullName ? 'p-invalid' : ''}`}
                {...register('fullName')}
              />
              <label htmlFor="fullName">{texts.nombreCompleto}</label>
            </span>
            {errors.fullName && (
              <small className="p-error">{errors.fullName.message}</small>
            )}
          </div>

          <div className="form-group">
            <span className="p-float-label">
              <InputText
                id="email"
                type="email"
                className={`form-input ${errors.email ? 'p-invalid' : ''}`}
                {...register('email')}
                onChange={(e) => setValue('email', e.target.value)}
              />
              <label htmlFor="email">{texts.correo}</label>
            </span>
            {errors.email && (
              <small className="p-error">{errors.email.message}</small>
            )}
          </div>

          <div className="field w-full" style={{ width: '100%' }}>
            <span className="p-float-label w-full block">
              <label htmlFor="password">{texts.contrasena}</label>
              <Password
                id="password"
                toggleMask
                className="w-full block"
                feedback={false}
                placeholder="Ingresa tu contraseña"
                style={{ display: 'block', width: '100%' }}
                {...register('password')}
                onChange={(e) => setValue('password', e.target.value)}
              />

            </span>
            {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>

          <Button
            type="submit"
            label={texts.registrarse}
            icon="pi pi-user-plus"
            className="w-full"
          />

        </form>
        <Link to="/login" className="home-icon-link">
 <HomeIcon />
</Link>
      </div>
    </div>
  );
};

export default Registrarse;