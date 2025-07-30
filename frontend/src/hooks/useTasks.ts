import { useState, useCallback, useEffect } from 'react';
import type { Task, CreateTaskRequest, UpdateTaskRequest, TaskFilters } from '../types/Task';
import { taskService } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({});

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks(filters);
      setTasks(data);
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createTask = useCallback(async (taskData: CreateTaskRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError('Error al crear la tarea');
      console.error('Error creating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (id: number, taskData: UpdateTaskRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      return updatedTask;
    } catch (err) {
      setError('Error al actualizar la tarea');
      console.error('Error updating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Error al eliminar la tarea');
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters: TaskFilters) => {
    setFilters(newFilters);
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    loading,
    error,
    filters,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    updateFilters,
  };
}; 