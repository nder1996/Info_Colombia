import React, { useState } from 'react';
import './Ingreso.css';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
i
const Ingreso = () => {
 

  return (
    <div className="login-wrapper">
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
   
    </div>
  );
};

export default Ingreso;