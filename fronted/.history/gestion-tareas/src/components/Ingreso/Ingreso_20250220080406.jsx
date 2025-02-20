import React, { useState, FormEvent, ChangeEvent } from 'react';
import './Ingreso.css';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export interface LoginData {
  username: string;
  password: string;
}

interface RegistroData {
  nombre: string;
  email: string;
  password: string;
}

const Ingreso: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  });

  const [registroData, setRegistroData] = useState<RegistroData>({
    nombre: '',
    email: '',
    password: ''
  });

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegistroChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistroData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
    // Aquí implementarías la lógica de autenticación con axios
  };

  const handleRegistroSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Registro Data:', registroData);
    // Aquí implementarías la lógica de registro con axios
  };

  return (
    <div className="login-wrapper">
      <TabView>
        <TabPanel header="Iniciar Sesión">
          <div className="login-container">
            <form onSubmit={handleLoginSubmit} className="login-form">
              <h2 className="login-title">Iniciar Sesión</h2>
              <div className="input-group">
                <label htmlFor="username">Usuario</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="input-field"
                  required
                />
              </div>
              <button type="submit" className="login-button">Ingresar</button>
            </form>
          </div>
        </TabPanel>
        <TabPanel header="Registro">
          <div className="login-container">
            <form onSubmit={handleRegistroSubmit} className="login-form">
              <h2 className="login-title">Registro</h2>
              <div className="input-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={registroData.nombre}
                  onChange={handleRegistroChange}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={registroData.email}
                  onChange={handleRegistroChange}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="registro-password">Contraseña</label>
                <input
                  id="registro-password"
                  type="password"
                  name="password"
                  value={registroData.password}
                  onChange={handleRegistroChange}
                  className="input-field"
                  required
                />
              </div>
              <button type="submit" className="login-button">Registrarse</button>
            </form>
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Ingreso;