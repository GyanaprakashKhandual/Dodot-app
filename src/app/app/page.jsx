'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {FaCoffee } from 'react-icons/fa'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock, 
  User, 
  Briefcase, 
  Home, 
  Heart, 
  Gamepad2,
  X,
  Check,
  Pause,
  Ban,
  AlertTriangle,
  Filter,
  Search,
  LogOut,
  Moon,
  Sun,
  CheckCircle
} from 'lucide-react';

// GitHub style dropdown arrow
const ChevronDownIcon = () => (
  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M7 10l5 5 5-5z" clipRule="evenodd" />
  </svg>
);

// SweetAlert-like confirmation modal
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = 'warning' }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />;
      case 'danger':
        return <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      default:
        return <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center"
        >
          {getIcon()}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{message}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                type === 'danger' 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Custom Dropdown Component
const CustomDropdown = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  className = "",
  searchable = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 flex items-center justify-between"
      >
        <span>{selectedOption?.label || placeholder}</span>
        <ChevronDownIcon />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-hidden"
          >
            {searchable && (
              <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  {option.label}
                </button>
              ))}
              {filteredOptions.length === 0 && (
                <div className="px-3 py-2 text-gray-500 dark:text-gray-400 text-center">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default function TodoDashboard() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterWorkType, setFilterWorkType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning',
    onConfirm: () => {}
  });

  // Form state
  const [formData, setFormData] = useState({
    workType: 'Professional',
    workName: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    status: 'Working'
  });

  const workTypes = ['Professional', 'Personal', 'Hobby', 'Time Pass'];
  const statuses = ['Working', 'Delayed', 'Paused', 'Canceled', 'Give up'];

  const workTypeOptions = workTypes.map(type => ({ value: type, label: type }));
  const statusOptions = statuses.map(status => ({ value: status, label: status }));
  
  const filterStatusOptions = [
    { value: 'all', label: 'All Status' },
    ...statusOptions
  ];
  
  const filterWorkTypeOptions = [
    { value: 'all', label: 'All Types' },
    ...workTypeOptions
  ];

  const workTypeIcons = {
    'Professional': Briefcase,
    'Personal': Home,
    'Hobby': Heart,
    'Time Pass': Gamepad2
  };

  const statusIcons = {
    'Working': Check,
    'Delayed': Clock,
    'Paused': Pause,
    'Canceled': X,
    'Give up': Ban
  };

  const statusColors = {
    'Working': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    'Delayed': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
    'Paused': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    'Canceled': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
    'Give up': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Enhanced toast notification
  const showToast = (message, type = 'success') => {
    const toastEl = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    toastEl.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl text-white font-medium transform transition-all duration-300 ${bgColor} max-w-sm`;
    toastEl.innerHTML = `
      <div class="flex items-center space-x-2">
        <div class="flex-shrink-0">
          ${type === 'success' ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>' : '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>'}
        </div>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(toastEl);
    
    setTimeout(() => {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(toastEl), 300);
    }, 4000);
  };

  // Get auth token
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  };

  // Check if user is authenticated
  const checkAuth = () => {
    const token = getAuthToken();
    if (!token) {
      // router.push('/login');
      return false;
    }
    return true;
  };

  // Mock data for demonstration
  const mockTodos = [
    {
      _id: '1',
      workType: 'Professional',
      workName: 'Complete project documentation',
      startDate: '2025-08-18',
      startTime: '09:00',
      endDate: '2025-08-20',
      endTime: '17:00',
      status: 'Working'
    },
    {
      _id: '2',
      workType: 'Personal',
      workName: 'Grocery shopping',
      startDate: '2025-08-19',
      startTime: '10:00',
      endDate: '2025-08-19',
      endTime: '12:00',
      status: 'Delayed'
    },
    {
      _id: '3',
      workType: 'Hobby',
      workName: 'Learn new guitar song',
      startDate: '2025-08-18',
      startTime: '20:00',
      endDate: '2025-08-18',
      endTime: '21:30',
      status: 'Working'
    }
  ];

  // Fetch all todos
  const fetchTodos = async () => {
    if (!checkAuth()) return;
    
    setIsLoading(true);
    try {
      // Mock API call - replace with actual API
      setTimeout(() => {
        setTodos(mockTodos);
        setIsLoading(false);
      }, 1000);
      
      // Uncomment for actual API
      /*
      const token = getAuthToken();
      const response = await fetch('https://dodot.onrender.com/api/todo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        showToast('Session expired. Please login again.', 'error');
        localStorage.removeItem('authToken');
        router.push('/login');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setTodos(Array.isArray(data) ? data : data.todos || []);
      } else {
        const errorData = await response.json();
        showToast(errorData.message || 'Failed to fetch todos', 'error');
      }
      */
    } catch (error) {
      console.error('Fetch todos error:', error);
      showToast('Network error while fetching todos', 'error');
      setIsLoading(false);
    }
  };

  // Add todo
  const addTodo = async () => {
    if (!checkAuth()) return;
    
    if (!formData.workName || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call
      setTimeout(() => {
        const newTodo = {
          _id: Date.now().toString(),
          ...formData
        };
        setTodos([...todos, newTodo]);
        showToast('Todo added successfully! 🎉', 'success');
        setShowAddModal(false);
        resetForm();
        setIsLoading(false);
      }, 1000);

      // Show success confirmation
      setConfirmModal({
        isOpen: true,
        title: 'Success!',
        message: 'Your todo has been added successfully.',
        type: 'success',
        onConfirm: () => {
          setConfirmModal({ ...confirmModal, isOpen: false });
        }
      });

    } catch (error) {
      console.error('Add todo error:', error);
      showToast('Network error while adding todo', 'error');
      setIsLoading(false);
    }
  };

  // Update todo
  const updateTodo = async () => {
    if (!checkAuth()) return;
    
    if (!formData.workName || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call
      setTimeout(() => {
        setTodos(todos.map(todo => 
          todo._id === editingTodo._id 
            ? { ...todo, ...formData }
            : todo
        ));
        showToast('Todo updated successfully! ✨', 'success');
        setShowEditModal(false);
        setEditingTodo(null);
        resetForm();
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Update todo error:', error);
      showToast('Network error while updating todo', 'error');
      setIsLoading(false);
    }
  };

  // Delete todo with confirmation
  const deleteTodo = async (id) => {
    if (!checkAuth()) return;
    
    const todoToDelete = todos.find(todo => todo._id === id);
    
    setConfirmModal({
      isOpen: true,
      title: 'Delete Todo',
      message: `Are you sure you want to delete "${todoToDelete?.workName}"? This action cannot be undone.`,
      type: 'danger',
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        setIsLoading(true);
        
        try {
          // Mock API call
          setTimeout(() => {
            setTodos(todos.filter(todo => todo._id !== id));
            showToast('Todo deleted successfully! 🗑️', 'success');
            setIsLoading(false);
          }, 500);

        } catch (error) {
          console.error('Delete todo error:', error);
          showToast('Network error while deleting todo', 'error');
          setIsLoading(false);
        }
      }
    });
  };

  // Mark todo as complete
  const markAsComplete = (id) => {
    setConfirmModal({
      isOpen: true,
      title: 'Mark as Complete',
      message: 'Congratulations! Are you sure you want to mark this todo as completed?',
      type: 'success',
      onConfirm: () => {
        setTodos(todos.map(todo => 
          todo._id === id 
            ? { ...todo, status: 'Working' }
            : todo
        ));
        showToast('Great job! Todo marked as complete! 🎉', 'success');
        setConfirmModal({ ...confirmModal, isOpen: false });
      }
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      workType: 'Professional',
      workName: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      status: 'Working'
    });
  };

  // Handle edit
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setFormData({
      workType: todo.workType,
      workName: todo.workName,
      startDate: new Date(todo.startDate).toISOString().split('T')[0],
      startTime: todo.startTime,
      endDate: new Date(todo.endDate).toISOString().split('T')[0],
      endTime: todo.endTime,
      status: todo.status
    });
    setShowEditModal(true);
  };

  // Handle logout
  const handleLogout = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      type: 'warning',
      onConfirm: () => {
        localStorage.removeItem('authToken');
        // router.push('/login');
        setConfirmModal({ ...confirmModal, isOpen: false });
      }
    });
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    const matchesStatus = filterStatus === 'all' || todo.status === filterStatus;
    const matchesWorkType = filterWorkType === 'all' || todo.workType === filterWorkType;
    const matchesSearch = todo.workName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesWorkType && matchesSearch;
  });

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="">
                <FaCoffee className='h-8 w-8 text-blue-900'/>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Do Dot</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Controls */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 flex-1">
                <CustomDropdown
                  value={filterStatus}
                  onChange={setFilterStatus}
                  options={filterStatusOptions}
                  placeholder="All Status"
                  className="w-full sm:w-48"
                  searchable
                />

                <CustomDropdown
                  value={filterWorkType}
                  onChange={setFilterWorkType}
                  options={filterWorkTypeOptions}
                  placeholder="All Types"
                  className="w-full sm:w-48"
                  searchable
                />
              </div>

              {/* Add Todo Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddModal(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center space-x-2 shadow-lg transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>Add Todo</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {statuses.map(status => {
            const count = todos.filter(todo => todo.status === status).length;
            const Icon = statusIcons[status];
            return (
              <div key={status} className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{status}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Todos Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {filteredTodos.map(todo => {
                const WorkTypeIcon = workTypeIcons[todo.workType];
                const StatusIcon = statusIcons[todo.status];
                return (
                  <motion.div
                    key={todo._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <WorkTypeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{todo.workType}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => markAsComplete(todo._id)}
                          className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                          title="Mark as complete"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(todo)}
                          className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="Edit todo"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo._id)}
                          className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Delete todo"
                        >
                          <Trash2 className="h-4 w-4"/>
</button>
</div>
</div>
<h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {todo.workName}
                </h3>

                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(todo.startDate).toLocaleDateString()}</span>
                  <span>-</span>
                  <span>{new Date(todo.endDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Clock className="h-4 w-4" />
                  <span>{todo.startTime}</span>
                  <span>-</span>
                  <span>{todo.endTime}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[todo.status]}`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {todo.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    )}

    {/* Empty State */}
    {!isLoading && filteredTodos.length === 0 && (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
          <Filter className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          No todos found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {searchTerm || filterStatus !== 'all' || filterWorkType !== 'all' 
            ? 'Try adjusting your search or filter criteria'
            : 'Get started by adding a new todo'}
        </p>
        {!searchTerm && filterStatus === 'all' && filterWorkType === 'all' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add your first todo</span>
          </button>
        )}
      </div>
    )}
  </div>

  {/* Add Todo Modal */}
  <AnimatePresence>
    {showAddModal && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Todo</h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Work Type
                </label>
                <CustomDropdown
                  value={formData.workType}
                  onChange={(value) => setFormData({ ...formData, workType: value })}
                  options={workTypeOptions}
                  placeholder="Select work type"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Work Name
                </label>
                <input
                  type="text"
                  value={formData.workName}
                  onChange={(e) => setFormData({ ...formData, workName: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                  placeholder="Enter work name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <CustomDropdown
                  value={formData.status}
                  onChange={(value) => setFormData({ ...formData, status: value })}
                  options={statusOptions}
                  placeholder="Select status"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addTodo}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Add Todo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Edit Todo Modal */}
  <AnimatePresence>
    {showEditModal && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Todo</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingTodo(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Work Type
                </label>
                <CustomDropdown
                  value={formData.workType}
                  onChange={(value) => setFormData({ ...formData, workType: value })}
                  options={workTypeOptions}
                  placeholder="Select work type"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Work Name
                </label>
                <input
                  type="text"
                  value={formData.workName}
                  onChange={(e) => setFormData({ ...formData, workName: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                  placeholder="Enter work name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <CustomDropdown
                  value={formData.status}
                  onChange={(value) => setFormData({ ...formData, status: value })}
                  options={statusOptions}
                  placeholder="Select status"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingTodo(null);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={updateTodo}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Confirmation Modal */}
  <ConfirmModal
    isOpen={confirmModal.isOpen}
    onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
    onConfirm={confirmModal.onConfirm}
    title={confirmModal.title}
    message={confirmModal.message}
    type={confirmModal.type}
  />
</div>
);
}