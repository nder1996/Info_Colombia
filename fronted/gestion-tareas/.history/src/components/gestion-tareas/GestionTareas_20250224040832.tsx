import React, { useEffect, useCallback, useState } from 'react';
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
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { AuthService } from 'src/services/AuthService';
import { TareasResponse, EstadoTarea, GestionTareasService, Tarea } from 'src/services/GestionTareasService';
import { SummaryService } from 'src/services/SummaryServices';
import { usuario, UsuarioService } from 'src/services/UsuarioService';
import { useToast } from 'src/context/ToastContext';
import useAuthStore from 'src/store/auth/useAuthStore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

interface DataTarea {
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
  fechaVencimiento: yup.date()
    .required('La fecha es requerida')
    .min(new Date(), 'La fecha debe ser posterior a hoy'),
  usuarioAsignado: yup.string().optional()
});

export default function GestionTareas() {
  const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<DataTarea>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: undefined,
      titulo: '',
      descripcion: '',
      estado: undefined,
      fechaVencimiento: undefined,
      usuarioAsignado: undefined
    }
  });

  const [tareas, setTareas] = useState<TareasResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [summaryData, setSummaryData] = useState<EstadoTarea[]>([]);
  const [typeButtonEvent, setTypeButtonEvent] = useState<'agregar' | 'editar'>('agregar');
  const [usuarios, setUsuarios] = useState<usuario[]>([]);
  const [rolAdmin, setRolAdmin] = useState(false);
  const { Auth } = useAuthStore();
  const { mostrarExito, mostrarError, mostrarAdvertencia } = useToast();
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const cargarDatos = useCallback(async () => {
    const sessionInfo = AuthService.getInfoSession();
    
    try {
      // Cargar tareas
      setLoading(true);
      const tareasResponse = await GestionTareasService.getTareasXUsuario(sessionInfo?.username || '');
      if (tareasResponse.meta?.statusCode === 200) {
        setTareas(tareasResponse.data || []);
      }

      // Cargar roles
      if (sessionInfo?.username) {
        const rolesResponse = await UsuarioService.obtenerRolesXUser(sessionInfo.username);
        if (rolesResponse?.meta?.statusCode === 200) {
          setRolAdmin(rolesResponse.data?.some(rol => rol.id === 1) || false);
        }
      }

      // Cargar usuarios si es admin
      if (rolAdmin) {
        const usuariosResponse = await UsuarioService.getAllUsuario();
        if (usuariosResponse?.meta?.statusCode === 200) {
          setUsuarios(usuariosResponse.data || []);
        }
      }

      // Cargar estados
      const estadosResponse = await SummaryService.obtenerSummary();
      if (estadosResponse?.meta?.statusCode === 200) {
        setSummaryData(estadosResponse.data || []);
      }

    } catch (error) {
      mostrarError("Error", "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, [rolAdmin, mostrarError]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const estadoTemplate = (rowData: TareasResponse) => {
    const estado = rowData.estadoTarea?.nombre?.toUpperCase();
    const severity = {
      'PENDIENTE': 'warning',
      'EN_PROGRESO': 'info',
      'COMPLETADA': 'success'
    }[estado || ''] || 'secondary';

    return <Badge value={rowData.estadoTarea?.nombre} severity={severity} />;
  };

  const handleEliminarTarea = (tarea: TareasResponse) => {
    confirmDialog({
      message: `¿Estás seguro de eliminar la tarea "${tarea.titulo}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          const response = await GestionTareasService.(tarea.id);
          if (response.meta?.statusCode === 200) {
            mostrarExito("Éxito", "Tarea eliminada");
            await cargarDatos();
          }
        } catch (error) {
          mostrarError("Error", "No se pudo eliminar la tarea");
        }
      }
    });
  };

  const handleFormSubmit = async (data: DataTarea) => {
    try {
      const sessionInfo = AuthService.getInfoSession();
      const tareaRequest: Tarea = {
        id: data.id || 0,
        titulo: data.titulo || '',
        descripcion: data.descripcion || '',
        username: rolAdmin && data.usuarioAsignado 
          ? data.usuarioAsignado 
          : sessionInfo?.username || '',
        idEstadoTarea: data.estado || 1,
        vencimientoTarea: data.fechaVencimiento || new Date()
      };

      const serviceCall = typeButtonEvent === 'editar' 
        ? GestionTareasService.updateTask 
        : GestionTareasService.createTarea;

      const response = await serviceCall(tareaRequest);
      
      if (response.meta?.statusCode === 200) {
        mostrarExito("Éxito", `Tarea ${typeButtonEvent === 'editar' ? 'actualizada' : 'creada'}`);
        await cargarDatos();
        setVisible(false);
        reset();
      }
    } catch (error) {
      mostrarError("Error", "Error al procesar la tarea");
    }
  };

  return (
    <div className="card container-gestion-tareas">
      <div className="boton-agregar">
        <Button
          icon="pi pi-plus"
          label="Agregar Tarea"
          severity="success"
          outlined
          onClick={() => {
            reset();
            setTypeButtonEvent('agregar');
            setVisible(true);
          }}
        />
      </div>

      <Divider />

      <DataTable
        value={tareas}
        paginator
        rows={5}
        loading={loading}
        scrollable
        scrollHeight="400px"
        emptyMessage="No se encontraron tareas"
        className="tabla-tareas"
      >
        <Column field="id" header="N° Tarea" style={{ width: '8%' }} />
        <Column field="titulo" header="Título" style={{ width: '20%' }} />
        <Column field="descripcion" header="Descripción" style={{ width: '25%' }} />
        <Column field="estadoTarea.nombre" header="Estado" body={estadoTemplate} style={{ width: '12%' }} />
        <Column field="usuario.nombre" header="Asignado a" style={{ width: '15%' }} />
        <Column 
          field="createAt" 
          header="Fecha Creación" 
          body={rowData => new Date(rowData.createAt).toLocaleDateString('es-ES')}
          style={{ width: '12%' }}
        />
        <Column
          field="vencimientoTarea"
          header="Vencimiento"
          body={rowData => new Date(rowData.vencimientoTarea).toLocaleDateString('es-ES')}
          style={{ width: '12%' }}
        />
        <Column
          header="Acciones"
          body={rowData => (
            <div className="acciones-tabla">
              <Button
                icon="pi pi-pencil"
                severity="warning"
                outlined
                className="mr-2"
                onClick={() => {
                  setTypeButtonEvent('editar');
                  reset({
                    ...rowData,
                    estado: rowData.estado,
                    fechaVencimiento: new Date(rowData.vencimientoTarea),
                    usuarioAsignado: rowData.usuario?.username
                  });
                  setVisible(true);
                }}
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                outlined
                onClick={() => handleEliminarTarea(rowData)}
              />
            </div>
          )}
        />
      </DataTable>

      <Dialog
        header={typeButtonEvent === 'editar' ? 'Editar Tarea' : 'Nueva Tarea'}
        visible={visible}
        style={{ width: '450px' }}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} className="formulario-tareas">
          <div className="campo-formulario">
            <label>Título *</label>
            <InputText
              {...register('titulo')}
              className={errors.titulo ? 'invalido' : ''}
            />
            {errors.titulo && <small className="error-message">{errors.titulo.message}</small>}
          </div>

          <div className="campo-formulario">
            <label>Descripción *</label>
            <InputTextarea
              {...register('descripcion')}
              rows={3}
              className={errors.descripcion ? 'invalido' : ''}
            />
            {errors.descripcion && <small className="error-message">{errors.descripcion.message}</small>}
          </div>

          <div className="campo-formulario">
            <label>Fecha Vencimiento *</label>
            <Calendar
              {...register('fechaVencimiento')}
              minDate={minDate}
              dateFormat="dd/mm/yy"
              showButtonBar
              className={errors.fechaVencimiento ? 'invalido' : ''}
              onChange={(e) => setValue('fechaVencimiento', e.value as Date)}
            />
            {errors.fechaVencimiento && <small className="error-message">{errors.fechaVencimiento.message}</small>}
          </div>

          <div className="campo-formulario">
            <label>Estado *</label>
            <Dropdown
              {...register('estado')}
              options={summaryData}
              optionLabel="nombre"
              optionValue="id"
              placeholder="Seleccione estado"
              className={errors.estado ? 'invalido' : ''}
            />
            {errors.estado && <small className="error-message">{errors.estado.message}</small>}
          </div>

          {rolAdmin && (
            <div className="campo-formulario">
              <label>Asignar a</label>
              <Dropdown
                {...register('usuarioAsignado')}
                options={usuarios}
                optionLabel="nombre"
                optionValue="username"
                placeholder="Seleccione usuario"
              />
            </div>
          )}

          <div className="botones-formulario">
            <Button
              type="button"
              label="Cancelar"
              severity="secondary"
              outlined
              onClick={() => setVisible(false)}
            />
            <Button
              type="submit"
              label={typeButtonEvent === 'editar' ? 'Actualizar' : 'Crear'}
              severity="success"
            />
          </div>
        </form>
      </Dialog>

      <ConfirmDialog />
    </div>
  );
}




