# InfoCasas Task Manager

Aplicación de gestión de tareas personales desarrollada como desafío técnico para el puesto de Full Stack Developer en InfoCasas.

## 🚀 Tecnologías Utilizadas

### Backend
- **Framework**: Laravel (PHP)
- **Base de datos**: PostgreSQL
- **API**: REST con operaciones CRUD

### Frontend
- **Framework**: React
- **Lenguaje**: JavaScript

## 📁 Estructura del Proyecto

```
infocasas-task-manager/
├── backend/          # Laravel + PostgreSQL
├── frontend/         # React app (por crear)
├── README.md
└── .gitignore
```

## 🛠️ Instalación y Ejecución

### Prerrequisitos
- PHP 8.1 o superior
- Composer
- PostgreSQL

### Backend

1. **Clonar el repositorio:**
```bash
git clone https://github.com/blumaconi/infocasas-task-manager.git
cd infocasas-task-manager/backend
```

2. **Instalar dependencias:**
```bash
composer install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

**Importante:** Laravel requiere el archivo `.env` para funcionar. El archivo `.env.example` es solo una plantilla que debe copiarse y configurarse.

Configurar el archivo `.env` con los parámetros de PostgreSQL:
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=task_manager_bd
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
```

**Nota:** Reemplazar `tu_usuario` y `tu_password` con las credenciales de PostgreSQL del sistema.

4. **Generar clave de aplicación:**
```bash
php artisan key:generate
```

5. **Crear la base de datos:**
```bash
psql -U tu_usuario -d postgres -c "CREATE DATABASE task_manager_bd;"
```

6. **Ejecutar migraciones:**
```bash
php artisan migrate
```

7. **Cargar datos de ejemplo**
```bash
php artisan db:seed
```

8. **Iniciar el servidor:**
```bash
php artisan serve
```

El backend estará disponible en `http://127.0.0.1:8000`

## 🛠️ Funcionalidades Implementadas

### Backend
- **API REST** con endpoints para gestión de tareas
- **Operaciones CRUD**:
  - Crear tarea (POST /api/tasks)
  - Listar tareas (GET /api/tasks)
  - Obtener tarea específica (GET /api/tasks/{id})
  - Actualizar tarea (PUT /api/tasks/{id})
  - Eliminar tarea (DELETE /api/tasks/{id})

- **Filtros y búsqueda**:
  - Filtrar por estado completado (?completed=true/false)
  - Búsqueda por nombre (?search=keyword) - case-insensitive

- **Manejo de errores**:
  - QueryException para errores de base de datos
  - Respuestas JSON consistentes
  - Validación de datos de entrada

## 🧱 Estructura Técnica

### Backend
- **Framework**: Laravel
- **Base de datos**: PostgreSQL
- **Rutas**: `routes/api.php`
- **Controlador**: `app/Http/Controllers/TaskController.php`
- **Modelo**: `app/Models/Task.php`
- **Migración**: `database/migrations/2025_07_29_165245_create_tasks_table.php`
- **Seeder**: `database/seeders/TaskSeeder.php` con datos de ejemplo

### Configuración
- **RouteServiceProvider**: Registrado en `bootstrap/providers.php`
- **Manejo de errores**: QueryException con respuestas JSON
- **Filtros dinámicos**: Search y completed sin acoplamiento a DB específica

## 📊 Datos de Ejemplo

Ejecuta `php artisan db:seed` para cargar tareas de ejemplo:
- "Do the laundry" (completada)
- "Get gas" (pendiente)
- "Clean the yard" (pendiente)
- "Water the plants" (completada)
- "Do the shopping" (completada)

## 🧪 Testing

- **Tests automatizados** para todos los endpoints de la API
- **14 tests** que cubren todas las funcionalidades:
  - Operaciones CRUD completas
  - Validación de datos de entrada
  - Manejo de errores (404, 422, 500)
  - Filtros por estado completado
  - Búsqueda por nombre
  - Combinación de filtros y búsqueda

- **Ejecutar tests:**
```bash
php artisan test --filter=TaskApiTest
```

- API probada con Postman
- Manejo de errores de base de datos verificado
- Todos los endpoints funcionando
- Filtros y búsqueda probados