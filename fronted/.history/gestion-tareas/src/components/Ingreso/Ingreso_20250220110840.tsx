import React, { useState } from 'react';
import './Ingreso.css';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AuthService } from 'services/AuthService';
import { useNavigate } from 'react-router-dom';
import GestionTareas from 'components/gestion-tareas/GestionTareas';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const Ingreso = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // const navigate = useNavigate();
  //const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [registroData, setRegistroData] = useState({
    nombre: '',
    password: '',
    email: ''
  });

  const handleLoginChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegistroChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setRegistroData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleLoginSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Esto es crucial - falta en tu código actual
    console.log('Login Data:', loginData);
    try {
      const response = await AuthService.login(loginData.username, loginData.password);
      const tokenString = response; // o response.accessToken, depende de tu API

      if (tokenString) {

        console.log("token string:", tokenString);

        setIsLoggedIn(true);

      }
      // Guardar el token
      //localStorage.setItem('token', tokenString);
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  };

  const handleRegistroSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

  };

  return (
    <div className="login-wrapper">
      {!isLoggedIn ? (
        // Contenido cuando NO está logueado
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
      ): (
          // Contenido cuando está logueado
        )}


      
    </div>
  );
};

export default Ingreso;