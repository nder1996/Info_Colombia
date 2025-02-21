import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { GestionTareasService, TareasResponse } from 'services/gestionTareasService';
import { format } from 'path';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';


export default function GestionTareas() {
  // Hardcoded customer data
  const [tareas, setTareas] = useState<TareasResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTareas = async () => {
      setLoading(true);
      const data = await GestionTareasService.obtenerTareas();
      if (data) {
        setTareas(data);
      }
      setLoading(false);
    };

    fetchTareas();
  }, []);

  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  const estadoTemplate = (rowData: TareasResponse) => {
    const severity =
      rowData.estadoTarea.nombre === 'PENDIENTE' ? 'warning' :
        rowData.estadoTarea.nombre === 'EN_PROGRESO' ? 'info' :
          rowData.estadoTarea.nombre === 'COMPLETADA' ? 'success' : 'secondary';

    return <Badge value={rowData.estadoTarea.nombre} severity={severity} />;
  };

  const handleEdit = (id: number) => {
    console.log(`Editing task ${id}`);
    // Edit logic
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting task ${id}`);
    // Delete logic
  };

  const buttonEditar = (rowData: TareasResponse) => {
    return <Button label="Editar" className="p-button-sm" severity="warning"
      onClick={() => handleEdit(rowData.id)} />;
  };

  const buttonEliminar = (rowData: TareasResponse) => {
    return <Button label="Eliminar" className="p-button-sm" severity="danger"
      onClick={() => handleDelete(rowData.id)} />;
  };

  return (
    <div className="card" style={{
      width: '100%',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <DataTable
        value={tareas}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ width: '100%' }}
        scrollable
        scrollHeight="400px"
        loading={loading}
        emptyMessage="No se encontraron tareas">

        <Column field="id" header="ID" style={{ width: '5%' }}></Column>
        <Column field="titulo" header="Título" style={{ width: '20%' }}></Column>
        <Column field="descripcion" header="Descripción" style={{ width: '25%' }}></Column>
        <Column field="estadoTarea.nombre" header="Estado" body={estadoTemplate} style={{ width: '15%' }}></Column>
        <Column field="usuario.nombre" header="Asignado a" style={{ width: '15%' }}></Column>
        <Column
          field="createAt"
          header="Fecha Creación"
          body={(rowData) => formatDate(rowData.createAt)}
          style={{ width: '10%' }}
        ></Column>
        <Column
          field="vencimientoTarea"
          header="Vencimiento"
          body={(rowData) => formatDate(rowData.vencimientoTarea)}
          style={{ width: '10%' }}
        ></Column>
        <Column body={buttonEditar} header="Acción" style={{ width: '10%' }}></Column>
        <Column body={buttonEliminar} header="Acción" style={{ width: '10%' }}></Column>
      </DataTable>
    </div>
  );
}


