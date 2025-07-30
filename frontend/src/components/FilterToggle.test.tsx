import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterToggle } from './FilterToggle'

describe('FilterToggle', () => {
  let mockOnToggle: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockOnToggle = vi.fn()
  })

  describe('Rendering', () => {
    it('should display checkbox and label', () => {
      render(<FilterToggle showCompleted={false} onToggle={mockOnToggle} />)
      
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByText('Show completed tasks only')).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should call onToggle when checkbox is clicked', () => {
      render(<FilterToggle showCompleted={false} onToggle={mockOnToggle} />)
      
      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)
      
      expect(mockOnToggle).toHaveBeenCalledWith(true)
    })

    it('should call onToggle with false when unchecking', () => {
      render(<FilterToggle showCompleted={true} onToggle={mockOnToggle} />)
      
      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)
      
      expect(mockOnToggle).toHaveBeenCalledWith(false)
    })
  })

  describe('Controlled Component', () => {
    it('should display checked state when showCompleted is true', () => {
      render(<FilterToggle showCompleted={true} onToggle={mockOnToggle} />)
      
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeChecked()
    })

    it('should display unchecked state when showCompleted is false', () => {
      render(<FilterToggle showCompleted={false} onToggle={mockOnToggle} />)
      
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()
    })
  })
}) 