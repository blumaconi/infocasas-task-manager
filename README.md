# InfoCasas Task Manager

Aplicación de gestión de tareas personales desarrollada como desafío técnico para el puesto de Full Stack Developer en InfoCasas.

## 🚀 Tecnologías Utilizadas

### Backend
- **Framework**: Laravel (PHP)
- **Base de datos**: PostgreSQL
- **API**: REST con operaciones CRUD

### Frontend
- **Framework**: React 18
- **Lenguaje**: TypeScript
- **Build Tool**: Vite
- **Styling**: Bootstrap 5
- **HTTP Client**: Axios
- **Testing**: Vitest + Testing Library

## 📁 Estructura del Proyecto

```
infocasas-task-manager/
├── backend/          # Laravel + PostgreSQL
├── frontend/         # React + TypeScript + Vite
├── README.md         # Este archivo
├── README-BACKEND.md # Documentación detallada del backend
└── README-FRONTEND.md # Documentación detallada del frontend
```

## 🛠️ Instalación Rápida

### Prerrequisitos
- PHP 8.1 o superior
- Composer
- PostgreSQL
- Node.js 18 o superior

### Backend
```bash
cd backend
composer install
cp .env.example .env
# Configurar .env con PostgreSQL
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

**Nota:** Asegúrate de que el backend esté ejecutándose en `http://127.0.0.1:8000` para que el frontend pueda conectarse a la API.

## 📚 Documentación Detallada

- **[README-BACKEND.md](README-BACKEND.md)** - Instalación detallada, configuración, API endpoints y testing del backend
- **[README-FRONTEND.md](README-FRONTEND.md)** - Instalación detallada, componentes, funcionalidades y testing del frontend

## 🧪 Testing

- **Backend**: Tests con PHPUnit
- **Frontend**: Tests con Vitest
- **Cobertura completa** de todas las funcionalidades

## 📝 Notas de Desarrollo

- **Backend**: API REST completa con manejo de errores
- **Frontend**: Aplicación React con TypeScript y testing completo
- **Arquitectura**: Separación clara entre frontend y backend
- **UX/UI**: Diseño responsive con Bootstrap y interacciones intuitivas