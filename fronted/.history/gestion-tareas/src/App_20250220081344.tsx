import React from 'react';
import './App.css';


const Ingreso = React.lazy(() => import('./components/Ingreso/Ingreso'));

function App() {
  return (
    <div className="App">
      <Ingreso />
    </div>
  );
}

export default App;