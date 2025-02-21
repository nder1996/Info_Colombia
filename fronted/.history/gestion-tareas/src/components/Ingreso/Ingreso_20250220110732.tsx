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
     
      if(tokenString){
        
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
      <TabView>
        <TabPanel header="Iniciar Sesión">
          <div className="login-container">
            <form onSubmit={handleLoginSubmit} className="login-form">
              {/* Campos de login existentes */}
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={(e) => setLoginData({
                  ...loginData, 
                  username: e.target.value
                })}
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) => setLoginData({
                  ...loginData, 
                  password: e.target.value
                })}
              />
              <button type="submit">Iniciar Sesión</button>
            </form>
          </div>
        </TabPanel>
      </TabView>
    ) : (
      <div>
        {/* Contenido mostrado después del login */}
        <h2>Bienvenido, {loginData.username}</h2>
        <GestionTareas />
        <button onClick={() => {
          // Cerrar sesión
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }}>
          Cerrar Sesión
        </button>
      </div>
    )}
  </div>
);

}

export default Ingreso;