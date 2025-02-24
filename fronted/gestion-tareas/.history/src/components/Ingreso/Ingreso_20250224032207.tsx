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