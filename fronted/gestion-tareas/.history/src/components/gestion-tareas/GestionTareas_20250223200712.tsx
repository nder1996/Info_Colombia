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



// Corregir interface del formData
interface FormData {
  titulo: string;
  descripcion: string;
  fechaVencimiento: Date;
  estado: number;
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
  // Inicialización de formulario en React
  /*const [formData, setFormData] = useState<FormData>({
    id: -1,
    titulo: '',
    descripcion: '',
    fechaVencimiento: new Date(),
    estado: 1,
    usuarioAsignado: null
  });*/

  const TaskForm = ({ onSubmit, initialData, summaryData, usuario, usuarioRol, typeButtonEvent }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
      defaultValues: initialData
    });

/*
  const handleInputChange = (e: any, field: string) => {
    setFormData({
      ...formData,
      [field]: e.target?.value || e.value
    });
  };*/



  useEffect(() => {
    if (notifications.length > 0 && toastRef.current) {
      const notification = notifications[0] ?? [];
      toastRef?.current.show({
        severity: 'info',
        summary: 'Nueva Tarea Agregada',
        detail: `✨ Tarea: "${notification.titulo}"\n👤 Creada por: ${notification.username}`,
        life: 3000
      });
    }
    const fetchTareas = async () => {
      setLoading(true);
      const sessionInfo = AuthService.getInfoSession();
      const tareaResponse = await GestionTareasService.getTareasXUsuario(sessionInfo.username);
      if (tareaResponse.meta?.statusCode != 200 && toastRef.current) {
        toastRef?.current.show({
          severity: 'warn',
          summary: 'Contacte al administrador para solucionar el problema.',
          detail: `Hubo un error al cargar las tareas. Intente nuevamente.`,
          life: 3000
        });
        return;
      }
      const rolResponse = await UsuarioService.obtenerRolesXUser(sessionInfo?.username ?? '');
      if (tareaResponse.data && rolResponse) {
        setTareas([]);
        setTareas(tareaResponse.data);

        const rolAdmin = Array.isArray(rolResponse.data)
          ? rolResponse.data.find(rol => rol.id == 1)
          : undefined;
        // console.log("Usuario Rol: ", JSON.stringify(rolResponse));
        if (rolAdmin) {
          setUsuarioRol(true)
          await loadUsuario();
        }


        //console.log("Es admin:", rolXUser?.some(rol => rol.id == 1));
      }
      setLoading(false);
    };




    fetchTareas();
  }, [notifications]);
  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  const estadoTemplate = (rowData: TareasResponse) => {
    const severity =
      rowData.estadoTarea?.nombre === 'PENDIENTE' ? 'warning' :
        rowData.estadoTarea?.nombre === 'EN_PROGRESO' ? 'info' :
          rowData.estadoTarea?.nombre === 'COMPLETADA' ? 'success' : 'secondary';

    return <Badge value={rowData.estadoTarea?.nombre} severity={severity} />;
  };

  const editarRegistro = async (tarea: TareasResponse) => {
    try {
      await loadSummaryData();
      //console.log("form: ", JSON.stringify(tarea))
      setFormData({
        id: tarea.id,
        titulo: tarea.titulo,
        descripcion: tarea.descripcion ?? "",
        fechaVencimiento: new Date(),
        estado: tarea.estadoTarea?.id,
        usuarioAsignado: tarea.usuario?.id,
      });
      setVisible(true);
      setTypeButtonEvent('editar');
    } catch (error) {
      console.error('Error al editar el registro:', error);
    }
  };






  const loadSummaryData = async () => {
    try {
      const data = await SummaryService.obtenerSummary();
      if (data) {
        //console.log("SummaryData: ", data)
        setSummaryData([]);
        setSummaryData(data);
      }
    } catch (error) {
      console.error('Error loading summary:', error);
    }
  };

  const loadUsuario = async () => {
    try {
      const data = await UsuarioService.getAllUsuario();
      if (data) {
        //console.log("SummaryData: ", data)
        setUsuario([]);
        setUsuario(usuario);
      }
    } catch (error) {
      console.error('Error loading summary:', error);
    }
  };



  const buttonAgregar = async () => {
    try {
      await loadSummaryData();
      setTypeButtonEvent('agregar');
      setVisible(true);

    } catch (error) {
      console.error('Error:', error);
    }
    console.log("salio del metodo agregar")
  };

  const buttonEditar = (rowData: TareasResponse) => {
    return <Button label="Editar" className="p-button-sm" severity="warning"
      onClick={() => editarRegistro(rowData)} />;
  };


  const buttonEliminar = (rowData: TareasResponse) => {
    return <Button label="Eliminar" className="p-button-sm" severity="danger"
      onClick={() => confirmDelete(rowData)} />;
  };



  const agregarTarea = async (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  const actualizarTarea = async (e: React.FormEvent) => {
    e.preventDefault();
  /*  try {

      const sessionInfo = AuthService.getInfoSession();

      const tareaRequest: Tarea = {
        id: formData.id,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        idEstadoTarea: formData.estado,
        idUsuario: selectedUser === null ? sessionInfo?.username ?? undefined : selectedUser ?? undefined,
        vencimientoTarea: formData.fechaVencimiento
      };
      const response = await GestionTareasService.updateTask(tareaRequest);
      if (response) {
        const sessionInfo = AuthService.getInfoSession();
        const data = await GestionTareasService.getTareasXUsuario(sessionInfo.username);
        if (data) {
          // setTareas(data);
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

  const eliminarTarea = async (tarea: TareasResponse) => {
   /* try {
      console.log(`Deleting task ` + JSON.stringify(tarea));
      const response = await GestionTareasService.inactivarTarea(tarea.id);
      const sessionInfo = AuthService.getInfoSession();
      const data = await GestionTareasService.getTareasXUsuario(sessionInfo.username);
      if (data) {
        //setTareas(data);
      }
      console.log('Task deleted:', response);
      return response;
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw error;
    }*/
  };



  const confirmDelete = (tarea: TareasResponse) => {
    /*confirmDialog({
      message: '¿Está seguro que desea eliminar este registro?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => eliminarTarea(tarea),
      reject: () => console.log('Cancelado')
    });*/
  };



  const eventoSelectAccion = (e: React.FormEvent) => {
   /* e.preventDefault();
    if (typeButtonEvent === 'editar') {
      actualizarTarea(e);
    } else {
      agregarTarea(e);
    }*/
  };


  return (
    <div className="card" style={{
      width: '100%',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <Toast ref={toastRef} position="top-right" />
      <div style={{ textAlign: 'center' }}>
        <Button icon="pi pi-plus"
          label="Agregar Tarea"
          severity="success"
          text raised
          style={{ width: '200px' }}
          onClick={buttonAgregar} />
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
          body={(rowData) => formatDate(rowData.createAt)}
          filter
          style={{ width: '10%' }}
          headerStyle={{ textAlign: 'center' }}
        ></Column>
        <Column
          field="vencimientoTarea"
          header="Vencimiento"
          body={(rowData) => formatDate(rowData.vencimientoTarea)}
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
                onClick={() => editarRegistro(rowData)}
                text raised
                severity="warning"
              />
              <Button
                icon="pi pi-trash"
                onClick={() => eliminarTarea(rowData)}
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
        <form onSubmit={eventoSelectAccion} className="form-container">
          <div className="form-group">
            <label htmlFor="titulo" className="form-label">Título</label>
            <InputText
              id="titulo"
              value={formData.titulo}
              onChange={(e) => handleInputChange(e, 'titulo')}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <InputTextarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => handleInputChange(e, 'descripcion')}
              rows={3}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="estado" className="form-label">Estado</label>
            <Dropdown
              id="estado"
              value={formData.estado}
              onChange={(e) => handleInputChange(e, 'estado')}
              options={summaryData.map(item => ({
                value: item.id,
                label: item.nombre
              }))}
              className="form-select"
              optionLabel="label"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaVencimiento" className="form-label">Fecha de vencimiento</label>
            <Calendar
              id="fechaVencimiento"
              value={formData.fechaVencimiento}
              onChange={(e) => handleInputChange(e, 'fechaVencimiento')}
              dateFormat="dd/mm/yy"
              className="form-date"
            />
          </div>

          {usuarioRol && (
            <div className="form-group">
              <label htmlFor="descripcion" className="form-label">Asignar Tarea</label>
              <Dropdown
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.value)}
                options={usuario}
                optionLabel="nombre"
                optionValue="email"
                placeholder="Seleccionar Usuario"
                className="form-select"
              />
            </div>
          )}

          <Button
            type="submit"
            label={typeButtonEvent === 'editar' ? "Actualizar" : "Guardar"}
            className="form-button"
            severity="success" outlined
          />
        </form>
      </Dialog>
      <ConfirmDialog />

    </div>
  );
}





