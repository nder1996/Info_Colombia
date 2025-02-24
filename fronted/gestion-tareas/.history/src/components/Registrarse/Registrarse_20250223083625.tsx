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
    <div className="flex flex-col items-center p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Crear Cuenta</h2>
      
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <InputText
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            placeholder="Ingresa tu nombre completo"
            className="p-inputtext-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <InputText
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="correo@ejemplo.com"
            className="p-inputtext-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <Password
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Ingresa tu contraseña"
            toggleMask
            className="p-password-sm w-full"
            inputClassName="w-full"
            feedback={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Registrarse;