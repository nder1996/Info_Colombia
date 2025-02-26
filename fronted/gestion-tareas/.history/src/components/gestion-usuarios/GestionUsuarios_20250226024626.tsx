import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputNumber } from 'primereact/inputnumber';
import { useLanguage } from 'src/context/LanguageContext';
import './GestionUsuarios.css';
import { usuario, usuarioConRol, usuarioRol, UsuarioService } from 'src/services/UsuarioService';
import { EstadoTarea, Rol, SummaryService } from 'src/services/SummaryServices';
import { Password } from 'primereact/password';
import { useToast } from 'src/context/ToastContext';
import { traducciones } from 'src/i18n/traducciones';

interface Estado {
  id: string;
  nombre: string;
}

interface FormUsuario {
  id?: number;
  nombre: string;
  email: string;
  password?: string | undefined;
  confirmPassword?: string;
  rolId: number;
  estadoId: string;
}




const ESTADOS_USUARIO_MOCK: Estado[] = [
  { id: 'A', nombre: 'ACTIVO' },
  { id: 'I', nombre: 'INACTIVO' }
];




export default function GestionUsuarios() {
  const { language = 'es' } = useLanguage();
  const textsUsuarios = traducciones[language].usuarios;
  const textsValidaciones = traducciones[language].validaciones;

  const [usuarios, setUsuarios] = useState<usuarioConRol[]>([]);
  const [rol, setRol] = useState<Rol[]>([]);
  const [estado, setEstado] = useState<Estado[]>(ESTADOS_USUARIO_MOCK);

  const [visible, setVisible] = useState<boolean>(false);
  const [typeButtonEvent, setTypeButtonEvent] = useState('agregar');
  const [loading, setLoading] = useState<boolean>(false);
  const { mostrarExito, mostrarError } = useToast();


  const schema = yup.object({
    id: yup.number(),
    nombre: yup.string().required(textsValidaciones?.requerido || 'El nombre es requerido'),
    email: yup.string().email(textsValidaciones?.correoInvalido || 'Email inválido')
      .required(textsValidaciones?.correoRequerido || 'El email es requerido'),
    password: yup.string().when('id', {
      is: (id: number | undefined) => !id,
      then: (schema) => schema
        .required(textsValidaciones?.contrasena?.requerida || 'La contraseña es requerida')
        .min(6, textsValidaciones?.longitudMinima?.replace('{0}', '6') || 'La contraseña debe tener al menos 6 caracteres'),
      otherwise: (schema) => schema
    }),
    confirmPassword: yup.string().when('password', {
      is: (password: string | undefined) => !!password,
      then: (schema) => schema
        .required(textsValidaciones?.requerido || 'Confirme la contraseña')
        .oneOf([yup.ref('password')], textsValidaciones?.contrasena?.coinciden || 'Las contraseñas no coinciden'),
      otherwise: (schema) => schema
    }),
    rolId: yup.number().required(textsValidaciones?.requerido || 'El rol es requerido'),
    estadoId: yup.string().required(textsValidaciones?.requerido || 'El estado es requerido')
  });

  const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      rolId: -1,
      estadoId: ""
    }
  });

  const getAllUsuariosConRol = useCallback(async () => {
    const usuarios = await UsuarioService.getAllUsuariosConRol()
    if (usuarios && usuarios.data && usuarios.meta?.statusCode == 200) {
      setUsuarios(usuarios.data);
      console.log("Usuarios cargados correctamente : ", usuarios);
    } else {
      mostrarError("ERROR", textsUsuarios.mensajes.error.procesarUsuario);
    }
  }

  const getAllRoles = async () => {
    const rol = await SummaryService.obtenerSummaryRol()
    if (rol && rol.data && rol.meta?.statusCode == 200) {
      setRol(rol.data);
    } else {
      mostrarError("ERROR", "Error al cargar roles");
    }
  }



  useEffect(() => {
    getAllUsuariosConRol();
    getAllRoles();
  }, [getAllUsuariosConRol,getAllRoles]);




  const resetForm = (): void => {
    reset({
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      rolId: undefined,
      estadoId: undefined
    });
  };

  // Simulación de Toast

  // Funciones para gestión de usuarios
  const buttonAgregar = () => {
    setTypeButtonEvent('agregar');
    resetForm();
    setVisible(true);
  };

  const bottonEditar = (usuario: usuarioConRol) => {
    try {
      reset({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rolId: usuario.idRol,
        estadoId: usuario.estado
      });
      setTypeButtonEvent('editar');
      setVisible(true);
    } catch (error) {
      console.error('Error al editar el registro:', error);
    }
  };

  const confirmarEliminarUsuario = (usuario: usuarioConRol) => {
    confirmDialog({
      message: textsUsuarios.mensajeConfirmacion.replace('{0}', usuario?.nombre || ''),
      header: textsUsuarios.confirmacionEliminacion,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: textsUsuarios.siEliminar,
      rejectLabel: textsUsuarios.cancelar,
      defaultFocus: 'reject',
      accept: () => bottonEliminar(usuario),
      reject: () => { }
    });
  };

  const bottonEliminar = async (usuario: usuarioConRol) => {
    try {
      alert("Usuario eliminado con éxito: " + usuario?.nombre);
      const inactivar = await UsuarioService.inactivarUsuario(usuario.email)

      if (inactivar && inactivar.data && inactivar.meta?.statusCode == 200) {
        mostrarExito(textsUsuarios.eliminarUsuario, textsUsuarios.mensajes.exito.usuarioEliminado.replace('{0}', usuario?.nombre || ''));
        getAllUsuariosConRol();
      } else {
        mostrarError(textsUsuarios.mensajes.error.procesarUsuario, "Error al eliminar usuario");
      }
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
      mostrarError(textsUsuarios.mensajes.error.procesarUsuario, "Error al eliminar usuario");
    }
  };

  const agregarUsuario = async (data: FormUsuario) => {
    try {
      if (!data) return;
      const nuevoUsuario: usuarioConRol = {
        id: data.id,
        nombre: data.nombre,
        email: data.email,
        idRol: data.rolId,
        fechaRegistro: new Date(),
        estado: data.estadoId,
        password: data.password
      };

      const respuest = await UsuarioService.crearUsuario(nuevoUsuario);
      if (respuest && respuest.data && respuest.meta?.statusCode == 200) {
        setVisible(false);
        mostrarExito(textsUsuarios.mensajes.exito.usuarioCreado, textsUsuarios.mensajes.exito.usuarioCreado);
        resetForm();
        getAllUsuariosConRol();
      } else {
        mostrarError(textsUsuarios.mensajes.error.procesarUsuario, "Error al crear usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      mostrarError("Error", textsUsuarios.mensajes.error.procesarUsuario);
    }

  };

  const actualizarUsuario = async (data: FormUsuario) => {
    try {
      if (!data) return;

      const nuevoUsuario: usuarioConRol = {
        id: data.id,
        nombre: data.nombre,
        email: data.email,
        idRol: data.rolId,
        fechaRegistro: new Date(),
        estado: data.estadoId,
        password: "contraseña vaciaQ23#"
      };
      const respuest = await UsuarioService.actualizarUsuario(nuevoUsuario);
      if (respuest && respuest.data && respuest.meta?.statusCode == 200) {
        setVisible(false);
        mostrarExito(textsUsuarios.mensajes.exito.usuarioActualizado, textsUsuarios.mensajes.exito.usuarioActualizado);
        resetForm();
        getAllUsuariosConRol();
      } else {
        mostrarError(textsUsuarios.mensajes.error.procesarUsuario, "Error al actualizar usuario");
      }

    } catch (error) {
      console.error("Error:", error);
      mostrarError("Error", textsUsuarios.mensajes.error.procesarUsuario);
    }
  };

  const eventoSelectAccion = (data: FormUsuario) => {
    if (!data) {
      mostrarError(
        textsUsuarios.mensajes.error.sinDatos, 
        textsUsuarios.mensajes.error.sinDatos
      )
      return;
    }

    if (typeButtonEvent === 'editar') {
      actualizarUsuario(data);
    } else {
      agregarUsuario(data);
    }
  };

  const estadoTemplate = (rowData: usuarioConRol) => {
    if (!rowData || !rowData.estado) return null;
    const estado = rowData.estado === 'A' ? 'ACTIVO' : 'INACTIVO';
    const severity = rowData.estado === 'A' ? 'success' : 'danger';
    return <Badge value={estado} severity={severity} />;
  };

  const rolTemplate = (rowData: usuarioConRol) => {
    const rolEncontrado = rol.find(r => {
      return r.id == rowData.idRol;
    });
    const nombreRol = rolEncontrado ? rolEncontrado.nombre : "Desconocido";
    return <Badge value={nombreRol} severity={rolEncontrado?.id == 1 ? 'danger' : 'info'} />;
  };

  return (
    <div className="card" style={{
      width: '100%',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
      marginTop: '1.5rem',
    }}>
      <ConfirmDialog />
      <Divider />
      <div style={{ textAlign: 'center' }}>
        <Button icon="pi pi-plus"
          label={textsUsuarios.agregarUsuario}
          severity="success"
          text raised
          style={{ width: '200px' }}
          onClick={buttonAgregar} />
      </div>
      <Divider />
      <DataTable
        value={usuarios}
        paginator
        rows={5}
        first={0}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ width: '100%', textAlign: 'center' }}
        scrollable
        scrollHeight="400px"
        emptyMessage={textsUsuarios.sinUsuarios}
        size={'small'}
        showGridlines
        stripedRows
        selectionMode="single"
        className="text-center"
        loading={loading}
      >
        <Column
          filter
          field="id"
          header={textsUsuarios.tabla.id}
          filterPlaceholder={textsUsuarios.tabla.buscarPorId}
          style={{ width: '5%', textAlign: 'center' }}
        />
        <Column
          filter
          field="nombre"
          header={textsUsuarios.tabla.nombre}
          filterPlaceholder={textsUsuarios.tabla.buscarPorNombre}
          style={{ width: '20%' }}
        />
        <Column
          filter
          field="email"
          header={textsUsuarios.tabla.email}
          filterPlaceholder={textsUsuarios.tabla.buscarPorEmail}
          style={{ width: '20%' }}
        />
        <Column
          field="rol"
          header={textsUsuarios.tabla.rol}
          body={rolTemplate}
          filter
          style={{ width: '10%' }}
        />
        <Column
          field="estado"
          header={textsUsuarios.tabla.estado}
          body={estadoTemplate}
          filter
          style={{ width: '10%' }}
        />
        <Column
          field="fechaRegistro"
          header={textsUsuarios.tabla.fechaRegistro}
          filter
          style={{ width: '15%' }}
          body={(rowData) => new Date(rowData.fechaRegistro).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        />
        <Column
          header={textsUsuarios.tabla.acciones}
          style={{ width: '15%' }}
          headerStyle={{ textAlign: 'center' }}
          body={(rowData) => (
            <div className="action-buttons">
              <Button
                icon="pi pi-pencil"
                onClick={() => bottonEditar(rowData)}
                text raised
                severity="warning"
                style={{ marginRight: '5px' }}
              />
              {
                /*
                <Button
                icon="pi pi-trash"
                onClick={() => confirmarEliminarUsuario(rowData)}
                text raised
                severity="danger"
              />
                */
              }

            </div>
          )}
        />
      </DataTable>

      <Dialog
        header={typeButtonEvent === "editar" ? textsUsuarios.editarUsuario : textsUsuarios.agregarUsuario}
        visible={visible}
        style={{ width: '450px' }}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleSubmit(eventoSelectAccion)} className="form-container">
          {typeButtonEvent === "editar" && (
            <div className="form-group">
              <label htmlFor="id" className="form-label">{textsUsuarios.formulario.id}</label>
              <InputNumber
                id="id"
                className="form-input"
                disabled
                value={watch('id')}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="nombre" className="form-label">{textsUsuarios.formulario.nombreLabel}</label>
            <InputText
              id="nombre"
              className="form-input"
              value={watch('nombre')}
              onChange={(e) => setValue('nombre', e.target.value)}
            />
            {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">{textsUsuarios.formulario.emailLabel}</label>
            <InputText
              id="email"
              className="form-input"
              value={watch('email')}
              onChange={(e) => setValue('email', e.target.value)}
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
          </div>

          {(typeButtonEvent !== "editar" || !watch('id')) && (
            <>
              <div className="form-group">
                <label htmlFor="password" className="form-label">{textsUsuarios.formulario.passwordLabel}</label>
                <InputText
                  id="password"
                  type="password"
                  className="form-input"
                  value={watch('password')}
                  onChange={(e) => setValue('password', e.target.value)}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">{textsUsuarios.formulario.confirmPasswordLabel}</label>
                <InputText
                  id="confirmPassword"
                  type="password"
                  className="form-input"
                  value={watch('confirmPassword')}
                  onChange={(e) => setValue('confirmPassword', e.target.value)}
                />
                {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="rolId" className="form-label">{textsUsuarios.formulario.rolLabel}</label>
            <Dropdown
              id="rolId"
              options={rol}
              className="form-select"
              optionLabel="nombre"
              optionValue="id"
              value={watch('rolId')}
              onChange={(e) => setValue('rolId', e.target.value)}
            />
            {errors.rolId && <p style={{ color: 'red' }}>{errors.rolId.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="estadoId" className="form-label">{textsValidaciones.estadoRequerido}</label>
            <Dropdown
              id="estadoId"
              options={estado}
              className="form-select"
              optionLabel="nombre"
              optionValue="id"
              value={watch('estadoId')}
              onChange={(e) => setValue('estadoId', e.target.value)}
            />
            {errors.estadoId && <p style={{ color: 'red' }}>{errors.estadoId.message}</p>}
          </div>

          <Button
            type="submit"
            label={
              typeButtonEvent === "editar" 
                ? textsUsuarios.formulario.editarUsuario 
                : textsUsuarios.formulario.guardarUsuario
            }
            className="form-button"
            severity="success"
            outlined
          />
        </form>
      </Dialog>
    </div>
  );
}