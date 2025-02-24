import React, { useState } from 'react';
import './Ingreso.css';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Registrarse from '../Registrarse/Registrarse';
import InicioSession from '../InicioSession/InicioSession';
import NavbarIdioma from '../navbar-idioma/navbar-idioma';

const Ingreso = () => {


  return (
    <div className="login-wrapper">
      <NavbarIdioma></NavbarIdioma>
      <TabView>
        <TabPanel header="Iniciar Sesión">
          <div className="login-container">
            <InicioSession></InicioSession>
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