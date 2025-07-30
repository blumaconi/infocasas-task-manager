import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TaskForm } from './TaskForm'

describe('TaskForm', () => {
  let mockOnSubmit: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockOnSubmit = vi.fn()
  })

  describe('Rendering', () => {
    it('should display input field and submit button', () => {
      render(<TaskForm onSubmit={mockOnSubmit} loading={false} />)
      
      expect(screen.getByPlaceholderText('Enter task name...')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /save task/i })).toBeInTheDocument()
    })
  })

  describe('Form Submission', () => {
    it('should call onSubmit when form is submitted with valid input', async () => {
      render(<TaskForm onSubmit={mockOnSubmit} loading={false} />)
      
      const input = screen.getByPlaceholderText('Enter task name...')
      const submitButton = screen.getByRole('button', { name: /save task/i })
      
      fireEvent.change(input, { target: { value: 'Test task' } })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'Test task' })
      })
    })

    it('should prevent submission when input is empty', async () => {
      render(<TaskForm onSubmit={mockOnSubmit} loading={false} />)
      
      const submitButton = screen.getByRole('button', { name: /save task/i })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled()
      })
    })
  })

  describe('Loading States', () => {
    it('should disable submit button and show loading text when loading', () => {
      render(<TaskForm onSubmit={mockOnSubmit} loading={true} />)
      
      const submitButton = screen.getByRole('button', { name: /saving/i })
      expect(submitButton).toBeDisabled()
    })
  })
}) 