'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCoffee, FaPlus, FaTrello, FaTh, FaUserCircle, FaSearch, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPriorityFilterOpen, setIsPriorityFilterOpen] = useState(false);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const priorityOptions = ['HIGH', 'Urgent', 'Medium', 'Low'];
  const statusOptions = ['TODO', 'In Progress', 'Completed', 'Delayed', 'Give Up'];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left section: Logo and Search */}
        <div className="flex items-center space-x-4">
          {/* Coffee Icon */}
          <div className="flex items-center text-indigo-600">
            <FaCoffee className="h-6 w-6" />
            <span className="ml-2 text-xl font-semibold">TaskFlow</span>
          </div>

          {/* Google Style Search Bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-64 rounded-full py-2 pl-10 pr-4 text-sm text-gray-900 bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Center section: Buttons */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md"
          >
            <FaPlus className="h-4 w-4 mr-1" />
            Add TODO
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300"
          >
            <FaTrello className="h-4 w-4 mr-1" />
            Kanban Board
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300"
          >
            <FaTh className="h-4 w-4 mr-1" />
            View Card
          </motion.button>
        </div>

        {/* Right section: Filters and User */}
        <div className="flex items-center space-x-4">
          {/* Priority Filter Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md"
              onClick={() => setIsPriorityFilterOpen(!isPriorityFilterOpen)}
            >
              Priority
              <FaChevronDown className="ml-1 h-3 w-3" />
            </motion.button>

            <AnimatePresence>
              {isPriorityFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                >
                  {priorityOptions.map((priority) => (
                    <button
                      key={priority}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => setIsPriorityFilterOpen(false)}
                    >
                      {priority}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md"
              onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}
            >
              Status
              <FaChevronDown className="ml-1 h-3 w-3" />
            </motion.button>

            <AnimatePresence>
              {isStatusFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                >
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => setIsStatusFilterOpen(false)}
                    >
                      {status}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Icon */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle className="h-6 w-6" />
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                >
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Profile
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Settings
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="mt-3 md:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-full py-2 pl-10 pr-4 text-sm text-gray-900 bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;