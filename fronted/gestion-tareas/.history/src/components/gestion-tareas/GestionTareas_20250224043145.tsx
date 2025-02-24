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
import { usuario, usuarioRol, UsuarioService } from 'src/services/UsuarioService';
import useAuthStore from 'src/store/auth/useAuthStore';
import { useNotifications } from 'src/hooks/useNotifications';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useToast } from 'src/context/ToastContext';
import { InputNumber } from 'primereact/inputnumber';
import NavbarIdioma from '../navbar-idioma/navbar-idioma';



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
  fechaVencimiento: yup.date().required('La fecha es requerida')
    .min(new Date(), 'La fecha debe ser posterior a hoy'),
  usuarioAsignado: yup.string().optional()
});
export default function GestionTareas() {
  const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const [tareas, setTareas] = useState<TareasResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState<EstadoTarea[]>([]);
  const [typeButtonEvent, setTypeButtonEvent] = useState('agregar');
  const [usuario, setUsuario] = useState<usuario[]>([]);
  const { Auth } = useAuthStore();
  const notifications = useNotifications(Auth.username || "");
  const { mostrarExito, mostrarError, mostrarInfo, mostrarAdvertencia } = useToast();
  const [rolAdmin, setRolAdmin] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [minSelectableDate, setMinSelectableDate] = useState<Date | undefined>(undefined);


  const fetchRoles = async () => {
    const sessionInfo = AuthService.getInfoSession();
    if (sessionInfo?.username) {
      const rol = await UsuarioService.obtenerRolesXUser(sessionInfo.username);
      if (rol && rol.meta?.statusCode == 200) {
        console.log("Roles response:", rol);
        setRolAdmin(Array.isArray(rol.data) ? rol.data.some(rol => rol.id == 1) : false);
      }
    }
  };

  const loadUsuario = async () => {
    try {
      const data = await UsuarioService.getAllUsuario();
      if (data && data.data && data.meta?.statusCode == 200) {
        setUsuario(data.data);
      }
    } catch (error) {
      console.error('Error loading summary:', error);
    }

  };


  const fetchTareas = async () => {
    setLoading(true);
    const sessionInfo = AuthService.getInfoSession();
    const tarea = await GestionTareasService.getTareasXUsuario(sessionInfo.username);
    if (tarea.meta?.statusCode != 200) {
      mostrarAdvertencia("Error al cargar las tareas", tarea.meta?.message);
      return;
    } else if (tarea.data) {
      setTareas(tarea.data);
    }
    setLoading(false);

  }

  const loadSummaryData = async () => {
    try {
      const data = await SummaryService.obtenerSummary();
      if (data && data.data && data.meta?.statusCode == 200) {
        setSummaryData(data.data);
      } else {
        mostrarAdvertencia("Error al traer los estados", data.meta?.message);
      }
    } catch (error) {
      console.error('Error loading summary:', error);
    }
  };



  useEffect(() => {

    fetchTareas();
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
      reset()
      setTypeButtonEvent('agregar');
      await loadSummaryData();
      setVisible(true);
    } catch (error) {
      console.error('Error:', error);
      mostrarError("Error", "No se pudo abrir el formulario");
    }
  };

  const bottonEditar = async (tarea: TareasResponse) => {
    const sessionInfo = AuthService.getInfoSession();
    try {
      await loadSummaryData();
      reset({
        id: tarea.id,
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        estado: tarea.estado,
        fechaVencimiento: tarea.vencimientoTarea,
        usuarioAsignado: rolAdmin === true
          ? (typeof tarea.usuario === 'string' ? tarea.usuario : sessionInfo.username ?? undefined)
          : sessionInfo.username ?? undefined,

      });
      setTypeButtonEvent('editar');
      setVisible(true);
    } catch (error) {
      console.error('Error al editar el registro:', error);
    }
  };

  const bottonEliminar = async (tarea: TareasResponse) => {
    const sessionInfo = AuthService.getInfoSession();
    try {
      await loadSummaryData();
      reset({
        id: tarea.id,
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        estado: tarea.estado,
        fechaVencimiento: tarea.vencimientoTarea,
        usuarioAsignado: rolAdmin === true
          ? (typeof tarea.usuario === 'string' ? tarea.usuario : sessionInfo.username ?? undefined)
          : sessionInfo.username ?? undefined,

      });

      setVisible(true);
    } catch (error) {
      console.error('Error al editar el registro:', error);
    }
  };

  const agregarTarea = async (data: dataTarea) => {
    try {
      if (!data) return;

      const sessionInfo = AuthService.getInfoSession();
      console.log("SessionInfo:", sessionInfo);
      if (!sessionInfo?.username) {
        mostrarError("Error", "No hay sesión activa");
        return;
      }

      const tareaRequest: Tarea = {
        id: 0,
        titulo: data.titulo,
        descripcion: data.descripcion,
        username: rolAdmin === true ? data.usuarioAsignado : sessionInfo?.username,
        idEstadoTarea: data.estado,
        vencimientoTarea: data.fechaVencimiento
      };
      const response = await GestionTareasService.createTarea(tareaRequest);
      if (response?.meta?.statusCode === 200) {
        mostrarExito("Éxito", "Tarea creada");
        await fetchTareas();
        setVisible(false);
        reset();
      } else {
        mostrarError("Error", response?.meta?.message || "Error al crear tarea");
      }
    } catch (error) {
      console.error("Error:", error);
      mostrarError("Error", "Error al procesar la tarea");
    }
  };


  const actualizarTarea = async (data: dataTarea) => {
    try {
      if (!data) return;

      const sessionInfo = AuthService.getInfoSession();
      console.log("SessionInfo:", sessionInfo);
      if (!sessionInfo?.username) {
        mostrarError("Error", "No hay sesión activa");
        return;
      }
      const tareaRequest: Tarea = {
        id: data.id,
        titulo: data.titulo,
        descripcion: data.descripcion,
        username: rolAdmin === true ? data.usuarioAsignado : sessionInfo?.username,
        idEstadoTarea: data.estado,
        vencimientoTarea: data.fechaVencimiento
      };
      const response = await GestionTareasService.updateTask(tareaRequest);
      if (response?.meta?.statusCode === 200) {
        mostrarExito("Éxito", "Tarea Actualizada");
        await fetchTareas();
        setVisible(false);
        reset();
      } else {
        mostrarError("Error", response?.meta?.message || "Error al crear tarea");
      }
    } catch (error) {
      console.error("Error:", error);
      mostrarError("Error", "Error al procesar la tarea");
    }
  }




  const eventoSelectAccion = (data: dataTarea) => {
    if (!data) {
      mostrarError("Error", "No hay datos para procesar");
      return;
    }
    if (typeButtonEvent === 'editar') {
      actualizarTarea(data);

    } else {
      agregarTarea(data);
    }
  };
  const summaryData1 = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'En Progreso' },
    { id: 3, nombre: 'Completada' }
  ];

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];


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
          body={(rowData) => new Date(rowData.createAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        ></Column>
        <Column
          field="vencimientoTarea"
          header="Vencimiento"
          body={(rowData) => new Date(rowData.vencimientoTarea).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          filter
          style={{ width: '10%' }}
        />
        <Column
          header="Acciones"
          style={{ width: '20%' }}
          headerStyle={{ textAlign: 'center' }}
          body={(rowData) => (
            <div className="action-buttons">
              <Button
                icon="pi pi-pencil"
                onClick={() => bottonEditar(rowData)}
                text raised
                severity="warning"
              />
              <Button
                icon="pi pi-trash"
                onClick={() => bottonEliminar(rowData)}
                text raised
                severity="danger"
              />
            </div>
          )}
        />
      </DataTable>

      <Dialog
        header={typeButtonEvent === "editar" ? "Editar Tarea" : "Agregar Tarea"}
        visible={visible}
        style={{ width: '450px' }}
        onHide={() => setVisible(false)}
      >
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
              onChange={(e) => setValue('descripcion', e.target.value)}
              value={watch('descripcion')} 
            />
            {errors.descripcion && <p style={{ color: 'red' }}>{errors.descripcion.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="fechaVencimiento" className="form-label">Fecha de vencimiento</label>
            <Calendar
              id="fechaVencimiento"
              dateFormat="dd/mm/yy"
              className="form-date"
              value={selectedDate}
              minDate={minSelectableDate}
              onChange={(e) => {
                const fecha = e.value as Date;
                setSelectedDate(fecha);
                setValue('fechaVencimiento', fecha);
              }}
            />
            {errors.fechaVencimiento && <p style={{ color: 'red' }}>{errors.fechaVencimiento.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="estado" className="form-label">Estado</label>
            <Dropdown
              id="estado"
              options={summaryData}
              className="form-select"
              optionLabel="nombre"
              optionValue="id"
              value={watch('estado')} 
              onChange={(e) => setValue('estado', e.target.value)}
            />
            {errors.estado && <p style={{ color: 'red' }}>{errors.estado.message}</p>}
          </div>
          {
            rolAdmin == true && (
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
            )
          }
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







