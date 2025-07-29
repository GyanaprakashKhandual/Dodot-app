'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Palette, CheckCircle2, Target, Zap, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
const DoDotLanding = () => {
  const router = useRouter();
  const [theme, setTheme] = useState('light');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const themes = {
    light: {
      name: 'Light',
      bg: 'bg-gradient-to-br from-green-50 via-sky-50 to-blue-50',
      card: 'bg-white/80 backdrop-blur-sm border-white/20',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      accent: 'text-green-600',
      button: 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600',
      buttonSecondary: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm',
      shadow: 'shadow-lg shadow-green-500/20'
    },
    dark: {
      name: 'Dark',
      bg: 'bg-gradient-to-br from-gray-900 via-blue-900 to-green-900',
      card: 'bg-gray-800/80 backdrop-blur-sm border-gray-700/20',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      accent: 'text-green-400',
      button: 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700',
      buttonSecondary: 'bg-gray-800/20 hover:bg-gray-800/30 backdrop-blur-sm',
      shadow: 'shadow-lg shadow-green-500/30'
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
      shadow: 'shadow-lg shadow-emerald-500/20'
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
      shadow: 'shadow-lg shadow-cyan-500/20'
    }
  };

  const currentTheme = themes[theme] || themes['light']; // Fallback to light theme

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  const features = [
    {
      icon: CheckCircle2,
      title: "Smart Task Management",
      description: "Organize your tasks with intelligent categorization and priority settings"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set and achieve your goals with our advanced tracking system"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built for speed with instant sync across all your devices"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and completely private to you"
    }
  ];

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showColorPicker && !event.target.closest('.theme-picker')) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

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
            <div className={`w-10 h-10 ${currentTheme.button} flex items-center justify-center rounded-full`}>
              <Check className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${currentTheme.text}`}>DoDot</h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            {/* Login/Signup Buttons */}
            <motion.button
            onClick={() => router.push('/login')} 
              className={`px-4 py-2 rounded-lg ${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            
            <motion.button
            onClick={() => router.push('/register')}
              className={`px-6 py-2 rounded-lg ${currentTheme.button} text-white font-medium`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>

            {/* Theme Toggle */}
            <div className="relative theme-picker">
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
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-4">
        <motion.div
          className="text-center max-w-5xl mx-auto h-full flex flex-col justify-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Hero Section */}
          <motion.div
            variants={fadeInUp}
            className="mb-6"
          >
            <motion.div
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${currentTheme.card} border border-white/10 mb-4`}
              whileHover={{ scale: 1.05 }}
            >
              <Star className={`w-4 h-4 ${currentTheme.accent}`} />
              <span className={`text-sm ${currentTheme.textSecondary}`}>The smartest way to organize your life</span>
            </motion.div>

            <h2 className={`text-4xl md:text-6xl font-bold ${currentTheme.text} mb-4 leading-tight`}>
              Get Things
              <span className={`block ${currentTheme.accent}`}>Done Right</span>
            </h2>

            <p className={`text-lg ${currentTheme.textSecondary} mb-6 max-w-2xl mx-auto leading-relaxed`}>
              Transform your productivity with DoDot's intuitive task management. 
              Simple, powerful, and designed to help you focus on what matters most.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 mb-8"
          >
            <motion.button
            onClick={() => router.push('/app')}
              className={`px-8 py-3 rounded-2xl ${currentTheme.button} text-white font-semibold ${currentTheme.shadow}`}
              {...scaleOnHover}
            >
              Get Started Free
            </motion.button>

            <motion.button
              className={`px-8 py-3 rounded-2xl ${currentTheme.buttonSecondary} ${currentTheme.text} font-semibold border border-white/10`}
              {...scaleOnHover}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-2xl ${currentTheme.card} border border-white/10 ${currentTheme.shadow}`}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`w-10 h-10 rounded-xl ${currentTheme.button} flex items-center justify-center mb-3`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className={`text-base font-semibold ${currentTheme.text} mb-2`}>
                  {feature.title}
                </h3>
                <p className={`${currentTheme.textSecondary} text-sm leading-relaxed`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DoDotLanding;