import React from 'react';
import './App.css';
//import Ingreso from './components/Ingreso/Ingreso';
//import Ingreso from './components/Ingreso/Ingreso';
//import GestionTarea from './components/gestion-tareas/GestionTareas';
import { Toast } from 'primereact/toast';
import InicioSession from './components/InicioSession/InicioSession';

function App() {
  return (
    <div className="App">
       <Toast ref={toast} />
    <InicioSession />  {/* Asegúrate de no comentar esta línea */}
  </div>
  );
}

export default App;