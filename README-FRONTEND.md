# Frontend - InfoCasas Task Manager

Documentación detallada del frontend desarrollado con React, TypeScript y Vite.

## 🚀 Tecnologías

- **Framework**: React 18
- **Lenguaje**: TypeScript
- **Build Tool**: Vite
- **Styling**: Bootstrap 5
- **HTTP Client**: Axios
- **Testing**: Vitest + Testing Library

## 🛠️ Instalación Detallada

### Prerrequisitos

#### Node.js 18 o superior
- **Windows y Mac:** Descargar e instalar Node.js (incluye npm) desde [nodejs.org](https://nodejs.org/).

### Instalación

1. **Navegar al directorio del frontend:**
```bash
cd frontend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

**Nota:** Asegúrate de que el backend esté ejecutándose en `http://127.0.0.1:8000` para que el frontend pueda conectarse a la API.

## 🛠️ Funcionalidades Implementadas

### Interfaz de usuario moderna
- **Bootstrap 5** para diseño responsive
- **Layout centrado** y optimizado
- **Componentes modulares** reutilizables

### Gestión de tareas
- **Formulario** para crear nuevas tareas
- **Lista de tareas** con estado visual
- **Edición de tareas** mediante modal
- **Eliminación** con confirmación

### Filtros y búsqueda
- **Búsqueda en tiempo real** por nombre de tarea
- **Filtro** para mostrar solo tareas completadas
- **Combinación** de búsqueda y filtros

### Experiencia de usuario
- **Estados de carga** (loading spinners)
- **Manejo de errores** con mensajes informativos
- **Diseño responsive** y centrado
- **Interacciones intuitivas** con modales

### Arquitectura modular
- **Componentes reutilizables** (TaskForm, TaskList, SearchBar, FilterToggle)
- **Custom hooks** para lógica de negocio (useTasks)
- **Servicios** para comunicación con API
- **Tipos TypeScript** para type safety

## 🧱 Estructura Técnica

### Configuración
- **Vite**: Configurado para desarrollo rápido y build optimizado
- **TypeScript**: Configuración estricta para type safety
- **Bootstrap**: Framework CSS para diseño responsive
- **Axios**: Configurado con interceptors para manejo global de errores
- **Vitest**: Configurado con jsdom para testing de componentes React

### Componentes principales
- **TaskForm**: Formulario para crear nuevas tareas
- **TaskList**: Lista de tareas con funcionalidades de edición y eliminación
- **SearchBar**: Búsqueda en tiempo real
- **FilterToggle**: Filtro por estado completado
- **App**: Componente principal que integra todos los demás

### Hooks y servicios
- **useTasks**: Custom hook para gestión de estado de tareas
- **api.ts**: Servicio para comunicación con el backend
- **Task.ts**: Interfaces TypeScript para type safety

## 🧪 Testing

### Tests unitarios
- **TaskForm**: 4 tests (rendering, submission, loading states)
- **SearchBar**: 4 tests (rendering, interactions, controlled component)
- **FilterToggle**: 5 tests (rendering, interactions, controlled states)
- **TaskList**: 9 tests (rendering, interactions, modals, delete/edit flows)

### Tests de integración
- **App Integration**: 5 tests (component rendering, task creation, editing, deletion flows)

### Ejecutar tests
```bash
# Todos los tests
npm run test

# Solo tests unitarios
npm run test:unit

# Tests con interfaz gráfica
npm run test:ui
```

### Configuración de testing
- **Vitest** con jsdom para simular DOM
- **Testing Library** para queries accesibles
- **Mocks** para hooks y servicios
- **Tests organizados** por funcionalidad

## 🛡️ Manejo de Errores

### Manejo de errores de API
- **Interceptors de Axios** para logging global
- **Diferenciación** entre errores 404, 422 y 500
- **Mensajes de error** informativos para el usuario

### Estados de carga
- **Loading spinners** durante operaciones asíncronas
- **Botones deshabilitados** durante carga
- **Feedback visual** inmediato

### Validación de formularios
- **Validación en tiempo real**
- **Prevención de envíos** vacíos
- **Mensajes de error** contextuales

### Experiencia de usuario
- **Modales de confirmación** para acciones destructivas
- **Estados de error** con opciones de reintento
- **Diseño responsive** que funciona en todos los dispositivos

## 🚀 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar tests
npm run test

# Linting
npm run lint
```

## 📝 Notas de Desarrollo

- **Aplicación React moderna** con TypeScript y testing completo
- **Arquitectura modular** con componentes reutilizables
- **Type safety** con TypeScript
- **Testing completo** con Vitest y Testing Library
- **Diseño responsive** con Bootstrap
- **Integración perfecta** con el backend Laravel 