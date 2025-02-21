import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { GestionTareasService, TareasResponse } from 'services/gestionTareasService';
import { LocalStarogeService } from 'services/localStorageService';
import { SummaryService } from 'services/SummaryServices';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import './GestionTareas.css';
import { Calendar } from 'primereact/calendar';
import { AuthService } from 'services/AuthService';

// Corregir interface del formData
interface FormData {
  titulo: string;
  descripcion: string;
  fechaVencimiento: Date;
  estado: number;
  usuarioAsignado: any;
}

export interface Tarea {
  titulo: string;
  descripcion: string;
  idUsuario: string;
  idEstadoTarea: number;
  vencimientoTarea: Date;
}

interface EstadoTarea {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
}
interface AuthData {
  token: string;
  username: string;
}
export default function GestionTareas() {
  // Hardcoded customer data
  const [tareas, setTareas] = useState<TareasResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState<EstadoTarea[]>([]);

  // Inicialización de formulario en React
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descripcion: '',
    fechaVencimiento: new Date(),
    estado: 1,
    usuarioAsignado: null
  });

  /*const estados = [
    { label: 'Pendiente', value: 'PENDIENTE' },
    { label: 'En Progreso', value: 'EN_PROGRESO' },
    { label: 'Completada', value: 'COMPLETADA' }
  ];
*/
  const handleInputChange = (e: any, field: string) => {
    setFormData({
      ...formData,
      [field]: e.target?.value || e.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
  };


  useEffect(() => {

    const fetchTareas = async () => {
      setLoading(true);
      const data = await GestionTareasService.obtenerTareas();
      if (data) {
        setTareas(data);
      }
      setLoading(false);
    };




    /*const fetchUsuarios = async () => {
      // lógica

    };*/


    /*  const fetchTareas = async () => {
        setLoading(true);
        const data = await GestionTareasService.obtenerTareas();
        if (data) {
          setTareas(data);
        }
        setLoading(false);
      };
  */
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

  const handleEdit = (id: TareasResponse) => {
    console.log(`Deleting task ` + JSON.stringify(id));
    // Edit logic
  };

  const handleDelete = (id: TareasResponse) => {
    console.log(`Deleting task ` + JSON.stringify(id));
    // Delete logic
  };

  const buttonEditar = (rowData: TareasResponse) => {
    return <Button label="Editar" className="p-button-sm" severity="warning"
      onClick={() => handleEdit(rowData)} />;
  };

  const buttonEliminar = (rowData: TareasResponse) => {
    return <Button label="Eliminar" className="p-button-sm" severity="danger"
      onClick={() => handleDelete(rowData)} />;
  };


  const agregarTarea = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("agregarTarea " + JSON.stringify(formData));
    const sessionInfo = AuthService.getInfoSession();

    try {
      
      console.log("valores del usuario : "+sessionInfo)
      const tareaRequest: Tarea = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        idEstadoTarea: formData.estado,
        idUsuario: sessionInfo.username,
        vencimientoTarea: formData.fechaVencimiento
      };
   

      //const sessionInfo:AuthData = JSON.parse(AuthService.getInfoSession());
      //console.log("Informacion session : "+JSON.stringify(sessionInfo.username));

      const response = await GestionTareasService.createTarea(tareaRequest);
      if (response) {
        // Refresh table data
        const data = await GestionTareasService.obtenerTareas();
        if (data) {
          setTareas(data);
        }
        setVisible(false); // Close modal
        // Reset form
        setFormData({
          titulo: '',
          descripcion: '',
          fechaVencimiento: new Date(),
          estado: 1,
          usuarioAsignado: null
        });
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };


  const handleAddTask = async () => {
    console.log("entro al metodo agregar")
    try {
      const data = await SummaryService.obtenerSummary();
      console.log("SummaryData: ", data)
      if (data) {
        console.log("SummaryData: ", data)
        setSummaryData(data);
        setVisible(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    console.log("salio del metodo agregar")
  };

  return (
    <div className="card" style={{
      width: '100%',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>

      <Button
        label="Agregar Tarea"
        icon="pi pi-plus"
        className="p-button-success"
        onClick={handleAddTask}
      />
      <Divider />
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
      <Dialog
        header="Nueva Tarea"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={agregarTarea} className="container-add-task">
          <div className="p-field mb-3 col-12">
            <label htmlFor="titulo">Título</label>
            <InputText
              id="titulo"
              value={formData.titulo}
              onChange={(e) => handleInputChange(e, 'titulo')}
              className="w-full"
            />
          </div>

          <div className="p-field mb-3 col-12">
            <label htmlFor="descripcion">Descripción</label>
            <InputTextarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => handleInputChange(e, 'descripcion')}
              rows={3}
              className="w-full"
            />
          </div>

          <div className="p-field mb-3 col-12">
            <label htmlFor="estado">Estado</label>
            <Dropdown
              id="estado"
              value={formData.estado} // Aquí guarda el ID
              onChange={(e) => handleInputChange(e, 'estado')}
              options={summaryData.map(item => ({
                value: item.id, // El ID que se guardará
                label: item.nombre // El nombre que se mostrará
              }))}
              className="w-full"
              optionLabel="label" // Especifica qué propiedad usar como etiqueta
            />
          </div>
          <div className="p-field mb-3 col-12">
            <label htmlFor="fechaVencimiento">Fecha de vencimiento</label>
            <Calendar
              id="fechaVencimiento"
              value={formData.fechaVencimiento}
              onChange={(e) => handleInputChange(e, 'fechaVencimiento')}
              dateFormat="dd/mm/yy"
              className="w-full"
            />
          </div>

          {/*
             <div className="p-field mb-3">
            <label htmlFor="usuario">Usuario Asignado</label>
            <Dropdown
              id="usuario"
              value={formData.usuarioAsignado}
              onChange={(e) => handleInputChange(e, 'usuarioAsignado')}
              className="w-full"
            />
          </div>
         
         */}



          <Button
            type="submit"
            label="Guardar"
            className="w-full"
          />
        </form>
      </Dialog>
    </div>
  );
}


