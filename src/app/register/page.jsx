'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, Lock, Eye, EyeOff, Palette, ArrowLeft, User, Shield } from 'lucide-react';

const DoDotRegister = () => {
  const [theme, setTheme] = useState('light');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const themes = {
    light: {
      name: 'Light',
      bg: 'bg-gradient-to-br from-green-50 via-sky-50 to-blue-50',
      card: 'bg-white/90 backdrop-blur-sm border-white/20',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      accent: 'text-green-600',
      button: 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600',
      buttonSecondary: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm',
      input: 'bg-white/50 border-gray-200 focus:border-green-500',
      shadow: 'shadow-lg shadow-green-500/20',
      error: 'text-red-500'
    },
    dark: {
      name: 'Dark',
      bg: 'bg-gradient-to-br from-gray-900 via-blue-900 to-green-900',
      card: 'bg-gray-800/90 backdrop-blur-sm border-gray-700/20',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      accent: 'text-green-400',
      button: 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700',
      buttonSecondary: 'bg-gray-800/20 hover:bg-gray-800/30 backdrop-blur-sm',
      input: 'bg-gray-800/50 border-gray-600 focus:border-green-400 text-white',
      shadow: 'shadow-lg shadow-green-500/30',
      error: 'text-red-400'
    },
    cucumber: {
      name: 'Cucumber',
      bg: 'bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100',
      card: 'bg-green-50/90 backdrop-blur-sm border-green-200/20',
      text: 'text-green-900',
      textSecondary: 'text-green-700',
      accent: 'text-emerald-600',
      button: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
      buttonSecondary: 'bg-green-100/20 hover:bg-green-100/30 backdrop-blur-sm',
      input: 'bg-green-50/50 border-green-200 focus:border-emerald-500',
      shadow: 'shadow-lg shadow-emerald-500/20',
      error: 'text-red-600'
    },
    ocean: {
      name: 'Ocean',
      bg: 'bg-gradient-to-br from-blue-100 via-cyan-50 to-indigo-100',
      card: 'bg-blue-50/90 backdrop-blur-sm border-blue-200/20',
      text: 'text-blue-900',
      textSecondary: 'text-blue-700',
      accent: 'text-cyan-600',
      button: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600',
      buttonSecondary: 'bg-blue-100/20 hover:bg-blue-100/30 backdrop-blur-sm',
      input: 'bg-blue-50/50 border-blue-200 focus:border-cyan-500',
      shadow: 'shadow-lg shadow-cyan-500/20',
      error: 'text-red-600'
    }
  };

  const currentTheme = themes[theme];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Register attempt:', { name, email, password });
    // Add your registration logic here
  };

  const passwordsMatch = password === confirmPassword || confirmPassword === '';

  return (
    <div className={`h-screen w-screen overflow-hidden ${currentTheme.bg} transition-all duration-500 flex flex-col`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-radial from-green-400/20 to-transparent rounded-full"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent rounded-full"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 p-4 flex-shrink-0"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`w-10 h-10 rounded-2xl ${currentTheme.button} flex items-center justify-center ${currentTheme.shadow}`}>
              <Check className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${currentTheme.text}`}>DoDot</h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            {/* Back Button */}
            <motion.button
              className={`px-4 py-2 rounded-lg ${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors flex items-center space-x-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </motion.button>

            {/* Theme Toggle */}
            <div className="relative">
              <motion.button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className={`p-3 rounded-xl ${currentTheme.buttonSecondary} ${currentTheme.text} border border-white/10`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Palette className="w-5 h-5" />
              </motion.button>

              <AnimatePresence>
                {showColorPicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className={`absolute right-0 mt-2 p-4 rounded-xl ${currentTheme.card} border border-white/10 ${currentTheme.shadow} min-w-[200px]`}
                  >
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(themes).map(([key, themeData]) => (
                        <motion.button
                          key={key}
                          onClick={() => {
                            setTheme(key);
                            setShowColorPicker(false);
                          }}
                          className={`p-3 rounded-lg text-sm font-medium transition-all ${
                            theme === key 
                              ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' 
                              : `${currentTheme.buttonSecondary} ${currentTheme.text} hover:bg-opacity-80`
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {themeData.name}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-4 overflow-y-auto">
        <motion.div
          className="w-full max-w-md"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {/* Register Card */}
          <motion.div
            className={`p-8 rounded-3xl ${currentTheme.card} border border-white/10 ${currentTheme.shadow}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >

            {/* Registration Form */}
            <div className="space-y-5">
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${currentTheme.input} backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all`}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${currentTheme.input} backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border ${currentTheme.input} backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all`}
                    placeholder="Create a password"
                    required
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>
                  Must be at least 8 characters long
                </p>
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Shield className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                      passwordsMatch ? currentTheme.input : `${currentTheme.input} border-red-400`
                    } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors`}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {!passwordsMatch && confirmPassword && (
                  <p className={`text-xs ${currentTheme.error} mt-1`}>
                    Passwords do not match
                  </p>
                )}
              </motion.div>

              {/* Register Button */}
              <motion.button
                onClick={handleRegister}
                className={`w-full py-3 rounded-xl ${currentTheme.button} text-white font-semibold ${currentTheme.shadow} transition-all mt-6`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Create Account
              </motion.button>
            </div>

            {/* Login Link */}
            <motion.div
              className="text-center mt-6 pt-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p className={`${currentTheme.textSecondary} text-sm`}>
                Already have an account?{' '}
                <button className={`${currentTheme.accent} hover:underline font-medium transition-all`}>
                  Sign in here
                </button>
              </p>
            </motion.div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className={`text-xs ${currentTheme.textSecondary}`}>
              By creating an account, you agree to our{' '}
              <button className={`${currentTheme.accent} hover:underline`}>Terms of Service</button>
              {' '}and{' '}
              <button className={`${currentTheme.accent} hover:underline`}>Privacy Policy</button>
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DoDotRegister;