import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskList } from './TaskList'
import type { Task } from '../types/Task'

describe('TaskList', () => {
  const mockTasks: Task[] = [
    { id: 1, name: 'Test task 1', completed: false, created_at: '2024-01-01', updated_at: '2025-01-01' },
    { id: 2, name: 'Test task 2', completed: true, created_at: '2024-01-01', updated_at: '2025-01-01' }
  ]

  let mockOnToggleComplete: ReturnType<typeof vi.fn>
  let mockOnDelete: ReturnType<typeof vi.fn>
  let mockOnEdit: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockOnToggleComplete = vi.fn()
    mockOnDelete = vi.fn()
    mockOnEdit = vi.fn()
  })

  describe('Rendering', () => {
    it('should display all tasks in the list', () => {
      render(
        <TaskList 
          tasks={mockTasks} 
          loading={false}
          error={null}
          onToggleComplete={mockOnToggleComplete} 
          onDelete={mockOnDelete} 
          onEdit={mockOnEdit}
        />
      )
      
      expect(screen.getByText('Test task 1')).toBeInTheDocument()
      expect(screen.getByText('Test task 2')).toBeInTheDocument()
    })

    it('should show loading spinner when loading is true', () => {
      render(
        <TaskList 
          tasks={[]} 
          loading={true}
          error={null}
          onToggleComplete={mockOnToggleComplete} 
          onDelete={mockOnDelete} 
          onEdit={mockOnEdit}
        />
      )
      
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('should show error message when error is provided', () => {
      const errorMessage = 'Failed to load tasks'
      
      render(
        <TaskList 
          tasks={[]} 
          loading={false}
          error={errorMessage}
          onToggleComplete={mockOnToggleComplete} 
          onDelete={mockOnDelete} 
          onEdit={mockOnEdit}
        />
      )
      
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  describe('Task Interactions', () => {
    it('should call onToggleComplete when task checkbox is clicked', () => {
      render(
        <TaskList 
          tasks={mockTasks} 
          loading={false}
          error={null}
          onToggleComplete={mockOnToggleComplete} 
          onDelete={mockOnDelete} 
          onEdit={mockOnEdit}
        />
      )
      
      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.click(checkboxes[0]) // Click on first task checkbox
      
      expect(mockOnToggleComplete).toHaveBeenCalledWith(1, true)
    })

    it('should call onToggleComplete with false when unchecking completed task', () => {
      render(
        <TaskList 
          tasks={mockTasks} 
          loading={false}
          error={null}
          onToggleComplete={mockOnToggleComplete} 
          onDelete={mockOnDelete} 
          onEdit={mockOnEdit}
        />
      )
      
      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.click(checkboxes[1]) // Click on second task (completed)
      
      expect(mockOnToggleComplete).toHaveBeenCalledWith(2, false)
    })
  })

  describe('Delete Functionality', () => {
    it('should call onDelete when delete is confirmed in modal', () => {
      render(
        <TaskList 
          tasks={mockTasks} 
          loading={false}
          error={null}
          onToggleComplete={mockOnToggleComplete} 
          onDelete={mockOnDelete} 
          onEdit={mockOnEdit}
        />
      )
      
      // Click delete button to open modal
      const deleteButtons = screen.getAllByTitle('Delete task')
      fireEvent.click(deleteButtons[0])
      
      // Click confirm button in modal
      const confirmButton = screen.getByText('Delete')
      fireEvent.click(confirmButton)
      
      expect(mockOnDelete).toHaveBeenCalledWith(1)
    })

    it('should open delete confirmation modal when delete button is clicked', () => {
      render(
        <TaskList 
          tasks={mockTasks} 
          loading={false}
          error={null}
          onToggleComplete={mockOnToggleComplete} 
          onDelete={mockOnDelete} 
          onEdit={mockOnEdit}
        />
      )
      
      // Click delete button to open modal
      const deleteButtons = screen.getAllByTitle('Delete task')
      fireEvent.click(deleteButtons[0])
      
      // Verify modal is displayed
      expect(screen.getByText('Confirm Delete')).toBeInTheDocument()
      expect(screen.getByText(/Are you sure you want to delete the task/)).toBeInTheDocument()
    })
  })

  describe('Edit Functionality', () => {
    it('should open edit modal when edit button is clicked', () => {
      render(
        <TaskList 
          tasks={mockTasks} 
          loading={false}
          error={null}
          onToggleComplete={mockOnToggleComplete} 
          onDelete={mockOnDelete} 
          onEdit={mockOnEdit}
        />
      )
      
      // Click edit button to open modal
      const editButtons = screen.getAllByTitle('Edit task')
      fireEvent.click(editButtons[0])
      
      // Verify edit modal is displayed
      expect(screen.getByText('Edit Task')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Test task 1')).toBeInTheDocument()
    })

    it('should call onEdit when edit is confirmed in modal', () => {
      render(
        <TaskList 
          tasks={mockTasks} 
          loading={false}
          error={null}
          onToggleComplete={mockOnToggleComplete} 
          onDelete={mockOnDelete} 
          onEdit={mockOnEdit}
        />
      )
      
      // Click edit button to open modal
      const editButtons = screen.getAllByTitle('Edit task')
      fireEvent.click(editButtons[0])
      
      // Edit the task name
      const editInput = screen.getByDisplayValue('Test task 1')
      fireEvent.change(editInput, { target: { value: 'Updated task name' } })
      
      // Click save button
      const saveButton = screen.getByText('Save Changes')
      fireEvent.click(saveButton)
      
      expect(mockOnEdit).toHaveBeenCalledWith(1, 'Updated task name')
    })
  })
}) 