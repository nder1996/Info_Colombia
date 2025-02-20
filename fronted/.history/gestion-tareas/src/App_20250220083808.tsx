import React from 'react';
import './App.css';
//import Ingreso from './components/Ingreso/Ingreso';
import GestionTareas from './components/Ingreso/Ingreso';
function App() {
  return (
    <div className="App">
    <h1>hola mundo</h1>
    <GestionTareas />  {/* Asegúrate de no comentar esta línea */}
  </div>
  );
}

export default App;