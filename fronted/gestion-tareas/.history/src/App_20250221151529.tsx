import React from 'react';
import './App.css';
//import Ingreso from './components/Ingreso/Ingreso';
//import Ingreso from './components/Ingreso/Ingreso';
//import GestionTarea from './components/gestion-tareas/GestionTareas';

import Ingreso from './components/InicioSession';

function App() {
  return (
    <div  className="App">
    <Ingreso />  {/* Asegúrate de no comentar esta línea */}
  </div>
  );
}

export default App;