import React, { useRef, useState } from 'react';
import './Registrarse.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';


const Registrarse = () => {
  const toastRef = useRef<Toast>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

 

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Crear Cuenta</h2>
          <p>Comienza tu viaje con nosotros</p>
        </div>
        
        <form className="auth-form">
          <div className="form-group">
            <span className="p-float-label">
              <InputText
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="form-input"
              />
              <label htmlFor="fullName">Nombre completo</label>
            </span>
          </div>

          <div className="form-group">
            <span className="p-float-label">
              <InputText
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="form-input"
              />
              <label htmlFor="email">Correo electrónico</label>
            </span>
          </div>

          <div className="form-group">
          <label>Contraseña</label>
      <Password
        toggleMask
        type="password"
        className={`w-full ${errors.password ? 'p-invalid' : ''}`}
        {...register('password')}
      />
      {errors.password && (
        <p className="p-error">{errors.password.message}</p>
      )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;