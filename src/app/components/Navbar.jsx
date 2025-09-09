'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Coffee, 
  Search, 
  ChevronDown, 
  Plus, 
  Sun, 
  Moon, 
  Monitor, 
  User,
  Settings,
  LogOut,
  Flag,
  Clock,
  FileText,
  Bug,
  Lightbulb,
  Target,
  Circle,
  CheckCircle,
  XCircle,
  Pause
} from 'lucide-react';
import { FaCoffee } from 'react-icons/fa';
import TodoPage from './AddTodo';

const DooDotNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedType, setSelectedType] = useState('All Types');
  const [theme, setTheme] = useState('Light');
  const isDark = theme === 'Dark';

  const [isTODOModalOpen, setIsTODOModalOpen] = useState(false);

  const dropdownRefs = {
    priority: useRef(null),
    status: useRef(null),
    type: useRef(null),
    theme: useRef(null),
    user: useRef(null)
  };

  const priorityOptions = [
    { label: 'All Priorities', value: 'all', icon: Flag, color: 'text-gray-600' },
    { label: 'High Priority', value: 'high', icon: Flag, color: 'text-red-600' },
    { label: 'Medium Priority', value: 'medium', icon: Flag, color: 'text-yellow-600' },
    { label: 'Low Priority', value: 'low', icon: Flag, color: 'text-green-600' },
    { label: 'No Priority', value: 'none', icon: Flag, color: 'text-gray-400' }
  ];

  const statusOptions = [
    { label: 'All Status', value: 'all', icon: Circle, color: 'text-gray-600' },
    { label: 'To Do', value: 'todo', icon: Circle, color: 'text-blue-600' },
    { label: 'In Progress', value: 'progress', icon: Clock, color: 'text-yellow-600' },
    { label: 'Completed', value: 'completed', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Cancelled', value: 'cancelled', icon: XCircle, color: 'text-red-600' },
    { label: 'On Hold', value: 'hold', icon: Pause, color: 'text-orange-600' }
  ];

  const typeOptions = [
    { label: 'All Types', value: 'all', icon: FileText, color: 'text-gray-600' },
    { label: 'Task', value: 'task', icon: FileText, color: 'text-blue-600' },
    { label: 'Bug', value: 'bug', icon: Bug, color: 'text-red-600' },
    { label: 'Feature', value: 'feature', icon: Lightbulb, color: 'text-purple-600' },
    { label: 'Goal', value: 'goal', icon: Target, color: 'text-green-600' }
  ];

  const themeOptions = [
    { label: 'Light', value: 'light', icon: Sun },
    { label: 'Dark', value: 'dark', icon: Moon },
    { label: 'System', value: 'system', icon: Monitor }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs).forEach(key => {
        if (dropdownRefs[key].current && !dropdownRefs[key].current.contains(event.target)) {
          if (activeDropdown === key) {
            setActiveDropdown(null);
          }
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleOptionSelect = (dropdown, option) => {
    switch (dropdown) {
      case 'priority':
        setSelectedPriority(option.label);
        break;
      case 'status':
        setSelectedStatus(option.label);
        break;
      case 'type':
        setSelectedType(option.label);
        break;
      case 'theme':
        setTheme(option.label);
        break;
    }
    setActiveDropdown(null);
  };

  const GitHubDropdown = ({ 
    name, 
    selectedLabel, 
    options, 
    onSelect, 
    icon: DropdownIcon = ChevronDown 
  }) => (
    <div className="relative" ref={dropdownRefs[name]}>
      <button
        onClick={() => toggleDropdown(name)}
        className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-700">{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
          activeDropdown === name ? 'rotate-180' : ''
        }`} />
      </button>
      
      {activeDropdown === name && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-1">
            {options.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => onSelect(name, option)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
                >
                  <IconComponent className={`w-4 h-4 ${option.color}`} />
                  <span className="text-gray-700">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav className={`border-b px-4 py-3 transition-colors ${
      isDark 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left Section: Logo and App Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FaCoffee className="w-8 h-8 text-blue-900" />
            <span className={`text-xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>DooDot</span>
          </div>
        </div>

        {/* Center Section: Search Bar and Filters */}
        <div className="flex items-center gap-3 flex-1 max-w-3xl mx-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search todos..."
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                isDark 
                  ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-2">
            <GitHubDropdown
              name="priority"
              selectedLabel={selectedPriority}
              options={priorityOptions}
              onSelect={handleOptionSelect}
            />
            
            <GitHubDropdown
              name="status"
              selectedLabel={selectedStatus}
              options={statusOptions}
              onSelect={handleOptionSelect}
            />
            
            <GitHubDropdown
              name="type"
              selectedLabel={selectedType}
              options={typeOptions}
              onSelect={handleOptionSelect}
            />
          </div>
        </div>

        {/* Right Section: Actions and User Menu */}
        <div className="flex items-center gap-3">
          {/* Add TODO Button */}
          <button
          onClick={() => setIsTODOModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add TODO</span>
          </button>

          {/* Theme Dropdown */}
          <div className="relative" ref={dropdownRefs.theme}>
            <button
              onClick={() => toggleDropdown('theme')}
              className={`p-2 rounded-md transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Change theme"
            >
              {theme === 'Light' && <Sun className="w-5 h-5" />}
              {theme === 'Dark' && <Moon className="w-5 h-5" />}
              {theme === 'System' && <Monitor className="w-5 h-5" />}
            </button>
            
            {activeDropdown === 'theme' && (
              <div className={`absolute top-full right-0 mt-1 w-36 border rounded-md shadow-lg z-50 ${
                isDark 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="py-1">
                  {themeOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleOptionSelect('theme', option)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                          theme === option.label 
                            ? (isDark ? 'bg-green-900 text-green-300' : 'bg-green-50 text-green-600')
                            : (isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50')
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={dropdownRefs.user}>
            <button
              onClick={() => toggleDropdown('user')}
              className={`flex items-center gap-2 p-1 rounded-full transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-white" />
              </div>
            </button>
            
            {activeDropdown === 'user' && (
              <div className={`absolute top-full right-0 mt-1 w-48 border rounded-md shadow-lg z-50 ${
                isDark 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="py-1">
                  <div className={`px-4 py-3 border-b ${
                    isDark ? 'border-gray-600' : 'border-gray-100'
                  }`}>
                    <p className={`text-sm font-medium ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>John Doe</p>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>john@example.com</p>
                  </div>
                  
                  <button className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                    isDark 
                      ? 'text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  
                  <button className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                    isDark 
                      ? 'text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  
                  <div className={`border-t mt-1 ${
                    isDark ? 'border-gray-600' : 'border-gray-100'
                  }`}>
                    <button className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                      isDark 
                        ? 'text-red-400 hover:bg-gray-700' 
                        : 'text-red-600 hover:bg-gray-50'
                    }`}>
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <TodoPage
      isOpen={isTODOModalOpen}
      onClose={() => setIsTODOModalOpen(false)}
      />

    </nav>
  );
};

export default DooDotNavbar;