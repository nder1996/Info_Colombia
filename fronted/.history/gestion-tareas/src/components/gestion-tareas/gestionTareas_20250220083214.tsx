import React, { useEffect, useState } from 'react';
// import { GestionTareasService } from '../../services/gestionTareasService';

function GestionTareas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        // Test Axios first to ensure connectivity
        // await GestionTareasService.testAxios();

        // Simulate fetching tasks (replace with actual API call)
        const tareasData = [
          {
            id: 1,
            titulo: 'Tarea 1',
            descripcion: 'Descripción de la tarea 1',
            estadoTarea: { nombre: 'Pendiente' },
            usuario: { nombre: 'Juan Pérez' },
            vencimientoTarea: '2023-12-31',
          },
          {
            id: 2,
            titulo: 'Tarea 2',
            descripcion: 'Descripción de la tarea 2',
            estadoTarea: { nombre: 'Completada' },
            usuario: { nombre: 'María López' },
            vencimientoTarea: '2024-01-15',
          },
        ];

        console.log('Tareas cargadas:', tareasData);

        if (tareasData && tareasData.length > 0) {
          setTareas(tareasData);
        } else {
          setError('No se pudieron cargar las tareas');
        }
      } catch (err) {
        setError(`Error al cargar las tareas: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    cargarTareas();
  }, []);

  if (loading) {
    return <div>Cargando tareas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Gestión de Tareas</h1>
      <div className="tareas-container">
        {tareas.map((tarea) => (
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