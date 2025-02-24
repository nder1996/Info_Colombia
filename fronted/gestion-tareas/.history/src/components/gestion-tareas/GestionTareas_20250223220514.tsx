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
import { useToast } from 'src/context/ToastContext';
import { InputNumber } from 'primereact/inputnumber';



interface dataTarea {
  id?: number;
  titulo?: string;
  descripcion?: string;
  estado?: number;
  fechaVencimiento?: Date;
  usuarioAsignado?: string;
}

const schema = yup.object({
  id: yup.number(),
  titulo: yup.string().required('El título es requerido'),
  descripcion: yup.string().required('La descripción es requerida'),
  estado: yup.number().required('El estado es requerido'),
  fechaVencimiento: yup.date().required('La fecha es requerida'),
  usuarioAsignado: yup.string().optional()
});
export default function GestionTareas() {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    defaultValues: {
      id: -1,
      titulo: '',
      descripcion: '',
      estado: -1,
      fechaVencimiento: new Date(),
      usuarioAsignado: ''
    }
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
  const { mostrarExito, mostrarError, mostrarInfo } = useToast();
  const [rolAdmin, setRolAdmin] = useState<boolean>(false);



  useEffect(() => {
    const fetchRoles = async () => {
      //console.log("Entering fetchRoles");
      const sessionInfo = AuthService.getInfoSession();
      //console.log("Session info:", sessionInfo);
      if (sessionInfo?.username) {
        //console.log("Has username, fetching roles");
        const rol = await UsuarioService.obtenerRolesXUser(sessionInfo.username);
        if (rol && rol.meta?.statusCode == 200) {
          console.log("Roles response:", rol);
          setRolAdmin(Array.isArray(rol.data) ? rol.data.some(rol => rol.id == 1) : false);
        }
      }
    };
  
    fetchRoles();
    
    if (notifications.length > 0) {
      mostrarInfo("Nueva Tarea Agregada", notifications[notifications.length - 1].titulo);
    }
  }, [notifications]);







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
      reset();
      setTypeButtonEvent('agregar');
      eventoSelectAccion(undefined)
      setVisible(true);
    } catch (error) {
      console.error('Error:', error);
      mostrarError("Error en el sistemas", "Hubo un Error al Abrir el Modal")
    }
  };





  const agregarTarea = async (data?: dataTarea) => {
    const sessionInfo = AuthService.getInfoSession();
    const tareaRequest: Tarea = {
      id: -1,
      titulo: data?.titulo,
      descripcion: data?.descripcion,
      idUsuario: selectedUser === null ? sessionInfo?.username ?? undefined : selectedUser ?? undefined,
      idEstadoTarea: data?.estado,
      vencimientoTarea: data?.fechaVencimiento
    };



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





  const eventoSelectAccion = (data?: dataTarea) => {
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
        {rolAdmin ? <div>Admin content</div> : <div>Regular user content</div>}

        <form onSubmit={handleSubmit(eventoSelectAccion)} className="form-container">
          {typeButtonEvent == "Agregar" && (
            <div className="form-group">
              <label htmlFor="taskId" className="form-label">Tarea N°</label>
              <InputNumber
                id="taskId"
                className="form-input"
                disabled
              />
              {errors.id && <p style={{ color: 'red' }}>{errors.id.message}</p>}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="titulo" className="form-label">Título</label>
            <InputText
              id="titulo"
              className="form-input"
              {...register('titulo')}
              onChange={(e) => setValue('titulo', e.target.value)}
            />
            {errors.titulo && <p style={{ color: 'red' }}>{errors.titulo.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <InputTextarea
              id="descripcion"
              rows={3}
              className="form-input"
              {...register('descripcion')}
              onChange={(e) => setValue('descripcion', e.target.value)}
            />
            {errors.descripcion && <p style={{ color: 'red' }}>{errors.descripcion.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="fechaVencimiento" className="form-label">Fecha de vencimiento</label>
            <Calendar
              id="fechaVencimiento"
              dateFormat="dd/mm/yy"
              className="form-date"
              {...register('fechaVencimiento')}
              onChange={(e) => setValue('fechaVencimiento', new Date(e.target.value!))}
            />

            {errors.fechaVencimiento && <p style={{ color: 'red' }}>{errors.fechaVencimiento.message}</p>}
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
              onChange={(e) => setValue('estado', e.target.value)}
            />
            {errors.estado && <p style={{ color: 'red' }}>{errors.estado.message}</p>}
          </div>
          <label>Tiene rol admin : {rolAdmin}</label>
          
          {
            rolAdmin == true && (
              <h1>ola mundo</h1>
            )
          }

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
              onChange={(e) => setValue('usuarioAsignado', e.target.value)}
            />
            {errors.usuarioAsignado && <p style={{ color: 'red' }}>{errors.usuarioAsignado.message}</p>}
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







