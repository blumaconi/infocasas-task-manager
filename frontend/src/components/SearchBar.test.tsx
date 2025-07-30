import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  let mockOnSearchChange: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockOnSearchChange = vi.fn()
  })

  describe('Rendering', () => {
    it('should display search input with placeholder', () => {
      render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />)
      
      expect(screen.getByPlaceholderText('Search tasks by name...')).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should call onSearchChange when user types in input', () => {
      render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />)
      
      const searchInput = screen.getByPlaceholderText('Search tasks by name...')
      fireEvent.change(searchInput, { target: { value: 'test search' } })
      
      expect(mockOnSearchChange).toHaveBeenCalledWith('test search')
    })
  })

  describe('Controlled Component', () => {
    it('should display the current search term value', () => {
      const currentSearchTerm = 'existing search'
      
      render(<SearchBar searchTerm={currentSearchTerm} onSearchChange={mockOnSearchChange} />)
      
      const searchInput = screen.getByPlaceholderText('Search tasks by name...')
      expect(searchInput).toHaveValue(currentSearchTerm)
    })

    it('should update when searchTerm prop changes', () => {
      const { rerender } = render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />)
      
      const searchInput = screen.getByPlaceholderText('Search tasks by name...')
      expect(searchInput).toHaveValue('')
      
      rerender(<SearchBar searchTerm="new search" onSearchChange={mockOnSearchChange} />)
      expect(searchInput).toHaveValue('new search')
    })
  })
}) 