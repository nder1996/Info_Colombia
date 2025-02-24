import { ITranslations, Language } from "./types";

export const traducciones: Record<Language, ITranslations> = {
    es: {
      autenticacion: {
        bienvenido: "¡Bienvenido!",
        bienvenidoDeNuevo: "Bienvenido de nuevo",
        iniciarSesion: "Iniciar Sesión",
        registrarse: "Registrarse", 
        correo: "Correo electrónico",
        contrasena: "Contraseña",
        confirmarContrasena: "Confirmar Contraseña",
        enviar: "Enviar",
        olvidasteContrasena: "¿Olvidaste tu contraseña?",
        noTienesCuenta: "¿No tienes una cuenta?",
        crearCuenta: "Crear Cuenta",
        comenzarViaje: "Comienza tu viaje con nosotros",
        nombreCompleto: "Nombre completo",
        emailRequerido: "El correo electrónico es requerido",
        emailValido: "Ingrese un correo electrónico válido",
        contrasenaRequerida: "La contraseña es requerida"
      },
      tareas: {
        titulo: "Título",
        descripcion: "Descripción",
        estado: "Estado",
        fechaVencimiento: "Fecha de vencimiento",
        asignadoA: "Asignado a",
        fechaCreacion: "Fecha de creación",
        acciones: "Acciones",
        agregarTarea: "Agregar Tarea",
        editarTarea: "Editar Tarea",
        eliminarTarea: "Eliminar Tarea", 
        sinTareas: "No se encontraron tareas",
        guardar: "Guardar",
        buscar: "Buscar",
        vencimiento: "Vencimiento",
        confirmacionEliminacion: "Confirmación de eliminación",
        mensajeConfirmacion: "¿Está seguro que desea eliminar la tarea \"{0}\"?",
        siEliminar: "Sí, eliminar",
        cancelar: "Cancelar",
        estados: {
          pendiente: "PENDIENTE",
          enProgreso: "EN_PROGRESO",
          completada: "COMPLETADA"
        },
        formulario: {
          numeroTarea: "Tarea N°",
          tituloLabel: "Título",
          descripcionLabel: "Descripción",
          fechaVencimientoLabel: "Fecha de vencimiento",
          estadoLabel: "Estado",
          asignarLabel: "Asignar Tarea",
          seleccionarUsuario: "Seleccionar Usuario",
          guardarTarea: "Guardar Tarea",
          editarTarea: "Editar Tarea"
        },
        tabla: {
          filasPorPagina: "Filas por página",
          numTarea: "N° Tarea",
          buscarPorId: "Buscar por ID",
          buscarPorTitulo: "Buscar por título",
          buscarPorDescripcion: "Buscar por descripción",
          buscarPorUsuario: "Buscar por usuario"
        }
      },
      validaciones: {
        requerido: "Este campo es requerido",
        correoRequerido: "El correo electrónico es requerido",
        longitudMinima: "Debe tener al menos {0} caracteres",
        soloLetras: "Solo se permiten letras",
        correoInvalido: "Formato de correo inválido",
        tituloRequerido: "El título es requerido",
        descripcionRequerida: "La descripción es requerida",
        estadoRequerido: "El estado es requerido",
        fechaRequerida: "La fecha es requerida",
        contrasena: {
          requerida: "La contraseña es requerida",
          longitudMinima: "Debe tener al menos 8 caracteres",
          mayuscula: "Debe contener una mayúscula",
          minuscula: "Debe contener una minúscula",
          numero: "Debe contener un número",
          caracterEspecial: "Debe contener un carácter especial"
        },
        fechaPosterior: "La fecha debe ser posterior a hoy"
      },
      mensajes: {
        exito: {
          bienvenido: "¡Bienvenido {0}!",
          usuarioCreado: "Nuevo usuario registrado exitosamente",
          tareaCreada: "Tarea creada exitosamente",
          tareaActualizada: "Tarea actualizada exitosamente",
          tareaEliminada: "Tarea {0} eliminada"
        },
        error: {
          inicioSesion: "Error al procesar el inicio de sesión",
          registro: "Error al registrar el usuario",
          cargarTareas: "Error al cargar las tareas",
          cargarEstados: "Error al cargar los estados",
          procesarTarea: "Error al procesar la tarea",
          sesion: "No hay sesión activa",
          sinDatos: "No hay datos para procesar"
        },
        informacion: {
          nuevaTarea: "Nueva Tarea Agregada"
        },
        advertencia: {
          errorCargarTareas: "Error al cargar las tareas",
          errorCargarEstados: "Error al traer los estados"
        }
      },
      botones: {
        aceptar: "Aceptar",
        cancelar: "Cancelar",
        guardar: "Guardar",
        editar: "Editar",
        eliminar: "Eliminar",
        agregar: "Agregar"
      },
      fechas: {
        formatoFecha: "dd/mm/yy",
        meses: {
          enero: "enero",
          febrero: "febrero",
          marzo: "marzo",
          abril: "abril",
          mayo: "mayo",
          junio: "junio",
          julio: "julio",
          agosto: "agosto",
          septiembre: "septiembre",
          octubre: "octubre",
          noviembre: "noviembre",
          diciembre: "diciembre"
        }
      }
    },
    en: {
      autenticacion: {
        bienvenido: "Welcome!",
        bienvenidoDeNuevo: "Welcome Back",
        iniciarSesion: "Login",
        registrarse: "Register",
        correo: "Email",
        contrasena: "Password",
        confirmarContrasena: "Confirm Password",
        enviar: "Submit",
        olvidasteContrasena: "Forgot Password?",
        noTienesCuenta: "Don't have an account?",
        crearCuenta: "Create Account",
        comenzarViaje: "Start your journey with us",
        nombreCompleto: "Full Name",
        emailRequerido: "Email is required",
        emailValido: "Please enter a valid email",
        contrasenaRequerida: "Password is required"
      },
      tareas: {
        titulo: "Title",
        descripcion: "Description",
        estado: "Status",
        fechaVencimiento: "Due Date",
        asignadoA: "Assigned To",
        fechaCreacion: "Creation Date",
        acciones: "Actions",
        agregarTarea: "Add Task",
        editarTarea: "Edit Task",
        eliminarTarea: "Delete Task",
        sinTareas: "No tasks found",
        guardar: "Save",
        buscar: "Search",
        vencimiento: "Due Date",
        confirmacionEliminacion: "Delete Confirmation",
        mensajeConfirmacion: "Are you sure you want to delete the task \"{0}\"?",
        siEliminar: "Yes, delete",
        cancelar: "Cancel",
        estados: {
          pendiente: "PENDING",
          enProgreso: "IN_PROGRESS",
          completada: "COMPLETED"
        },
        formulario: {
          numeroTarea: "Task #",
          tituloLabel: "Title",
          descripcionLabel: "Description",
          fechaVencimientoLabel: "Due Date",
          estadoLabel: "Status",
          asignarLabel: "Assign Task",
          seleccionarUsuario: "Select User",
          guardarTarea: "Save Task",
          editarTarea: "Edit Task"
        },
        tabla: {
          filasPorPagina: "Rows per page",
          numTarea: "Task #",
          buscarPorId: "Search by ID",
          buscarPorTitulo: "Search by title",
          buscarPorDescripcion: "Search by description",
          buscarPorUsuario: "Search by user"
        }
      },
      validaciones: {
        requerido: "This field is required",
        correoRequerido: "Email is required",
        longitudMinima: "Must be at least {0} characters",
        soloLetras: "Only letters allowed",
        correoInvalido: "Invalid email format",
        tituloRequerido: "Title is required",
        descripcionRequerida: "Description is required",
        estadoRequerido: "Status is required",
        fechaRequerida: "Date is required",
        contrasena: {
          requerida: "Password is required",
          longitudMinima: "Must be at least 8 characters",
          mayuscula: "Must contain an uppercase letter",
          minuscula: "Must contain a lowercase letter", 
          numero: "Must contain a number",
          caracterEspecial: "Must contain a special character"
        },
        fechaPosterior: "Date must be after today"
      },
      mensajes: {
        exito: {
          bienvenido: "Welcome {0}!",
          usuarioCreado: "New user registered successfully",
          tareaCreada: "Task created successfully",
          tareaActualizada: "Task updated successfully",
          tareaEliminada: "Task {0} deleted"
        },
        error: {
          inicioSesion: "Error processing login",
          registro: "Error registering user",
          cargarTareas: "Error loading tasks",
          cargarEstados: "Error loading statuses",
          procesarTarea: "Error processing task",
          sesion: "No active session",
          sinDatos: "No data to process"
        },
        informacion: {
          nuevaTarea: "New Task Added"
        },
        advertencia: {
          errorCargarTareas: "Error loading tasks",
          errorCargarEstados: "Error loading statuses"
        }
      },
      botones: {
        aceptar: "Accept",
        cancelar: "Cancel",
        guardar: "Save",
        editar: "Edit",
        eliminar: "Delete",
        agregar: "Add"
      },
      fechas: {
        formatoFecha: "mm/dd/yy",
        meses: {
          enero: "January",
          febrero: "February",
          marzo: "March",
          abril: "April",
          mayo: "May",
          junio: "June",
          julio: "July",
          agosto: "August",
          septiembre: "September",
          octubre: "October",
          noviembre: "November",
          diciembre: "December"
        }
      }
    }
  };