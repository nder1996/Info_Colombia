import React , { useRef } from 'react';
import './App.css';
import { Toast } from 'primereact/toast';
import InicioSession from './components/InicioSession/InicioSession';

function App() {
  const toast = useRef<Toast>(null);

  const show = () => {
    toast.current?.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  };

  return (
    <div className="App">
      <Toast ref={toast} />
      <InicioSession />
    </div>
  );
}


export default App;