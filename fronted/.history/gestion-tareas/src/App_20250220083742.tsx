import React, { useEffect, useState } from 'react';
import { GestionTareasService } from '../../services/gestionTareasService';

function GestionTareas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        // Test Axios first to ensure connectivity
        await GestionTareasService.testAxios();
        
        // Get actual tasks
        const tareasData = await GestionTareasService.obtenerTareas();
        console.log('Tareas cargadas:', tareasData);
        if (tareasData) {
          setTareas(tareasData);
        } else {
          setError('No se pudieron cargar las tareas');
        }
      } catch (err) {
        setError('Error al cargar las tareas: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarTareas();
  }, []);

  if (loading) return <div>Cargando tareas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Gestión de Tareas</h1>
      <div className="tareas-container">
        {tareas.map(tarea => (
          <div key={tarea.id} className="tarea-item">
            <h3>{tarea.titulo}</h3>
            <p>{tarea.descripcion}</p>
            <p>Estado: {tarea.estadoTarea.nombre}</p>
            <p>Asignado a: {tarea.usuario.nombre}</p>
            <p>Vencimiento: {new Date(tarea.vencimientoTarea).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GestionTareas;