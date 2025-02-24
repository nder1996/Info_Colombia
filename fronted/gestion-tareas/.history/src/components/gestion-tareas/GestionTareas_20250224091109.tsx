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
import { TareasResponse, EstadoTarea, GestionTareasService, Tarea, Usuario } from 'src/services/gestionTareasService';
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
import { useLanguage } from 'src/context/LanguageContext';
import { traducciones } from 'src/i18n/traducciones';


interface dataTarea {
  id?: number;
  titulo?: string;
  descripcion?: string;
  estado?: number;
  fechaVencimiento?: Date;
  usuarioAsignado?: string;
}

// Línea aproximada 46, reemplazar mensajes estáticos con traducciones

export default function GestionTareas() {

  const { language } = useLanguage();
const { tareas: texts, mensajes, validaciones } = traducciones[language]
  const schema = yup.object({
    id: yup.number(),
    titulo: yup.string().required(validaciones.tituloRequerido),
    descripcion: yup.string().required(validaciones.descripcionRequerida),
    estado: yup.number().required(validaciones.estadoRequerido),
    fechaVencimiento: yup.date()
      .required(t('validaciones.fechaRequerida'))
      .min(new Date(), t('validaciones.fechaPosterior')),
    usuarioAsignado: yup.string().optional()
  });

  const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      titulo: '',
      descripcion: '',
      estado: undefined,
      fechaVencimiento: undefined,
      usuarioAsignado: ''
    }
  });

  const resetForm = (): void => {
    reset({
      titulo: '',
      descripcion: '',
      estado: undefined,
      fechaVencimiento: undefined,
      usuarioAsignado: ''
    });
  };


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
      mostrarAdvertencia(t('mensajes.advertencia.errorCargarTareas'), tarea.meta?.message);
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
        mostrarAdvertencia(t('mensajes.advertencia.errorCargarTareas'), data.meta?.message);
      }
    } catch (error) {
      console.error('Error loading summary:', error);
    }
  };



  useEffect(() => {

    fetchTareas();
    fetchRoles();

    if (notifications.length > 0) {
      mostrarInfo(t('mensajes.informacion.nuevaTarea'), notifications[notifications.length - 1].titulo);
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
      setTypeButtonEvent('agregar');
      await loadSummaryData();
      setVisible(true);
      console.log("button agregar")
      resetForm();
      console.log(" valor eleiminado : " + watch())
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
        estado: tarea.estadoTarea?.id,
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

  const confirmarEliminarTarea = (tarea: TareasResponse) => {
    confirmDialog({
      message: t('tareas.mensajeConfirmacion').replace('{0}', tarea.titulo),
      header: t('tareas.confirmacionEliminacion'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: t('tareas.siEliminar'),
      rejectLabel: t('tareas.cancelar'),
      defaultFocus: 'reject',
      accept: () => bottonEliminar(tarea),
      reject: () => { }
    });
  };

  const bottonEliminar = async (tarea: TareasResponse) => {
    const sessionInfo = AuthService.getInfoSession();
    try {
      const response = await GestionTareasService.inactivarTarea(tarea.id);
      if (response && response?.meta?.statusCode === 200) {
        mostrarExito(t('tareas.eliminarTarea'), t('mensajes.exito.tareaEliminada').replace('{0}', tarea.titulo));
      } else {
        mostrarError(t('mensajes.error.procesarTarea'), response?.meta?.message || "Error al inactivar tarea");
      }
    } catch (error) {
      console.error('Error al editar el registro:', error);
    }
  };

  const agregarTarea = async (data: dataTarea) => {
    try {
      if (!data) return;
      const sessionInfo = AuthService.getInfoSession();
      if (!sessionInfo?.username) {
        mostrarError(t('mensajes.error.sesion'), "No hay sesión activa");
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
        setVisible(false);
        mostrarExito(t('mensajes.exito.tareaCreada'), t('mensajes.exito.tareaCreada'));
        await fetchTareas();
      } else {
        mostrarError(t('mensajes.error.procesarTarea'), response?.meta?.message || t('mensajes.error.procesarTarea'));
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
        setVisible(false);
        mostrarExito(t('mensajes.exito.tareaActualizada'), t('mensajes.exito.tareaActualizada'));
                await fetchTareas();
      } else {
        mostrarError("Error", response?.meta?.message || "Error al crear tarea");
      }
      reset();
    } catch (error) {
      console.error("Error:", error);
      mostrarError("Error", "Error al procesar la tarea");
    }
  }




  const eventoSelectAccion = (data: dataTarea) => {
    if (!data) {
      mostrarError(t('mensajes.error.sinDatos'), t('mensajes.error.sinDatos'));
      return;
    }
    resetForm();
    if (typeButtonEvent === 'editar') {
      actualizarTarea(data);
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
      <ConfirmDialog />
      <NavbarIdioma></NavbarIdioma>
      <Divider></Divider>
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
                onClick={() => confirmarEliminarTarea(rowData)}
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
              value={watch('titulo')}
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
              value={watch('fechaVencimiento') ? new Date(watch('fechaVencimiento')) : null}
              minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
              onChange={(e) => {
                const newValue = e.value || new Date();
                setValue('fechaVencimiento', newValue);
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
            label={typeButtonEvent == "editar" ? "Editar Tarea" : "Guardar Tarea"}
            className="form-button"
            severity="success"
            outlined
          />
        </form>
      </Dialog>



    </div>
  );
}







