'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMoreVertical, 
  FiClock, 
  FiFlag, 
  FiType, 
  FiExternalLink, 
  FiTrash2,
  FiEdit,
  FiX
} from 'react-icons/fi'
import { FaCheckCircle, FaCircle, FaExclamationCircle, FaArrowRight } from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const KanbanBoard = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('No authentication token found')
        return
      }

      const response = await fetch('http://localhost:5000/api/v1/to-do', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }

      const data = await response.json()
      setTodos(data.todos || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Update todo status when dragging between columns
  const updateTodoStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`http://localhost:5000/api/v1/to-do/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update todo')
      }

      // Update local state
      setTodos(prev => prev.map(todo => 
        todo._id === id ? { ...todo, status: newStatus } : todo
      ))
    } catch (err) {
      setError(err.message)
    }
  }

  // Update any field in todo
  const updateTodoField = async (id, field, value) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`http://localhost:5000/api/v1/to-do/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ [field]: value })
      })

      if (!response.ok) {
        throw new Error('Failed to update todo')
      }

      // Update local state
      setTodos(prev => prev.map(todo => 
        todo._id === id ? { ...todo, [field]: value } : todo
      ))
    } catch (err) {
      setError(err.message)
    }
  }

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`http://localhost:5000/api/v1/to-do/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }

      // Update local state
      setTodos(prev => prev.filter(todo => todo._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  // Handle drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return

    const { draggableId, destination } = result
    const newStatus = destination.droppableId
    
    updateTodoStatus(draggableId, newStatus)
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
  
  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-500">
      Error: {error}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {['TODO', 'In Progress', 'Delayed', 'Give Up', 'Completed'].map(status => (
            <KanbanColumn
              key={status}
              status={status}
              todos={todos.filter(todo => todo.status === status)}
              onUpdateField={updateTodoField}
              onDeleteTodo={deleteTodo}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

const KanbanColumn = ({ status, todos, onUpdateField, onDeleteTodo }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'TODO': return <FaCircle className="text-blue-500" />
      case 'In Progress': return <FaExclamationCircle className="text-yellow-500" />
      case 'Completed': return <FaCheckCircle className="text-green-500" />
      case 'Delayed': return <FiClock className="text-orange-500" />
      case 'Give Up': return <FaExclamationCircle className="text-red-500" />
      default: return <FaCircle className="text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'TODO': return 'bg-blue-100 border-blue-300'
      case 'In Progress': return 'bg-yellow-100 border-yellow-300'
      case 'Completed': return 'bg-green-100 border-green-300'
      case 'Delayed': return 'bg-orange-100 border-orange-300'
      case 'Give Up': return 'bg-red-100 border-red-300'
      default: return 'bg-gray-100 border-gray-300'
    }
  }

  return (
    <div className="flex flex-col">
      <div className={`p-3 rounded-t-lg border ${getStatusColor(status)} flex items-center gap-2`}>
        {getStatusIcon(status)}
        <h2 className="font-semibold text-gray-700">{status}</h2>
        <span className="ml-auto bg-white px-2 py-1 rounded-full text-xs font-medium">
          {todos.length}
        </span>
      </div>
      
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`bg-gray-100 p-3 rounded-b-lg flex-1 min-h-[500px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-200' : ''
            }`}
          >
            <AnimatePresence>
              {todos.map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {(provided, snapshot) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        boxShadow: snapshot.isDragging ? '0 10px 20px rgba(0,0,0,0.1)' : 'none'
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <KanbanCard 
                        todo={todo} 
                        onUpdateField={onUpdateField} 
                        onDeleteTodo={onDeleteTodo}
                      />
                    </motion.div>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            
            {todos.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                No tasks in this column
              </div>
            )}
            
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

const KanbanCard = ({ todo, onUpdateField, onDeleteTodo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'HIGH': return 'bg-red-100 text-red-800'
      case 'Urgent': return 'bg-purple-100 text-purple-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-200 relative"
      whileHover={{ y: -2, shadow: "md" }}
      transition={{ duration: 0.2 }}
    >
      {/* Menu button and dropdown */}
      <div className="absolute top-3 right-3">
        <button 
          className="text-gray-400 hover:text-gray-600 p-1 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FiMoreVertical />
        </button>
        
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10"
          >
            <button
              className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => {
                onDeleteTodo(todo._id)
                setIsMenuOpen(false)
              }}
            >
              <FiTrash2 className="mr-2" />
              Delete
            </button>
            <button
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiEdit className="mr-2" />
              Edit
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Close menu when clicking outside */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
          {todo.priority}
        </span>
        <Dropdown 
          options={['Personal', 'Professional', 'Fun', 'Time Pass', 'Urgent']}
          value={todo.workType}
          onChange={(value) => onUpdateField(todo._id, 'workType', value)}
          icon={<FiType size={12} />}
          type="workType"
        />
      </div>
      
      <h3 className="font-medium text-gray-800 mb-2">{todo.workDesc}</h3>
      
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <FiClock className="mr-1" />
        <span>{formatDate(todo.startDate)}</span>
        <FaArrowRight className="mx-1 text-xs" />
        <span>{formatDate(todo.endDate)}</span>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <span>{formatTime(todo.startTime)} - {formatTime(todo.endTime)}</span>
      </div>
      
      {todo.links && todo.links.length > 0 && (
        <div className="mb-3">
          {todo.links.slice(0, 2).map((link, index) => (
            <a 
              key={index}
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-xs text-blue-500 hover:text-blue-700 mb-1"
            >
              <FiExternalLink className="mr-1" />
              {link.length > 30 ? link.substring(0, 30) + '...' : link}
            </a>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <Dropdown 
          options={['TODO', 'In Progress', 'Delayed', 'Give Up', 'Completed']}
          value={todo.status}
          onChange={(value) => onUpdateField(todo._id, 'status', value)}
          icon={null}
          type="status"
        />
        
        <Dropdown 
          options={['HIGH', 'Medium', 'Low', 'Urgent']}
          value={todo.priority}
          onChange={(value) => onUpdateField(todo._id, 'priority', value)}
          icon={<FiFlag size={12} />}
          type="priority"
        />
      </div>
    </motion.div>
  )
}

const Dropdown = ({ options, value, onChange, icon, type }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const getTypeColor = (type, value) => {
    if (type === 'status') {
      switch(value) {
        case 'TODO': return 'text-blue-600 bg-blue-50'
        case 'In Progress': return 'text-yellow-600 bg-yellow-50'
        case 'Completed': return 'text-green-600 bg-green-50'
        case 'Delayed': return 'text-orange-600 bg-orange-50'
        case 'Give Up': return 'text-red-600 bg-red-50'
        default: return 'text-gray-600 bg-gray-50'
      }
    } else if (type === 'priority') {
      switch(value) {
        case 'HIGH': return 'text-red-600 bg-red-50'
        case 'Urgent': return 'text-purple-600 bg-purple-50'
        case 'Medium': return 'text-yellow-600 bg-yellow-50'
        case 'Low': return 'text-blue-600 bg-blue-50'
        default: return 'text-gray-600 bg-gray-50'
      }
    }
    return 'text-gray-600 bg-gray-50'
  }
  
  return (
    <div className="relative">
      <button 
        className={`flex items-center px-2 py-1 text-xs rounded-md ${getTypeColor(type, value)}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {value}
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-20 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200"
          >
            {options.map(option => (
              <button
                key={option}
                className={`block w-full text-left px-3 py-2 text-xs hover:bg-gray-100 ${
                  option === value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
              >
                {option}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  )
}

export default KanbanBoard