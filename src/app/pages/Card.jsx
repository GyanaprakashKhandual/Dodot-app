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
  FiX,
  FiCalendar,
  FiLink
} from 'react-icons/fi'
import { FaCheckCircle, FaCircle, FaExclamationCircle, FaArrowRight } from 'react-icons/fa'

const CardViewPage = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

      // Also update the selected todo if it's the one being edited
      if (selectedTodo && selectedTodo._id === id) {
        setSelectedTodo(prev => ({ ...prev, [field]: value }))
      }
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
      
      // Close modal if the deleted todo was selected
      if (selectedTodo && selectedTodo._id === id) {
        setSelectedTodo(null)
        setIsModalOpen(false)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  // Open modal with todo details
  const openTodoModal = (todo) => {
    setSelectedTodo(todo)
    setIsModalOpen(true)
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {todos.map(todo => (
          <TodoCard 
            key={todo._id} 
            todo={todo} 
            onUpdateField={updateTodoField}
            onDeleteTodo={deleteTodo}
            onClick={() => openTodoModal(todo)}
          />
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedTodo && (
          <TodoModal 
            todo={selectedTodo} 
            onUpdateField={updateTodoField}
            onDeleteTodo={deleteTodo}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const TodoCard = ({ todo, onUpdateField, onDeleteTodo, onClick }) => {
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'TODO': return 'bg-blue-100 text-blue-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Delayed': return 'bg-orange-100 text-orange-800'
      case 'Give Up': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 relative hover:shadow-md transition-shadow cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {/* Menu button and dropdown */}
      <div className="absolute top-3 right-3">
        <button 
          className="text-gray-400 hover:text-gray-600 p-1 rounded"
          onClick={(e) => {
            e.stopPropagation()
            setIsMenuOpen(!isMenuOpen)
          }}
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
              onClick={(e) => {
                e.stopPropagation()
                onDeleteTodo(todo._id)
                setIsMenuOpen(false)
              }}
            >
              <FiTrash2 className="mr-2" />
              Delete
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Close menu when clicking outside */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={(e) => {
            e.stopPropagation()
            setIsMenuOpen(false)
          }}
        />
      )}

      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
          {todo.priority}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(todo.status)}`}>
          {todo.status}
        </span>
      </div>
      
      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{todo.workDesc}</h3>
      
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <FiType className="mr-1 text-gray-400" />
        <span>{todo.workType}</span>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <FiClock className="mr-1 text-gray-400" />
        <span>{formatDate(todo.startDate)}</span>
        <FaArrowRight className="mx-1 text-xs text-gray-400" />
        <span>{formatDate(todo.endDate)}</span>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <Dropdown 
          options={['TODO', 'In Progress', 'Delayed', 'Give Up', 'Completed']}
          value={todo.status}
          onChange={(value) => onUpdateField(todo._id, 'status', value)}
          type="status"
          small
        />
        
        <Dropdown 
          options={['HIGH', 'Medium', 'Low', 'Urgent']}
          value={todo.priority}
          onChange={(value) => onUpdateField(todo._id, 'priority', value)}
          type="priority"
          small
        />
      </div>
    </motion.div>
  )
}

const TodoModal = ({ todo, onUpdateField, onDeleteTodo, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Task Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Description</label>
                <p className="text-gray-900 font-medium">{todo.workDesc}</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
                <Dropdown 
                  options={['Personal', 'Professional', 'Fun', 'Time Pass', 'Urgent']}
                  value={todo.workType}
                  onChange={(value) => onUpdateField(todo._id, 'workType', value)}
                  type="workType"
                  fullWidth
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Dropdown 
                  options={['TODO', 'In Progress', 'Delayed', 'Give Up', 'Completed']}
                  value={todo.status}
                  onChange={(value) => onUpdateField(todo._id, 'status', value)}
                  type="status"
                  fullWidth
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <Dropdown 
                  options={['HIGH', 'Medium', 'Low', 'Urgent']}
                  value={todo.priority}
                  onChange={(value) => onUpdateField(todo._id, 'priority', value)}
                  type="priority"
                  fullWidth
                />
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiCalendar className="mr-2" /> Dates
                </label>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-medium">{formatDate(todo.startDate)}</p>
                  </div>
                  <FaArrowRight className="text-gray-400 mx-2" />
                  <div>
                    <p className="text-sm text-gray-600">End Date</p>
                    <p className="font-medium">{formatDate(todo.endDate)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiClock className="mr-2" /> Time
                </label>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Start Time</p>
                    <p className="font-medium">{formatTime(todo.startTime)}</p>
                  </div>
                  <FaArrowRight className="text-gray-400 mx-2" />
                  <div>
                    <p className="text-sm text-gray-600">End Time</p>
                    <p className="font-medium">{formatTime(todo.endTime)}</p>
                  </div>
                </div>
              </div>
              
              {todo.links && todo.links.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FiLink className="mr-2" /> Links
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    {todo.links.map((link, index) => (
                      <a 
                        key={index}
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-500 hover:text-blue-700 mb-2 last:mb-0"
                      >
                        <FiExternalLink className="mr-2" />
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => onDeleteTodo(todo._id)}
              className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 mr-3"
            >
              <FiTrash2 className="mr-2" />
              Delete Task
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Dropdown = ({ options, value, onChange, type, small = false, fullWidth = false }) => {
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
    } else if (type === 'workType') {
      return 'text-gray-600 bg-gray-50'
    }
    return 'text-gray-600 bg-gray-50'
  }
  
  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'inline-block'}`}>
      <button 
        className={`flex items-center justify-between px-3 py-2 rounded-md ${getTypeColor(type, value)} ${
          small ? 'text-xs' : 'text-sm'
        } ${fullWidth ? 'w-full' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <svg className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
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
            className={`absolute z-20 mt-1 bg-white rounded-md shadow-lg border border-gray-200 ${
              fullWidth ? 'w-full' : 'w-40'
            }`}
          >
            {options.map(option => (
              <button
                key={option}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
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

export default CardViewPage