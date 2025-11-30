import React from 'react';
import { motion } from 'framer-motion';

interface SlideLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  showFooter?: boolean;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  className = "",
  showFooter = true
}) => {
  return (
    <div className={`w-full h-full relative overflow-hidden flex flex-col p-12 ${className}`}>
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-tech-light"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-0 right-0 w-96 h-96 bg-tech-light blur-[150px] opacity-20 rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-harvest-gold blur-[150px] opacity-10 rounded-full mix-blend-screen" />
      </div>

      {/* Header */}
      {(title || subtitle) && (
        <header className="relative z-10 mb-8 border-l-4 border-harvest-gold pl-6">
          {title && (
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-white tracking-wide font-header"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mt-2"
            >
              {subtitle}
            </motion.p>
          )}
        </header>
      )}

      {/* Content Area */}
      <main className="flex-1 relative z-10 flex flex-col justify-center">
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="relative z-10 mt-auto flex justify-between items-center text-gray-500 text-sm border-t border-gray-800 pt-4">
          <span>基于数据驱动的烟叶生产“计划分解”模型建设</span>
          <span>叙永分公司 · 数创竞赛</span>
        </footer>
      )}
    </div>
  );
};
