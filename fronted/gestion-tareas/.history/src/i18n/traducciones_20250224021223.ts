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
        nombreCompleto: "Nombre completo"
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
          seleccionarUsuario: "Seleccionar Usuario"
        }
      },
      validaciones: {
        requerido: "Este campo es requerido",
        correoRequerido: "El correo electrónico es requerido",
        longitudMinima: "Debe tener al menos {0} caracteres",
        soloLetras: "Solo se permiten letras",
        correoInvalido: "Formato de correo inválido",
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
          tareaActualizada: "Tarea actualizada exitosamente"
        },
        error: {
          inicioSesion: "Error al procesar el inicio de sesión",
          registro: "Error al registrar el usuario",
          cargarTareas: "Error al cargar las tareas",
          cargarEstados: "Error al cargar los estados",
          procesarTarea: "Error al procesar la tarea",
          sesion: "No hay sesión activa"
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
        nombreCompleto: "Full Name"
      },
      tareas: {
        titulo: "Title",
        descripcion: "Description",
        estado: "Status",
        fechaVencimiento: "Due Date",
        asignadoA: "Assigned To",
        fechaCreacion: "Create Date",
        acciones: "Actions",
        agregarTarea: "Add Task",
        editarTarea: "Edit Task",
        eliminarTarea: "Delete Task",
        sinTareas: "No tasks found",
        guardar: "Save",
        estados: {
          pendiente: "PENDING",
          enProgreso: "IN_PROGRESS",
          completada: "COMPLETED"
        },
        formulario: {
          numeroTarea: "Task N°",
          tituloLabel: "Title",
          descripcionLabel: "Description",
          fechaVencimientoLabel: "Due Date",
          estadoLabel: "Status",
          asignarLabel: "Assign Task",
          seleccionarUsuario: "Select User"
        }
      },
      validaciones: {
        requerido: "This field is required",
        correoRequerido: "Email is required",
        longitudMinima: "Must be at least {0} characters",
        soloLetras: "Only letters allowed",
        correoInvalido: "Invalid email format",
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
          tareaActualizada: "Task updated successfully"
        },
        error: {
          inicioSesion: "Error processing login",
          registro: "Error registering user",
          cargarTareas: "Error loading tasks",
          cargarEstados: "Error loading statuses",
          procesarTarea: "Error processing task",
          sesion: "No active session"
        }
      }
    }
  };