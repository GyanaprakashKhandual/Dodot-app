'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Briefcase, 
  Clock, 
  X, 
  CheckCircle, 
  XCircle, 
  Pause, 
  AlertTriangle,
  Moon,
  Sun,
  Edit3,
  Trash2,
  Palette,
  ChevronDown
} from 'lucide-react';

const DoDotApp = () => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [workTypeFilter, setWorkTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Finish the quarterly project proposal for client review',
      workType: 'work',
      status: 'pending',
      priority: 'high',
      dueDate: '2025-08-05',
      createdAt: '2025-07-29'
    },
    {
      id: 2,
      title: 'Buy groceries',
      description: 'Get fresh vegetables and fruits for the week',
      workType: 'personal',
      status: 'complete',
      priority: 'medium',
      dueDate: '2025-07-30',
      createdAt: '2025-07-28'
    }
  ]);

  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    workType: 'work',
    priority: 'medium',
    dueDate: ''
  });

  // Theme configurations
  const themes = {
    light: {
      name: 'Light',
      bg: 'bg-gradient-to-br from-green-50 via-teal-50 to-sky-50',
      text: 'text-gray-800',
      navbar: 'bg-white/80 border-green-200',
      card: 'bg-gradient-to-r from-white to-green-50 border-green-200',
      modal: 'bg-gradient-to-br from-white to-teal-50 border-teal-200',
      input: 'bg-white border-green-200 focus:ring-green-500 placeholder-gray-500',
      button: 'bg-green-100 text-gray-700 hover:bg-green-200',
      accent: 'from-green-500 to-teal-500'
    },
    dark: {
      name: 'Dark',
      bg: 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900',
      text: 'text-white',
      navbar: 'bg-slate-900/80 border-slate-700',
      card: 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600',
      modal: 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600',
      input: 'bg-slate-700 border-slate-600 focus:ring-teal-500 text-white placeholder-gray-400',
      button: 'bg-slate-700 text-yellow-400 hover:bg-slate-600',
      accent: 'from-purple-500 to-blue-500'
    },
    black: {
      name: 'Black',
      bg: 'bg-gradient-to-br from-black via-gray-900 to-black',
      text: 'text-gray-100',
      navbar: 'bg-black/90 border-gray-800',
      card: 'bg-gradient-to-r from-gray-900 to-black border-gray-700',
      modal: 'bg-gradient-to-br from-gray-900 to-black border-gray-700',
      input: 'bg-gray-800 border-gray-700 focus:ring-red-500 text-white placeholder-gray-500',
      button: 'bg-gray-800 text-red-400 hover:bg-gray-700',
      accent: 'from-red-500 to-pink-500'
    },
    greenWhite: {
      name: 'Green White',
      bg: 'bg-gradient-to-br from-green-100 via-white to-green-50',
      text: 'text-green-900',
      navbar: 'bg-green-50/90 border-green-300',
      card: 'bg-gradient-to-r from-white to-green-100 border-green-300',
      modal: 'bg-gradient-to-br from-white to-green-100 border-green-300',
      input: 'bg-white border-green-300 focus:ring-green-600 placeholder-green-500',
      button: 'bg-green-200 text-green-800 hover:bg-green-300',
      accent: 'from-green-600 to-emerald-600'
    },
    cucumber: {
      name: 'Cucumber',
      bg: 'bg-gradient-to-br from-green-200 via-lime-100 to-emerald-100',
      text: 'text-green-900',
      navbar: 'bg-lime-50/90 border-lime-300',
      card: 'bg-gradient-to-r from-lime-50 to-green-100 border-lime-300',
      modal: 'bg-gradient-to-br from-lime-50 to-green-100 border-lime-300',
      input: 'bg-white border-lime-300 focus:ring-lime-500 placeholder-green-600',
      button: 'bg-lime-200 text-green-800 hover:bg-lime-300',
      accent: 'from-lime-500 to-green-500'
    },
    blue: {
      name: 'Blue',
      bg: 'bg-gradient-to-br from-blue-100 via-sky-50 to-cyan-100',
      text: 'text-blue-900',
      navbar: 'bg-blue-50/90 border-blue-300',
      card: 'bg-gradient-to-r from-white to-blue-100 border-blue-300',
      modal: 'bg-gradient-to-br from-white to-blue-100 border-blue-300',
      input: 'bg-white border-blue-300 focus:ring-blue-500 placeholder-blue-500',
      button: 'bg-blue-200 text-blue-800 hover:bg-blue-300',
      accent: 'from-blue-500 to-cyan-500'
    }
  };

  const workTypes = [
    { value: 'work', label: 'Work', icon: Briefcase },
    { value: 'personal', label: 'Personal', icon: Clock },
    { value: 'shopping', label: 'Shopping', icon: Check },
    { value: 'health', label: 'Health', icon: AlertTriangle }
  ];

  const statusTypes = [
    { value: 'pending', label: 'Pending', icon: Clock, color: 'text-yellow-500' },
    { value: 'complete', label: 'Complete', icon: CheckCircle, color: 'text-green-500' },
    { value: 'deny', label: 'Denied', icon: XCircle, color: 'text-red-500' },
    { value: 'delayed', label: 'Delayed', icon: Pause, color: 'text-orange-500' },
    { value: 'giveup', label: 'Give Up', icon: X, color: 'text-gray-500' }
  ];

  const addTodo = () => {
    if (newTodo.title.trim()) {
      const todo = {
        id: Date.now(),
        ...newTodo,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTodos([todo, ...todos]);
      setNewTodo({
        title: '',
        description: '',
        workType: 'work',
        priority: 'medium',
        dueDate: ''
      });
      setShowAddModal(false);
    }
  };

  const updateTodoStatus = (id, newStatus) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, status: newStatus } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWorkType = workTypeFilter === 'all' || todo.workType === workTypeFilter;
    const matchesStatus = statusFilter === 'all' || todo.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = todo.dueDate === new Date().toISOString().split('T')[0];
    } else if (dateFilter === 'week') {
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      matchesDate = new Date(todo.dueDate) <= weekFromNow;
    } else if (dateFilter === 'overdue') {
      matchesDate = new Date(todo.dueDate) < new Date() && todo.status !== 'complete';
    }
    
    return matchesSearch && matchesWorkType && matchesStatus && matchesDate;
  });

  const theme = themes[currentTheme];

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.bg} ${theme.text}`}>
      {/* Enhanced Navbar with Filters */}
      <nav className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${theme.navbar}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-10 h-10 bg-gradient-to-r ${theme.accent} rounded-xl flex items-center justify-center shadow-lg`}>
                <Check className="w-6 h-6 text-white" />
              </div>
              <h1 className={`text-2xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                DoDot
              </h1>
            </motion.div>

            {/* Search Bar */}
            <div className="flex-1 max-w-sm mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search todos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${theme.input}`}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2 mx-4">
              {/* Date Filter */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${theme.input}`}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="overdue">Overdue</option>
              </select>

              {/* Work Type Filter */}
              <select
                value={workTypeFilter}
                onChange={(e) => setWorkTypeFilter(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${theme.input}`}
              >
                <option value="all">All Types</option>
                {workTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${theme.input}`}
              >
                <option value="all">All Status</option>
                {statusTypes.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className={`bg-gradient-to-r ${theme.accent} text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 text-sm`}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Todo</span>
              </motion.button>

              {/* Theme Selector */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className={`p-2 rounded-lg transition-all duration-200 ${theme.button}`}
                >
                  <Palette className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                  {showThemeSelector && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-xl z-50 ${theme.modal}`}
                    >
                      <div className="p-2">
                        {Object.entries(themes).map(([key, themeOption]) => (
                          <motion.button
                            key={key}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setCurrentTheme(key);
                              setShowThemeSelector(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                              currentTheme === key ? `bg-gradient-to-r ${theme.accent} text-white` : 'hover:bg-gray-100 hover:bg-opacity-10'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${themeOption.accent}`}></div>
                            <span className="text-sm">{themeOption.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredTodos.map((todo) => {
              const StatusIcon = statusTypes.find(s => s.value === todo.status)?.icon || Clock;
              const WorkIcon = workTypes.find(w => w.value === todo.workType)?.icon || Briefcase;
              const statusColor = statusTypes.find(s => s.value === todo.status)?.color || 'text-gray-500';

              return (
                <motion.div
                  key={todo.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 ${theme.card}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <WorkIcon className="w-5 h-5 text-teal-500" />
                      <span className="text-sm font-medium text-teal-600 capitalize">
                        {todo.workType}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteTodo(todo.id)}
                        className="p-1 rounded-lg text-red-500 hover:bg-red-100 hover:bg-opacity-20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
                  <p className="text-sm mb-4 opacity-75">
                    {todo.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 opacity-60" />
                      <span className="text-sm opacity-75">{todo.dueDate}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                      todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {todo.priority}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className={`flex items-center space-x-2 ${statusColor}`}>
                      <StatusIcon className="w-5 h-5" />
                      <span className="text-sm font-medium capitalize">{todo.status}</span>
                    </div>

                    <select
                      value={todo.status}
                      onChange={(e) => updateTodoStatus(todo.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-lg border focus:outline-none focus:ring-1 ${theme.input}`}
                    >
                      {statusTypes.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredTodos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className={`w-24 h-24 bg-gradient-to-r ${theme.accent} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Check className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No todos found</h3>
            <p className="opacity-75">
              Try adjusting your filters or add a new todo to get started.
            </p>
          </motion.div>
        )}
      </main>

      {/* Add Todo Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${theme.modal}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Add New Todo</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg transition-colors hover:bg-gray-100 hover:bg-opacity-20"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Todo title"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${theme.input}`}
                />

                <textarea
                  placeholder="Description (optional)"
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${theme.input}`}
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newTodo.workType}
                    onChange={(e) => setNewTodo({...newTodo, workType: e.target.value})}
                    className={`px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${theme.input}`}
                  >
                    {workTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>

                  <select
                    value={newTodo.priority}
                    onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
                    className={`px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${theme.input}`}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${theme.input}`}
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl border transition-all duration-200 hover:bg-gray-100 hover:bg-opacity-20"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addTodo}
                  disabled={!newTodo.title.trim()}
                  className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${theme.accent} text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Add Todo
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close theme selector */}
      {showThemeSelector && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowThemeSelector(false)}
        />
      )}
    </div>
  );
};

export default DoDotApp;