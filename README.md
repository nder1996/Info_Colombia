# 🚀 TaskMaster - Sistema de Gestión de Tareas

## ✨ Descripción

TaskMaster es una aplicación para gestión de tareas con autenticación, roles de usuario y notificaciones en tiempo real. Permite crear, asignar y seguir tareas de manera eficiente y colaborativa.


## 🌟 Características principales

### 🔐 Autenticación y roles de usuario

- **Administradores**: Gestión completa de usuarios y tareas, asignación de tareas a cualquier usuario, visualización de todas las tareas del sistema
- **Usuarios regulares**: Gestión de sus propias tareas, visualización personalizada, recepción de notificaciones

### 📝 Funcionalidades clave

- Gestión completa de tareas (CRUD)
- Panel administrativo de usuarios
- Notificaciones en tiempo real
- Interfaz multiidioma (Español/Inglés)
- Diseño responsive
- Filtros y búsqueda avanzada

## 🏗️ Arquitectura detallada

### Backend - Arquitectura Hexagonal (Ports & Adapters)

El backend sigue una arquitectura hexagonal que separa claramente las capas de la aplicación:

#### 📋 Capa de aplicación (`application`)
- **Controllers**: Punto de entrada para las peticiones HTTP, validación básica y enrutamiento
- **DTOs (Data Transfer Objects)**: Objetos para la transferencia de datos entre capas
- **Services**: Orquestación de la lógica de negocio y casos de uso

#### 🧠 Capa de dominio (`domain`)
- **Models**: Entidades de negocio con lógica de dominio
- **Repository Interfaces**: Contratos para acceso a datos

#### 🔧 Capa de infraestructura (`infrastructure`)
- **Security**: Implementación JWT, configuración de Spring Security
- **Repositories Implementation**: Implementaciones concretas usando MyBatis
- **Exception Handling**: Manejo global de excepciones
- **WebSocket Configuration**: Configuración para notificaciones en tiempo real

### Frontend - Arquitectura basada en componentes

#### 🧩 Estructura de componentes
- **InicioSession**: Componentes de autenticación con validación de formularios
- **Registrarse**: Formularios de registro con validación compleja de contraseñas
- **gestion-tareas**: Interfaz principal con DataTable para visualización y gestión de tareas
- **gestion-usuarios**: Panel administrativo con gestión completa de usuarios y roles
- **navbar-idioma**: Barra de navegación con selector de idioma y menú de usuario
- **LoadingSpinner**: Indicador de carga global para operaciones asíncronas

#### 🎨 UI/UX implementada
- **Diseño responsive**: Adaptable a móviles, tablets y escritorio
- **Tema consistente**: Uso de variables CSS para consistencia visual
- **Feedback visual**: Notificaciones toast para confirmaciones y errores
- **Formularios intuitivos**: Validación en tiempo real con mensajes claros
- **Tablas interactivas**: Filtrado, paginación y ordenación

#### 🧠 Gestión de estado
- **Zustand Store**: Estado global con slices para autenticación, tareas y usuarios
- **React Context**: Contextos para idioma (LanguageContext) y notificaciones (ToastContext)
- **Form State**: Manejo de estado de formularios con React Hook Form
- **Local Storage**: Persistencia de autenticación y preferencias

### 🌐 Infraestructura en la nube

#### 🗄️ Base de datos
- **MySQL en la nube**: Alojada en AlwaysData para acceso global
- **Esquema optimizado**: Índices y relaciones para consultas eficientes
- **Backup automático**: Copias de seguridad programadas

#### ☁️ Despliegue
- **Backend**: API REST desplegada en Render
- **Frontend**: Aplicación React desplegada en Netlify
- **CI/CD**: Integración y despliegue continuo desde GitHub

## 💾 Modelo de datos

### Entidades principales
- **Usuario**: Información de cuenta y autenticación
- **Rol**: Definición de roles (Admin, Usuario)
- **Tarea**: Detalles de la tarea, asignaciones, estados
- **EstadoTarea**: Posibles estados de las tareas (Pendiente, En Progreso, Completada)
- **LogSistemas**: Registro de actividades y auditoría

## 🔍 Demo en vivo

Prueba la aplicación en: https://meek-quokka-2cc7d8.netlify.app/login

**Credenciales de prueba:**
- **Administrador**: admin@sistema.com / Admin123
- **Usuario**: juan.perez@ejemplo.com / Admin123

Detalles de Despliegue

Backend: Render con Docker
Frontend: Netlify
Base de Datos: MySQL en AlwaysData
URL: https://meek-quokka-2cc7d8.netlify.app/login

Pasos de Despliegue

Construcción de imagen Docker
Subir a repositorio
Desplegar en plataformas cloud


## 🚀 Aspectos técnicos destacados

### Frontend
- **Componentes reutilizables**: Botones, campos, tarjetas y modales consistentes
- **Rutas protegidas**: Navegación segura basada en roles con React Router
- **Formularios avanzados**: Validación con Yup y React Hook Form
- **Estado global eficiente**: Gestión con Zustand y suscripciones optimizadas
- **Internacionalización completa**: Sistema de traducciones con soporte para plantillas

### Backend
- **Spring Security**: Autenticación basada en JWT con filtros personalizados
- **WebSocket + STOMP**: Implementación de notificaciones en tiempo real
- **MyBatis**: Mapeo objeto-relacional con SQL personalizables
- **AOP (Aspect-Oriented Programming)**: Para logging y monitoreo transversal

## ⚙️ Instalación y configuración

### Backend

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/taskmaster.git 

# Navegar al directorio del backend
cd taskmaster/backend

# Compilar y ejecutar
./mvnw spring-boot:run
```

### Frontend

```bash
# Navegar al directorio del frontend
cd taskmaster/frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Compilar para producción
npm run build
```

## 📊 Detalles de implementación

### 📱 Responsive Design
- **Media queries**: Adaptación a múltiples tamaños de pantalla
- **Flexbox/Grid**: Layout fluido y adaptable
- **Componentes adaptables**: Comportamiento específico según dispositivo

### 🎯 Funcionalidades destacadas
- **Búsqueda avanzada**: Filtrado por múltiples criterios simultáneos
- **Internacionalización**: Cambio de idioma en tiempo real
- **Notificaciones**: Alertas en tiempo real para nuevas tareas
- **Gestión de permisos**: Diferentes vistas y funcionalidades según rol

## 📞 Contacto

Desarrollado por Anderson Arévalo Madrid

- Email: arevalomadrid62776@gmail.com
