'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
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
  FiUser,
  FiTarget,
  FiPlus
} from 'react-icons/fi'
import { FaCheckCircle, FaCircle, FaExclamationCircle, FaArrowRight, FaGripVertical } from 'react-icons/fa'

const KanbanBoard = () => {
  // Mock data for demonstration since we can't use localStorage
  const [todos, setTodos] = useState([
    {
      _id: '1',
      workDesc: 'Implement user authentication system',
      priority: 'HIGH',
      workType: 'Professional',
      status: 'TODO',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      startTime: '09:00',
      endTime: '17:00',
      links: ['https://github.com/project', 'https://docs.auth0.com'],
      assignee: 'John Doe'
    },
    {
      _id: '2',
      workDesc: 'Design new dashboard layout',
      priority: 'Medium',
      workType: 'Professional',
      status: 'In Progress',
      startDate: '2024-01-10',
      endDate: '2024-01-18',
      startTime: '10:00',
      endTime: '16:00',
      links: ['https://figma.com/design'],
      assignee: 'Jane Smith'
    },
    {
      _id: '3',
      workDesc: 'Complete weekly report',
      priority: 'Urgent',
      workType: 'Personal',
      status: 'Delayed',
      startDate: '2024-01-12',
      endDate: '2024-01-15',
      startTime: '14:00',
      endTime: '18:00',
      links: [],
      assignee: 'Mike Johnson'
    },
    {
      _id: '4',
      workDesc: 'Learn React Native',
      priority: 'Low',
      workType: 'Personal',
      status: 'Completed',
      startDate: '2024-01-01',
      endDate: '2024-01-14',
      startTime: '19:00',
      endTime: '21:00',
      links: ['https://reactnative.dev'],
      assignee: 'Sarah Wilson'
    }
  ])
  
  const [loading, setLoading] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)

  // Update todo status when dragging between columns
  const updateTodoStatus = (id, newStatus) => {
    setTodos(prev => prev.map(todo => 
      todo._id === id ? { ...todo, status: newStatus } : todo
    ))
  }

  // Update any field in todo
  const updateTodoField = (id, field, value) => {
    setTodos(prev => prev.map(todo => 
      todo._id === id ? { ...todo, [field]: value } : todo
    ))
  }

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo._id !== id))
  }

  // Handle drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) {
      setDraggedItem(null)
      return
    }

    const { draggableId, destination } = result
    const newStatus = destination.droppableId
    
    updateTodoStatus(draggableId, newStatus)
    setDraggedItem(null)
  }

  const handleDragStart = (start) => {
    setDraggedItem(start.draggableId)
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 sticky top-0 z-30"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Project Board</h1>
            <p className="text-gray-600">Manage your tasks with precision and style</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg transition-colors"
          >
            <FiPlus />
            Add Task
          </motion.button>
        </div>
      </motion.div>

      {/* Kanban Board */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {['TODO', 'In Progress', 'Delayed', 'Give Up', 'Completed'].map((status, index) => (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <KanbanColumn
                  status={status}
                  todos={todos.filter(todo => todo.status === status)}
                  onUpdateField={updateTodoField}
                  onDeleteTodo={deleteTodo}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  draggedItem={draggedItem}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const KanbanColumn = ({ status, todos, onUpdateField, onDeleteTodo, onDragStart, onDragEnd, draggedItem }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const getStatusConfig = (status) => {
    const configs = {
      'TODO': { 
        icon: <FaCircle className="text-blue-500" />, 
        bgClass: 'bg-gradient-to-r from-blue-50 to-blue-100', 
        borderClass: 'border-blue-200',
        headerClass: 'bg-blue-600 text-white'
      },
      'In Progress': { 
        icon: <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
          <FaExclamationCircle className="text-yellow-500" />
        </motion.div>, 
        bgClass: 'bg-gradient-to-r from-yellow-50 to-amber-100', 
        borderClass: 'border-yellow-200',
        headerClass: 'bg-yellow-600 text-white'
      },
      'Completed': { 
        icon: <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaCheckCircle className="text-green-500" />
        </motion.div>, 
        bgClass: 'bg-gradient-to-r from-green-50 to-emerald-100', 
        borderClass: 'border-green-200',
        headerClass: 'bg-green-600 text-white'
      },
      'Delayed': { 
        icon: <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiClock className="text-orange-500" />
        </motion.div>, 
        bgClass: 'bg-gradient-to-r from-orange-50 to-orange-100', 
        borderClass: 'border-orange-200',
        headerClass: 'bg-orange-600 text-white'
      },
      'Give Up': { 
        icon: <FaExclamationCircle className="text-red-500" />, 
        bgClass: 'bg-gradient-to-r from-red-50 to-red-100', 
        borderClass: 'border-red-200',
        headerClass: 'bg-red-600 text-white'
      }
    }
    return configs[status] || configs['TODO']
  }

  const config = getStatusConfig(status)

  return (
    <motion.div 
      className="flex flex-col h-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      {/* Column Header */}
      <motion.div 
        className={`${config.headerClass} p-4 rounded-t-xl shadow-lg flex items-center gap-3 relative overflow-hidden`}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-20" />
        <div className="relative z-10 flex items-center gap-3 w-full">
          {config.icon}
          <h2 className="font-bold text-lg">{status}</h2>
          <motion.span 
            key={todos.length}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold"
          >
            {todos.length}
          </motion.span>
        </div>
      </motion.div>
      
      {/* Column Content */}
      <motion.div
        className={`${config.bgClass} ${config.borderClass} border-x border-b rounded-b-xl p-4 min-h-[600px] transition-all duration-300 ${
          isDragOver ? 'bg-opacity-60 scale-105' : ''
        }`}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={() => setIsDragOver(false)}
      >
        <AnimatePresence mode="popLayout">
          {todos.map((todo, index) => (
            <motion.div
              key={todo._id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: draggedItem === todo._id ? 0.5 : 1, 
                scale: 1,
                y: 0
              }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                layout: { duration: 0.3 }
              }}
              className="mb-4"
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragStart={() => onDragStart({ draggableId: todo._id })}
              onDragEnd={(event, info) => {
                // Simple drag end logic - in real implementation, you'd calculate drop zones
                onDragEnd({ 
                  draggableId: todo._id, 
                  destination: { droppableId: status } 
                })
              }}
              whileDrag={{ 
                scale: 1.05, 
                rotate: 2,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                zIndex: 1000
              }}
            >
              <KanbanCard 
                todo={todo} 
                onUpdateField={onUpdateField} 
                onDeleteTodo={onDeleteTodo}
                isDragging={draggedItem === todo._id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {todos.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 py-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiTarget className="mx-auto mb-3 text-4xl" />
              <p className="text-sm">Drop tasks here</p>
            </motion.div>
          </motion.div>
        )}

        {/* Add Task Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2 mt-4"
        >
          <FiPlus />
          Add Task
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

const KanbanCard = ({ todo, onUpdateField, onDeleteTodo, isDragging, onDragStart, onDragEnd }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  
  const getPriorityConfig = (priority) => {
    const configs = {
      'HIGH': { bgClass: 'bg-red-100 text-red-800 border border-red-200', icon: '🔥' },
      'Urgent': { bgClass: 'bg-purple-100 text-purple-800 border border-purple-200', icon: '⚡' },
      'Medium': { bgClass: 'bg-yellow-100 text-yellow-800 border border-yellow-200', icon: '⭐' },
      'Low': { bgClass: 'bg-blue-100 text-blue-800 border border-blue-200', icon: '📝' }
    }
    return configs[priority] || configs['Medium']
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

  const priorityConfig = getPriorityConfig(todo.priority)

  return (
    <motion.div 
      className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-gray-200/50 relative cursor-grab active:cursor-grabbing transition-all duration-300 ${
        isDragging ? 'shadow-2xl' : 'hover:shadow-xl'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -4,
        transition: { type: "spring", stiffness: 300 }
      }}
      layout
    >
      {/* Drag Handle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
      >
        <FaGripVertical />
      </motion.div>

      {/* Menu button and dropdown */}
      <div className="absolute top-4 right-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FiMoreVertical />
        </motion.button>
        
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: "#fee2e2" }}
                  className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => {
                    onDeleteTodo(todo._id)
                    setIsMenuOpen(false)
                  }}
                >
                  <FiTrash2 className="mr-3" />
                  Delete
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiEdit className="mr-3" />
                  Edit
                </motion.button>
              </motion.div>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsMenuOpen(false)}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Priority and Work Type */}
      <div className="flex items-center gap-2 mb-4 pr-8">
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className={`px-3 py-1.5 rounded-full text-xs font-bold ${priorityConfig.bgClass} flex items-center gap-1`}
        >
          <span>{priorityConfig.icon}</span>
          {todo.priority}
        </motion.span>
        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border">
          {todo.workType}
        </span>
      </div>
      
      {/* Task Title */}
      <motion.h3 
        layout
        className="font-bold text-gray-800 mb-3 text-lg leading-tight"
      >
        {todo.workDesc}
      </motion.h3>

      {/* Assignee */}
      {todo.assignee && (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {todo.assignee.charAt(0)}
          </div>
          <span className="text-sm text-gray-600 font-medium">{todo.assignee}</span>
        </div>
      )}
      
      {/* Dates */}
      <div className="flex items-center text-sm text-gray-600 mb-3 bg-gray-50 rounded-lg p-3">
        <FiCalendar className="mr-2 text-blue-500" />
        <span className="font-medium">{formatDate(todo.startDate)}</span>
        <FaArrowRight className="mx-2 text-xs text-gray-400" />
        <span className="font-medium">{formatDate(todo.endDate)}</span>
      </div>
      
      {/* Times */}
      <div className="flex items-center text-sm text-gray-600 mb-4 bg-gray-50 rounded-lg p-3">
        <FiClock className="mr-2 text-green-500" />
        <span className="font-medium">{formatTime(todo.startTime)} - {formatTime(todo.endTime)}</span>
      </div>
      
      {/* Links */}
      {todo.links && todo.links.length > 0 && (
        <div className="mb-4">
          {todo.links.slice(0, 2).map((link, index) => (
            <motion.a 
              key={index}
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="flex items-center text-xs text-blue-600 hover:text-blue-800 mb-2 p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <FiExternalLink className="mr-2" />
              <span className="truncate">{link.length > 35 ? link.substring(0, 35) + '...' : link}</span>
            </motion.a>
          ))}
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <Dropdown 
          options={['TODO', 'In Progress', 'Delayed', 'Give Up', 'Completed']}
          value={todo.status}
          onChange={(value) => onUpdateField(todo._id, 'status', value)}
          type="status"
          className="flex-1"
        />
        
        <Dropdown 
          options={['HIGH', 'Medium', 'Low', 'Urgent']}
          value={todo.priority}
          onChange={(value) => onUpdateField(todo._id, 'priority', value)}
          icon={<FiFlag size={12} />}
          type="priority"
          className="flex-1"
        />
      </div>
    </motion.div>
  )
}

const Dropdown = ({ options, value, onChange, icon, type, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const getTypeConfig = (type, value) => {
    if (type === 'status') {
      const configs = {
        'TODO': 'text-blue-600 bg-blue-50 border-blue-200',
        'In Progress': 'text-yellow-600 bg-yellow-50 border-yellow-200',
        'Completed': 'text-green-600 bg-green-50 border-green-200',
        'Delayed': 'text-orange-600 bg-orange-50 border-orange-200',
        'Give Up': 'text-red-600 bg-red-50 border-red-200'
      }
      return configs[value] || 'text-gray-600 bg-gray-50 border-gray-200'
    } else if (type === 'priority') {
      const configs = {
        'HIGH': 'text-red-600 bg-red-50 border-red-200',
        'Urgent': 'text-purple-600 bg-purple-50 border-purple-200',
        'Medium': 'text-yellow-600 bg-yellow-50 border-yellow-200',
        'Low': 'text-blue-600 bg-blue-50 border-blue-200'
      }
      return configs[value] || 'text-gray-600 bg-gray-50 border-gray-200'
    }
    return 'text-gray-600 bg-gray-50 border-gray-200'
  }
  
  return (
    <div className={`relative ${className}`}>
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center justify-center px-3 py-2 text-xs rounded-lg border font-medium w-full transition-colors ${getTypeConfig(type, value)}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <span className="mr-1">{icon}</span>}
        <span className="truncate">{value}</span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
            >
              {options.map(option => (
                <motion.button
                  key={option}
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  className={`block w-full text-left px-3 py-2 text-xs transition-colors ${
                    option === value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                >
                  {option}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default KanbanBoard