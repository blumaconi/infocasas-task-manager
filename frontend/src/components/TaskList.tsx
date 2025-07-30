import React, { useState } from 'react';
import type { Task } from '../types/Task';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, loading, error, onToggleComplete, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [editName, setEditName] = useState('');

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDelete(taskToDelete.id);
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleEditClick = (task: Task) => {
    setTaskToEdit(task);
    setEditName(task.name);
    setShowEditModal(true);
  };

  const handleConfirmEdit = () => {
    if (taskToEdit && editName.trim()) {
      onEdit(taskToEdit.id, editName.trim());
      setShowEditModal(false);
      setTaskToEdit(null);
      setEditName('');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setTaskToEdit(null);
    setEditName('');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No tasks available
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Task List</h5>
      </div>
      <div className="card-body">
        <div className="list-group">
          {tasks.map((task) => (
            <div key={task.id} className="list-group-item d-flex align-items-center">
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                />
              </div>
              <span 
                className={`flex-grow-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
              >
                {task.name}
              </span>
              <div className="btn-group" role="group">
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEditClick(task)}
                  title="Edit task"
                >
                  ✏️
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteClick(task)}
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && taskToDelete && (
        <div className="modal fade show modal-show" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the task: <strong>"{taskToDelete.name}"</strong>?</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {(showDeleteModal || showEditModal) && (
        <div className="modal-backdrop fade show"></div>
      )}

      {/* Edit Task Modal */}
      {showEditModal && taskToEdit && (
        <div className="modal fade show modal-show" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCancelEdit}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="editTaskName" className="form-label">Task Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTaskName"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter task name..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleConfirmEdit}
                  disabled={!editName.trim()}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 