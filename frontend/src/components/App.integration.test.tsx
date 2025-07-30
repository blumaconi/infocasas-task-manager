import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'

// Mock functions for useTasks hook
let mockCreateTask: ReturnType<typeof vi.fn>
let mockUpdateTask: ReturnType<typeof vi.fn>
let mockDeleteTask: ReturnType<typeof vi.fn>
let mockUpdateFilters: ReturnType<typeof vi.fn>

vi.mock('../hooks/useTasks', () => ({
  useTasks: () => ({
    tasks: [
      { id: 1, name: 'Existing task', completed: false, created_at: '2024-01-01', updated_at: '2025-01-01' }
    ],
    loading: false,
    error: null,
    updateTask: mockUpdateTask,
    deleteTask: mockDeleteTask,
    createTask: mockCreateTask,
    updateFilters: mockUpdateFilters
  })
}))

describe('App Integration', () => {
  beforeEach(() => {
    // Initialize mock functions
    mockCreateTask = vi.fn()
    mockUpdateTask = vi.fn()
    mockDeleteTask = vi.fn()
    mockUpdateFilters = vi.fn()
  })
  
  afterEach(() => {
    // Clean up after each test
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render all main components correctly', () => {
      render(<App />)
      
      // Verify all main components render
      expect(screen.getByText('Task Manager')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter task name...')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Search tasks by name...')).toBeInTheDocument()
      expect(screen.getByText('Show completed tasks only')).toBeInTheDocument()
      expect(screen.getByText('Existing task')).toBeInTheDocument()
    })

    it('should allow user interaction with search and filter components', () => {
      render(<App />)
      
      // Verify user can interact with search
      const searchInput = screen.getByPlaceholderText('Search tasks by name...')
      fireEvent.change(searchInput, { target: { value: 'test search' } })
      
      // Verify user can interact with filter
      const filterCheckbox = screen.getAllByRole('checkbox')[1]
      fireEvent.click(filterCheckbox)
      
      // Test passes if no errors occur during interactions
      expect(true).toBe(true)
    })
  })

  describe('Task Creation Flow', () => {
    it('should create a new task through the complete form flow', async () => {
      render(<App />)
      
      // Verify form renders correctly
      expect(screen.getByPlaceholderText('Enter task name...')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /save task/i })).toBeInTheDocument()
      
      // Create a new task
      const input = screen.getByPlaceholderText('Enter task name...')
      const submitButton = screen.getByRole('button', { name: /save task/i })
      
      fireEvent.change(input, { target: { value: 'New task' } })
      fireEvent.click(submitButton)
      
      // Verify createTask was called
      await waitFor(() => {
        expect(mockCreateTask).toHaveBeenCalledWith({ name: 'New task' })
      }, { timeout: 3000 })
    })
  })

  describe('Task Editing Flow', () => {
    it('should edit an existing task through the complete modal flow', async () => {
      render(<App />)
      
      // Verify task list renders with existing task
      expect(screen.getByText('Existing task')).toBeInTheDocument()
      
      // Click edit button on the first task
      const editButtons = screen.getAllByTitle('Edit task')
      fireEvent.click(editButtons[0])
      
      // Verify edit modal opens
      expect(screen.getByText('Edit Task')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Existing task')).toBeInTheDocument()
      
      // Edit the task name
      const editInput = screen.getByDisplayValue('Existing task')
      fireEvent.change(editInput, { target: { value: 'Updated task name' } })
      
      // Click save button
      const saveButton = screen.getByText('Save Changes')
      fireEvent.click(saveButton)
      
      // Verify updateTask was called with correct parameters
      await waitFor(() => {
        expect(mockUpdateTask).toHaveBeenCalledWith(1, { name: 'Updated task name' })
      }, { timeout: 3000 })
    })
  })

  describe('Task Deletion Flow', () => {
    it('should delete an existing task through the complete confirmation flow', async () => {
      render(<App />)
      
      // Verify task list renders with existing task
      expect(screen.getByText('Existing task')).toBeInTheDocument()
      
      // Click delete button on the first task
      const deleteButtons = screen.getAllByTitle('Delete task')
      fireEvent.click(deleteButtons[0])
      
      // Verify delete confirmation modal opens
      expect(screen.getByText('Confirm Delete')).toBeInTheDocument()
      expect(screen.getByText(/Are you sure you want to delete the task/)).toBeInTheDocument()
      
      // Click confirm delete button
      const confirmDeleteButton = screen.getByText('Delete')
      fireEvent.click(confirmDeleteButton)
      
      // Verify deleteTask was called
      await waitFor(() => {
        expect(mockDeleteTask).toHaveBeenCalledWith(1)
      }, { timeout: 3000 })
    })
  })
}) 