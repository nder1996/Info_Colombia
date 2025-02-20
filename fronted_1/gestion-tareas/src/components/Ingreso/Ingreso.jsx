import React, { useState } from 'react';
import './Ingreso.css';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Ingreso = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [registroData, setRegistroData] = useState({
    nombre: '',
    password: '',
    email: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegistroChange = (e) => {
    const { name, value } = e.target;
    setRegistroData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
  };

  const handleRegistroSubmit = (e) => {
    e.preventDefault();
    console.log('Registro Data:', registroData);
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