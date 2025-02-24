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
    const [isLoading, setIsLoading] = useState(false);
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
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
              />
              <label htmlFor="email">Correo electrónico</label>
            </span>
          </div>

          <div className="field w-full" style={{ width: '100%' }}>
            <span className="p-float-label w-full block">
              <Password
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                toggleMask
                pt={{
                  root: { className: 'w-full' },
                  input: { className: 'w-full' }
                }}
                className="w-full block"
                inputClassName="w-full"
                feedback={false}
                style={{ display: 'block', width: '100%' }}
              />
              <label htmlFor="password">Contraseña</label>
            </span>
          </div>
                     <Button
                            type="submit"
                            label={isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            icon={isLoading ? 'pi pi-spinner pi-spin' : 'pi pi-sign-in'}
                          />


        </form>
      </div>
    </div>
  );
};

export default Registrarse;