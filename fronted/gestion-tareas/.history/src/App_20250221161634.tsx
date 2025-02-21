import React , { useRef }from 'react';
import './App.css';
//import Ingreso from './components/Ingreso/Ingreso';
//import Ingreso from './components/Ingreso/Ingreso';
//import GestionTarea from './components/gestion-tareas/GestionTareas';
import { Toast } from 'primereact/toast';
import InicioSession from './components/InicioSession/InicioSession';

function App() {

  const toast = useRef(null);

  const show = () => {
      toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  };

  return (
    <div className="App">
       <Toast ref={toast} />
    <InicioSession />  {/* Asegúrate de no comentar esta línea */}
  </div>
  );
}

export default App;