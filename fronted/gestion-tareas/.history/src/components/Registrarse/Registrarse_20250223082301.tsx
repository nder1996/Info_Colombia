import React, { useRef, useState } from 'react';
import './Registrarse.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';


const Registrarse = () => {
  const toastRef = useRef<Toast>(null);
 

  return (
    <div className="login-container">
          <Card>  
            <h1>Hola Registro</h1>
          </Card>
    </div>
  );
};

export default Registrarse;