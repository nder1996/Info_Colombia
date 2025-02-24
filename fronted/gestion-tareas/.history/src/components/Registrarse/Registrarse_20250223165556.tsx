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

const schema = yup.object({
  fullName: yup
    .string()
    .required('El nombre completo es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'El nombre solo puede contener letras'),

  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .email('Ingrese un correo electrónico válido')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Formato de correo inválido'),

  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una minúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial')
});

type FormData = yup.InferType<typeof schema>;

const Registrarse = () => {
  const toastRef = useRef<Toast>(null);
  const { register, handleSubmit, formState: { errors }, setValue , reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data: FormData) => {
    try {
      console.log("datos ingredados al sistemas : "+JSON.stringify(data));
      const user:usuarioRegister = {
        id: -1,
        nombre: data.fullName,
        email: data.email,
        password:data.password
      }
      const response = await SesionServices.registre(user);
      if(response && response.meta?.statusCode!=200 || response!=null){
        toastRef.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: response.meta?.message || 'Error en el registro'
        });
        return;
      }
      toastRef.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario registrado correctamente'
       });
       reset(); 
        

      //console.log("respuesta del sistema al crear un usuario : "+response);
     /* if(response && toastRef.current) {
        toastRef.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Registro completado'
        });
      }*/
      
    
    } catch (error) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al registrar'
      });
    }
  };

  return (
    <div className="auth-container">
      <Toast ref={toastRef} />
      <div className="auth-card">
        <div className="auth-header">
          <h2>Crear Cuenta</h2>
          <p>Comienza tu viaje con nosotros</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <span className="p-float-label">
              <InputText
                id="fullName"
                className={`form-input ${errors.fullName ? 'p-invalid' : ''}`}
                {...register('fullName')}
              />
              <label htmlFor="fullName">Nombre completo</label>
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
              <label htmlFor="email">Correo electrónico</label>
            </span>
            {errors.email && (
              <small className="p-error">{errors.email.message}</small>
            )}
          </div>

          <div className="field w-full" style={{ width: '100%' }}>
            <span className="p-float-label w-full block">
              <Password
                id="password"
                toggleMask
                pt={{
                  root: { className: 'w-full' },
                  input: { className: `w-full ${errors.password ? 'p-invalid' : ''}` }
                }}
                className="w-full block"
                inputClassName="w-full"
                feedback={false}
                style={{ display: 'block', width: '100%' }}
                {...register('password')}
                onChange={(e) => setValue('password', e.target.value)}
              />
              <label htmlFor="password">Contraseña</label>
            </span>
            {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>

          <Button
            type="submit"
            label="Crear cuenta"
            icon="pi pi-user-plus"
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default Registrarse;