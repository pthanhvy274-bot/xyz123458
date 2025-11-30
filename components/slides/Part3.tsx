import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { SlideProps } from '../../types';
import { GitBranch, Table, BrainCircuit, CheckCircle, Clock } from 'lucide-react';

// --- Slide 8: Chapter 3 Cover ---
export const Slide8: React.FC<SlideProps> = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-tech-blue relative">
       <div className="absolute inset-0 flex items-center justify-center opacity-10">
         <BrainCircuit size={400} className="text-white animate-pulse" />
       </div>
       <div className="z-10 text-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
         >
           <h2 className="text-9xl font-bold text-white mb-4">03</h2>
           <h2 className="text-6xl font-bold text-tech-light mb-8">建模与重构</h2>
           <p className="text-3xl text-gray-400 font-light tracking-[0.5em]">算法实现</p>
         </motion.div>
       </div>
    </div>
  );
};

// --- Slide 9: XGBoost Selection ---
export const Slide9: React.FC<SlideProps> = ({ step }) => {
  const benefits = [
    { title: "懂表格", icon: <Table />, desc: "擅长处理结构化数据" },
    { title: "懂逻辑", icon: <GitBranch />, desc: "捕捉非线性复杂关系" },
    { title: "不说谎", icon: <CheckCircle />, desc: "特征重要性可视化" },
  ];

  return (
    <SlideLayout title="算法选择：XGBoost 极限梯度提升">
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        {/* Center Node */}
        <motion.div
           className="z-20 bg-gradient-to-r from-green-500 to-emerald-700 p-8 rounded-2xl shadow-2xl shadow-green-500/20 mb-12"
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: "spring", stiffness: 100 }}
        >
          <h3 className="text-5xl font-bold text-white tracking-widest">XGBoost</h3>
          <p className="text-center text-green-100 mt-2">Ensemble Learning</p>
        </motion.div>

        {/* Branches */}
        <div className="flex justify-center gap-16 w-full">
          {benefits.map((b, i) => (
             <motion.div
               key={i}
               className="flex flex-col items-center w-64"
               initial={{ opacity: 0, y: 50 }}
               animate={step > i ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.5 }}
             >
               <div className="w-1 bg-gradient-to-b from-emerald-500/50 to-transparent h-16 mb-4 -mt-12 z-0"></div>
               <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full text-center z-10 hover:border-green-500 transition-colors">
                  <div className="text-green-400 mb-3 flex justify-center scale-150">{b.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{b.title}</h4>
                  <p className="text-sm text-gray-400">{b.desc}</p>
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

// --- Slide 10: Rolling Validation ---
export const Slide10: React.FC<SlideProps> = ({ step }) => {
  return (
    <SlideLayout title="验证机制：滚动原点交叉验证">
      <div className="w-full h-full flex flex-col justify-center px-20">
        <p className="text-xl text-gray-400 mb-12 text-center">
          <Clock className="inline mr-2"/>
          模拟时间流逝，严禁使用“未来数据”预测“过去”
        </p>

        {/* Timeline Container */}
        <div className="relative h-48 bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 flex items-center px-10">
          
          {/* Years Markers */}
          <div className="absolute top-4 left-0 w-full flex justify-between px-20 z-10">
            {['2020', '2021', '2022', '2023', '2024'].map(y => (
              <span key={y} className="text-gray-500 font-mono text-lg">{y}</span>
            ))}
          </div>

          {/* Training Block (Moving) */}
          <motion.div 
            className="h-20 bg-blue-600/60 rounded-l-lg flex items-center justify-center backdrop-blur-sm absolute top-14"
            initial={{ width: '20%', left: '10%' }}
            animate={{ width: ['20%', '40%', '60%'] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <span className="text-white font-bold whitespace-nowrap px-4">训练集 Training</span>
          </motion.div>

          {/* Validation Block (Moving) */}
          <motion.div 
             className="h-20 bg-harvest-gold/80 rounded-r-lg flex items-center justify-center backdrop-blur-sm absolute top-14 border-l-2 border-white"
             initial={{ width: '20%', left: '30%' }}
             animate={{ left: ['30%', '50%', '70%'] }}
             transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
             <span className="text-black font-bold whitespace-nowrap px-4">验证 Validation</span>
          </motion.div>

          {/* Grid lines */}
          <div className="absolute inset-0 flex justify-between px-24 pointer-events-none">
             {[0,1,2,3,4].map(i => <div key={i} className="w-[1px] h-full bg-gray-700/50 dashed"></div>)}
          </div>
        </div>

        <div className="mt-8 text-center">
           <span className="bg-blue-900/50 text-blue-300 px-4 py-2 rounded mr-4">Step 1: 练20-21 &rarr; 测22</span>
           <span className="bg-blue-900/50 text-blue-300 px-4 py-2 rounded">Step 2: 练20-22 &rarr; 测23</span>
        </div>
      </div>
    </SlideLayout>
  );
};