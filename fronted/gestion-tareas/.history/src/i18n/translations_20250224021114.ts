export type Language = 'en' | 'es';

export interface ITranslations {
  autenticacion: {
    bienvenido: string;
    bienvenidoDeNuevo: string;
    iniciarSesion: string;
    registrarse: string;
    correo: string;
    contrasena: string;
    confirmarContrasena: string;
    enviar: string;
    olvidasteContrasena: string;
    noTienesCuenta: string;
    crearCuenta: string;
    comenzarViaje: string;
    nombreCompleto: string;
  };
  tareas: {
    titulo: string;
    descripcion: string;
    estado: string;
    fechaVencimiento: string;
    asignadoA: string;
    fechaCreacion: string;
    acciones: string;
    agregarTarea: string;
    editarTarea: string;
    eliminarTarea: string;
    sinTareas: string;
    guardar: string;
    estados: {
      pendiente: string;
      enProgreso: string;
      completada: string;
    };
    formulario: {
      numeroTarea: string;
      tituloLabel: string;
      descripcionLabel: string;
      fechaVencimientoLabel: string;
      estadoLabel: string;
      asignarLabel: string;
      seleccionarUsuario: string;
    }
  };
  validaciones: {
    requerido: string;
    correoRequerido: string;
    longitudMinima: string;
    soloLetras: string;
    correoInvalido: string;
    contrasena: {
      requerida: string;
      longitudMinima: string;
      mayuscula: string;
      minuscula: string;
      numero: string;
      caracterEspecial: string;
    };
    fechaPosterior: string;
  };
  mensajes: {
    exito: {
      bienvenido: string;
      usuarioCreado: string;
      tareaCreada: string;
      tareaActualizada: string;
    };
    error: {
      inicioSesion: string;
      registro: string;
      cargarTareas: string;
      cargarEstados: string;
      procesarTarea: string;
      sesion: string;
    }
  }
}
