export interface Task {
  id: number;
  name: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTaskRequest {
  name: string;
  completed?: boolean;
}

export interface UpdateTaskRequest {
  name?: string;
  completed?: boolean;
}

export interface TaskFilters {
  search?: string;
  completed?: boolean;
} 