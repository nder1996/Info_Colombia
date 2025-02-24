import React, { useState } from 'react';
import './Ingreso.css';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Registrarse from '../Registrarse/Registrarse';

const Ingreso = () => {
 

  return (
    <div className="login-wrapper">
        <TabView>
          <TabPanel header="Iniciar Sesión">
            <div className="login-container">
            <Registrarse></Registrarse>
            </div>
          </TabPanel>
          <TabPanel header="Registro">
            <div className="login-container">
            <Registrarse></Registrarse>
            </div>
          </TabPanel>
        </TabView>
   
    </div>
  );
};

export default Ingreso;