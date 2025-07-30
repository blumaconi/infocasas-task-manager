import './App.css'
import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'
import { SearchBar } from './components/SearchBar'
import { FilterToggle } from './components/FilterToggle'

function App() {
  const { tasks, loading, error, updateTask, deleteTask, createTask, updateFilters } = useTasks()
  const [searchTerm, setSearchTerm] = useState('')
  const [showCompletedOnly, setShowCompletedOnly] = useState(false)

  const handleToggleComplete = (id: number, completed: boolean) => {
    updateTask(id, { completed })
  }

  const handleDelete = (id: number) => {
    deleteTask(id)
  }

  const handleCreateTask = async (taskData: { name: string }) => {
    await createTask(taskData)
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    updateFilters({ search: term, completed: showCompletedOnly ? true : undefined })
  }

  const handleFilterToggle = (showCompleted: boolean) => {
    setShowCompletedOnly(showCompleted)
    updateFilters({ search: searchTerm, completed: showCompleted ? true : undefined })
  }

  const handleEdit = (id: number, name: string) => {
    updateTask(id, { name })
  }

    return (
      <div className="app-container">
        <div className="app-content">
          <h1 className="text-center mb-4">Task Manager</h1>
          
          <TaskForm onSubmit={handleCreateTask} loading={loading} />
          
          <div className="row mb-3">
            <div className="col-md-8">
              <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </div>
            <div className="col-md-4">
              <FilterToggle showCompleted={showCompletedOnly} onToggle={handleFilterToggle} />
            </div>
          </div>
          
          <TaskList 
            tasks={tasks} 
            loading={loading}
            error={error}
            onToggleComplete={handleToggleComplete} 
            onDelete={handleDelete} 
            onEdit={handleEdit}
          />
        </div>
      </div>
    )
}

export default App
