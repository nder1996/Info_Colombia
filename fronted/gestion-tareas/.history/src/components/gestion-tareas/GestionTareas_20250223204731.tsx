import React, { useEffect, useRef, useState } from 'react'; // Agrega useRef

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import './GestionTareas.css';
import { Calendar } from 'primereact/calendar';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { AuthService } from 'src/services/AuthService';
import { TareasResponse, EstadoTarea, GestionTareasService, Tarea, Usuario } from 'src/services/GestionTareasService';
import { SummaryService } from 'src/services/SummaryServices';
import { usuarioRol, UsuarioService } from 'src/services/UsuarioService';
import { Toast } from 'primereact/toast';
import useAuthStore from 'src/store/auth/useAuthStore';
import { useNotifications } from 'src/hooks/useNotifications';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';



interface dataTarea {
  titulo: string;
  descripcion: string;
  estado: number;
  fechaVencimiento: Date;
  usuarioAsignado?: string;
}

const schema = yup.object({
  titulo: yup.string().required('El título es requerido'),
  descripcion: yup.string().required('La descripción es requerida'),
  estado: yup.number().required('El estado es requerido'),
  fechaVencimiento: yup.date().required('La fecha es requerida'),
  usuarioAsignado: yup.string().optional()
});
export default function GestionTareas() {

  const { 
    handleSubmit,
    register, 
    formState: { errors } 
  } = useForm<dataTarea>({
    resolver: yupResolver(schema)
  });


  const [tareas, setTareas] = useState<TareasResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState<EstadoTarea[]>([]);
  const [typeButtonEvent, setTypeButtonEvent] = useState('agregar');
  const [usuarioRol, setUsuarioRol] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<Usuario[]>([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { Auth } = useAuthStore();
  const notifications = useNotifications(Auth.username || "");


  const estadoTemplate = (rowData: TareasResponse) => {
    const severity =
      rowData.estadoTarea?.nombre === 'PENDIENTE' ? 'warning' :
        rowData.estadoTarea?.nombre === 'EN_PROGRESO' ? 'info' :
          rowData.estadoTarea?.nombre === 'COMPLETADA' ? 'success' : 'secondary';
    return <Badge value={rowData.estadoTarea?.nombre} severity={severity} />;
  };










  const buttonAgregar = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      //await loadSummaryData();
      setTypeButtonEvent('agregar');
      setVisible(true);
      //console.log(data);

    } catch (error) {
      console.error('Error:', error);
    }
    console.log("entro al metodo agregar")
  };





  const agregarTarea = async (data: dataTarea) =>{
    //e.preventDefault();
    alert("entro al metodo agregar")
    

    /*const sessionInfo = AuthService.getInfoSession();
    console.log("usuario asignado : " + selectedUser)
    try {
      const tareaRequest: Tarea = {
        id: -1,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        idEstadoTarea: formData.estado,
        idUsuario: selectedUser === null ? sessionInfo?.username ?? undefined : selectedUser ?? undefined,
        vencimientoTarea: formData.fechaVencimiento
      };
      console.log("agregar tarea: ", JSON.stringify(tareaRequest))
      const response = await GestionTareasService.createTarea(tareaRequest);
      if (response) {
        const sessionInfo = AuthService.getInfoSession();
        const data = await GestionTareasService.getTareasXUsuario(sessionInfo.username);
        if (data) {
          //setTareas(data);
        }
        setVisible(false);
        setFormData({
          id: -1,
          titulo: '',
          descripcion: '',
          fechaVencimiento: new Date(),
          estado: 1,
          usuarioAsignado: ''
        });
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
      */
  };





  const eventoSelectAccion = (data: dataTarea)=> {
    e.preventDefault();
    if (typeButtonEvent === 'editar') {
      //actualizarTarea(e);
    } else {
      agregarTarea(data);
    }
  };


  return (
    <div className="card" style={{
      width: '100%',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>

      <div style={{ textAlign: 'center' }}>
        <Button icon="pi pi-plus"
          label="Agregar Tarea"
          severity="success"
          text raised
          style={{ width: '200px' }}
          onClick={(buttonAgregar)} />
      </div>
      <Divider />
      <DataTable
        value={tareas}
        paginator
        rows={5}
        first={0}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ width: '100%', textAlign: 'center' }}
        scrollable
        scrollHeight="400px"
        loading={loading}
        emptyMessage="No se encontraron tareas"
        size={'small'}
        showGridlines
        stripedRows
        selectionMode="single"
        className="text-center"
      >
        <Column
          filter
          field="id"
          header="N° Tarea"
          filterPlaceholder="Buscar por ID"
          style={{ width: '5%', textAlign: 'center' }}
        />
        <Column filter field="titulo" header="Título" filterPlaceholder="Buscar por título" style={{ width: '20%' }}></Column>
        <Column filter field="descripcion" header="Descripción" filterPlaceholder="Buscar por descripción" style={{ width: '25%' }}></Column>
        <Column
          field="estadoTarea.nombre"
          header="Estado"
          body={estadoTemplate}
          filter
          style={{ width: '15%' }}
          headerStyle={{ textAlign: 'center' }}
        ></Column>
        <Column
          field="usuario.nombre"
          header="Asignado a"
          filter
          filterPlaceholder="Buscar por usuario"
          headerStyle={{ textAlign: 'center' }}
          style={{ width: '15%' }}
        ></Column>
        <Column
          field="createAt"
          header="Fecha Creación"
          //body={(rowData) => formatDate(rowData.createAt)}
          filter
          style={{ width: '10%' }}
          headerStyle={{ textAlign: 'center' }}
        ></Column>
        <Column
          field="vencimientoTarea"
          header="Vencimiento"
         // body={(rowData) => formatDate(rowData.vencimientoTarea)}
          filter
          style={{ width: '10%' }}
          headerStyle={{ textAlign: 'center' }}
        ></Column>
        <Column
          header="Acciones"
          style={{ width: '20%' }}
          headerStyle={{ textAlign: 'center' }}
          body={(rowData) => (
            <div className="action-buttons">
              <Button
                icon="pi pi-pencil"
                //onClick={() => editarRegistro(rowData)}
                text raised
                severity="warning"
              />
              <Button
                icon="pi pi-trash"
                //onClick={() => eliminarTarea(rowData)}
                text raised
                severity="danger"
              />
            </div>
          )}
        />
      </DataTable>

      <Dialog
        header="Nueva Tarea"
        visible={visible}
        style={{ width: '450px' }}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleSubmit(eventoSelectAccion)} className="form-container">
          <div className="form-group">
            <label htmlFor="titulo" className="form-label">Título</label>
            <InputText
              id="titulo"
              className="form-input"
              {...register('titulo')}
            />
            {errors.titulo && <p>{errors.titulo.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <InputTextarea
              id="descripcion"
              rows={3}
              className="form-input"
              {...register('descripcion')}
            />
            {errors.descripcion && <p>{errors.descripcion.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="fechaVencimiento" className="form-label">Fecha de vencimiento</label>
            <Calendar
              id="fechaVencimiento"
              dateFormat="dd/mm/yy"
              className="form-date"
              {...register('fechaVencimiento')}
            />
            {errors.fechaVencimiento && <p>{errors.fechaVencimiento.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="estado" className="form-label">Estado</label>
            <Dropdown
              id="estado"
              options={[
                { value: 1, label: 'Pendiente' },
                { value: 2, label: 'En Progreso' },
                { value: 3, label: 'Completada' }
              ]}
              className="form-select"
              optionLabel="label"
              {...register('estado')}
            />
            {errors.estado && <p>{errors.estado.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="usuario" className="form-label">Asignar Tarea</label>
            <Dropdown
              id="usuario"
              options={[]}
              optionLabel="nombre"
              optionValue="email"
              placeholder="Seleccionar Usuario"
              className="form-select"
              {...register('usuarioAsignado')}
            />
            {errors.usuarioAsignado && <p>{errors.usuarioAsignado.message}</p>}
          </div>

          <Button
            type="submit"
            label="Guardar"
            className="form-button"
            severity="success"
            outlined
          />
        </form>
      </Dialog>
      <ConfirmDialog />

    </div>
  );
}







