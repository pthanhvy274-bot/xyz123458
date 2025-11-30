import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Scale, AlertTriangle, Users, PieChart, Activity, Target } from 'lucide-react'; // Using lucide-react for icons
import { SlideLayout } from '../SlideLayout';
import { SlideProps } from '../../types';
import { LAND_DATA } from '../../constants';

// --- Slide 1: Cover ---
export const Slide1: React.FC<SlideProps> = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-tech-blue via-blue-950 to-black">
      {/* Background Abstract Lines */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
      >
         <svg className="w-full h-full">
            <motion.path 
              d="M0,500 Q400,300 800,500 T1600,500" 
              fill="none" 
              stroke="#0ea5e9" 
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path 
              d="M0,600 Q400,400 800,600 T1600,600" 
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
         </svg>
      </motion.div>

      <div className="z-10 text-center max-w-5xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-7xl font-bold text-white mb-6 font-header leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            animate={{ 
              textShadow: ["0 0 15px rgba(255,255,255,0.3)", "0 0 30px rgba(14,165,233,0.6)", "0 0 15px rgba(255,255,255,0.3)"]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            基于数据驱动的<span className="text-harvest-gold">烟叶生产</span>
            <br/>“计划分解”模型建设
          </motion.h1>
        </motion.div>
        
        {/* Removed subtitle as requested */}

        <motion.div 
          className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-full inline-block border border-white/20 mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-xl text-gray-200">
            汇报人：<span className="font-bold text-white">叙永分公司 熊远政</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// --- Slide 2: Chapter 1 Cover ---
export const Slide2: React.FC<SlideProps> = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-tech-blue relative">
       <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://picsum.photos/800/1200?grayscale')] bg-cover opacity-20 mix-blend-overlay"></div>
       <div className="z-10 text-left w-full pl-24">
         <motion.div 
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
         >
           <h2 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tech-light to-white opacity-20 absolute -top-20 -left-10">01</h2>
           <h2 className="text-7xl font-bold text-white mb-4">01 困局与破局</h2>
           <div className="h-2 w-32 bg-harvest-gold mb-6"></div>
           <p className="text-4xl text-gray-300 font-light tracking-widest">现状分析</p>
         </motion.div>
       </div>
    </div>
  );
};

// --- Slide 3: Supply vs Demand ---
export const Slide3: React.FC<SlideProps> = ({ step }) => {
  return (
    <SlideLayout title="核心矛盾：资源与需求的博弈">
      <div className="flex w-full h-full items-center justify-between px-10">
        
        {/* Left: Chart */}
        <div className="w-1/2 h-96">
          <motion.div 
             className="h-full"
             initial={{ opacity: 0, scaleY: 0 }}
             animate={{ opacity: 1, scaleY: 1 }}
             style={{ originY: 1 }}
             transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl text-center mb-4 text-gray-400">近年种植面积 (万亩)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LAND_DATA}>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 5]} />
                <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]}>
                   {LAND_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 ? '#f59e0b' : '#0ea5e9'} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-harvest-gold mt-2">仅为巅峰期 1/4</p>
          </motion.div>
        </div>

        {/* Center Divider */}
        <div className="w-[1px] h-64 bg-gray-700 mx-8"></div>

        {/* Right: Scale/Balance */}
        <div className="w-1/2 flex flex-col items-center justify-center relative">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="relative w-64 h-32"
          >
            {/* Balance Bar */}
            <motion.div 
               className="w-full h-2 bg-gray-400 rounded-full absolute top-1/2 left-0 origin-center"
               initial={{ rotate: 0 }}
               animate={{ rotate: 15 }} // Tilted to right
               transition={{ delay: 1, duration: 1.5, type: "spring" }}
            >
              {/* Left Pan (Plan) */}
              <div className="absolute -left-4 top-2 flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-gray-800">
                   <span className="text-xs text-center">计划<br/>指标</span>
                 </div>
                 <span className="text-xs text-red-400 mt-1 font-bold">少</span>
              </div>
              {/* Right Pan (Passion) */}
               <div className="absolute -right-4 top-2 flex flex-col items-center">
                 <div className="w-20 h-20 rounded-full border-2 border-harvest-gold flex items-center justify-center bg-harvest-gold/20 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                   <span className="text-sm font-bold text-center text-harvest-gold">烟农<br/>热情</span>
                 </div>
                 <span className="text-xs text-harvest-gold mt-1 font-bold">高</span>
              </div>
            </motion.div>
            
            {/* Fulcrum */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2">
              <Scale size={48} className="text-gray-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={step >= 1 ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
            className="mt-12 bg-red-600/20 border border-red-500 text-red-100 px-6 py-3 rounded-xl text-xl font-bold flex items-center gap-2"
          >
            <AlertTriangle size={24} />
            给谁？给多少？
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};

// --- Slide 4: Pain Points ---
export const Slide4: React.FC<SlideProps> = ({ step }) => {
  const points = [
    { title: "看不准", icon: <Target />, desc: "忽略气候动态" },
    { title: "不客观", icon: <Activity />, desc: "人情干扰" },
    { title: "一刀切", icon: <PieChart />, desc: "忽略差异" },
    { title: "很被动", icon: <AlertTriangle />, desc: "应对滞后" },
  ];

  // Define exact animation coordinates relative to the center
  const getPosition = (idx: number) => {
    switch(idx) {
      case 0: return { x: -260, y: -160 }; // Top Left
      case 1: return { x: 260, y: -160 };  // Top Right
      case 2: return { x: -260, y: 160 };  // Bottom Left
      case 3: return { x: 260, y: 160 };   // Bottom Right
      default: return { x: 0, y: 0 };
    }
  };

  return (
    <SlideLayout title="传统模式痛点：经验主义的失效">
      <div className="w-full h-full flex items-center justify-center relative">
        
        {/* Center Cycle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="z-10 w-64 h-64 rounded-full border-4 border-dashed border-gray-600 flex items-center justify-center text-center p-4 bg-gray-800/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          <div>
            <p className="text-gray-400 text-sm mb-2">传统流程</p>
            <h3 className="text-xl font-bold">县局划片<br/>↓<br/>站点核实<br/>↓<br/>经验分配</h3>
          </div>
        </motion.div>

        {/* Popups */}
        {points.map((pt, idx) => {
          const target = getPosition(idx);
          return (
            <motion.div
              key={idx}
              className="absolute w-48 p-4 bg-gray-800 border-l-4 border-red-500 shadow-xl rounded-r-lg z-0"
              style={{ 
                left: '50%', 
                top: '50%', 
                marginLeft: '-6rem', // -w-24 (half of w-48)
                marginTop: '-3rem',  // approximate half height
              }}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={step > idx ? { 
                opacity: 1, 
                scale: 1, 
                x: target.x, 
                y: target.y 
              } : {}}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
               <div className="flex items-center gap-3 mb-2 text-red-400">
                  {pt.icon}
                  <span className="font-bold text-lg">{pt.title}</span>
               </div>
               <p className="text-xs text-gray-400">{pt.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </SlideLayout>
  );
};
