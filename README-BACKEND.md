# Backend - InfoCasas Task Manager

Documentación detallada del backend desarrollado con Laravel y PostgreSQL.

## 🚀 Tecnologías

- **Framework**: Laravel (PHP)
- **Base de datos**: PostgreSQL
- **API**: REST con operaciones CRUD
- **Testing**: PHPUnit

## 🛠️ Instalación Detallada

### Prerrequisitos

#### PHP 8.1 o superior
- **Windows:** Descargar desde [windows.php.net](https://windows.php.net/download/). Se recomienda usar [XAMPP](https://www.apachefriends.org/es/index.html) o [Laragon](https://laragon.org/) para facilitar la instalación.
- **Mac:** Instalar con Homebrew:
  ```bash
  brew install php
  ```

#### Composer
- **Windows:** Descargar e instalar desde [getcomposer.org/Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe).
- **Mac:** Instalar con Homebrew:
  ```bash
  brew install composer
  ```

#### PostgreSQL
- **Windows y Mac:** Descargar desde [postgresql.org/download](https://www.postgresql.org/download/). El instalador incluye pgAdmin para gestión visual.

### Instalación

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
DB_USERNAME=usuario
DB_PASSWORD=password
```

**Nota:** Reemplazar `usuario` y `password` con las credenciales de PostgreSQL del sistema.

4. **Generar clave de aplicación:**

**Importante:** Debes ejecutar este comando desde el directorio `backend`:

```bash
php artisan key:generate
```

5. **Crear la base de datos:**

**Nota:** Antes de crear la base de datos, necesitas saber tu usuario de PostgreSQL:

- **Windows:** El usuario suele ser el nombre de tu cuenta de Windows. Puedes verlo ejecutando `echo %USERNAME%` en la terminal de comandos.
- **Mac:** El usuario es el nombre de tu usuario en el sistema. Puedes verlo ejecutando `whoami` en la terminal.

```bash
psql -U tu_usuario -d postgres -c "CREATE DATABASE task_manager_bd;"
```

6. **Ejecutar migraciones:**
```bash
php artisan migrate
```
**Nota:** Las migraciones crean la estructura de la base de datos (tabla `tasks` con campos id, name, completed, timestamps).

7. **Cargar datos de ejemplo:**
```bash
php artisan db:seed
```
**Nota:** Los seeds insertan tareas de ejemplo para probar la aplicación (5 tareas con diferentes estados).

8. **Iniciar el servidor:**
```bash
php artisan serve
```

El backend estará disponible en `http://127.0.0.1:8000`

## 🛠️ Funcionalidades Implementadas

### API REST
- **Operaciones CRUD**:
  - Crear tarea (POST /api/tasks)
  - Listar tareas (GET /api/tasks)
  - Obtener tarea específica (GET /api/tasks/{id})
  - Actualizar tarea (PUT /api/tasks/{id})
  - Eliminar tarea (DELETE /api/tasks/{id})

### Filtros y búsqueda
- Filtrar por estado completado (?completed=true/false)
- Búsqueda por nombre (?search=keyword) - case-insensitive
- Combinación de filtros y búsqueda

### Manejo de errores
- QueryException para errores de base de datos
- Respuestas JSON consistentes
- Validación de datos de entrada

## 🧱 Estructura Técnica

### Archivos principales
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

### Tests automatizados
- **14 tests** que cubren todas las funcionalidades:
  - Operaciones CRUD completas
  - Validación de datos de entrada
  - Manejo de errores (404, 422, 500)
  - Filtros por estado completado
  - Búsqueda por nombre
  - Combinación de filtros y búsqueda

### Ejecutar tests
```bash
# Todos los tests
php artisan test

# Tests específicos
php artisan test --filter=TaskApiTest
```

### Verificaciones realizadas
- API probada con Postman
- Manejo de errores de base de datos verificado
- Todos los endpoints funcionando
- Filtros y búsqueda probados

## 🛡️ Manejo de Errores

### Tipos de errores
- **Error 500**: QueryException para problemas de conexión a base de datos
- **Error 422**: Validación de datos de entrada (nombre requerido, longitud máxima)
- **Error 404**: ModelNotFoundException para tareas inexistentes
- **Respuestas JSON consistentes**: Todos los errores devuelven estructura uniforme

## 🚀 Comandos Útiles

```bash
# Ejecutar tests
php artisan test

# Limpiar cache
php artisan cache:clear
php artisan config:clear

# Ver rutas disponibles
php artisan route:list

# Acceder a tinker
php artisan tinker

# Ejecutar migraciones
php artisan migrate

# Cargar seeds
php artisan db:seed

# Ver logs
tail -f storage/logs/laravel.log
```

## 📝 Notas de Desarrollo

- **API REST completa** con manejo robusto de errores
- **Base de datos PostgreSQL** para persistencia
- **Testing completo** con PHPUnit
- **Manejo de errores** consistente en todos los endpoints
- **Filtros dinámicos** sin acoplamiento a base de datos específica 