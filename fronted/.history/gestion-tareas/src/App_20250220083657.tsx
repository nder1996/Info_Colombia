import React from 'react';
import './App.css';
//import Ingreso from './components/Ingreso/Ingreso';
import GestionTareas from './components/gestion-tareas/gestionTareas.tsx';
function App() {
  return (
    <div className="App">
    <h1>hola mundo</h1>
    <GestionTareas />  {/* Asegúrate de no comentar esta línea */}
  </div>
  );
}

export default App;