import React, { useState } from 'react';
import type { CreateTaskRequest } from '../types/Task';

interface TaskFormProps {
  onSubmit: (task: CreateTaskRequest) => Promise<void>;
  loading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, loading = false }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      await onSubmit({ name: taskName.trim() });
      setTaskName('');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="card-title mb-0">Add New Task</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Enter task name..."
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="col-md-4">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading || !taskName.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Saving...
                  </>
                ) : (
                  'Save Task'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}; 