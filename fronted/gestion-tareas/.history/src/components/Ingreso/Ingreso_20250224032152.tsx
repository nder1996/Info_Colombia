import React, { useState } from 'react';
import './Ingreso.css';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GestionTareas from '../gestion-tareas/GestionTareas';
import { UsuarioService } from 'src/services/UsuarioService';


//import { SessionService } from '@/services/Usuario/SessionService';


const Ingreso = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // const navigate = useNavigate();
  //const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [registroData, setRegistroData] = useState({
    id:-1,
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
    //console.log('Login Data:', loginData);
    try {
      const response = "await SessionService.login(loginData.username, loginData.password);"
      const tokenString = response;

      if (tokenString) {

       // console.log("token string:", tokenString);

        setIsLoggedIn(true);

      }
      // Guardar el token
      //localStorage.setItem('token', tokenString);
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  };

  const handleRegistroSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("entro al crear usuario : formCreate " + JSON.stringify(registroData));
    try {
      const response = "await UsuarioService.registre(registroData);"
      console.log('Registro exitoso:', response);
    } catch (error) {
      console.error('Error en el registro:', error);
      // Aquí puedes manejar el error como necesites
    }
  };

  return (
    <div className="login-wrapper">
      {!isLoggedIn ? (
        // Contenido cuando NO está logueado
        <TabView>
          <TabPanel header="Iniciar Sesión">
            <div className="login-container">
             
            </div>
          </TabPanel>
          <TabPanel header="Registro">
            <div className="login-container">
            
            </div>
          </TabPanel>
        </TabView>
      ) : (
        // Contenido cuando está logueado
        <div>
          <GestionTareas />
        </div>
      )}
    </div>
  );
};

export default Ingreso;