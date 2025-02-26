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
    emailRequerido: string;
    emailValido: string;
    contrasenaRequerida: string;
  };
  usuarios: {
    titulo: string;
    agregarUsuario: string;
    editarUsuario: string;
    sinUsuarios: string;
    tabla: {
      id: string;
      nombre: string;
      email: string;
      rol: string;
      estado: string;
      fechaRegistro: string;
      acciones: string;
      buscarPorId: string;
      buscarPorNombre: string;
      buscarPorEmail: string;
    };
    formulario: {
      id: string;
      nombreLabel: string;
      emailLabel: string;
      passwordLabel: string;
      confirmPasswordLabel: string;
      rolLabel: string;
      estadoLabel: string;
      guardarUsuario: string;
      editarUsuario: string;
    };
    mensajeConfirmacion: string;
    confirmacionEliminacion: string;
    siEliminar: string;
    cancelar: string;
    eliminarUsuario: string;
    mensajes: {
      exito: {
        usuarioCreado: string;
        usuarioActualizado: string;
        usuarioEliminado: string;
      };
      error: {
        procesarUsuario: string;
        sinDatos: string;
        sesion: string;
      };
      advertencia: {
        errorCargarUsuarios: string;
      };
      informacion: {
        nuevoUsuario: string;
      };
    };
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
    buscar: string;
    vencimiento: string;
    confirmacionEliminacion: string;
    mensajeConfirmacion: string;
    siEliminar: string;
    cancelar: string;
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
      guardarTarea: string;
      editarTarea: string;
    };
    tabla: {
      filasPorPagina: string;
      numTarea: string;
      buscarPorId: string;
      buscarPorTitulo: string;
      buscarPorDescripcion: string;
      buscarPorUsuario: string;
    };
  };
  validaciones: {
    requerido: string;
    correoRequerido: string;
    longitudMinima: string;
    soloLetras: string;
    correoInvalido: string;
    tituloRequerido: string;
    descripcionRequerida: string;
    estadoRequerido: string;
    fechaRequerida: string;
    contrasena: {
      requerida: string;
      longitudMinima: string;
      mayuscula: string;
      minuscula: string;
      numero: string;
      caracterEspecial: string;
      coinciden: string; // Added for password matching validation
    };
    fechaPosterior: string;
  };
  mensajes: {
    exito: {
      bienvenido: string;
      usuarioCreado: string;
      tareaCreada: string;
      tareaActualizada: string;
      tareaEliminada: string;
    };
    error: {
      inicioSesion: string;
      registro: string;
      cargarTareas: string;
      cargarEstados: string;
      procesarTarea: string;
      sesion: string;
      sinDatos: string;
    };
    informacion: {
      nuevaTarea: string;
    };
    advertencia: {
      errorCargarTareas: string;
      errorCargarEstados: string;
    };
  };
  botones: {
    aceptar: string;
    cancelar: string;
    guardar: string;
    editar: string;
    eliminar: string;
    agregar: string;
  };
  fechas: {
    formatoFecha: string;
    meses: {
      enero: string;
      febrero: string;
      marzo: string;
      abril: string;
      mayo: string;
      junio: string;
      julio: string;
      agosto: string;
      septiembre: string;
      octubre: string;
      noviembre: string;
      diciembre: string;
    };
  };
}

export type Language = 'en' | 'es';