import axios, { AxiosError } from 'axios';
import type { Task, TaskFilters, CreateTaskRequest, UpdateTaskRequest } from '../types/Task';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const taskService = {
  getTasks: async (filters?: TaskFilters): Promise<Task[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.completed !== undefined) params.append('completed', filters.completed.toString());
      
      const response = await api.get(`/tasks?${params.toString()}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 500) {
        throw new Error('Error de conexión con la base de datos');
      }
      throw new Error('Error al cargar las tareas');
    }
  },

  createTask: async (task: CreateTaskRequest): Promise<Task> => {
    try {
      const response = await api.post('/tasks', task);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          const errors = error.response.data?.errors;
          if (errors?.name) {
            throw new Error('El nombre de la tarea es requerido');
          }
          throw new Error('Datos inválidos');
        }
        if (error.response?.status === 500) {
          throw new Error('Error de conexión con la base de datos');
        }
      }
      throw new Error('Error al crear la tarea');
    }
  },

  updateTask: async (id: number, task: UpdateTaskRequest): Promise<Task> => {
    try {
      const response = await api.put(`/tasks/${id}`, task);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new Error('Tarea no encontrada');
        }
        if (error.response?.status === 422) {
          const errors = error.response.data?.errors;
          if (errors?.name) {
            throw new Error('El nombre de la tarea es requerido');
          }
          throw new Error('Datos inválidos');
        }
        if (error.response?.status === 500) {
          throw new Error('Error de conexión con la base de datos');
        }
      }
      throw new Error('Error al actualizar la tarea');
    }
  },

  deleteTask: async (id: number): Promise<void> => {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new Error('Tarea no encontrada');
        }
        if (error.response?.status === 500) {
          throw new Error('Error de conexión con la base de datos');
        }
      }
      throw new Error('Error al eliminar la tarea');
    }
  },
};

export default api; 